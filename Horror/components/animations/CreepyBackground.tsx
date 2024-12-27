"use client";

import { motion } from "framer-motion";

export function CreepyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-radial from-red-950/20 via-black to-black"
      />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
    </div>
  );
}