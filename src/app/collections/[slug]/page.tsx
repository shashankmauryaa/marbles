import { collections } from "@/data/collections";
import { notFound } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";

export function generateStaticParams() {
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      {/* Custom Detail Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-stone-950/40 backdrop-blur-lg border-b border-white/5">
        <BackButton />
        <div className="text-white font-serif text-xl tracking-widest uppercase">
          LuxeMarble
        </div>
        <div className="w-[70px]" /> {/* Spacer for flex balance */}
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-end pb-16 px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 z-0">
          <Image src={collection.image} alt={collection.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-serif mb-4 drop-shadow-lg">{collection.name}</h1>
          <p className="text-xl md:text-2xl font-sans font-light italic text-stone-300">
            {collection.desc}
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-sm font-sans tracking-widest text-stone-500 uppercase mb-8">The Story</h2>
          <p className="text-lg text-stone-300 font-sans font-light leading-relaxed">
            {collection.details}
          </p>
        </div>
        
        <div>
          <h2 className="text-sm font-sans tracking-widest text-stone-500 uppercase mb-8">Specifications</h2>
          <div className="flex flex-col gap-6">
            {collection.specifications.map((spec, i) => (
              <div key={i} className="flex justify-between items-end border-b border-stone-800 pb-2">
                <span className="font-sans text-stone-400 uppercase tracking-widest text-xs">{spec.label}</span>
                <span className="font-serif text-stone-100 text-lg text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
