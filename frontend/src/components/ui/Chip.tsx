import React from 'react';
import { clsx } from 'clsx';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onClick,
  className,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
        'border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900',
        selected
          ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/25'
          : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200',
        onClick && 'cursor-pointer hover:scale-105 active:scale-95',
        !onClick && 'cursor-default',
        className
      )}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );
};

export default Chip;