export const COOKIE_NAMES = {
  ACCOUNT_ID: "tmdb_account_id",
  SESSION_ID: "tmdb_session_id",
} as const;

export const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
} as const;
