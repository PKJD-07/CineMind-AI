// User types
export interface User {
  id: number;
  email: string;
  username: string;
  created_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Movie types
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  budget?: number;
  revenue?: number;
  production_companies?: ProductionCompany[];
  cast?: CastMember[];
  director?: string;
  videos?: Video[];
  similar?: SimilarMovie[];
  tagline?: string;
  status?: string;
  backdrop_path?: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface CastMember {
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Video {
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

// Favorites types
export interface Favorite {
  id: number;
  movie_id: number;
  title: string;
  poster_path: string | null;
  rating: number | null;
  genres: string | null;
  added_at: string;
}

// Recommendation types
export interface RecommendationRequest {
  genres: string[];
  languages: string[];
  mood: string;
  favorite_movie?: string;
  favorite_movie_id?: number;
}

export interface MovieRecommendation {
  title: string;
  reason: string;
  confidence: number;
  tmdb_id?: number;
  poster_path?: string | null;
  rating?: number | null;
  year?: string | null;
}

export interface RecommendationResponse {
  recommendations: MovieRecommendation[];
  user_preferences: {
    genres: string[];
    languages: string[];
    mood: string;
    favorite_movie?: string;
  };
  generated_at: string;
}

// Dashboard types
export interface DashboardStats {
  stats: {
    favorite_genre: string;
    movies_saved: number;
    movies_watched: number;
    movies_recommended: number;
    average_rating: number;
  };
  recent_activity: Activity[];
}

export interface Activity {
  type: 'favorite' | 'watched';
  title: string;
  date: string;
}

export interface Insights {
  genre_distribution: Record<string, number>;
  rating_distribution: Record<string, number>;
  top_rated: TopRatedMovie[];
}

export interface TopRatedMovie {
  title: string;
  rating: number;
  poster_path: string | null;
}

// API response types
export interface TMDBResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export interface ApiError {
  detail: string;
}