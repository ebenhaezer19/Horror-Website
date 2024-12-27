'use client';

import { Artwork } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface GallerySectionProps {
  artworks: Artwork[];
}

export function GallerySection({ artworks }: GallerySectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-red-600"
        >
          Featured Artworks
        </motion.h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid mb-4"
            >
              {artwork.link ? (
                <Link href={artwork.link} className="block">
                  <ArtworkCard artwork={artwork} />
                </Link>
              ) : (
                <ArtworkCard artwork={artwork} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-900 transform transition-all duration-500 hover:scale-[1.02] group">
      <div className={`relative ${
        artwork.title === "The Messiah Will Come" ? "pt-[100%]" :
        artwork.title === "Echoes of Fear" ? "pt-[75%]" :
        artwork.title === "Whispers in Shadow" ? "pt-[133%]" :
        artwork.title === "No way home" ? "pt-[90%]" :
        artwork.title === "Eternal Darkness" ? "pt-[120%]" :
        "pt-[100%]"
      }`}>
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          className="object-cover transform transition-all duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300">
        <div className="absolute bottom-0 p-6 w-full">
          <h3 className="text-xl font-bold text-white mb-2">{artwork.title}</h3>
          <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {artwork.description}
          </p>
          {artwork.link && (
            <p className="mt-4 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click to explore more →
            </p>
          )}
        </div>
      </div>
    </div>
  );
}