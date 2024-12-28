"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/lib/types";
import { ImageLoader } from "./ui/ImageLoader";
import { ArtworkIcon } from "./icons/ArtworkIcon";

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const content = (
    <div className="relative group bg-gray-900 rounded-lg overflow-hidden h-[400px]">
      <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-300 group-hover:opacity-0" />
      
      <ImageLoader
        src={artwork.image}
        alt={artwork.title}
        width={400}
        height={500}
        className="object-cover w-full h-full transform transition-all duration-700 group-hover:scale-110"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 transition-opacity duration-300">
        <motion.div 
          initial={false}
          whileHover={{ scale: 1.1 }}
          className="self-end"
        >
          <ArtworkIcon name={artwork.iconName} className="w-8 h-8 text-red-500" />
        </motion.div>

        <div className="transform transition-all duration-300 group-hover:translate-y-0">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
            {artwork.title}
          </h3>
          <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            {artwork.description}
          </p>
          {artwork.link && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="inline-block mt-4 text-red-500 text-sm"
            >
              Explore Gallery →
            </motion.span>
          )}
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );

  if (artwork.link) {
    return (
      <Link href={artwork.link} className="block transform transition-all duration-300 hover:-translate-y-2">
        {content}
      </Link>
    );
  }

  return content;
}