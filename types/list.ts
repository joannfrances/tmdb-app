export interface MovieList {
  id: number;
  name: string;
  description: string;
  favorite_count: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  poster_path: string | null;
}

export interface ListsResponse {
  page: number;
  results: MovieList[];
  total_pages: number;
  total_results: number;
}
