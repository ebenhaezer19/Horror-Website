"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Artwork } from "@/lib/types";
import { ArtworkIcon } from "@/components/icons/ArtworkIcon";
import Image from "next/image";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

export function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <Card className="bg-gray-900/50 border-gray-800 overflow-hidden group">
        <div className="relative aspect-square overflow-hidden">
          <Image 
            src={artwork.image} 
            alt={artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArtworkIcon name={artwork.iconName} />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif mb-2">{artwork.title}</h3>
          <p className="text-gray-400">{artwork.description}</p>
        </div>
      </Card>
    </motion.div>
  );
}