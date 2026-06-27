import Scene from "@/components/canvas/Scene";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Collections from "@/components/sections/Collections";
import InfiniteGallery from "@/components/sections/InfiniteGallery";
import Statistics from "@/components/sections/Statistics";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      <Scene />
      
      {/* Page Content Layers over the Scene */}
      <Hero />
      <About />
      <Collections />
      <InfiniteGallery />
      <Statistics />
      <FeaturedProjects />
      <Process />
      <Testimonials />
      <Footer />
    </main>
  );
}
