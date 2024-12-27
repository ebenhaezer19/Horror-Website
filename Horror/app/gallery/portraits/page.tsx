'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const portraits = [
  {
    id: 1,
    title: "The Haunted Portrait",
    image: "/images/gallery/portraits/haunted-portrait-1.jpg",
    description: "A Victorian-era portrait with eyes that seem to follow you"
  },
  {
    id: 2,
    title: "Forgotten Memory",
    image: "/images/gallery/portraits/forgotten-memory.jpg",
    description: "A distorted face emerging from the shadows"
  },
  // Add more portraits here
];

export default function PortraitsGallery() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-red-600"
      >
        Haunted Portraits
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portraits.map((portrait) => (
          <motion.div
            key={portrait.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-900">
              <Image
                src={portrait.image}
                alt={portrait.title}
                width={400}
                height={400}
                className="object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{portrait.title}</h3>
                  <p className="text-sm text-gray-300">{portrait.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 