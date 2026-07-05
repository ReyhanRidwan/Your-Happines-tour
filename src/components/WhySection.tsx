import { motion } from 'motion/react';
import { ShieldCheck, HeartHandshake, CarFront, Sparkles, Trophy, Flame } from 'lucide-react';

export default function WhySection() {
  const coreValues = [
    {
      title: 'Perlindungan Asuransi Jiwa',
      desc: 'Setiap program tour dan sewa kendaraan kami terintegrasi asuransi keselamatan jiwa komprehensif untuk perlindungan optimal Anda.',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      title: 'Driver Pramuwisata Berlisensi',
      desc: 'Pengemudi sopan bersertifikat resmi pariwisata Bali yang merangkap sebagai navigator andal dan fotografer profesional perjalanan Anda.',
      icon: Trophy,
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      title: 'Transparansi Harga 100%',
      desc: 'Tanpa biaya tersembunyi. Semua rincian bahan bakar, parkir, tiket masuk, hingga supir sudah tercakup jelas dalam struk pemesanan.',
      icon: HeartHandshake,
      color: 'text-rose-500 bg-rose-500/10'
    },
    {
      title: 'Garansi Armada Steril & Wangi',
      desc: 'Semua unit mobil dan motor rutin diservis di bengkel resmi, dibersihkan menyeluruh dengan disinfektan, serta diberi aroma terapi segar.',
      icon: CarFront,
      color: 'text-sky-500 bg-sky-500/10'
    }
  ];

  const fleetGallery = [
    {
      name: 'Toyota Alphard VIP',
      type: 'Executive Cruiser',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
      specs: ['Full Captain Seat', 'Dual Zone Climate', 'Private Curtain', 'VIP Welcome Board']
    },
    {
      name: 'Toyota Innova Zenix Hybrid',
      type: 'Premium Family MPV',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      specs: ['Super Silent Cabin', 'Panoramic Sunroof', 'Dual AC Blower', 'USB Charge Ports']
    },
    {
      name: 'Honda Brio RS',
      type: 'Agile Compact Car',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800',
      specs: ['Touchscreen Audio', 'Highly Fuel Efficient', 'Compact Easy Parking', 'Airbags Safety']
    },
    {
      name: 'Yamaha Nmax Connected',
      type: 'Premium Scooter',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
      specs: ['Abs Braking System', 'Plush Leather Seat', 'Smart Keyless System', 'Double Helmet Storage']
    },
    {
      name: 'Vespa Sprint 150 i-Get',
      type: 'Aesthetic Italian Cruiser',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
      specs: ['LED Classic Headlamp', 'Retro Aesthetic Design', 'Very Smooth Suspension', 'USB Phone Charger']
    }
  ];

  return (
    <section className="py-20 bg-stone-950 text-white overflow-hidden" id="why-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-amber-400 font-mono text-xs tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Standards</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-stone-100 tracking-tight leading-tight">
            Mengapa Memilih Kami?
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
          <p className="text-stone-400 text-sm md:text-base font-sans leading-relaxed">
            Menyatukan kemewahan transportasi, keprofesionalan layanan, dan standar keselamatan jiwa premium untuk kebahagiaan paripurna liburan Bali Anda.
          </p>
        </div>

        {/* Core Values Bento Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {coreValues.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-stone-900/60 backdrop-blur-md p-8 rounded-3xl border border-stone-800 flex items-start space-x-6 hover:border-amber-500/30 hover:bg-stone-900 transition-all duration-300 group"
            >
              <div className={`p-4 rounded-2xl flex-shrink-0 ${value.color} transition-transform duration-500 group-hover:scale-110`}>
                <value.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide text-stone-100 group-hover:text-amber-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-stone-400 text-xs md:text-sm font-sans leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fleet Gallery Header */}
        <div className="border-t border-stone-900 pt-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-amber-500 font-mono text-[10px] tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5" />
              <span>STABLE OF SUPREME VEHICLES</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-100">
              Galeri Armada Premium Kami
            </h3>
            <p className="text-stone-400 text-xs md:text-sm font-sans leading-relaxed">
              Jajaran mobil mewah dan skuter matic estetik milik pribadi, siap mengantarkan Anda dengan kenyamanan tiada tanding.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] tracking-widest font-mono text-stone-500 uppercase block">VENDOR OF RECORD</span>
            <span className="font-serif text-sm font-bold text-amber-500">YOUR HAPPINESS TOURS</span>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="fleet-container">
          {fleetGallery.map((vehicle, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/40 transition-all duration-300 group flex flex-col"
              id={`fleet-card-${idx}`}
            >
              {/* Vehicle Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
                
                <div className="absolute bottom-4 left-4">
                  <span className="text-amber-400 text-[10px] font-mono tracking-widest uppercase block mb-0.5">
                    {vehicle.type}
                  </span>
                  <span className="font-serif text-lg font-bold text-white">
                    {vehicle.name}
                  </span>
                </div>
              </div>

              {/* Specs tags */}
              <div className="p-5 flex-grow space-y-4 bg-stone-900">
                <div className="flex flex-wrap gap-2">
                  {vehicle.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-stone-950 text-stone-300 text-[10px] font-sans px-3 py-1 rounded-full border border-stone-800"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-stone-500 flex items-center justify-between font-mono border-t border-stone-800/80 pt-3">
                  <span>Kondisi Prima (Unit Terbaru)</span>
                  <span className="text-amber-500/80 font-bold uppercase">Ready to Book</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
