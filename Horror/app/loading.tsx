'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.5, 1, 0.5],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <div className="w-24 h-24 border-4 border-red-600 rounded-full animate-pulse">
          <motion.div 
            animate={{ 
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 border-t-4 border-red-800 rounded-full"
          />
        </div>
        <motion.div
          animate={{
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-4 text-center text-red-600 font-horror text-xl"
        >
          Loading Nightmares...
        </motion.div>
      </motion.div>
    </div>
  );
} 