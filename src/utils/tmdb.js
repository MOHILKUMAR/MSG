import { API_OPTIONS } from "./constant";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Throws on non-2xx so callers never store an error body as movie data.
export const fetchTmdb = async (path) => {
  const res = await fetch(TMDB_BASE_URL + path, API_OPTIONS);
  if (!res.ok) throw new Error(`TMDB request failed (${res.status}): ${path}`);
  return res.json();
};
