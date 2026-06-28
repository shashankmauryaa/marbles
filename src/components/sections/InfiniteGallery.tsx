"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const exhibitApplications = [
  {
    name: "Indian Traditional Home",
    slug: "indian-home-white",
    image: "/marbles/images/exhibits/indian_home_white.png",
  },
  {
    name: "Corporate Lobby",
    slug: "corporate-lobby-black",
    image: "/marbles/images/exhibits/indian_office_black.png",
  },
  {
    name: "Haveli Courtyard",
    slug: "haveli-courtyard-onyx",
    image: "/marbles/images/exhibits/indian_courtyard_onyx.png",
  },
  {
    name: "Mumbai Penthouse",
    slug: "mumbai-penthouse-green",
    image: "/marbles/images/exhibits/indian_penthouse_green.png",
  },
  {
    name: "White Temple Carvings",
    slug: "indian-temple-white",
    image: "/marbles/images/exhibits/indian_temple_white.png",
  },
  {
    name: "Fine Dining Restaurant",
    slug: "indian-restaurant-green",
    image: "/marbles/images/exhibits/indian_restaurant_green.png",
  },
  {
    name: "Luxury Master Bath",
    slug: "indian-bathroom-onyx",
    image: "/marbles/images/exhibits/indian_bathroom_onyx.png",
  },
  {
    name: "Heritage Hotel Lobby",
    slug: "indian-hotel-black",
    image: "/marbles/images/exhibits/indian_hotel_black.png",
  },
];

// Duplicate the array once to create a seamless infinite loop
const galleryItems = [...exhibitApplications, ...exhibitApplications];

export default function InfiniteGallery() {
  const rowRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
    <>
      <section id="exhibition" className="py-24 bg-transparent overflow-hidden relative z-20 min-h-screen flex flex-col justify-center">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-sans tracking-widest text-stone-500 uppercase mb-4">Exhibition</h2>
          <h3 className="text-4xl font-serif text-stone-50">Luxury in Application</h3>
        </div>
        
        <div 
          className="flex w-max" 
          ref={rowRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {[...galleryItems, ...galleryItems].map((item, i) => (
            <button 
              key={`gallery-item-${i}`} 
              className="w-[30vw] md:w-[25vw] h-[35vh] md:h-[40vh] relative flex-shrink-0 px-3 group cursor-pointer block text-left border-none focus:outline-none bg-transparent"
              onPointerDown={(e) => {
                e.preventDefault(); // Prevents drag-cancel
                setSelectedIndex(exhibitApplications.findIndex(c => c.slug === item.slug));
              }}
            >
              <Image src={item.image} alt={item.name} fill className="object-cover rounded-sm transition-transform duration-700 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Dialog */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[9999] bg-stone-950/95 backdrop-blur-md"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 md:top-12 md:right-12 text-white/70 hover:text-white transition-colors p-4 z-[10000]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
          >
            <X size={32} strokeWidth={1} />
          </button>
          
          {/* Prev Button */}
          <button 
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-[10000]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex - 1 + exhibitApplications.length) % exhibitApplications.length);
            }}
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>

          {/* Next Button */}
          <button 
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-[10000]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % exhibitApplications.length);
            }}
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>

          <div 
            className="absolute inset-0 m-auto w-[90vw] max-w-5xl h-[80vh] pointer-events-none"
          >
            <Image 
              src={exhibitApplications[selectedIndex].image} 
              alt={exhibitApplications[selectedIndex].name} 
              fill 
              className="object-contain" 
            />
          </div>
        </div>
      )}
    </>
  );
}
