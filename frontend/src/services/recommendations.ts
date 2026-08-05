import api from './api';
import { RecommendationRequest, RecommendationResponse } from '../types';

export const recommendationService = {
  async getRecommendations(preferences: RecommendationRequest) {
    const response = await api.post<RecommendationResponse>('/recommend', preferences);
    return response.data;
  },
};