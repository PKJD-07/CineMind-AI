import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiFilm, FiSearch, FiHeart, FiBarChart2, FiLogOut, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { clsx } from 'clsx';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/search', label: 'Search', icon: <FiSearch className="w-4 h-4" /> },
    { to: '/favorites', label: 'Favorites', icon: <FiHeart className="w-4 h-4" /> },
    { to: '/recommendations', label: 'AI Picks', icon: <FiFilm className="w-4 h-4" /> },
    { to: '/insights', label: 'Insights', icon: <FiBarChart2 className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FiFilm className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold gradient-text">CineMind</span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={clsx(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                    isActive(link.to)
                      ? 'bg-primary-600/20 text-primary-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={clsx(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300',
                    isActive('/dashboard')
                      ? 'bg-primary-600/20 text-primary-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  <FiUser className="w-4 h-4" />
                  <span className="text-sm font-medium">{user?.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-all duration-300"
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Login
                </Link>
                <Link to="/register" className="btn-primary !py-2 !px-4 text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated && navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  'flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-300',
                  isActive(link.to)
                    ? 'bg-primary-600/20 text-primary-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-gray-400 hover:text-red-400 hover:bg-gray-800 w-full"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="px-3 py-3 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;