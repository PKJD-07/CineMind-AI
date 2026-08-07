import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieService } from '../services/movies';
import { favoriteService } from '../services/favorites';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import Chip from '../components/ui/Chip';
import MovieGrid from '../components/movies/MovieGrid';
import { Movie } from '../types';
import {
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiStar,
  FiHeart,
  FiPlay,
  FiUser,
  FiFilm,
} from 'react-icons/fi';
import { formatRuntime, formatCurrency, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(parseInt(id));
      checkFavoriteStatus(parseInt(id));
    }
  }, [id]);

  const fetchMovieDetails = async (movieId: number) => {
    try {
      const data = await movieService.getMovieDetails(movieId);
      setMovie(data);
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
      toast.error('Failed to load movie details');
    } finally {
      setIsLoading(false);
    }
  };

  const checkFavoriteStatus = async (movieId: number) => {
    try {
      const favorites = await favoriteService.getFavorites();
      setIsFavorite(favorites.some((f: any) => f.movie_id === movieId));
    } catch (error) {
      console.error('Failed to check favorite status:', error);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!movie) return;
    
    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(movie.id);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteService.addFavorite({
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path ?? undefined,
          rating: movie.vote_average,
          genres: movie.genres?.map((g: any) => g.name).join(',') || '',
        });
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Favorite operation failed:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading movie details..." />;
  }

  if (!movie) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">Movie not found</h2>
        <Link to="/search" className="text-primary-400 hover:text-primary-300">
          Back to search
        </Link>
      </div>
    );
  }

  const trailer = movie.videos?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        {movie.backdrop_path ? (
          <img
            src={movie.backdrop_path}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto flex gap-8">
            <img
              src={movie.poster_path || '/placeholder-movie.jpg'}
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-xl shadow-2xl hidden md:block"
            />
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-xl text-gray-400 italic mb-4">{movie.tagline}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {movie.vote_average && (
                  <div className="flex items-center space-x-2">
                    <FiStar className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-semibold">{movie.vote_average.toFixed(1)}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <FiClock className="w-4 h-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                {movie.release_date && (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <FiCalendar className="w-4 h-4" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button onClick={handleFavoriteToggle}>
                  <FiHeart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Saved' : 'Add to Favorites'}
                </Button>
                {trailer && (
                  <Button
                    variant="secondary"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
                  >
                    <FiPlay className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {movie.cast.slice(0, 8).map((actor: any, index: number) => (
                    <div key={index} className="glass-card p-3 text-center">
                      <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-gray-800">
                        {actor.profile_path ? (
                          <img
                            src={actor.profile_path}
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiUser className="w-full h-full p-4 text-gray-600" />
                        )}
                      </div>
                      <p className="text-white font-medium text-sm">{actor.name}</p>
                      <p className="text-gray-400 text-xs">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Director */}
            {movie.director && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
            )}

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre: any) => (
                    <Chip key={genre.id || genre} label={genre.name || genre} />
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-white">{movie.status}</span>
                </div>
                {movie.budget && movie.budget > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Budget</span>
                    <span className="text-white">{formatCurrency(movie.budget)}</span>
                  </div>
                )}
                {movie.revenue && movie.revenue > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue</span>
                    <span className="text-white">{formatCurrency(movie.revenue)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Production Companies */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Production</h3>
                <div className="space-y-2">
                  {movie.production_companies.map((company: any) => (
                    <p key={company.id} className="text-gray-300 text-sm">
                      {company.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        {movie.similar && movie.similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {movie.similar.map((similar: any) => (
                <Link
                  key={similar.id}
                  to={`/movie/${similar.id}`}
                  className="glass-card-hover overflow-hidden group"
                >
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={similar.poster_path || '/placeholder-movie.jpg'}
                      alt={similar.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-white font-medium text-sm line-clamp-1">{similar.title}</p>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <FiStar className="w-3 h-3 text-yellow-400 mr-1" />
                      {similar.vote_average?.toFixed(1)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;