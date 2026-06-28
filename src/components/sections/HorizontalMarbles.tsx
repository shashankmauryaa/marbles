"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

import { collections } from "@/data/collections";

export default function HorizontalMarbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shakeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const lusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // Luster effect on load
      gsap.fromTo(lusterRef.current, 
        { xPercent: -50, yPercent: -50, opacity: 0 },
        { xPercent: 50, yPercent: 50, opacity: 0.6, duration: 2, ease: "power2.inOut", delay: 0.2 }
      );

      // --- SCROLL TIMELINE (HORIZONTAL GALLERY) ---
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Pin for 4 screen heights
          pin: true,
          scrub: 1,
        }
      });

      // PHASE 1: Massive Typography Scale (0% to 25% of the scroll)
      scrollTl.to(textRef.current, {
        scale: 80, // Scale up massively so the letters clear the screen
        opacity: 0, // Fade out at the very end to ensure a clean handoff
        ease: "power3.in",
        duration: 1,
      }, 0);

      // Fade in the first slide's text overlay as the scale finishes
      scrollTl.to(firstTextRef.current, {
        opacity: 1,
        ease: "power2.inOut",
        duration: 0.5,
      }, 0.7);

      // PHASE 2: Horizontal Scroll (25% to 100% of the scroll)
      scrollTl.to(scrollRef.current, {
        x: "-75%", // Shift by 75% of 400% width = 300% (3 slides)
        ease: "none",
        duration: 3,
      }, 1);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative w-full h-screen bg-stone-950 overflow-hidden text-stone-50">
      
      <div className="w-full h-full relative">
        
        {/* BACKGROUND: HORIZONTAL SCROLL GALLERY */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div ref={scrollRef} className="flex h-full w-[400%]">
            {collections.map((item, idx) => (
              <div key={idx} className="w-[25%] h-full relative flex-shrink-0 flex items-center justify-center">
                
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-black/30" />

                  {/* LUSTER PASS (Only on the first image, the white marble) */}
                  {idx === 0 && (
                    <div 
                      ref={lusterRef}
                      className="absolute z-20 pointer-events-none opacity-0 mix-blend-overlay"
                      style={{
                        background: "linear-gradient(135deg, transparent 35%, rgba(255,255,255,1) 50%, transparent 65%)",
                        width: "300%",
                        height: "300%",
                        top: "-100%",
                        left: "-100%"
                      }}
                    />
                  )}
                </div>
                
                {/* Content Overlay */}
                <div 
                  className="relative z-30 text-center text-white p-8"
                  ref={idx === 0 ? firstTextRef : null}
                  style={{ opacity: idx === 0 ? 0 : 1 }}
                >
                  <h2 className="text-sm font-sans tracking-[0.2em] uppercase mb-4 opacity-80">Collection 0{idx + 1}</h2>
                  <h3 className="text-6xl md:text-8xl font-serif mb-6 drop-shadow-lg">{item.name}</h3>
                  <p className="text-xl md:text-2xl font-sans font-light italic max-w-xl mx-auto opacity-90 drop-shadow-md mb-8">
                    {item.desc}
                  </p>
                  <Link href={`/collections/${item.slug}`} className="inline-flex items-center gap-3 px-8 py-3 border border-white/30 text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-colors duration-300 backdrop-blur-sm">
                    More Details
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* FOREGROUND: MASSIVE TYPOGRAPHY (Scales up on scroll) */}
        <div 
          ref={textRef} 
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center z-10 pointer-events-none origin-center"
        >
          <h1 className="text-[14vw] md:text-[16vw] font-serif text-stone-900 leading-[0.8] tracking-tighter uppercase text-center flex flex-col items-center justify-center drop-shadow-2xl">
            <span>Crafting</span>
            <span className="italic text-stone-700 font-light">Marbles</span>
          </h1>
          <p className="text-xs md:text-sm text-stone-800 font-sans tracking-[0.3em] uppercase mt-12 font-semibold">
            The World&apos;s Finest Natural Marble
          </p>
        </div>

      </div>
    </section>
  );
}
