"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  { text: "The quality of marble and the attention to detail in the finishing is unmatched. It transformed our lobby into a true work of art.", author: "Elena Rostova", role: "Lead Architect" },
  { text: "Sustainable practices paired with breathtaking natural stone. They are our go-to partner for all luxury residential projects.", author: "David Chen", role: "Interior Designer" },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonial-card", 
        { y: 60, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
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
    <section ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-stone-100 relative z-10 border-y border-stone-200 bg-[url('https://images.unsplash.com/photo-1557992260-ec58e38d363c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-stone-100/80 backdrop-blur-sm" />
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-sm font-sans tracking-widest text-stone-600 uppercase text-center mb-16">Client Voices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="testimonial-card glass p-10 flex flex-col justify-between min-h-[300px]">
              <p className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed italic mb-8">
                "{item.text}"
              </p>
              <div>
                <div className="font-sans font-medium text-stone-900">{item.author}</div>
                <div className="font-sans text-sm text-stone-600">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
