"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const collections = [
  { name: "White Marble", image: "https://images.unsplash.com/photo-1620023405367-4e92eb49ebde?q=80&w=800&auto=format&fit=crop", desc: "Pure, luminous, timeless." },
  { name: "Black Marble", image: "https://images.unsplash.com/photo-1600172454520-134a542a2255?q=80&w=800&auto=format&fit=crop", desc: "Bold, dramatic, elegant." },
  { name: "Green Marble", image: "https://images.unsplash.com/photo-1616850406836-e0ce1d4512cb?q=80&w=800&auto=format&fit=crop", desc: "Vibrant, natural, exquisite." },
  { name: "Onyx", image: "https://images.unsplash.com/photo-1596700683070-5ce83a45c361?q=80&w=800&auto=format&fit=crop", desc: "Translucent, luxurious, rare." },
];

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".collection-card", 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1, 
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-sans tracking-widest text-stone-500 uppercase mb-4">Curated Selection</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-stone-900">Marble Collections</h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors font-sans pb-2 border-b border-stone-300 hover:border-stone-900">
            View All Materials <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((item, idx) => (
            <div key={idx} className="collection-card group relative cursor-pointer overflow-hidden aspect-[3/4] bg-stone-200">
              <Image 
                src={item.image} 
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <h4 className="text-2xl font-serif mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.name}</h4>
                <p className="font-sans text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
