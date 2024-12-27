import { Artwork } from "@/lib/types";
import { ArtworkCard } from "@/components/ArtworkCard";

interface GallerySectionProps {
  artworks: Artwork[];
}

export function GallerySection({ artworks }: GallerySectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <h2 className="text-4xl font-serif mb-16 text-center">Dark Reflections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork, index) => (
          <ArtworkCard 
            key={artwork.title} 
            artwork={artwork} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
}