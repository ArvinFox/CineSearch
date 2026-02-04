import React from "react";
import { motion } from "framer-motion";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-slate-300 dark:border-slate-600 border-t-indigo-500 rounded-full"
      ></motion.div>
    </div>
  );
};

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-100 dark:bg-red-900 border-2 border-red-300 dark:border-red-700 rounded-lg p-6 text-center"
    >
      <p className="text-red-700 dark:text-red-200 font-semibold mb-4">
        ❌ {message}
      </p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};
