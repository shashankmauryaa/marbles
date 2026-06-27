"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Update ScrollTrigger whenever Lenis scrolls
    // ReactLenis root option handles the main requestAnimationFrame setup
    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };
    
    // GSAP ScrollTrigger needs to know when scrolling happens if pinned etc.
    // Lenis is handling scroll natively (mostly), but registering tick helps.
    gsap.ticker.add(updateScrollTrigger);
    return () => {
      gsap.ticker.remove(updateScrollTrigger);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
