import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Compass, ChevronRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExplorePackages: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1920',
    title: 'Eksplorasi Keindahan Surgawi Bali',
    subtitle: 'NUSA PENIDA EXOTIC ESCAPE',
    description: 'Rasakan petualangan tak terlupakan di tebing Kelingking yang megah, berenang di air laut kristal, dan nikmati layanan VIP privat bintang lima.'
  },
  {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1920',
    title: 'Keharmonisan Jiwa, Alam, & Budaya',
    subtitle: 'UBUD & KINTAMANI CULTURAL LUXURY',
    description: 'Temukan kedamaian di tengah sawah terasering yang hijau, saksikan warisan budaya leluhur, dan nikmati pemandangan kawah vulkanik yang menakjubkan.'
  },
  {
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1920',
    title: 'Momen Sunset Paling Romantis di Uluwatu',
    subtitle: 'ULUWATU TEBING & JIMBARAN DINNER',
    description: 'Saksikan kemegahan tarian Kecak berlatar samudra lepas saat matahari terbenam keemasan, disempurnakan dengan gala dinner hidangan laut segar di tepi pantai.'
  }
];

export default function Hero({ onOpenBooking, onExplorePackages }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero-section" className="relative h-screen min-h-[650px] w-full overflow-hidden bg-stone-950">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        {/* Cinematic Gradients and Darkness Filter */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-950/70 z-1" />
        <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-[1px] z-1" />
      </div>

      {/* Floating Sparkles & Light Accents */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-amber-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[30%] right-[10%] w-96 h-96 rounded-full bg-orange-500/5 blur-[150px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 mt-12">
          {/* Tagline / Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-stone-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-800 text-amber-400 text-xs font-mono tracking-[0.2em]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{HERO_SLIDES[currentSlide].subtitle}</span>
          </motion.div>

          {/* Majestic Serif Heading */}
          <div className="overflow-hidden min-h-[140px] md:min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none"
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtext */}
          <div className="overflow-hidden min-h-[60px] md:min-h-[80px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-stone-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-sans"
              >
                {HERO_SLIDES[currentSlide].description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-amber-500 text-stone-950 hover:bg-amber-600 px-8 py-4 rounded-full font-bold text-sm tracking-widest shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              id="hero-booking-btn"
            >
              <Calendar className="w-4 h-4" />
              <span>PESAN TIKET SEKARANG</span>
            </button>

            <button
              onClick={onExplorePackages}
              className="w-full sm:w-auto bg-stone-900/70 text-stone-100 hover:bg-stone-900 px-8 py-4 rounded-full font-medium text-sm tracking-widest border border-stone-800 hover:border-stone-700 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 backdrop-blur-md"
              id="hero-packages-btn"
            >
              <span>EKSPLOR LAYANAN</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-[80px] md:bottom-[120px] left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              currentSlide === idx ? 'w-8 bg-amber-500' : 'w-2.5 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Curved Bottom Mask SVG - Transitioning perfectly into Bento Grid */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] md:h-[80px] text-stone-50 fill-current"
        >
          <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
