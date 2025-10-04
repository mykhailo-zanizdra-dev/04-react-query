import { useQuery, keepPreviousData } from '@tanstack/react-query';
import fetchMovies from '../services/movieService';
import { QUERY_KEYS } from '../const/queryKeys';
import type { Movie } from '../types/movie';

interface UseFetchMoviesParams {
  query: string;
  page?: number;
}

interface UseFetchMoviesResult {
  movies?: Movie[];
  totalPages: number;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isSuccess?: boolean;
}

function useFetchMovies({
  query = '',
  page = 1,
}: UseFetchMoviesParams): UseFetchMoviesResult {
  const { data, error, isLoading, isError, isFetching, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.MOVIES, query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query.trim(),
    placeholderData: keepPreviousData,
    retry: 1,
  });

  return {
    movies: data?.results,
    totalPages: data?.total_pages || 0,
    error,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  };
}

export default useFetchMovies;
