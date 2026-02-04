import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Fetch trending movies
export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get("/trending/movie/week", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos,credits",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// Get movie videos/trailers
export const getMovieVideos = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/popular", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// Get top rated movies
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/top_rated", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

// Get upcoming movies
export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/upcoming", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

// Get image URL
export const getImageUrl = (path, width = 500) => {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  return `https://image.tmdb.org/t/p/w${width}${path}`;
};

export default api;
