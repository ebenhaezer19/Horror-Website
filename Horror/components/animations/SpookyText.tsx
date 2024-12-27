"use client";

import { motion } from "framer-motion";

interface SpookyTextProps {
  text: string;
}

export function SpookyText({ text }: SpookyTextProps) {
  return (
    <div className="overflow-hidden">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block font-serif"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}