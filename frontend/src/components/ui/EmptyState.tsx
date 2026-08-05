import React from 'react';
import { FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="text-gray-600 mb-4">
        {icon || <FiInbox className="w-16 h-16" />}
      </div>
      <h3 className="text-xl font-semibold text-gray-300 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      )}
      {action}
    </div>
  );
};

export default EmptyState;