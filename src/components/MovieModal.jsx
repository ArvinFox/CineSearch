import React from "react";
import { motion } from "framer-motion";

export const MovieModal = ({ movie, onClose, trailers }) => {
  const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  const rating = movie.vote_average
    ? (movie.vote_average / 2).toFixed(1)
    : "N/A";
  const trailer = trailers?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center z-10"
        >
          ✕
        </motion.button>

        {/* Backdrop */}
        <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-900"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {movie.title}
          </h2>

          <div className="flex gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
            <span>⭐ {rating}/5</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            {movie.runtime && <span>⏱️ {movie.runtime} min</span>}
          </div>

          {movie.genres && (
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-xs font-semibold"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Synopsis
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            {movie.overview}
          </p>

          {/* Trailer */}
          {trailer && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                🎬 Trailer
              </h3>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          )}

          {/* Cast */}
          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                👥 Cast
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.credits.cast.slice(0, 8).map((actor) => (
                  <div key={actor.id} className="text-center">
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 mb-2">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {actor.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
