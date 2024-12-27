'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const silentScreamsGallery = [
  {
    id: 1,
    title: "Unspoken Terror",
    image: "/images/gallery/silent-screams/1.jpg",
    description: "The moment when fear paralyzes your vocal cords"
  },
  {
    id: 2,
    title: "Silent Screams",
    image: "/images/gallery/silent-screams/silent-screams.jpeg",
    description: "Screams that reverberate only in your mind"
  },
  {
    id: 3,
    title: "Muted Agony",
    image: "/images/gallery/silent-screams/2.jpeg",
    description: "When pain transcends sound itself"
  },
  {
    id: 4,
    title: "Soundless Horror",
    image: "/images/gallery/silent-screams/3.jpeg",
    description: "Terror needs no voice to be heard"
  },
  {
    id: 5,
    title: "The Last Door",
    image: "/images/gallery/silent-screams/4.jpeg",
    description: "You can't escape the screams"
  }
];

export default function SilentScreamsGallery() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto relative"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute left-4 top-0 z-10"
        >
          <Link href="/" className="group flex items-center text-gray-400 hover:text-red-500 transition-colors duration-300">
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: -4 }}
              className="inline-block mr-2"
            >
              ←
            </motion.span>
            <span className="text-sm group-hover:underline">Return to Sound</span>
          </Link>
        </motion.div>

        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-5xl font-bold text-red-600 mb-8 text-center"
        >
          Silent Screams Gallery
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          Where silence becomes the loudest form of horror. Each image captures a moment when terror transcends sound.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {silentScreamsGallery.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1200}
                  height={800}
                  className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-90 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-red-500 text-sm italic">
            "Sometimes the most terrifying screams are the ones that can't be heard..."
          </p>
        </motion.div>

        {/* Fixed Back Button at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <Link 
            href="/" 
            className="px-6 py-3 bg-black/80 border border-red-800 text-red-500 rounded-full hover:bg-red-900/20 transition-all duration-300 group flex items-center space-x-2"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>Break the Silence</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 