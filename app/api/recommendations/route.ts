import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { genres, releaseYear } = await request.json();

  const decade = releaseYear.slice(0, 3);
  const startDate = `${parseInt(decade) * 10}-01-01`;
  const endDate =
    releaseYear === "2020s"
      ? `${new Date().getFullYear()}-12-31`
      : `${parseInt(decade) * 10 + 9}-12-31`;

  try {
    const genreIds = genres.join("|");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreIds}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    const data = await response.json();
    return NextResponse.json(data.results); // Return the movie recommendations
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
