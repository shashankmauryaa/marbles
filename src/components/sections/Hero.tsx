"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-elem", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pointer-events-none">
      {/* Container is pointer-events-none to let scroll pass to canvas if needed, but buttons need pointer events */}
      <div ref={containerRef} className="z-10 mt-20 max-w-4xl mx-auto pointer-events-auto">
        <h1 className="hero-elem text-5xl md:text-7xl lg:text-8xl font-serif text-stone-800 leading-[1.1] tracking-tight mb-6">
          Vietnam's Finest <br/>
          <span className="text-stone-500 italic">Natural Marble</span>
        </h1>
        <p className="hero-elem text-lg md:text-xl text-stone-600 font-sans max-w-2xl mx-auto mb-10">
          Discover the pinnacle of craftsmanship and elegance. Sustainably sourced, meticulously finished, and designed for architectural masterpieces.
        </p>
        
        <div className="hero-elem flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative px-8 py-4 bg-stone-900 text-stone-50 font-sans tracking-wide overflow-hidden transition-colors hover:bg-stone-800">
            <span className="relative z-10 flex items-center gap-2">
              Explore Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="px-8 py-4 border border-stone-300 text-stone-900 font-sans tracking-wide hover:border-stone-900 transition-colors">
            Request Catalogue
          </button>
        </div>
      </div>
    </section>
  );
}
