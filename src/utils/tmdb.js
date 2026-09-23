import { callApi } from "./api";

// TMDB requests go through our server (api/tmdb.js) so the token stays private.
export const fetchTmdb = (path) =>
  callApi("/api/tmdb?path=" + encodeURIComponent(path));
