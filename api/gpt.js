// Vercel serverless function: POST /api/gpt  { query } -> { movies: string[] }
// Keeps the Gemini key on the server and only answers signed-in Firebase users.
import { GoogleGenAI, Type } from "@google/genai";
import { setCors, verifyFirebaseUser } from "./_lib/auth.js";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const MAX_QUERY_LENGTH = 200;

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
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `Act as a movie recommendation system. Suggest 5 movies for this request: "${query}". Return only the movie titles.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    });

    // response.text is undefined when Gemini blocks the prompt.
    const titles = JSON.parse(response.text ?? "[]");
    const movies = [
      ...new Set(
        (Array.isArray(titles) ? titles : [])
          .filter((title) => typeof title === "string")
          .map((title) => title.trim())
          .filter(Boolean)
      ),
    ].slice(0, 5);

    return res.status(200).json({ movies });
  } catch (error) {
    console.error("Gemini request failed:", error);
    return res
      .status(502)
      .json({ error: "Movie suggestions are unavailable right now" });
  }
}
