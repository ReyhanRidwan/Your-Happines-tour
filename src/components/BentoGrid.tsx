import { motion } from 'motion/react';
import { Star, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';

interface BentoGridProps {
  onSelectDestination: (id: string) => void;
}

interface BentoItem {
  id: string;
  name: string;
  tag: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  gridClass: string;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 'nusa-penida',
    name: 'Nusa Penida Golden Beach',
    tag: 'EXPLORASI PREMIUM',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    reviews: 340,
    description: 'Petualangan eksklusif menyusuri tebing purba Kelingking Beach yang dramatis, berenang di antara penyu liar, dan menatap laut safir yang membentang luas.',
    gridClass: 'md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[500px]'
  },
  {
    id: 'nusa-dua',
    name: 'Nusa Dua Exclusive Beach',
    tag: 'ELITE RESORTS',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 180,
    description: 'Kawasan pantai pasir putih nan tenang yang dikelilingi oleh jajaran resort mewah bertaraf internasional.',
    gridClass: 'md:col-span-1 md:row-span-1 min-h-[220px]'
  },
  {
    id: 'bedugul-heritage',
    name: 'Bedugul Danau Beratan',
    tag: 'SACRED TEMPLES',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 220,
    description: 'Pura terapung legendaris berselimut kabut lembut di antara pegunungan sejuk yang asri.',
    gridClass: 'md:col-span-1 md:row-span-1 min-h-[220px]'
  },
  {
    id: 'handara-gate',
    name: 'Handara Iconic Gate',
    tag: 'PHOTO INSPIRED',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783239412/46590175-6096-4c5d-946c-9102764f4780.png',
    rating: 4.7,
    reviews: 295,
    description: 'Gerbang batu tradisional yang ikonik berbalut kabut magis pegunungan utara Bali yang menawan.',
    gridClass: 'md:col-span-1 md:row-span-2 min-h-[380px] md:min-h-[460px]'
  },
  {
    id: 'uluwatu-sunset',
    name: 'Uluwatu Sunset Temple',
    tag: 'ROMANTIC OCEAN CLIFF',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    reviews: 410,
    description: 'Pura yang bertengger gagah di ujung tebing karang setinggi 97 meter berlatar gemuruh ombak Samudra Hindia.',
    gridClass: 'md:col-span-2 md:row-span-1 min-h-[220px]'
  },
  {
    id: 'gwk-cultural',
    name: 'GWK Cultural Park',
    tag: 'MAJESTIC MONUMENT',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783239446/a455d443-e832-40a7-99a1-2caf09c73875.png',
    rating: 4.8,
    reviews: 310,
    description: 'Berdiri megah menghadap cakrawala, mahakarya patung Garuda Wisnu Kencana setinggi 121 meter lambang kejayaan seni rupa Bali.',
    gridClass: 'md:col-span-2 md:row-span-1 min-h-[220px]'
  }
];

export default function BentoGrid({ onSelectDestination }: BentoGridProps) {
  return (
    <section className="py-20 bg-stone-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="destinations-bento">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-amber-600 font-mono text-xs tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Destinasi Premium Terpilih</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Pesona Eksotis Pulau Dewata
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
          <p className="text-stone-600 text-sm md:text-base font-sans leading-relaxed">
            Dari kemegahan pura sakral hingga tebing pantai eksotis, Your Happiness Tours mengurasi destinasi terbaik Bali dengan fasilitas privat yang mewah demi kenyamanan perjalanan impian Anda.
          </p>
        </div>

        {/* 100% Packed Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-auto" id="bento-container">
          {BENTO_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              onClick={() => onSelectDestination(item.id)}
              className={`group relative overflow-hidden rounded-2xl bg-stone-900 shadow-lg border border-stone-200/50 cursor-pointer ${item.gridClass}`}
              id={`bento-item-${item.id}`}
            >
              {/* Background Destination Image with Hover Zoom */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/40 to-stone-950/30 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Accent Light Border Glow */}
              <div className="absolute inset-0 border border-amber-500/0 group-hover:border-amber-500/30 transition-all duration-300 rounded-2xl" />

              {/* Bento Content */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-10 text-white">
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <span className="bg-stone-950/80 backdrop-blur-md text-[10px] tracking-widest font-mono text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full uppercase">
                    {item.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-500 hover:text-stone-950">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title & Details */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-mono font-bold text-amber-300">{item.rating}</span>
                    <span className="text-[10px] text-stone-300">({item.reviews} ulasan)</span>
                  </div>

                  <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>

                  {/* Description reveals or expands on hover on large cards */}
                  <p className="text-stone-300 text-xs md:text-sm font-sans leading-relaxed line-clamp-2 md:line-clamp-3 transition-opacity duration-300">
                    {item.description}
                  </p>

                  <div className="flex items-center space-x-1.5 text-amber-400 text-xs pt-1.5 font-medium group-hover:underline">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Amankan Kursi Sekarang</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
