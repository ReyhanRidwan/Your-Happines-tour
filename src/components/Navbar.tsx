import { useState, useEffect } from 'react';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenBooking: (itemId?: string) => void;
}

export default function Navbar({ activePage, setActivePage, onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll effect for translucent state on home page
  useEffect(() => {
    if (activePage !== 'home') {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const navItems = [
    { id: 'home', label: 'BERANDA' },
    { id: 'about', label: 'TENTANG KAMI' },
    { id: 'packages', label: 'PAKET TOUR' },
    { id: 'services', label: 'LAYANAN & SEWA' },
    { id: 'why', label: 'KEUNGGULAN' },
    { id: 'gallery', label: 'GALERI' },
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine navbar background and typography classes
  const isTransparent = activePage === 'home' && !isScrolled;

  return (
    <>
      <nav
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent py-6 border-b border-transparent'
            : 'bg-stone-950/95 backdrop-blur-md py-4 border-b border-stone-900 shadow-xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center group cursor-pointer focus:outline-none"
              id="nav-logo"
            >
              <img
                src="https://res.cloudinary.com/di6ziqvtp/image/upload/v1783237879/b16b729b-4ca9-4666-8401-1b907fa9114e.png"
                alt="Your Happiness Tours"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2" id="desktop-menu">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    isTransparent
                      ? `text-white hover:text-amber-400 tracking-widest text-[11px] font-normal`
                      : `text-stone-300 hover:text-amber-400 tracking-wider text-[13px] font-medium`
                  } ${activePage === item.id ? 'text-amber-500 font-bold' : ''}`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {activePage === item.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-amber-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Reservation Button */}
            <div className="hidden md:flex items-center" id="nav-cta">
              <button
                onClick={() => onOpenBooking()}
                className={`relative overflow-hidden rounded-full font-sans tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2 px-5 py-2.5 ${
                  isTransparent
                    ? 'bg-white text-stone-950 font-medium text-xs hover:bg-amber-500 hover:text-white border border-white'
                    : 'bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-600 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20'
                }`}
                id="navbar-booking-btn"
              >
                <span>BOOKING SEKARANG</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center" id="nav-mobile-trigger">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isTransparent ? 'text-white hover:bg-white/10' : 'text-stone-300 hover:bg-stone-900'
                }`}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Slide */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-stone-950 border-b border-stone-900 text-stone-200"
              id="mobile-menu-drawer"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                      activePage === item.id
                        ? 'bg-stone-900 text-amber-500 border-l-2 border-amber-500'
                        : 'text-stone-400 hover:bg-stone-900/50 hover:text-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 px-4">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full bg-amber-500 text-stone-950 text-center py-3 rounded-full font-bold text-sm hover:bg-amber-600 transition-colors shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>BOOKING SEKARANG</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
