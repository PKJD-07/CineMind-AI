import api from './api';
import { Favorite } from '../types';

export const favoriteService = {
  async getFavorites(sortBy?: string, order?: string) {
    const response = await api.get<Favorite[]>('/favorites', {
      params: { sort_by: sortBy, order },
    });
    return response.data;
  },

  async addFavorite(movie: {
    movie_id: number;
    title: string;
    poster_path?: string;
    rating?: number;
    genres?: string;
  }) {
    const response = await api.post('/favorites', movie);
    return response.data;
  },

  async removeFavorite(movieId: number) {
    const response = await api.delete(`/favorites/${movieId}`);
    return response.data;
  },
};