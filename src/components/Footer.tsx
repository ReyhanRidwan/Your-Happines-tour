import { Compass, Mail, MapPin, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setActivePage, onOpenBooking }: FooterProps) {
  const handleLinkClick = (id: string) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-900 py-16" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-900">
          
          {/* Logo & Info column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-3" id="footer-logo">
              <div className="w-11 h-11 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di6ziqvtp/image/upload/v1783237879/b16b729b-4ca9-4666-8401-1b907fa9114e.png"
                  alt="Your Happiness Tours Logo"
                  className="w-full h-full object-contain p-1.5"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-white text-base font-bold tracking-wider leading-none">
                  yourhappinesstours
                </span>
                <span className="text-[9px] tracking-[0.2em] text-amber-500/80 font-mono mt-0.5">PREMIUM BALI TRAVEL</span>
              </div>
            </div>

            <p className="text-stone-400 text-xs md:text-sm font-sans leading-relaxed">
              Your Happiness Tours adalah biro perjalanan wisata premium terpercaya di Bali. Kami mengedepankan keamanan maksimal, armada VIP steril prima, dan asuransi jiwa komprehensif demi kebahagiaan paripurna liburan Anda.
            </p>

            {/* Social media handles */}
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-colors text-stone-400 cursor-pointer"
                aria-label="Instagram Your Happiness Tours"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-colors text-stone-400 cursor-pointer"
                aria-label="Facebook Your Happiness Tours"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-colors text-stone-400 cursor-pointer"
                aria-label="Youtube Your Happiness Tours"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs md:text-sm font-sans">
              {[
                { id: 'home', label: 'Beranda Utama' },
                { id: 'about', label: 'Tentang Kami (Profil)' },
                { id: 'packages', label: 'Katalog Paket Wisata' },
                { id: 'services', label: 'Sewa Mobil & Motor' },
                { id: 'why', label: 'Keunggulan & Armada' },
                { id: 'gallery', label: 'Galeri Dokumentasi' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-5 space-y-4" id="footer-contact">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Hubungi Kantor Pusat</h4>
            
            <ul className="space-y-3.5 text-xs md:text-sm font-sans">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Jl. Sunset Road No. 88X, Kuta, Kabupaten Badung, Bali 80361, Indonesia</span>
              </li>

              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>+62 822-7744-6609 (Layanan WhatsApp VIP)</span>
              </li>

              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>info@yourhappinesstours.com</span>
              </li>
            </ul>

            <button
              onClick={() => onOpenBooking()}
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-sans font-bold py-2.5 px-6 rounded-full text-xs tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              KONSULTASI PERJALANAN GRATIS
            </button>
          </div>

        </div>

        {/* Footer Bottom Bar: Partners & Badges */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          
          {/* Copyright */}
          <div className="text-center md:text-left space-y-1">
            <span className="block font-sans">
              © 2026 <strong className="text-stone-300 font-semibold">Your Happiness Tours</strong>. Seluruh Hak Cipta Dilindungi.
            </span>
            <span className="block text-[10px] text-stone-600 font-mono">
              Premium Tour Operator • Member of Nurrbalitravel Group • Licensed Tourism Board Bali
            </span>
          </div>

          {/* Payment Partner simulation badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 border-t border-stone-900/50 pt-4 md:pt-0 md:border-0">
            <span className="text-[10px] tracking-widest font-mono text-stone-600 uppercase">PARTNERS:</span>
            <span className="bg-stone-900 text-stone-400 font-mono text-[9px] px-2 py-0.5 rounded border border-stone-800">
              MIDTRANS SECURE
            </span>
            <span className="bg-stone-900 text-stone-400 font-mono text-[9px] px-2 py-0.5 rounded border border-stone-800">
              BANK BCA
            </span>
            <span className="bg-stone-900 text-stone-400 font-mono text-[9px] px-2 py-0.5 rounded border border-stone-800">
              BANK MANDIRI
            </span>
            <span className="bg-stone-900 text-stone-400 font-mono text-[9px] px-2 py-0.5 rounded border border-stone-800">
              JASA RAHARJA
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
