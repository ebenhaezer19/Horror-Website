"use client";

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-black py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm font-light tracking-wide">
            Crafted with passion by{' '}
            <span className="text-gray-400 font-medium">Krisopras Eben Haezer</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
} 