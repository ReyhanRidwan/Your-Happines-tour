import { motion } from 'motion/react';
import { Camera, MapPin, Sparkles, Heart } from 'lucide-react';

export default function GallerySection() {
  const galleryItems = [
    {
      title: 'Kelingking Secret Beach',
      location: 'Nusa Penida, Bali',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
      guest: 'Keluarga Bpk. Adisurya',
      quote: 'Pemandangan tebing terindah yang pernah kami lihat!',
      aspect: 'aspect-[3/4]'
    },
    {
      title: 'Tegalalang Rice Swing',
      location: 'Ubud, Bali',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
      guest: 'Clarissa & Ryan',
      quote: 'Foto estetik yang luar biasa dibantu oleh driver kami.',
      aspect: 'aspect-[1/1]'
    },
    {
      title: 'Sunrise Mount Batur',
      location: 'Kintamani, Bali',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800',
      guest: 'Grup Pendaki VIP',
      quote: 'Pendakian santai dengan guide yang sangat sabar.',
      aspect: 'aspect-[3/2]'
    },
    {
      title: 'Gateway to Serenity',
      location: 'Handara Gate, Bedugul',
      image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783239412/46590175-6096-4c5d-946c-9102764f4780.png',
      guest: 'Ibu Amanda & Teman',
      quote: 'Gerbang mistis berkabut tebal yang sangat syahdu.',
      aspect: 'aspect-[3/4]'
    },
    {
      title: 'Uluwatu Kecak Dance',
      location: 'Uluwatu, Bali',
      image: 'https://images.unsplash.com/photo-1625736315895-bfdf14f08e8b?auto=format&fit=crop&q=80&w=800',
      guest: 'Mr. & Mrs. Harrison',
      quote: 'Tarian magis luar biasa di tepi tebing samudra!',
      aspect: 'aspect-[1/1]'
    },
    {
      title: 'Jimbaran Seafood Dinner',
      location: 'Jimbaran, Bali',
      image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800',
      guest: 'Honeymoon Package Guests',
      quote: 'Makan malam mewah romantis di tepi pantai Bali.',
      aspect: 'aspect-[3/2]'
    }
  ];

  return (
    <section className="py-20 bg-stone-50 text-stone-900" id="gallery-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-amber-600 font-mono text-xs tracking-widest uppercase">
            <Camera className="w-3.5 h-3.5" />
            <span>Dokumentasi Trip Real</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Kenangan Indah Bersama Tamu
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
          <p className="text-stone-600 text-sm md:text-base font-sans leading-relaxed">
            Intip senyuman bahagia dan dokumentasi estetik perjalanan para tamu eksklusif Your Happiness Tours di berbagai destinasi terindah Pulau Bali.
          </p>
        </div>

        {/* Aesthetic Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6" id="gallery-masonry">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className={`break-inside-avoid bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer relative ${item.aspect}`}
              id={`gallery-card-${idx}`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Light border accent */}
              <div className="absolute inset-0 border border-amber-500/0 group-hover:border-amber-500/30 transition-all duration-300 rounded-3xl" />

              {/* Floating Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10 transition-transform duration-300">
                
                {/* Upper tags */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-amber-500 text-stone-950 text-[9px] font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow-lg shadow-amber-500/10">
                  <Heart className="w-3 h-3 fill-current" />
                  <span>Verified</span>
                </div>

                <div className="space-y-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-1 text-amber-400 text-xs font-mono font-bold tracking-wide">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Customer quote and guest name on hover */}
                  <div className="pt-2 border-t border-stone-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 space-y-1">
                    <p className="text-stone-300 text-xs italic font-sans leading-relaxed">
                      "{item.quote}"
                    </p>
                    <span className="block text-[10px] text-amber-500/90 font-semibold font-mono uppercase tracking-wider">
                      Oleh: {item.guest}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action at bottom */}
        <div className="mt-16 bg-stone-950 rounded-3xl border border-stone-800 p-8 md:p-12 text-center text-white relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute top-[-50%] left-[-20%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
          
          <div className="relative z-10 space-y-6">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-100">
              Ingin Diabadikan Seperti Mereka?
            </h3>
            <p className="text-stone-400 text-xs md:text-sm max-w-xl mx-auto font-sans leading-relaxed">
              Pesan perjalanan impian Anda hari ini dan biarkan Your Happiness Tours menyusun rangkaian petualangan terindah yang layak dipamerkan di album kenangan Anda.
            </p>
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>NURRBALITRAVEL EXCLUSIVE GROUP</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
