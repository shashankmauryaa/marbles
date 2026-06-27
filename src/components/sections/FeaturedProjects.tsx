"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  { name: "The Emerald Villa", loc: "Hanoi", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop", span: "md:col-span-2 md:row-span-2" },
  { name: "Lumina Hotel", loc: "Da Nang", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
  { name: "Aura Residences", loc: "Ho Chi Minh City", image: "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?q=80&w=800&auto=format&fit=crop", span: "md:col-span-1 md:row-span-2" },
  { name: "Onyx Penthouse", loc: "Singapore", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-card", 
        { y: 50, opacity: 0, scale: 0.95 },
        { 
          y: 0, opacity: 1, scale: 1,
          duration: 1.2, 
          stagger: 0.15, 
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
    <section ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-sans tracking-widest text-stone-500 uppercase mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-stone-900">Featured Projects</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {projects.map((proj, idx) => (
            <div key={idx} className={`project-card group relative overflow-hidden cursor-pointer bg-stone-100 ${proj.span}`}>
              <Image 
                src={proj.image} 
                alt={proj.name} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="font-sans text-sm tracking-widest uppercase mb-2">{proj.loc}</div>
                <div className="text-3xl font-serif">{proj.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
