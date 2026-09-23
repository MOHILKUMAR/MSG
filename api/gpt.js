// Vercel serverless function: POST /api/gpt  { query } -> { movies: string[] }
// Keeps the Gemini key on the server and only answers signed-in Firebase users.
import { GoogleGenAI, Type } from "@google/genai";
import { setCors, verifyFirebaseUser } from "./_lib/auth.js";

// Tried in order: when Google reports a model as overloaded (503) or rate
// limited (429), the next one is used. "-latest" aliases follow Google's
// current models, so they don't get retired like pinned versions do.
const GEMINI_MODELS = [
  process.env.GEMINI_MODEL || "gemini-flash-latest",
  process.env.GEMINI_FALLBACK_MODEL || "gemini-flash-lite-latest",
];
const GEMINI_TIMEOUT_MS = 15000;
const MAX_QUERY_LENGTH = 200;

// Retry on overload, rate limits, server errors and timeouts (no status);
// a bad key or bad request (other 4xx) fails the same on every model.
const isRetryable = (error) =>
  !error.status || error.status === 429 || error.status >= 500;

export const suggestMovies = async (query, apiKey) => {
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: { timeout: GEMINI_TIMEOUT_MS },
  });
  let lastError;
  for (const model of GEMINI_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: `Act as a movie recommendation system. Suggest 5 movies for this request: "${query}". Return only the movie titles.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
      });

      // response.text is undefined when Gemini blocks the prompt.
      const titles = JSON.parse(response.text ?? "[]");
      return [
        ...new Set(
          (Array.isArray(titles) ? titles : [])
            .filter((title) => typeof title === "string")
            .map((title) => title.trim())
            .filter(Boolean)
        ),
      ].slice(0, 5);
    } catch (error) {
      if (!isRetryable(error)) throw error;
      console.warn(`Gemini model ${model} unavailable (${error.status ?? error.name}), trying next`);
      lastError = error;
    }
  }
  throw lastError;
};

export default async function handler(req, res) {
  setCors(res, "POST");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await verifyFirebaseUser(req.headers.authorization);
  if (!user) return res.status(401).json({ error: "Sign in to use GPT search" });

  const query = typeof req.body?.query === "string" ? req.body.query.trim() : "";
  if (!query || query.length > MAX_QUERY_LENGTH) {
    return res
      .status(400)
      .json({ error: `Query must be 1-${MAX_QUERY_LENGTH} characters` });
  }

  try {
    const movies = await suggestMovies(query, process.env.GEMINI_API_KEY);
    return res.status(200).json({ movies });
  } catch (error) {
    console.error("Gemini request failed:", error);
    return res
      .status(502)
      .json({ error: "Movie suggestions are unavailable right now" });
  }
}
