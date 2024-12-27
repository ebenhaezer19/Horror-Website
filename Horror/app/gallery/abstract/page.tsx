'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const abstracts = [
  {
    id: 1,
    title: "Void's Embrace",
    image: "/images/gallery/abstract/void-embrace.jpg",
    description: "Abstract representation of the infinite darkness"
  },
  {
    id: 2,
    title: "Fractured Reality",
    image: "/images/gallery/abstract/fractured-reality.jpg",
    description: "The moment sanity breaks into a thousand pieces"
  },
  // Add more abstract pieces here
];

export default function AbstractGallery() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-red-600"
      >
        Abstract Horrors
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {abstracts.map((abstract) => (
          <motion.div
            key={abstract.id}
            initial={{ opacity: 0, rotateY: 30 }}
            animate={{ opacity: 1, rotateY: 0 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              transition: { duration: 0.4 }
            }}
            className="relative group perspective"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-900 transform-gpu transition-all duration-500">
              <Image
                src={abstract.image}
                alt={abstract.title}
                width={400}
                height={400}
                className="object-cover object-center transform transition-all duration-500 group-hover:scale-110 filter saturate-50 group-hover:saturate-100"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                <motion.div 
                  className="absolute bottom-0 p-4 transform"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2 text-shadow-lg">{abstract.title}</h3>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-shadow">
                    {abstract.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 