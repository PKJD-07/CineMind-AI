import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | undefined): string => {
  if (!date) return 'N/A';
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatRelativeDate = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatRuntime = (minutes: number | undefined): string => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatCurrency = (amount: number | undefined): string => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatRating = (rating: number | undefined): string => {
  if (!rating) return 'N/A';
  return rating.toFixed(1);
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return 'text-green-400';
  if (rating >= 6) return 'text-yellow-400';
  if (rating >= 4) return 'text-orange-400';
  return 'text-red-400';
};

export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 80) return 'text-green-400';
  if (confidence >= 60) return 'text-yellow-400';
  return 'text-orange-400';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getYouTubeEmbedUrl = (key: string): string => {
  return `https://www.youtube.com/embed/${key}`;
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};