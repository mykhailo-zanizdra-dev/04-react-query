import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import useFetchMovies from '../../hooks/useFetchMovies';
import Pagination from '../Pagination/Pagination';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    isFetching,
    totalPages,
    movies,
  } = useFetchMovies({
    query: searchQuery,
    page: currentPage,
  });

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (!movies?.length && isSuccess) {
      toast.error('No movies found for your request');
    }
  }, [movies?.length, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.message ? error.message : 'There was an error fetching movies'
      );
    }
  }, [isError]);

  return (
    <div className={styles.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} isLoading={isLoading} />
      {!!movies?.length && (
        <MovieGrid
          movies={movies}
          onSelect={handleSelectMovie}
          isLoading={isFetching}
        />
      )}
      {isFetching && <Loader />}
      {isError && <ErrorMessage />}
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
