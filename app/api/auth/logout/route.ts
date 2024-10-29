import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/lib/constants/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value;

    if (!sessionId) {
      return Response.json(
        { error: "No active session" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/session?` +
      new URLSearchParams({
        api_key: process.env.TMDB_API_KEY || '',
      }),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('TMDB Session deletion failed:', error);
      return Response.json(
        { error: "Failed to delete TMDB session" },
        { status: response.status }
      );
    }

    // Clear cookies
    cookieStore.delete(COOKIE_NAMES.SESSION_ID);
    cookieStore.delete(COOKIE_NAMES.ACCOUNT_ID);

    return Response.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
} 