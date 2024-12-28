"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const philosophies = [
  {
    title: "Embracing Darkness",
    description: "We believe that darkness is not merely the absence of light, but a canvas for the extraordinary. In shadows, we find the truths that daylight obscures."
  },
  {
    title: "Fear as Art",
    description: "Fear is the most primal of human emotions. Through art, we transform this instinctive response into a medium of expression and understanding."
  },
  {
    title: "Beyond Reality",
    description: "Our work pushes the boundaries between the real and surreal, creating experiences that challenge perception and expand consciousness."
  }
];

export default function PhilosophyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[url('/textures/noise.png')] opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link 
          href="/"
          className="inline-block mb-16 text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-32"
        >
          <div className="text-center mb-32">
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-8"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
                y: useTransform(scrollYProgress, [0, 0.2], [0, -50])
              }}
            >
              Our Philosophy
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
                y: useTransform(scrollYProgress, [0, 0.2], [0, 50])
              }}
            >
              The principles that guide our artistic vision and shape our understanding of horror.
            </motion.p>
          </div>

          {philosophies.map((philosophy, index) => (
            <motion.div
              key={philosophy.title}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute -left-4 top-0 w-px h-full bg-red-800/30" />
              <h2 className="text-4xl font-bold mb-6 text-red-500">
                {philosophy.title}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                {philosophy.description}
              </p>
            </motion.div>
          ))}

          <motion.div
            className="text-center pt-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <blockquote className="text-2xl italic text-gray-400">
              "Through darkness, we find enlightenment. Through fear, we find strength."
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 