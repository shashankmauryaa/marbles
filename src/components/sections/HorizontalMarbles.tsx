"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const collections = [
  { name: "White Marble", image: "/images/white.png", desc: "Pure, luminous, timeless." },
  { name: "Black Marble", image: "/images/black.png", desc: "Bold, dramatic, elegant." },
  { name: "Green Marble", image: "/images/green.png", desc: "Vibrant, natural, exquisite." },
  { name: "Onyx", image: "/images/onyx.png", desc: "Translucent, luxurious, rare." },
];

export default function HorizontalMarbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create a master timeline that spans the pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Pin for 4 screen heights
          pin: true,
          scrub: 1,
        }
      });

      // PHASE 1: Pill Expansion (0% to 25% of the scroll)
      tl.to(maskRef.current, {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "power2.inOut",
        duration: 1,
      }, 0);

      // Parallax hero text away
      tl.to(textRef.current, {
        y: -150,
        opacity: 0,
        ease: "power1.in",
        duration: 0.8,
      }, 0);

      // PHASE 2: Horizontal Scroll (25% to 100% of the scroll)
      // We have 4 slides. Slide 1 is already visible. We need to shift by -300vw to show the other 3.
      tl.to(scrollRef.current, {
        x: "-75%", // since scrollRef is 400vw wide, shifting by -75% moves it exactly 300vw
        ease: "none",
        duration: 3, // Takes 3 times as long as phase 1
      }, 1);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-screen h-screen bg-stone-50 overflow-hidden text-stone-900">
      
      {/* BACKGROUND TEXT (Parallaxes away) */}
      <div ref={textRef} className="absolute inset-0 w-full h-full flex flex-col justify-between items-center z-0">
        <div className="h-[35vh] w-full flex items-end justify-center pb-4 md:pb-8">
          <h1 className="text-[12vw] md:text-[14vw] font-serif text-stone-800 leading-none tracking-tighter uppercase">
            Building
          </h1>
        </div>
        <div className="h-[35vh] w-full flex flex-col items-center justify-start pt-4 md:pt-8">
          <h1 className="text-[12vw] md:text-[14vw] font-serif italic text-stone-400 font-light leading-none tracking-tighter uppercase">
            That Work
          </h1>
          <p className="text-xs md:text-sm text-stone-500 font-sans tracking-[0.2em] uppercase mt-4 md:mt-8">
            Vietnam&apos;s Finest Natural Marble
          </p>
        </div>
      </div>

      {/* FOREGROUND MASK (Starts as pill, expands to full screen) */}
      <div 
        ref={maskRef}
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ clipPath: "inset(35% 20% 35% 20% round 200px)" }}
      >
        {/* HORIZONTAL SCROLL CONTAINER */}
        <div ref={scrollRef} className="flex h-full w-[400vw]">
          {collections.map((item, idx) => (
            <div key={idx} className="w-screen h-full relative flex-shrink-0 flex items-center justify-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/40" />
              </div>
              
              {/* Content Overlay */}
              <div className="relative z-10 text-center text-white p-8">
                <h2 className="text-sm font-sans tracking-[0.2em] uppercase mb-4 opacity-80">Collection 0{idx + 1}</h2>
                <h3 className="text-6xl md:text-8xl font-serif mb-6 drop-shadow-lg">{item.name}</h3>
                <p className="text-xl md:text-2xl font-sans font-light italic max-w-xl mx-auto opacity-90 drop-shadow-md">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
