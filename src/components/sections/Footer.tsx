import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 bg-stone-950 text-stone-400 font-sans py-32 px-6 md:px-12 lg:px-24 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-serif text-stone-50 mb-8 leading-tight">Ready to start your next masterpiece?</h2>
            <p className="text-xl mb-12 text-stone-300">Reach out to our specialists to request a catalogue or discuss a custom project.</p>
            <button className="group relative px-8 py-4 bg-stone-50 text-stone-900 font-sans tracking-wide overflow-hidden transition-colors hover:bg-stone-300">
              <span className="relative z-10 flex items-center gap-2">
                Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
          
          <div className="flex flex-col gap-8 md:text-right">
            <div>
              <div className="text-stone-50 font-medium mb-2 uppercase tracking-widest text-sm">Headquarters</div>
              <p>123 Marble Way<br/>Global Headquarters</p>
            </div>
            <div>
              <div className="text-stone-50 font-medium mb-2 uppercase tracking-widest text-sm">Contact</div>
              <p>info@luxemarble.com<br/>+1 123 456 789</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div>© 2026 Luxe Natural Marble. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-50 transition-colors">Instagram</a>
            <a href="#" className="hover:text-stone-50 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-stone-50 transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
