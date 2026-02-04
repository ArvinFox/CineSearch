import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";
import { MovieCard } from "../components/MovieCard";
import { MovieModal } from "../components/MovieModal";
import { getMovieDetails, getMovieVideos } from "../utils/tmdbApi";
import { useState, useEffect } from "react";

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedMovie) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const details = await getMovieDetails(selectedMovie.id);
        setMovieDetails(details);

        const videos = await getMovieVideos(selectedMovie.id);
        setTrailers(videos);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setLoading(false);
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
        className="bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-900 dark:to-rose-900 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">❤️ My Favorites</h2>
          <p className="text-lg opacity-90">
            {favorites.length} {favorites.length === 1 ? "movie" : "movies"}{" "}
            saved
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-3xl mb-4">📭</p>
            <p className="text-2xl text-slate-600 dark:text-slate-400 mb-6">
              No favorite movies yet!
            </p>
            <p className="text-slate-500 dark:text-slate-500">
              Click the heart icon on movie cards to add them to your favorites.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {favorites.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />
              </motion.div>
            ))}
          </motion.div>
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
