"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after the user scrolls past the massive text scale (roughly 80vh)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out px-6 md:px-12 py-6 flex justify-between items-center bg-stone-950/40 backdrop-blur-lg border-b border-white/5 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div 
        className="text-white font-serif text-xl tracking-widest uppercase cursor-pointer" 
        onClick={() => scrollTo("home")}
      >
        LuxeMarble
      </div>
      <div className="hidden md:flex gap-8 text-white/70 font-sans text-xs tracking-[0.2em] uppercase">
        <button onClick={() => scrollTo("home")} className="hover:text-white transition-colors">Home</button>
        <button onClick={() => scrollTo("catalogues")} className="hover:text-white transition-colors">Catalogues</button>
        <button onClick={() => scrollTo("about")} className="hover:text-white transition-colors">About</button>
        <button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">Contact</button>
      </div>
    </nav>
  );
}
