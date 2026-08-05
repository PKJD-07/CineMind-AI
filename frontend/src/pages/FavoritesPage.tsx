import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { favoriteService } from '../services/favorites';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { Favorite } from '../types';
import { FiHeart, FiTrash2, FiStar, FiArrowUp, FiArrowDown, FiSearch } from 'react-icons/fi';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('added_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadFavorites();
  }, [sortBy, sortOrder]);

  const loadFavorites = async () => {
    try {
      const data = await favoriteService.getFavorites(sortBy, sortOrder);
      setFavorites(data);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (movieId: number) => {
    try {
      await favoriteService.removeFavorite(movieId);
      setFavorites(prev => prev.filter(f => f.movie_id !== movieId));
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const filteredFavorites = favorites.filter(fav =>
    fav.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading favorites..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Favorites</h1>
          <p className="text-gray-400">{favorites.length} movies saved</p>
        </div>
        <Link to="/search">
          <Button leftIcon={<FiSearch className="w-5 h-5" />}>
            Discover More
          </Button>
        </Link>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter favorites..."
            className="input-field"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field !w-auto"
          >
            <option value="added_at">Date Added</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
          <Button variant="secondary" onClick={toggleSortOrder}>
            {sortOrder === 'asc' ? (
              <FiArrowUp className="w-5 h-5" />
            ) : (
              <FiArrowDown className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <EmptyState
          icon={<FiHeart className="w-16 h-16" />}
          title="No favorites yet"
          description="Start exploring movies and save your favorites here!"
          action={
            <Link to="/search">
              <Button>Browse Movies</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((favorite) => (
            <div key={favorite.id} className="glass-card-hover p-4 animate-fade-in">
              <div className="flex gap-4">
                <Link to={`/movie/${favorite.movie_id}`} className="flex-shrink-0">
                  <img
                    src={favorite.poster_path || '/placeholder-movie.jpg'}
                    alt={favorite.title}
                    className="w-20 h-28 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/movie/${favorite.movie_id}`}
                    className="text-white font-semibold hover:text-primary-400 transition-colors duration-300 line-clamp-1"
                  >
                    {favorite.title}
                  </Link>
                  <div className="flex items-center space-x-2 mt-2">
                    {favorite.rating && (
                      <div className="flex items-center text-sm">
                        <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-gray-300">{favorite.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  {favorite.genres && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {favorite.genres.split(',').slice(0, 2).map((genre, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      {formatDate(favorite.added_at)}
                    </span>
                    <button
                      onClick={() => handleRemove(favorite.movie_id)}
                      className="text-gray-500 hover:text-red-400 transition-colors duration-300"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;