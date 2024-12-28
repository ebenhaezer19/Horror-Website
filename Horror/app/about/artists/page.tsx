"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const artists = [
  {
    name: "Krisopras Eben Haezer",
    role: "Frontend Developer",
    image: "/images/gallery/AKU.jpg",
    linkedin: "https://www.linkedin.com/in/krisopras-eben-haezer-a5961b276/",
    description: "Specializing in dark surrealism and psychological horror, Krisopras brings nightmares to life through his unique artistic vision."
  }
];

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-block mb-12 text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-16 text-center"
        >
          The Dark Artist
        </motion.h1>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 max-w-2xl w-full"
          >
            <div className="relative h-96">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
              <Image
                src={artists[0].image}
                alt={artists[0].name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-3">{artists[0].name}</h2>
              <p className="text-red-500 font-medium mb-6 text-xl">{artists[0].role}</p>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">{artists[0].description}</p>
              
              <a
                href={artists[0].linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 