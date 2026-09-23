import { auth } from "./fireBase";
import { API_BASE_URL } from "./constant";

// Calls our Vercel functions (api/*) with the signed-in user's Firebase ID token.
// Throws on non-2xx so callers never store an error body as data.
export const callApi = async (endpoint, options = {}) => {
  if (!auth.currentUser) throw new Error("Not signed in");
  const idToken = await auth.currentUser.getIdToken();
  const res = await fetch(API_BASE_URL + endpoint, {
    ...options,
    headers: { ...options.headers, Authorization: "Bearer " + idToken },
  });
  if (!res.ok) throw new Error(`API request failed (${res.status}): ${endpoint}`);
  return res.json();
};
