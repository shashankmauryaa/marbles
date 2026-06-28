import HorizontalMarbles from "@/components/sections/HorizontalMarbles";
import InfiniteGallery from "@/components/sections/InfiniteGallery";
import Statistics from "@/components/sections/Statistics";
import Process from "@/components/sections/Process";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-stone-950">
      {/* Pinned sequence handling the hero and the image galleries */}
      <HorizontalMarbles />
      
      {/* Remaining sections */}
      <InfiniteGallery />
      <Statistics />
      <Process />
      <Footer />
    </main>
  );
}
