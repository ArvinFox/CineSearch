import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const FilterPanel = ({ onFilterChange, onClose }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearFrom, setYearFrom] = useState(1990);
  const [yearTo, setYearTo] = useState(new Date().getFullYear());
  const [ratingMin, setRatingMin] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
          params: { api_key: API_KEY },
        });
        setGenres(response.data.genres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) => {
      const newGenres = prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId];

      onFilterChange({
        genres: newGenres,
        yearFrom,
        yearTo,
        ratingMin,
      });

      return newGenres;
    });
  };

  const handleYearFromChange = (value) => {
    setYearFrom(value);
    onFilterChange({
      genres: selectedGenres,
      yearFrom: value,
      yearTo,
      ratingMin,
    });
  };

  const handleYearToChange = (value) => {
    setYearTo(value);
    onFilterChange({
      genres: selectedGenres,
      yearFrom,
      yearTo: value,
      ratingMin,
    });
  };

  const handleRatingChange = (value) => {
    setRatingMin(value);
    onFilterChange({
      genres: selectedGenres,
      yearFrom,
      yearTo,
      ratingMin: value,
    });
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setYearFrom(1990);
    setYearTo(new Date().getFullYear());
    setRatingMin(0);
    onFilterChange({
      genres: [],
      yearFrom: 1990,
      yearTo: new Date().getFullYear(),
      ratingMin: 0,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-8 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Filters
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClearFilters}
          className="text-sm px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Clear All
        </motion.button>
      </div>

      {/* Genres */}
      <div className="mb-8">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
          Genres
        </h4>
        {loading ? (
          <p className="text-slate-500">Loading genres...</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <motion.button
                key={genre.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGenreToggle(genre.id)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                  selectedGenres.includes(genre.id)
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                {genre.name}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Year Range */}
      <div className="mb-8">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
          Release Year
        </h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-400">
              From: {yearFrom}
            </label>
            <input
              type="range"
              min="1950"
              max={new Date().getFullYear()}
              value={yearFrom}
              onChange={(e) => handleYearFromChange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-400">
              To: {yearTo}
            </label>
            <input
              type="range"
              min="1950"
              max={new Date().getFullYear()}
              value={yearTo}
              onChange={(e) => handleYearToChange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
          Minimum Rating
        </h4>
        <div>
          <label className="text-sm text-slate-600 dark:text-slate-400">
            {(ratingMin / 2).toFixed(1)}/5.0 ⭐
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={ratingMin}
            onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </motion.div>
  );
};
