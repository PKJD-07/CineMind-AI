import api from './api';
import { DashboardStats, Insights } from '../types';

export const dashboardService = {
  async getDashboard() {
    const response = await api.get<DashboardStats>('/dashboard');
    return response.data;
  },

  async getInsights() {
    const response = await api.get<Insights>('/insights');
    return response.data;
  },
};