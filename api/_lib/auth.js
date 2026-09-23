// Shared helpers for the Vercel functions. Files under api/_lib are not routes.
import { createRemoteJWKSet, jwtVerify } from "jose";

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "netflixgpt1-40ee2";

const firebaseKeys = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

// Returns the token payload for a signed-in user of this Firebase project, else null.
export const verifyFirebaseUser = async (authHeader = "") => {
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

// Only needed if the site is hosted somewhere else (e.g. Firebase Hosting).
export const setCors = (res, methods) => {
  if (!process.env.ALLOWED_ORIGIN) return;
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", `${methods}, OPTIONS`);
};
