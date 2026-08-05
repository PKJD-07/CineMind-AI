import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiFilm, FiSearch, FiHeart, FiBarChart2, FiArrowRight, FiStar, FiZap } from 'react-icons/fi';

const features = [
  {
    icon: <FiZap className="w-8 h-8" />,
    title: 'AI Recommendations',
    description: 'Advanced AI analyzes your preferences to suggest movies you\'ll truly enjoy.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <FiHeart className="w-8 h-8" />,
    title: 'Mood Based Search',
    description: 'Find the perfect movie based on your current mood and emotional state.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <FiStar className="w-8 h-8" />,
    title: 'Explainable AI',
    description: 'Understand why each movie is recommended with clear, personalized explanations.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <FiBarChart2 className="w-8 h-8" />,
    title: 'Personalized Dashboard',
    description: 'Track your movie preferences and discover insights about your taste.',
    color: 'from-green-500 to-emerald-500',
  },
];

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-gray-950 to-accent-900/50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Find movies you'll</span>
              <br />
              <span className="text-white">actually love.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Personalized movie recommendations powered by AI. 
              Understand your taste, discover hidden gems, and never waste time on bad movies again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary flex items-center justify-center">
                  Go to Dashboard
                  <FiArrowRight className="ml-2" />
                </Link>
              ) : (
                <Link to="/register" className="btn-primary flex items-center justify-center">
                  Get Started
                  <FiArrowRight className="ml-2" />
                </Link>
              )}
              <Link to="/search" className="btn-secondary flex items-center justify-center">
                <FiSearch className="mr-2" />
                Browse Movies
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { label: 'Movies', value: '500K+' },
              { label: 'Genres', value: '19' },
              { label: 'Languages', value: '50+' },
              { label: 'AI Accuracy', value: '94%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why CineMind?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine AI intelligence with movie expertise to deliver recommendations that feel personally curated.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card-hover p-6 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-4 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get personalized recommendations in three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Tell Us Your Taste',
                description: 'Select your favorite genres, languages, and current mood.',
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Our AI analyzes your preferences and finds perfect matches.',
              },
              {
                step: '3',
                title: 'Get Recommendations',
                description: 'Receive 10 personalized recommendations with explanations.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to discover your next favorite movie?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of movie lovers who use CineMind to find films that perfectly match their taste.
            </p>
            {!isAuthenticated && (
              <Link to="/register" className="btn-primary inline-flex items-center text-lg">
                Start Your Journey
                <FiArrowRight className="ml-2" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;