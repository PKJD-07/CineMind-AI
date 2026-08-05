import api from './api';
import { TMDBResponse } from '../types';

export const movieService = {
  async searchMovies(params: {
    query?: string;
    genre?: string;
    language?: string;
    year?: number;
    page?: number;
  }) {
    const response = await api.get<TMDBResponse>('/movies/search', { params });
    return response.data;
  },

  async getMovieDetails(movieId: number) {
    const response = await api.get(`/movies/${movieId}`);
    return response.data;
  },

  async getGenres() {
    const response = await api.get('/movies/genres/list');
    return response.data;
  },
};