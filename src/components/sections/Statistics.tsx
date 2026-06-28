"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 45, label: "Years of Experience" },
  { value: 62, label: "Countries Exported To" },
  { value: 1200, label: "Completed Projects", suffix: "+" },
  { value: 85, label: "Marble Varieties" },
];

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = document.querySelectorAll('.stat-num');
      
      numbers.forEach((num) => {
        const endValue = parseFloat(num.getAttribute('data-val') || "0");
        gsap.fromTo(num, 
          { textContent: 0 },
          {
            textContent: endValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-transparent text-stone-50 relative z-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32 text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-8 uppercase tracking-tighter">Our Legacy</h2>
        <p className="text-lg md:text-xl font-sans font-light text-stone-400 max-w-3xl mx-auto leading-relaxed">
          For decades, we have been extracting the highest quality natural stone from the heart of the world's pristine mountains. 
          Our commitment to sustainable quarrying and masterful craftsmanship ensures that every slab we produce 
          is a unique work of art, destined to elevate the world&apos;s most prestigious architectural projects.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((s, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-5xl md:text-6xl font-serif mb-4 flex items-center">
              <span className="stat-num" data-val={s.value}>0</span>
              {s.suffix && <span>{s.suffix}</span>}
            </div>
            <div className="text-sm font-sans tracking-widest text-stone-400 uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
