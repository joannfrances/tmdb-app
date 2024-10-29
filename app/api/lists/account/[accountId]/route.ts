import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/lib/constants/auth";

export async function GET(
  request: Request,
  { params }: { params: { accountId: string } }
) {
  const cookie = await cookies();
  const sessionId = cookie.get(COOKIE_NAMES.SESSION_ID)?.value;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/account/${params.accountId}/lists?api_key=${process.env.TMDB_API_KEY}&session_id=${sessionId}&page=${page}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lists" },
      { status: 500 }
    );
  }
}
