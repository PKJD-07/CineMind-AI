import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiHeart } from 'react-icons/fi';
import { Movie } from '../../types';
import { formatRating, getRatingColor, truncateText } from '../../utils/helpers';

interface MovieCardProps {
  movie: Movie | any;
  onFavoriteClick?: (movie: any) => void;
  isFavorite?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteClick, isFavorite }) => {
  return (
    <div className="glass-card-hover group animate-fade-in overflow-hidden">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster_path || '/placeholder-movie.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        {movie.vote_average && (
          <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
            <FiStar className="w-4 h-4 text-yellow-400" />
            <span className={`text-sm font-semibold ${getRatingColor(movie.vote_average)}`}>
              {formatRating(movie.vote_average)}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        {onFavoriteClick && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onFavoriteClick(movie);
            }}
            className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <FiHeart
              className={`w-5 h-5 ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-white'
              }`}
            />
          </button>
        )}

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm text-gray-300 line-clamp-3">
            {movie.overview || 'No description available'}
          </p>
        </div>
      </div>

      <Link to={`/movie/${movie.id}`} className="block p-4">
        <h3 className="font-semibold text-white mb-2 line-clamp-1 group-hover:text-primary-400 transition-colors duration-300">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
          {movie.runtime && (
            <span className="flex items-center">
              <FiClock className="w-3 h-3 mr-1" />
              {movie.runtime} min
            </span>
          )}
        </div>
        {movie.genres && (
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genres.slice(0, 2).map((genre: any) => (
              <span
                key={genre.id || genre}
                className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400"
              >
                {genre.name || genre}
              </span>
            ))}
          </div>
        )}
      </Link>
    </div>
  );
};

export default MovieCard;