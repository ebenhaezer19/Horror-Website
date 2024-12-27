import { MainSection } from "@/components/MainSection";
import { GallerySection } from "@/components/GallerySection";
import { FeedbackForm } from "@/components/FeedbackForm";
import { artworks } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <MainSection />
      <GallerySection artworks={artworks} />
      <FeedbackForm />
    </main>
  );
}