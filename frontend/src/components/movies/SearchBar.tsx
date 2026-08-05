import React, { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { GENRES, LANGUAGES } from '../../utils/constants';

interface SearchBarProps {
  onSearch: (params: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [year, setYear] = useState('');

  const handleSearch = () => {
    onSearch({
      query,
      genre: selectedGenre,
      language: selectedLanguage,
      year: year ? parseInt(year) : undefined,
    });
  };

  const handleClearFilters = () => {
    setSelectedGenre('');
    setSelectedLanguage('');
    setYear('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            leftIcon={<FiSearch className="w-5 h-5" />}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} leftIcon={<FiSearch className="w-5 h-5" />}>
          Search
        </Button>
        <Button
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
          leftIcon={<FiFilter className="w-5 h-5" />}
        >
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="glass-card p-6 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="input-field"
              >
                <option value="">All Genres</option>
                {GENRES.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="input-field"
              >
                <option value="">All Languages</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2024"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-3">
            <Button variant="ghost" onClick={handleClearFilters} leftIcon={<FiX className="w-4 h-4" />}>
              Clear Filters
            </Button>
            <Button onClick={handleSearch}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;