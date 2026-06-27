"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const imagesRow1 = [
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop",
];

const imagesRow2 = [
  "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617806118233-18e1c0b1bbd4?q=80&w=800&auto=format&fit=crop",
];

export default function InfiniteGallery() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (row1Ref.current && row2Ref.current) {
      // Create seamless loop animations
      gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
      
      gsap.set(row2Ref.current, { xPercent: -50 });
      gsap.to(row2Ref.current, {
        xPercent: 0,
        ease: "none",
        duration: 35,
        repeat: -1,
      });
    }
  }, []);

  return (
    <section className="py-24 bg-stone-100 overflow-hidden relative z-10 border-y border-stone-200">
      <div className="mb-16 text-center">
        <h2 className="text-sm font-sans tracking-widest text-stone-500 uppercase mb-4">Exhibition</h2>
        <h3 className="text-4xl font-serif text-stone-900">Luxury in Application</h3>
      </div>
      
      <div className="flex flex-col gap-6">
        <div className="flex w-[250vw] md:w-[200vw]" ref={row1Ref}>
          {[...imagesRow1, ...imagesRow1].map((src, i) => (
            <div key={`r1-${i}`} className="w-[30vw] md:w-[25vw] h-[35vh] md:h-[40vh] relative flex-shrink-0 px-3 group">
              <Image src={src} alt="Marble Interior" fill className="object-cover rounded-sm transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>
        <div className="flex w-[250vw] md:w-[200vw]" ref={row2Ref}>
          {[...imagesRow2, ...imagesRow2].map((src, i) => (
            <div key={`r2-${i}`} className="w-[30vw] md:w-[25vw] h-[35vh] md:h-[40vh] relative flex-shrink-0 px-3 group">
              <Image src={src} alt="Marble Interior" fill className="object-cover rounded-sm transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
