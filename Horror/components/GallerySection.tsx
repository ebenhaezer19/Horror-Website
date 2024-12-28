'use client';

import { motion } from 'framer-motion';
import { ArtworkCard } from './ArtworkCard';
import { Artwork } from '@/lib/types';

interface GallerySectionProps {
  artworks: Artwork[];
}

export function GallerySection({ artworks }: GallerySectionProps) {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
            Gallery of Horrors
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our collection of nightmarish artworks that delve into the depths of human fear and imagination.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ArtworkCard artwork={artwork} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-red-500 text-sm italic">
            "Every piece tells a story of terror, every shadow hides a nightmare..."
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-900/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-900/10 rounded-full filter blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}