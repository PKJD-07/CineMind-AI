import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiTrendingUp, FiInfo, FiExternalLink } from 'react-icons/fi';
import { MovieRecommendation } from '../../types';
import { getConfidenceColor } from '../../utils/helpers';

interface RecommendationCardProps {
  recommendation: MovieRecommendation;
  index: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, index }) => {
  const confidenceColor = getConfidenceColor(recommendation.confidence);

  return (
    <div className="glass-card-hover p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex gap-6">
        {/* Poster */}
        <div className="flex-shrink-0">
          {recommendation.poster_path ? (
            <img
              src={recommendation.poster_path}
              alt={recommendation.title}
              className="w-24 h-36 object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-24 h-36 bg-gray-800 rounded-lg flex items-center justify-center">
              <FiInfo className="w-8 h-8 text-gray-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {recommendation.title}
              </h3>
              {recommendation.year && (
                <span className="text-sm text-gray-500">{recommendation.year}</span>
              )}
            </div>
            
            {/* Confidence Score */}
            <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2">
              <FiTrendingUp className={`w-5 h-5 ${confidenceColor}`} />
              <span className={`text-lg font-bold ${confidenceColor}`}>
                {recommendation.confidence}%
              </span>
            </div>
          </div>

          {/* Reason */}
          <p>{recommendation.reason}</p>

          {recommendation.why_youll_like_it && (
              <div className="mt-3">
                  <strong>Why You'll Like It</strong>
                  <p>{recommendation.why_youll_like_it}</p>
          </div>
)}

{recommendation.mood_match && (
    <span className="badge">
        Mood Match: {recommendation.mood_match}
    </span>
)}

          {/* Rating */}
          {recommendation.rating && (
            <div className="flex items-center space-x-2 text-sm">
              <FiStar className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400">IMDb Rating:</span>
              <span className="text-white font-semibold">{recommendation.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Action */}
          {recommendation.tmdb_id && (
            <Link
              to={`/movie/${recommendation.tmdb_id}`}
              className="inline-flex items-center space-x-2 mt-3 text-sm text-primary-400 hover:text-primary-300 transition-colors duration-300"
            >
              <span>View Details</span>
              <FiExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;