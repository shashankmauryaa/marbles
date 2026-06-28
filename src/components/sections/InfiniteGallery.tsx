"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const galleryImages = [
  "/images/white.png",
  "/images/black.png",
  "/images/green.png",
  "/images/onyx.png",
  "/images/white.png",
  "/images/black.png",
];

export default function InfiniteGallery() {
  const rowRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (rowRef.current) {
      // Create seamless loop animation
      tweenRef.current = gsap.to(rowRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    }
    
    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.play();

  return (
    <section id="catalogues" className="py-24 bg-transparent overflow-hidden relative z-20 min-h-screen flex flex-col justify-center">
      <div className="mb-16 text-center">
        <h2 className="text-sm font-sans tracking-widest text-stone-500 uppercase mb-4">Exhibition</h2>
        <h3 className="text-4xl font-serif text-stone-50">Luxury in Application</h3>
      </div>
      
      <div 
        className="flex w-[360vw] md:w-[300vw]" 
        ref={rowRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {[...galleryImages, ...galleryImages].map((src, i) => (
          <div key={`r1-${i}`} className="w-[30vw] md:w-[25vw] h-[35vh] md:h-[40vh] relative flex-shrink-0 px-3 group cursor-pointer">
            <Image src={src} alt="Marble Interior" fill className="object-cover rounded-sm transition-transform duration-700 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </section>
  );
}
