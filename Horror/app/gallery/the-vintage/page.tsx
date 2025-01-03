'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { artworks } from '@/lib/data';
import { ImageLoader } from '@/components/ui/ImageLoader';

const TheVintageGallery = artworks.filter(art => art.category === 'the-vintage');

export default function TheVintagePage() {
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
            <span className="text-sm group-hover:underline">Escape the The Vintage</span>
          </Link>
        </motion.div>

        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-5xl font-bold text-red-600 mb-8 text-center"
        >
          The Vintage
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          A collection that explores the depths of horror and fear through haunting imagery and dark atmosphere.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TheVintageGallery.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-w-4 aspect-h-5 overflow-hidden rounded-lg bg-gray-900">
                <ImageLoader
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={1000}
                  className="object-cover transform transition-all duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-50"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {item.description}
                  </p>
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
            "Fear takes many forms, each more terrifying than the last..."
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
            className="px-6 py-3 bg-black/80 border border-red-800 text-red-500 rounded-full hover:bg-red-900/20 transition-all duration-300 group flex items-center space-x-2 backdrop-blur-sm"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>Return to Reality</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
