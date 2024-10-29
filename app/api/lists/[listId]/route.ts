import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { listId } = req.query;
  const { session_id } = req.body;

  if (req.method === "DELETE") {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}/list/${listId}?api_key=${process.env.TMDB_API_KEY}&session_id=${session_id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete list" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
