import React from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "../utils/tmdbApi";
import { useFavorites } from "../context/FavoritesContext";

export const MovieCard = ({ movie, onClick }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);
  const posterUrl = getImageUrl(movie.poster_path);
  const rating = movie.vote_average
    ? (movie.vote_average / 2).toFixed(1)
    : "N/A";

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg h-80">
        {/* Heart Button */}
        <motion.button
          onClick={handleFavoriteClick}
          animate={{ scale: favorited ? 1.2 : 1 }}
          whileHover={{ scale: favorited ? 1.3 : 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 z-10 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <span className="text-2xl">{favorited ? "❤️" : "🤍"}</span>
        </motion.button>

        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-yellow-400 font-semibold">⭐ {rating}/5</span>
            <span className="text-slate-300 text-sm">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </div>
      </div>

      {/* Title below card */}
      <h3 className="mt-2 font-semibold text-slate-900 dark:text-white line-clamp-2 text-sm">
        {movie.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {new Date(movie.release_date).getFullYear()}
      </p>
    </motion.div>
  );
};
