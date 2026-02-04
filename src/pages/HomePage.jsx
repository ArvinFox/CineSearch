import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieVideos,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../utils/tmdbApi";
import { useDebounce } from "../hooks/useDebounce";
import { MovieCard } from "../components/MovieCard";
import { MovieModal } from "../components/MovieModal";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingSpinner";
import { FilterPanel } from "../components/FilterPanel";

export const HomePage = ({ searchQuery = "" }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterState, setFilterState] = useState({
    genres: [],
    yearFrom: "",
    yearTo: "",
    ratingMin: 0,
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Function to apply filters to movie arrays
  const applyFilters = (movies, filters) => {
    return movies.filter((movie) => {
      // Filter by genres
      if (filters.genres.length > 0) {
        const hasMatchingGenre = movie.genre_ids?.some((id) =>
          filters.genres.includes(id),
        );
        if (!hasMatchingGenre) return false;
      }

      // Filter by release year range
      if (filters.yearFrom) {
        const releaseYear = new Date(movie.release_date).getFullYear();
        if (releaseYear < parseInt(filters.yearFrom)) return false;
      }
      if (filters.yearTo) {
        const releaseYear = new Date(movie.release_date).getFullYear();
        if (releaseYear > parseInt(filters.yearTo)) return false;
      }

      // Filter by minimum rating
      if (filters.ratingMin > 0) {
        if (movie.vote_average < filters.ratingMin) return false;
      }

      return true;
    });
  };

  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filterState.genres.length > 0) count++;
    if (filterState.yearFrom) count++;
    if (filterState.yearTo) count++;
    if (filterState.ratingMin > 0) count++;
    return count;
  };

  // Fetch movies on mount or when search query changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        if (debouncedSearchQuery.trim()) {
          const data = await searchMovies(debouncedSearchQuery);
          setSearchResults(data.results.filter((m) => m.poster_path));
        } else {
          const [trending, topRated, upcoming] = await Promise.all([
            getTrendingMovies(),
            getTopRatedMovies(),
            getUpcomingMovies(),
          ]);
          setTrendingMovies(trending.results.filter((m) => m.poster_path));
          setTopRatedMovies(topRated.results.filter((m) => m.poster_path));
          setUpcomingMovies(upcoming.results.filter((m) => m.poster_path));
          setSearchResults([]);
        }
      } catch (err) {
        setError("Failed to fetch movies. Please check your API key.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearchQuery]);

  // Fetch movie details when a movie is selected
  useEffect(() => {
    if (!selectedMovie) return;

    const fetchDetails = async () => {
      try {
        const details = await getMovieDetails(selectedMovie.id);
        setMovieDetails(details);

        const videos = await getMovieVideos(selectedMovie.id);
        setTrailers(videos);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    };

    fetchDetails();
  }, [selectedMovie]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Discover Movies</h2>
          <p className="text-lg opacity-90">
            Search for your favorite movies and watch trailers
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {error && <ErrorMessage message={error} />}

        {loading && <LoadingSpinner />}

        {!loading &&
          debouncedSearchQuery.trim() &&
          searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-2xl text-slate-600 dark:text-slate-400">
                No movies found. Try a different search.
              </p>
            </motion.div>
          )}

        {!loading &&
          debouncedSearchQuery.trim() &&
          searchResults.length > 0 && (
            <section id="search" className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Search Results
                  {getActiveFiltersCount() > 0 && (
                    <span className="ml-3 text-sm font-normal text-indigo-600 dark:text-indigo-400">
                      ({getActiveFiltersCount()} filter
                      {getActiveFiltersCount() !== 1 ? "s" : ""} active)
                    </span>
                  )}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {applyFilters(searchResults, filterState).length} results
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {applyFilters(searchResults, filterState).map(
                  (movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <MovieCard
                        movie={movie}
                        onClick={() => setSelectedMovie(movie)}
                      />
                    </motion.div>
                  ),
                )}
              </motion.div>
            </section>
          )}

        {!loading && !debouncedSearchQuery.trim() && (
          <div className="space-y-16">
            {/* Filter Button and Panel */}
            <div className="mb-8">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
                {getActiveFiltersCount() > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-white text-indigo-600 rounded-full text-xs font-semibold">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showFilters && (
                  <div className="mt-4">
                    <FilterPanel
                      filters={filterState}
                      onFilterChange={setFilterState}
                      onClose={() => setShowFilters(false)}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>

            <section
              id="trending"
              className="py-12 px-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Trending
                  {getActiveFiltersCount() > 0 && (
                    <span className="ml-3 text-sm font-normal text-indigo-600 dark:text-indigo-400">
                      ({getActiveFiltersCount()} filter
                      {getActiveFiltersCount() !== 1 ? "s" : ""} active)
                    </span>
                  )}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {applyFilters(trendingMovies, filterState).length} of{" "}
                  {trendingMovies.length}
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {applyFilters(trendingMovies, filterState).map(
                  (movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <MovieCard
                        movie={movie}
                        onClick={() => setSelectedMovie(movie)}
                      />
                    </motion.div>
                  ),
                )}
              </motion.div>
            </section>

            <section
              id="top-rated"
              className="mt-12 py-12 px-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Top Rated
                  {getActiveFiltersCount() > 0 && (
                    <span className="ml-3 text-sm font-normal text-indigo-600 dark:text-indigo-400">
                      ({getActiveFiltersCount()} filter
                      {getActiveFiltersCount() !== 1 ? "s" : ""} active)
                    </span>
                  )}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {applyFilters(topRatedMovies, filterState).length} of{" "}
                  {topRatedMovies.length}
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {applyFilters(topRatedMovies, filterState).map(
                  (movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <MovieCard
                        movie={movie}
                        onClick={() => setSelectedMovie(movie)}
                      />
                    </motion.div>
                  ),
                )}
              </motion.div>
            </section>

            <section
              id="upcoming"
              className="mt-12 py-12 px-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Upcoming
                  {getActiveFiltersCount() > 0 && (
                    <span className="ml-3 text-sm font-normal text-indigo-600 dark:text-indigo-400">
                      ({getActiveFiltersCount()} filter
                      {getActiveFiltersCount() !== 1 ? "s" : ""} active)
                    </span>
                  )}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {applyFilters(upcomingMovies, filterState).length} of{" "}
                  {upcomingMovies.length}
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {applyFilters(upcomingMovies, filterState).map(
                  (movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <MovieCard
                        movie={movie}
                        onClick={() => setSelectedMovie(movie)}
                      />
                    </motion.div>
                  ),
                )}
              </motion.div>
            </section>
          </div>
        )}
      </div>

      {/* Movie Modal */}
      <AnimatePresence>
        {selectedMovie && movieDetails && (
          <MovieModal
            movie={movieDetails}
            onClose={() => {
              setSelectedMovie(null);
              setMovieDetails(null);
              setTrailers([]);
            }}
            trailers={trailers}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
