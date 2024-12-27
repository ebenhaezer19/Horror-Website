"use client";

import { motion } from "framer-motion";
import { FloatingGhost } from "./animations/FloatingGhost";
import { SpookyText } from "./animations/SpookyText";
import { CreepyBackground } from "./animations/CreepyBackground";

export function MainSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CreepyBackground />
      
      <div className="relative grid place-items-center gap-8 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <FloatingGhost />
          <motion.div
            className="absolute inset-0 bg-red-500/20 blur-3xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl">
            <SpookyText text="Welcome to the Darkness" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl"
          >
            Where nightmares come alive and shadows dance in eternal twilight
          </motion.p>
        </div>
      </div>
    </section>
  );
}