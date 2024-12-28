"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-block mb-8 text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f4e4bc] p-8 md:p-12 rounded shadow-2xl transform rotate-[-0.5deg]"
          style={{
            backgroundImage: "url('/textures/paper.png')",
            boxShadow: "0 0 50px rgba(0,0,0,0.5)"
          }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 font-bold">
            Our Dark Tale
          </h1>
          
          <div className="prose prose-lg text-gray-800 space-y-6">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
              In the depths of human consciousness lies a realm unexplored, where shadows dance and whispers echo through the corridors of our deepest fears. This is where our story begins.
            </p>
            
            <p>
              Founded in the twilight hours of a stormy night, our gallery emerged from a collective vision to explore the darker aspects of human creativity. We believe that in darkness, we find truth - in fear, we find strength.
            </p>
            
            <p>
              Each piece in our collection tells a story, a fragment of the human psyche captured in moments of raw emotion and primal fear. Through our curated exhibitions, we invite you to journey with us into the abyss, where art transcends the ordinary and touches the extraordinary.
            </p>
            
            <blockquote className="border-l-4 border-gray-900 pl-4 italic">
              "In the heart of darkness, we found our light - a beacon for those who dare to explore the shadows of creativity."
            </blockquote>
            
            <p>
              Today, we continue our mission to push the boundaries of horror art, creating a space where artists can express their darkest visions and viewers can confront their deepest fears. Join us in this eternal dance with darkness.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 