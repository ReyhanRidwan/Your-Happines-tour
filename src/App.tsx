import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import AboutSection from './components/AboutSection';
import PackagesSection from './components/PackagesSection';
import ServicesSection from './components/ServicesSection';
import WhySection from './components/WhySection';
import GallerySection from './components/GallerySection';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingItemId, setBookingItemId] = useState<string>('nusa-penida');

  // Trigger booking modal with optional preselected package/service item
  const handleOpenBooking = (itemId?: string) => {
    if (itemId) {
      setBookingItemId(itemId);
    } else {
      setBookingItemId('nusa-penida'); // default
    }
    setIsBookingOpen(true);
  };

  // Smooth scroll handler on Home page
  const handleExploreServices = () => {
    const servicesSection = document.getElementById('home-services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Page level route transitions animation settings
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  const pageTransition = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1], // Custom luxury easing curves
  };

  return (
    <div className="bg-stone-50 text-stone-900 min-h-screen font-sans antialiased flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950">
      
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main View Container with page transitions */}
      <main className="flex-grow pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
          >
            {/* HOME LANDING VIEW (All preview segments in one seamless scroll) */}
            {activePage === 'home' && (
              <div id="home-view-container">
                {/* Hero with Curved bottom SVG */}
                <Hero
                  onOpenBooking={() => handleOpenBooking()}
                  onExplorePackages={handleExploreServices}
                />

                {/* Bento Grid Destinations (Integrated as topmost content of Home) */}
                <BentoGrid onSelectDestination={(id) => handleOpenBooking(id)} />

                {/* Smooth preview anchors inside Home */}
                <div id="home-about" className="border-t border-stone-200/40">
                  <AboutSection />
                </div>

                <div id="home-packages" className="border-t border-stone-200/40">
                  <PackagesSection onOpenBooking={handleOpenBooking} />
                </div>

                <div id="home-services" className="border-t border-stone-200/40">
                  <ServicesSection onOpenBooking={handleOpenBooking} />
                </div>

                <div id="home-why" className="border-t border-stone-200/40">
                  <WhySection />
                </div>

                <div id="home-gallery" className="border-t border-stone-200/40">
                  <GallerySection />
                </div>
              </div>
            )}

            {/* DEDICATED FULL-PAGE TABS */}
            {activePage === 'about' && (
              <div className="pt-24">
                <AboutSection />
              </div>
            )}

            {activePage === 'packages' && (
              <div className="pt-24">
                <PackagesSection onOpenBooking={handleOpenBooking} />
              </div>
            )}

            {activePage === 'services' && (
              <div className="pt-24">
                <ServicesSection onOpenBooking={handleOpenBooking} />
              </div>
            )}

            {activePage === 'why' && (
              <div className="pt-24">
                <WhySection />
              </div>
            )}

            {activePage === 'gallery' && (
              <div className="pt-24">
                <GallerySection />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <Footer
        setActivePage={setActivePage}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Multi-step Reservation Wizard Form Modal overlay */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            preselectedId={bookingItemId}
          />
        )}
      </AnimatePresence>
      
    </div>
  );
}
