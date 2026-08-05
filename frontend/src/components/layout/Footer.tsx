import React from 'react';
import { Link } from 'react-router-dom';
import { FiFilm, FiGithub, FiTwitter, FiHeart } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <FiFilm className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold gradient-text">CineMind</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Discover movies that actually match your taste. Powered by AI, personalized for you.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-primary-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Search Movies
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-gray-400 hover:text-white transition-colors duration-300">
                  AI Recommendations
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 CineMind. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center mt-2 md:mt-0">
            Made with <FiHeart className="w-4 h-4 text-red-500 mx-1" /> by CineMind Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;