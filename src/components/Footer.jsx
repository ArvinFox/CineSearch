import React from "react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-100 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-700 mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
              About CineSearch
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Discover movies, watch trailers, and explore the world of cinema
              with CineSearch. Powered by TMDB API.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#trending"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Trending
                </a>
              </li>
              <li>
                <a
                  href="#top-rated"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Top Rated
                </a>
              </li>
              <li>
                <a
                  href="#upcoming"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Upcoming
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-300 dark:border-slate-700 pt-6 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © 2026 CineSearch. Arvin Premathilake | Data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              TMDB
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};
