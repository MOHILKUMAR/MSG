// Vercel serverless function: GET /api/tmdb?path=/movie/popular?...  -> TMDB JSON
// Keeps the TMDB token on the server; only signed-in users, only the endpoints the app uses.
import { setCors, verifyFirebaseUser } from "./_lib/auth.js";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const ALLOWED_PATH =
  /^\/(movie\/(now_playing|popular|top_rated|\d+\/videos)|discover\/movie|search\/movie)(\?[^#]*)?$/;

export default async function handler(req, res) {
  setCors(res, "GET");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await verifyFirebaseUser(req.headers.authorization);
  if (!user) return res.status(401).json({ error: "Sign in to browse movies" });

  const path = typeof req.query.path === "string" ? req.query.path : "";
  if (!ALLOWED_PATH.test(path)) {
    return res.status(400).json({ error: "Unsupported TMDB path" });
  }

  try {
    const tmdbRes = await fetch(TMDB_BASE_URL + path, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.TMDB_KEY,
      },
    });
    if (tmdbRes.ok) res.setHeader("Cache-Control", "private, max-age=300");
    res.setHeader("Content-Type", "application/json");
    return res.status(tmdbRes.status).send(await tmdbRes.text());
  } catch (error) {
    console.error("TMDB request failed:", error);
    return res.status(502).json({ error: "TMDB is unavailable right now" });
  }
}
