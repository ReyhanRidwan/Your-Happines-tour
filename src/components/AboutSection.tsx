import { motion } from 'motion/react';
import { Award, Users, Shield, MapPin, Quote, Star, CheckCircle } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { label: 'Tamu Bahagia', value: '5,000+', icon: Users, desc: 'Tamu VIP terlayani dengan kepuasan penuh' },
    { label: 'Tahun Pengalaman', value: '12+', icon: Award, desc: 'Menyusun kenangan indah sejak 2014' },
    { label: 'Armada Premium', value: '150+', icon: Shield, desc: 'Kendaraan mewah kondisi prima teruji' },
    { label: 'Rating Bintang 5', value: '4.9/5', icon: Star, desc: 'Dari ribuan ulasan media sosial & Google' },
  ];

  const testimonials = [
    {
      name: 'Bpk. Adisurya Prasetyo',
      role: 'Keluarga Premium Tour (Jakarta)',
      text: 'Pelayanan Your Happiness Tours luar biasa! Innova Zenix-nya wangi sekali, bersih, supirnya sangat profesional merangkap fotografer andal. Jadwal perjalanan diatur rapi sehingga tidak capek bersama anak-anak.',
      rating: 5,
    },
    {
      name: 'Ibu Clarissa Wijaya',
      role: 'Honeymoon Trip (Surabaya)',
      text: 'Memilih paket Honeymoon Nusa Penida dan sangat terkesan. Speedboat eksklusif, private guide ramah sekali, serta makan siang romantis di pantai. Sungguh sesuai namanya, membawa kebahagiaan penuh!',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-stone-50 text-stone-900 overflow-hidden" id="about-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-600 font-mono text-xs tracking-widest uppercase">OUR STORY & VALUES</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-stone-900 tracking-tight">
            Tentang Your Happiness Tours
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Menghadirkan keindahan Bali dalam balutan kemewahan personal dan rasa aman tingkat tinggi sejak tahun 2014.
          </p>
        </div>

        {/* History & Vision Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800"
                  alt="Bali Traditional Temple Landscape"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Overlay elements */}
              <div className="absolute -bottom-6 -right-6 bg-stone-950 text-white p-6 rounded-2xl shadow-xl border border-stone-800 max-w-[240px] hidden sm:block">
                <span className="font-mono text-amber-400 text-xs tracking-wider block mb-1">PROFIL AGEN</span>
                <p className="font-serif text-sm font-semibold text-stone-100">
                  Pelopor Tour Premium Berasuransi di Bali
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900">
                Menyajikan Kebahagiaan Lewat Setiap Mil Perjalanan
              </h3>
              <p className="text-stone-600 leading-relaxed font-sans text-sm md:text-base">
                Your Happiness Tours didirikan atas satu filosofi sederhana: <strong>kebahagiaan Anda adalah pencapaian tertinggi kami</strong>. Kami percaya bahwa liburan di Bali bukan sekadar berpindah dari satu tempat ke tempat lain, melainkan sebuah rangkaian pengalaman batin yang mendalam, tenang, dan berkesan.
              </p>
              <p className="text-stone-600 leading-relaxed font-sans text-sm md:text-base">
                Dengan dedikasi penuh pada kualitas armada terawat, asuransi perjalanan lengkap, dan supir bersertifikasi pariwisata resmi, kami memastikan setiap tamu dilayani selayaknya tamu kehormatan.
              </p>

              {/* Visi Misi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-amber-500" />
                    <span>Visi Kami</span>
                  </h4>
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                    Menjadi pionir penyedia perjalanan wisata privat paling tepercaya dan mewah di Bali yang menyinergikan keselamatan utama dan kebahagiaan sejati para wisatawan.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-amber-500" />
                    <span>Misi Kami</span>
                  </h4>
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                    Menyediakan layanan eksklusif, supir bersertifikat pariwisata yang sopan, asuransi jiwa komprehensif, serta armada VIP termutakhir untuk pengalaman liburan bebas cemas.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section with Bento-like Card layouts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20" id="stats-counter">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-2">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="block font-serif text-3xl md:text-4xl font-extrabold text-stone-900">
                {stat.value}
              </span>
              <span className="block font-sans text-xs md:text-sm font-semibold text-stone-800 uppercase tracking-wide">
                {stat.label}
              </span>
              <span className="block text-stone-500 text-[11px] leading-relaxed">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Guest Reviews & Simulated Map Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Guest Reviews Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-stone-950 text-stone-100 p-8 rounded-3xl border border-stone-800 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Quote className="w-8 h-8 text-amber-500 opacity-60" />
                <h3 className="font-serif text-xl font-bold">Apa Kata Tamu Kami?</h3>
              </div>
              
              <div className="space-y-6 divide-y divide-stone-800">
                {testimonials.map((t, idx) => (
                  <div key={idx} className={`pt-4 ${idx === 0 ? 'pt-0' : ''}`}>
                    <div className="flex space-x-1 mb-2">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-stone-300 text-xs md:text-sm italic leading-relaxed mb-3">
                      "{t.text}"
                    </p>
                    <div>
                      <span className="block text-stone-100 text-xs font-semibold">{t.name}</span>
                      <span className="block text-amber-500/80 text-[10px] font-mono tracking-wider uppercase">{t.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-800 mt-6 flex justify-between items-center text-[11px] text-stone-400">
              <span>Verified Guest Review</span>
              <span className="text-amber-500 font-bold">NURRBALITRAVEL GROUP</span>
            </div>
          </div>

          {/* Visual Map Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-stone-900">
                <MapPin className="w-5 h-5 text-amber-600 animate-bounce" />
                <h3 className="font-serif text-lg font-bold">Lokasi Head Office Kami</h3>
              </div>
              <p className="text-stone-600 text-xs md:text-sm font-sans">
                Kunjungi kantor perwakilan Your Happiness Tours untuk konsultasi rencana perjalanan premium Anda secara tatap muka dengan Travel Consultant kami.
              </p>
              
              {/* Elegant Simulated Earthy Map */}
              <div className="w-full h-[240px] rounded-2xl border border-stone-200 relative overflow-hidden bg-stone-100 shadow-inner flex items-center justify-center">
                {/* Simulated Grid Background to look like a map */}
                <div className="absolute inset-0 bg-stone-100 opacity-60" style={{
                  backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 0), radial-gradient(#d6d3d1 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px'
                }} />
                
                {/* Simulated Paths/Roads */}
                <div className="absolute top-1/2 left-0 w-full h-[20px] bg-stone-200/80 -translate-y-1/2 rotate-[15deg] shadow-sm" />
                <div className="absolute left-[35%] top-0 w-[24px] h-full bg-stone-200/80 -translate-x-1/2 rotate-[-45deg] shadow-sm" />
                
                {/* Simulated Green/Water Spots */}
                <div className="absolute top-4 right-12 w-20 h-20 rounded-full bg-stone-300/40 blur-xl" />
                <div className="absolute bottom-6 left-6 w-32 h-16 rounded-full bg-emerald-100/30 blur-lg" />
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-sky-200/40 border-t border-l border-sky-300" />
                
                {/* Target Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-amber-500/30 rounded-full animate-ping" />
                    <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-400 border border-amber-500 shadow-xl flex items-center justify-center relative">
                      <MapPin className="w-4 h-4 fill-amber-500/20" />
                    </div>
                  </div>
                  <div className="bg-stone-950 text-white text-[9px] font-mono font-bold py-1 px-2.5 rounded-lg border border-stone-800 shadow-2xl mt-2 tracking-wider uppercase whitespace-nowrap">
                    YOUR HAPPINESS TOURS HQ
                  </div>
                </div>

                {/* Map Floating Guide */}
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm border border-stone-200 px-3 py-1.5 rounded-lg shadow-md text-[10px] text-stone-700 font-sans flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>Kuta, Bali - 10 Menit dari Bandara</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
              <div className="text-stone-600">
                <span className="block font-bold">Jl. Sunset Road No. 88X, Kuta</span>
                <span className="block text-stone-500 text-[11px] mt-0.5">Kabupaten Badung, Bali 80361, Indonesia</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-amber-600 font-mono font-bold hover:underline"
              >
                <span>BUKA DI GOOGLE MAPS</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
