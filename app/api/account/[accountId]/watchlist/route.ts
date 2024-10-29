import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/lib/constants/auth";

type Params = {
  params: Promise<{ accountId: string }>;
}

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    const { accountId } = await context.params;
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value;

    if (!sessionId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?` + 
      new URLSearchParams({
        page: page,
        session_id: sessionId,
        api_key: process.env.TMDB_API_KEY || '',
      }),
      {
        headers: {
          accept: "application/json",
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch watchlist" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return Response.json(
      { error: "Failed to fetch watchlist" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: Params
) {
  try {
    const { accountId } = await context.params;
    const { movieId } = await request.json();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value;

    if (!sessionId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist?` +
      new URLSearchParams({
        session_id: sessionId,
        api_key: process.env.TMDB_API_KEY || '',
      }),
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
        }),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Failed to add to watchlist" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(
      { 
        ...data,
        success: true,
        message: "Movie added to watchlist"
      }
    );
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return Response.json(
      { error: "Failed to add to watchlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: Params
) {
  try {
    const { accountId } = await context.params;
    const { movieId } = await request.json();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value;

    if (!sessionId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist?` +
      new URLSearchParams({
        session_id: sessionId,
        api_key: process.env.TMDB_API_KEY || '',
      }).toString();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        watchlist: false
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("TMDB API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      return Response.json(
        { error: "Failed to remove from watchlist", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(
      { 
        ...data,
        success: true,
        message: "Movie removed from watchlist"
      }
    );
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return Response.json(
      { error: "Failed to remove from watchlist", details: error },
      { status: 500 }
    );
  }
}
