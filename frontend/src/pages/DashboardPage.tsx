import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/dashboard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { DashboardStats } from '../types';
import {
  FiHeart,
  FiBookmark,
  FiZap,
  FiStar,
  FiTrendingUp,
  FiFilm,
  FiSearch,
  FiClock,
} from 'react-icons/fi';
import { formatRelativeDate } from '../utils/helpers';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await dashboardService.getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading dashboard..." />;
  }

  if (!dashboard) {
    return null;
  }

  const { stats, recent_activity } = dashboard;

  const statCards = [
    {
      label: 'Favorite Genre',
      value: stats.favorite_genre,
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-pink-500 to-red-500',
    },
    {
      label: 'Movies Saved',
      value: stats.movies_saved,
      icon: <FiBookmark className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Movies Recommended',
      value: stats.movies_recommended,
      icon: <FiZap className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Average Rating',
      value: stats.average_rating || 'N/A',
      icon: <FiStar className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.username}! 👋
        </h1>
        <p className="text-gray-400">Here's your movie journey at a glance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="glass-card p-6 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3 text-white`}>
                {stat.icon}
              </div>
              <FiTrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/recommendations"
          className="glass-card-hover p-6 flex items-center justify-between group"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Get Recommendations</h3>
            <p className="text-sm text-gray-400">AI-powered picks for you</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-accent-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            <FiZap className="w-6 h-6" />
          </div>
        </Link>

        <Link
          to="/search"
          className="glass-card-hover p-6 flex items-center justify-between group"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Browse Movies</h3>
            <p className="text-sm text-gray-400">Search and discover</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            <FiSearch className="w-6 h-6" />
          </div>
        </Link>

        <Link
          to="/favorites"
          className="glass-card-hover p-6 flex items-center justify-between group"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">View Favorites</h3>
            <p className="text-sm text-gray-400">Your saved collection</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-red-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            <FiHeart className="w-6 h-6" />
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        {recent_activity.length > 0 ? (
          <div className="space-y-4">
            {recent_activity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'favorite'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {activity.type === 'favorite' ? (
                      <FiHeart className="w-5 h-5" />
                    ) : (
                      <FiFilm className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-400 capitalize">{activity.type}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="w-4 h-4 mr-1" />
                  {formatRelativeDate(activity.date)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FiFilm className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No recent activity yet.</p>
            <p className="text-sm text-gray-500 mt-1">Start by searching and saving movies!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;