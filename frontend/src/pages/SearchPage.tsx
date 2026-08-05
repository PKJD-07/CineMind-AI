import React, { useState, useEffect } from 'react';
import { movieService } from '../services/movies';
import { favoriteService } from '../services/favorites';
import SearchBar from '../components/movies/SearchBar';
import MovieGrid from '../components/movies/MovieGrid';
import toast from 'react-hot-toast';

const SearchPage: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await favoriteService.getFavorites();
      setFavorites(favs.map((f: any) => f.movie_id));
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const handleSearch = async (params: any) => {
    setIsLoading(true);
    setCurrentPage(1);
    try {
      const data = await movieService.searchMovies({ ...params, page: 1 });
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteClick = async (movie: any) => {
    try {
      if (favorites.includes(movie.id)) {
        await favoriteService.removeFavorite(movie.id);
        setFavorites(prev => prev.filter(id => id !== movie.id));
        toast.success('Removed from favorites');
      } else {
        await favoriteService.addFavorite({
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          rating: movie.vote_average,
          genres: movie.genre_ids?.join(',') || '',
        });
        setFavorites(prev => [...prev, movie.id]);
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Favorite operation failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Search Movies</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <MovieGrid
        movies={movies}
        isLoading={isLoading}
        onFavoriteClick={handleFavoriteClick}
        favorites={favorites}
      />
    </div>
  );
};

export default SearchPage;