import { MainSection } from "@/components/MainSection";
import { GallerySection } from "@/components/GallerySection";
import { artworks } from "@/lib/data";

export default function Home() {
  return (
    <>
      <MainSection />
      <GallerySection artworks={artworks} />
    </>
  );
}