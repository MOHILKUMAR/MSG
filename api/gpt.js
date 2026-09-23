// Vercel serverless function: POST /api/gpt  { query } -> { movies: string[] }
// Keeps the Gemini key on the server and only answers signed-in Firebase users.
import { GoogleGenAI, Type } from "@google/genai";
import { createRemoteJWKSet, jwtVerify } from "jose";

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "netflixgpt1-40ee2";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const MAX_QUERY_LENGTH = 200;

const firebaseKeys = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

const verifyFirebaseUser = async (authHeader = "") => {
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, firebaseKeys, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
      algorithms: ["RS256"],
    });
    return payload.sub ? payload : null;
  } catch {
    return null;
  }
};

export default async function handler(req, res) {
  // Only needed if the site is hosted somewhere else (e.g. Firebase Hosting).
  if (process.env.ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  }
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
