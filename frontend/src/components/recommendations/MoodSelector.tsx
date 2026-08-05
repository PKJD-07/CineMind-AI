import React from 'react';
import { MOODS } from '../../utils/constants';
import { clsx } from 'clsx';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">
        How are you feeling?
      </label>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={clsx(
              'flex flex-col items-center p-4 rounded-xl border transition-all duration-300',
              'hover:scale-105 active:scale-95',
              selectedMood === mood.id
                ? `${mood.color} border-current shadow-lg`
                : 'border-gray-700 text-gray-400 hover:border-gray-600'
            )}
          >
            <span className="text-2xl mb-2">{mood.emoji}</span>
            <span className="text-sm font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;