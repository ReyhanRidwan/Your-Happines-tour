import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Star, Clock, Sparkles, Filter, CheckCircle, ArrowRight } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../types';

interface PackagesSectionProps {
  onOpenBooking: (itemId: string) => void;
}

export default function PackagesSection({ onOpenBooking }: PackagesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Filter tour packages (type === 'package')
  const packagesList = TOUR_PACKAGES.filter((p) => p.type === 'package');

  // Dynamic category tabs
  const categories = ['Semua', 'Luxury Day Trip', 'Cultural & Nature', 'Romantic Escape'];

  // Smart filter logic
  const filteredPackages = packagesList.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.highlights?.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'Semua' || pkg.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-20 bg-stone-50 px-4 sm:px-6 lg:px-8" id="packages-view">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 text-amber-600 font-mono text-xs tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Paket Wisata Premium</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Pilihan Paket Tour Terbaik Bali
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Kurasi liburan premium privat dengan itinerary fleksibel, pemandu lokal ahli, kenyamanan transportasi VIP, dan kebahagiaan tak terbatas.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-lg mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start" id="package-category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/15'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80" id="package-search-container">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Cari destinasi atau kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-stone-100 text-stone-900 placeholder-stone-400 rounded-full border border-stone-200 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

        </div>

        {/* Empty Search Result */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl space-y-4 max-w-md mx-auto">
            <Filter className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-stone-900">Paket Tidak Ditemukan</h3>
            <p className="text-stone-500 text-sm">
              Kami tidak dapat menemukan paket yang sesuai dengan kata kunci "{searchQuery}". Silakan coba kata kunci lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="px-6 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="packages-grid">
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
              id={`package-card-${pkg.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                {/* Package Image */}
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Category Floating Badge */}
                <span className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md border border-amber-500/20 text-[10px] text-amber-400 font-mono font-bold tracking-wider py-1 px-3.5 rounded-full uppercase">
                  {pkg.category}
                </span>
                
                {/* Rating Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-stone-950 font-mono text-xs font-bold py-1 px-2.5 rounded-lg flex items-center space-x-1 shadow-md">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{pkg.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-stone-500 text-xs font-medium">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{pkg.duration}</span>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                    {pkg.name}
                  </h3>

                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-sans line-clamp-3">
                    {pkg.description}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <span className="text-[10px] tracking-widest font-mono text-stone-400 uppercase block">TERMASUK DI DALAM PAKET:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pkg.highlights?.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-2 text-stone-700 text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Price & Button */}
                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-stone-400 font-mono tracking-wider">HARGA MULAI DARI</span>
                    <span className="text-xl md:text-2xl font-serif font-extrabold text-stone-950">
                      {formatPrice(pkg.price)}
                      <span className="text-xs font-sans text-stone-500 font-normal"> /pax</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(pkg.id)}
                    className="bg-amber-500 text-stone-950 font-sans font-bold hover:bg-amber-600 px-6 py-3 rounded-full text-xs tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer shadow-md shadow-amber-500/10 hover:shadow-amber-500/20"
                  >
                    <span>PESAN TOUR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
