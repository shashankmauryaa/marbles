"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-sans"
    >
      <ArrowLeft size={16} /> Back
    </button>
  );
}
