"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-elem", 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-stone-50/50 pointer-events-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pointer-events-auto">
        <div>
           {/* Space reserved for 3D object to float in */}
           <div className="h-64 lg:h-[500px] w-full" />
        </div>
        <div className="space-y-8">
          <h2 className="about-elem text-sm font-sans tracking-widest text-stone-500 uppercase">Our Legacy</h2>
          <h3 className="about-elem text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
            Decades of expertise in precision finishing and sustainable sourcing.
          </h3>
          <p className="about-elem text-lg text-stone-600 font-sans leading-relaxed">
            Every slab of marble tells a story millions of years in the making. Our master artisans carefully extract and refine these natural wonders from Vietnam's most prestigious quarries, ensuring the highest standards of quality and environmental responsibility.
          </p>
          <p className="about-elem text-lg text-stone-600 font-sans leading-relaxed">
            From raw extraction to the final polish, our process is a harmonious blend of traditional craftsmanship and cutting-edge technology, resulting in surfaces that redefine luxury.
          </p>
        </div>
      </div>
    </section>
  );
}
