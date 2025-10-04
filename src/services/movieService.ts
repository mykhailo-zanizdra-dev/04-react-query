import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieHttpResponse {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}

const fetchMovies = async (
  query: string,
  page = 1
): Promise<MovieHttpResponse> => {
  const token = import.meta.env.VITE_TMDB_API_TOKEN;

  const response = await axios.get<MovieHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: query,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default fetchMovies;
