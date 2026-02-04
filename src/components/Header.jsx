import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export const Header = ({ onSearch, searchQuery, setSearchQuery }) => {
  const { theme, setTheme } = useTheme();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  const themeOptions = [
    { id: "light", label: "Light Mode", icon: "☀️" },
    { id: "dark", label: "Dark Mode", icon: "🌙" },
    { id: "system", label: "System", icon: "💻" },
  ];

  const currentTheme = themeOptions.find((t) => t.id === theme);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
      },
    },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-50 dark:bg-slate-900 shadow-lg sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl">🎬</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              CineSearch
            </h1>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a
              href="#trending"
              className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Trending
            </a>
            <a
              href="#top-rated"
              className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Top Rated
            </a>
            <a
              href="#upcoming"
              className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Upcoming
            </a>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 min-w-[240px] max-w-md">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
              className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:dark:border-indigo-400 transition-all duration-300"
            />
          </div>

          {/* Theme Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors duration-300 flex items-center gap-2"
              title="Change theme"
            >
              <motion.span
                animate={{ rotate: isThemeDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl"
              >
                {currentTheme?.icon}
              </motion.span>
              <motion.span
                animate={{ rotate: isThemeDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg"
              >
                ▼
              </motion.span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isThemeDropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  {themeOptions.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setTheme(option.id);
                        setIsThemeDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                        theme === option.id
                          ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <span className="text-xl">{option.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-sm">
                          {option.label}
                        </div>
                      </div>
                      {theme === option.id && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="text-indigo-600 dark:text-indigo-400 text-lg"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
