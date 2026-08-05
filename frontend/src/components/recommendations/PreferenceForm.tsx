import React, { useState } from 'react';
import Chip from '../ui/Chip';
import MoodSelector from './MoodSelector';
import { GENRES, LANGUAGES } from '../../utils/constants';
import Button from '../ui/Button';
import { FiZap } from 'react-icons/fi';

interface PreferenceFormProps {
  onSubmit: (preferences: any) => void;
  isLoading: boolean;
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit, isLoading }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [favoriteMovie, setFavoriteMovie] = useState('');

  const toggleGenre = (genreName: string) => {
    setSelectedGenres(prev =>
      prev.includes(genreName)
        ? prev.filter(g => g !== genreName)
        : [...prev, genreName]
    );
  };

  const toggleLanguage = (languageName: string) => {
    setSelectedLanguages(prev =>
      prev.includes(languageName)
        ? prev.filter(l => l !== languageName)
        : [...prev, languageName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      genres: selectedGenres,
      languages: selectedLanguages,
      mood: selectedMood,
      favorite_movie: favoriteMovie || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Mood Selection */}
      <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />

      {/* Genres */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Select Genres
        </label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              selected={selectedGenres.includes(genre.name)}
              onClick={() => toggleGenre(genre.name)}
            />
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Select Languages
        </label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <Chip
              key={lang.code}
              label={lang.name}
              selected={selectedLanguages.includes(lang.name)}
              onClick={() => toggleLanguage(lang.name)}
            />
          ))}
        </div>
      </div>

      {/* Favorite Movie */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Favorite Movie (Optional)
        </label>
        <input
          type="text"
          value={favoriteMovie}
          onChange={(e) => setFavoriteMovie(e.target.value)}
          placeholder="Enter a movie you love..."
          className="input-field"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        leftIcon={<FiZap className="w-5 h-5" />}
      >
        Get AI Recommendations
      </Button>
    </form>
  );
};

export default PreferenceForm;