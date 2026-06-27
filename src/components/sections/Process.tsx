"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  { title: "Quarry", desc: "Sustainable extraction from Vietnam's finest mountains." },
  { title: "Selection", desc: "Rigorous quality control and pattern matching." },
  { title: "Cutting", desc: "Precision diamond-wire cutting for perfect slabs." },
  { title: "Finishing", desc: "Polishing to achieve our signature glossy reflection." },
  { title: "Inspection", desc: "Final quality assurance by master artisans." },
  { title: "Global Delivery", desc: "Securely transported to luxury projects worldwide." },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const amountToScroll = scrollWidth - window.innerWidth + 200; // extra padding
      
      if (amountToScroll > 0) {
        gsap.to(scrollRef.current, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${amountToScroll}`,
            pin: true,
            scrub: 1,
          }
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-stone-50 overflow-hidden relative z-10 flex flex-col justify-center border-t border-stone-200">
      <div className="absolute top-24 left-12 md:left-24">
        <h2 className="text-sm font-sans tracking-widest text-stone-500 uppercase mb-4">Our Process</h2>
        <h3 className="text-4xl font-serif text-stone-900">From Mountain to Masterpiece</h3>
      </div>
      
      <div ref={scrollRef} className="flex gap-16 px-12 md:px-24 pt-32 w-max">
        {steps.map((step, idx) => (
          <div key={idx} className="w-[300px] md:w-[400px] flex flex-col gap-6">
            <div className="text-6xl font-serif text-stone-300">0{idx + 1}</div>
            <div className="h-[1px] w-full bg-stone-300 relative">
              <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-stone-900 -translate-y-1/2" />
            </div>
            <h4 className="text-2xl font-serif text-stone-900">{step.title}</h4>
            <p className="text-stone-600 font-sans leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
