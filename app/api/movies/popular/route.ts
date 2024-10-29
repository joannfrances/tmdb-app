import { NextResponse } from "next/server";
import { MovieResponse } from "@/types/movie";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );
    const data: MovieResponse = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
      { status: 500 }
    );
  }
}
