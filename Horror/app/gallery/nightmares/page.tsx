'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const nightmares = [
  {
    id: 1,
    title: "The Dark Corridor",
    image: "/images/gallery/nightmares/dark-corridor.jpg",
    description: "An endless hallway where shadows come alive"
  },
  {
    id: 2,
    title: "Sleep Paralysis",
    image: "/images/gallery/nightmares/sleep-paralysis.jpg",
    description: "The demon that visits in the darkest hours"
  },
  // Add more nightmares here
];

export default function NightmaresGallery() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-red-600"
      >
        Living Nightmares
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nightmares.map((nightmare) => (
          <motion.div
            key={nightmare.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ 
              scale: 1.05,
              filter: "brightness(1.2)",
            }}
            className="relative group"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-900">
              <Image
                src={nightmare.image}
                alt={nightmare.title}
                width={400}
                height={400}
                className="object-cover object-center transform transition-all duration-500 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{nightmare.title}</h3>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {nightmare.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 