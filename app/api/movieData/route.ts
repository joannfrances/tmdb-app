import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genresResponse = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`
    );
    const genresData = await genresResponse.json();

    return NextResponse.json({
      genres: genresData.genres,
    });
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie data" },
      { status: 500 }
    );
  }
}
