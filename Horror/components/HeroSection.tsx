"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onToggleAudio: () => void;
  isAudioPlaying: boolean;
}

export function HeroSection({ onToggleAudio, isAudioPlaying }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-20"
      >
        <h1 className="text-6xl font-bold mb-4 font-serif">Psychological Horror</h1>
        <p className="text-xl text-gray-400 mb-8">Exploring the depths of human consciousness</p>
        <Button 
          variant="outline" 
          onClick={onToggleAudio}
          className="border-red-900 hover:bg-red-900/20"
        >
          {isAudioPlaying ? 'Silence the Whispers' : 'Hear the Whispers'}
        </Button>
      </motion.div>
    </section>
  );
}