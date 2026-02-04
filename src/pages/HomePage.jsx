import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

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
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {searchResults.length} results
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {searchResults.map((movie, index) => (
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
                ))}
              </motion.div>
            </section>
          )}

        {!loading && !debouncedSearchQuery.trim() && (
          <div className="space-y-16">
            <section id="trending">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Trending
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Weekly highlights
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {trendingMovies.map((movie, index) => (
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
                ))}
              </motion.div>
            </section>

            <section id="top-rated">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Top Rated
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Critically acclaimed
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {topRatedMovies.map((movie, index) => (
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
                ))}
              </motion.div>
            </section>

            <section id="upcoming">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Upcoming
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Coming soon
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {upcomingMovies.map((movie, index) => (
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
                ))}
              </motion.div>
            </section>
          </div>
        )}
      </div>

      {/* Movie Modal */}
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
    </div>
  );
};
