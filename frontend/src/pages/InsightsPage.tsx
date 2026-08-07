import React, { useEffect, useState } from 'react';
import { dashboardService } from '../services/dashboard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Insights } from '../types';
import { FiBarChart2, FiPieChart, FiStar } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#a855f7', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#14b8a6', '#f97316'];

const InsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const data = await dashboardService.getInsights();
      setInsights(data);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading insights..." />;
  }

  if (!insights) {
    return null;
  }

  const genreData = Object.entries(insights.genre_distribution).map(([name, value]) => ({
    name,
    value,
  }));

  const ratingData = Object.entries(insights.rating_distribution).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Movie Insights</h1>
        <p className="text-gray-400">Discover patterns in your movie preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Genre Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
              <FiBarChart2 className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Genre Distribution</h2>
          </div>
          {genreData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    color: '#f3f4f6',
                  }}
                />
                <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No genre data available yet. Start saving movies!
            </div>
          )}
        </div>

        {/* Rating Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <FiPieChart className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Rating Distribution</h2>
          </div>
          {ratingData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ratingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {ratingData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    color: '#f3f4f6',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No rating data available yet.
            </div>
          )}
        </div>

        {/* Top Rated Movies */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-yellow-600/20 flex items-center justify-center">
              <FiStar className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Top Rated Movies</h2>
          </div>
          {insights.top_rated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {insights.top_rated.map((movie, index) => (
                <div key={index} className="text-center">
                  <img
                    src={movie.poster_path || '/placeholder-movie.jpg'}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover rounded-lg mb-3"
                  />
                  <p className="text-white font-medium text-sm line-clamp-1">{movie.title}</p>
                  <div className="flex items-center justify-center mt-1">
                    <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-gray-300">{movie.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No rated movies yet. Rate your favorites to see them here!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;