import { useState } from 'react';
import { motion } from 'motion/react';
import { Car, Bike, PlaneTakeoff, ShieldAlert, Star, Users, Briefcase, Key, Sparkles, ArrowRight } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../types';

interface ServicesSectionProps {
  onOpenBooking: (itemId: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'car' | 'motor' | 'airport'>('all');

  const servicesList = TOUR_PACKAGES.filter((p) => p.type === 'rental' || p.type === 'transfer');

  const filteredServices = servicesList.filter((srv) => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'car') return srv.category === 'Car Rental';
    if (selectedTab === 'motor') return srv.category === 'Motorbike Rental';
    if (selectedTab === 'airport') return srv.category === 'Airport Transfer';
    return true;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-20 bg-stone-50 text-stone-900" id="services-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-amber-600 font-mono text-xs tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Private Logistics</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Layanan Transportasi & Sewa Privat
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
          <p className="text-stone-600 text-sm md:text-base font-sans leading-relaxed">
            Pilihan armada premium, mulai dari MPV VIP, mobil kompak lepas kunci, skuter matic estetik, hingga antar-jemput bandara Ngurah Rai berkelas VIP.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" id="services-tabs">
          {[
            { id: 'all', label: 'Semua Layanan', icon: Sparkles },
            { id: 'car', label: 'Sewa Mobil', icon: Car },
            { id: 'motor', label: 'Sewa Motor', icon: Bike },
            { id: 'airport', label: 'Antar Jemput Bandara', icon: PlaneTakeoff },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3.5 rounded-full text-xs font-bold tracking-widest cursor-pointer transition-all duration-300 ${
                selectedTab === tab.id
                  ? 'bg-stone-950 text-amber-400 border border-amber-500 shadow-xl'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* Warning Banner / Service policy info */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-12 flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 max-w-4xl mx-auto text-stone-800">
          <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-center sm:text-left text-xs md:text-sm">
            <h4 className="font-bold text-stone-900 font-sans">Garansi Standar Prima Nurrbalitravel</h4>
            <p className="text-stone-700 leading-relaxed font-sans text-xs">
              Semua kendaraan kami dicuci bersih higienis sebelum dikirim ke tamu, tangki bensin terisi penuh, berasuransi kecelakaan lengkap, serta diservis berkala di bengkel resmi demi keamanan total Anda menyusuri jalanan Bali.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {filteredServices.map((srv, index) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              id={`service-card-${srv.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <img
                  src={srv.image}
                  alt={srv.name}
                  className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float Category Tag */}
                <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-stone-800 text-[9px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                  {srv.category}
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md py-1 px-2.5 rounded-lg text-stone-950 font-mono text-xs font-bold flex items-center space-x-1 shadow-md">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{srv.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Service details */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                    {srv.name}
                  </h3>

                  <p className="text-stone-600 text-xs md:text-sm font-sans leading-relaxed line-clamp-3">
                    {srv.description}
                  </p>

                  {/* Dynamic specs based on vehicle or transfer */}
                  <div className="pt-4 border-t border-stone-100 space-y-2.5">
                    {srv.capacity && (
                      <div className="flex items-center space-x-2 text-stone-700 text-xs font-medium">
                        <Users className="w-4 h-4 text-amber-600" />
                        <span>{srv.capacity}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-stone-700 text-xs font-medium">
                      <Key className="w-4 h-4 text-amber-600" />
                      <span>{srv.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Card footer price & button */}
                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-stone-400 font-mono tracking-wider uppercase">TARIF PREMIUM</span>
                    <span className="text-lg md:text-xl font-serif font-extrabold text-stone-950">
                      {formatPrice(srv.price)}
                      <span className="text-xs font-sans text-stone-500 font-normal">
                        {srv.type === 'rental' ? ' /hari' : ' /trip'}
                      </span>
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(srv.id)}
                    className="bg-stone-950 text-amber-400 font-sans font-bold hover:bg-amber-500 hover:text-stone-950 px-5 py-3 rounded-full text-[11px] tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-1.5 cursor-pointer border border-stone-800 hover:border-amber-500 shadow-md"
                  >
                    <span>PESAN SEKARANG</span>
                    <ArrowRight className="w-3 h-3" />
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
