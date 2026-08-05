import React, { useState } from 'react';
import { recommendationService } from '../services/recommendations';
import PreferenceForm from '../components/recommendations/PreferenceForm';
import RecommendationCard from '../components/recommendations/RecommendationCard';
import { RecommendationResponse } from '../types';
import { FiZap, FiRefreshCw } from 'react-icons/fi';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const RecommendationsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);

  const handleGetRecommendations = async (preferences: any) => {
    setIsLoading(true);
    try {
      const data = await recommendationService.getRecommendations(preferences);
      setRecommendations(data);
      toast.success('Recommendations generated!');
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-accent-600 mb-4">
          <FiZap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          AI-Powered Recommendations
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Tell us about your preferences and mood, and our AI will find the perfect movies for you.
          Each recommendation comes with a detailed explanation of why it matches your taste.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preferences Form */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Your Preferences</h2>
            <PreferenceForm onSubmit={handleGetRecommendations} isLoading={isLoading} />
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="glass-card p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">AI is analyzing your preferences...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
            </div>
          ) : recommendations ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Your Recommendations
                </h2>
                <Button
                  variant="secondary"
                  onClick={() => setRecommendations(null)}
                  leftIcon={<FiRefreshCw className="w-4 h-4" />}
                >
                  New Search
                </Button>
              </div>

              {/* User Preferences Summary */}
              <div className="glass-card p-4 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-400">Based on:</span>
                  {recommendations.user_preferences.mood && (
                    <span className="text-sm px-3 py-1 rounded-full bg-primary-600/20 text-primary-400">
                      {recommendations.user_preferences.mood} mood
                    </span>
                  )}
                  {recommendations.user_preferences.genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-sm px-3 py-1 rounded-full bg-accent-600/20 text-accent-400"
                    >
                      {genre}
                    </span>
                  ))}
                  {recommendations.user_preferences.favorite_movie && (
                    <span className="text-sm px-3 py-1 rounded-full bg-purple-600/20 text-purple-400">
                      Similar to: {recommendations.user_preferences.favorite_movie}
                    </span>
                  )}
                </div>
              </div>

              {/* Recommendation Cards */}
              <div className="space-y-4">
                {recommendations.recommendations.map((rec, index) => (
                  <RecommendationCard
                    key={index}
                    recommendation={rec}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <FiZap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Ready to discover movies?
              </h3>
              <p className="text-gray-400">
                Select your preferences on the left and click "Get AI Recommendations"
                to receive personalized movie suggestions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;