import React from 'react';
import MovieCard from './MovieCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import { FiFilm } from 'react-icons/fi';

interface MovieGridProps {
  movies: any[];
  isLoading: boolean;
  onFavoriteClick?: (movie: any) => void;
  favorites?: number[];
  emptyMessage?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  isLoading,
  onFavoriteClick,
  favorites = [],
  emptyMessage = 'No movies found',
}) => {
  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading movies..." />;
  }

  if (movies.length === 0) {
    return (
      <EmptyState
        icon={<FiFilm className="w-16 h-16" />}
        title={emptyMessage}
        description="Try adjusting your search or filters to find more movies."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onFavoriteClick={onFavoriteClick}
          isFavorite={favorites.includes(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;