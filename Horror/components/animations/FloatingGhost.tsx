"use client";

import { motion } from "framer-motion";
import { Ghost } from "lucide-react";

export function FloatingGhost() {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="text-gray-400/40"
    >
      <Ghost className="w-16 h-16" />
    </motion.div>
  );
}