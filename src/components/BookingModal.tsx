import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Users,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Building,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award
} from 'lucide-react';
import { TOUR_PACKAGES, ADD_ONS, BookingState, INITIAL_BOOKING_STATE, TourPackage, AddOn } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedId?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedId }: BookingModalProps) {
  const [booking, setBooking] = useState<BookingState>({ ...INITIAL_BOOKING_STATE });
  const [showMidtransSim, setShowMidtransSim] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [midtransChannel, setMidtransChannel] = useState<'qris' | 'bca_va' | 'mandiri_va'>('qris');

  // Load preselected package/service if provided
  useEffect(() => {
    if (preselectedId) {
      setBooking((prev) => ({
        ...prev,
        selectedItem: preselectedId,
        currentStep: 1, // Reset to step 1
      }));
    }
  }, [preselectedId, isOpen]);

  if (!isOpen) return null;

  const currentPackage = TOUR_PACKAGES.find((p) => p.id === booking.selectedItem) || TOUR_PACKAGES[0];
  const isRentalOrTransfer = currentPackage.type === 'rental' || currentPackage.type === 'transfer';

  // Format monetary value
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Logic to calculate invoice
  const calculateInvoice = () => {
    const basePrice = currentPackage.price;
    let baseCost = 0;
    let childCost = 0;
    let durationMultiplier = booking.duration || 1;

    if (isRentalOrTransfer) {
      // Flat rate based on duration days/trips
      baseCost = basePrice * durationMultiplier;
    } else {
      // Per passenger price
      baseCost = basePrice * (booking.adults || 1);
      // Children get 30% discount (paying 70%)
      childCost = basePrice * 0.7 * (booking.children || 0);
    }

    // Add-on costs
    const addOnCost = booking.selectedAddOns.reduce((sum, addOnId) => {
      const addOn = ADD_ONS.find((a) => a.id === addOnId);
      return sum + (addOn ? addOn.price : 0);
    }, 0);

    // Group discount: -Rp 150.000 for 4+ passengers (only for packages)
    const totalPassengers = booking.adults + booking.children;
    const groupDiscount = !isRentalOrTransfer && totalPassengers >= 4 ? 150000 : 0;

    const grandTotal = baseCost + childCost + addOnCost - groupDiscount;
    const dpAmount = Math.round(grandTotal * 0.3);

    return {
      baseCost,
      childCost,
      addOnCost,
      groupDiscount,
      grandTotal,
      dpAmount,
    };
  };

  const invoice = calculateInvoice();

  // Handle steps navigation
  const nextStep = () => {
    // Step validation before letting user advance
    if (booking.currentStep === 2 && !booking.date) {
      setValidationError('Silakan pilih tanggal keberangkatan terlebih dahulu.');
      return;
    }

    if (booking.currentStep === 6) {
      if (!booking.name.trim()) {
        setValidationError('Nama lengkap wajib diisi.');
        return;
      }
      if (!booking.whatsapp.trim() || booking.whatsapp.length < 9) {
        setValidationError('Nomor WhatsApp aktif minimal 9 digit.');
        return;
      }
      if (!booking.email.trim() || !booking.email.includes('@')) {
        setValidationError('Alamat email valid wajib diisi.');
        return;
      }
    }

    setValidationError('');

    // If proceeding to step 7, generate a unique booking code if not already present
    if (booking.currentStep === 6 && !booking.bookingCode) {
      const randNum = Math.floor(10000 + Math.random() * 90000);
      setBooking((prev) => ({
        ...prev,
        bookingCode: `NRB-2026-${randNum}`,
      }));
    }

    setBooking((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const prevStep = () => {
    setValidationError('');
    setBooking((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1),
    }));
  };

  // Toggle Add-On selection
  const toggleAddOn = (id: string) => {
    setBooking((prev) => {
      const selected = prev.selectedAddOns.includes(id)
        ? prev.selectedAddOns.filter((aId) => aId !== id)
        : [...prev.selectedAddOns, id];
      return { ...prev, selectedAddOns: selected };
    });
  };

  // Handle Date Selection (July 2026 calendar)
  const fullyBookedDates = [4, 11, 12, 18, 19, 25, 26]; // Sat & Sun in July 2026 + specified in prompt
  const renderCalendar = () => {
    // July 2026 has 31 days. July 1, 2026 is Wednesday.
    // Standard calendar row setup. 
    // We can display empty boxes for Sunday, Monday, Tuesday preceding July 1.
    // In Indonesian/European calendars, Monday is often the first day. Let's make Monday first day of week.
    // Mon, Tue, Wed, Thu, Fri, Sat, Sun.
    // July 1 is a Wednesday, so offset is 2 empty boxes (Monday, Tuesday).
    const daysInMonth = 31;
    const startOffset = 2; // Wed is 3rd day, so 2 empty spots preceding it.
    
    const daysArray = [];
    // Preceding empty slots
    for (let i = 0; i < startOffset; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-9 w-9 md:h-11 md:w-11" />);
    }

    // Days of July
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `2026-07-${day.toString().padStart(2, '0')}`;
      const isSelected = booking.date === dateStr;
      
      // Check if this day of July 2026 is a weekend (Saturdays & Sundays are fully booked)
      // Sat: 4, 11, 18, 25. Sun: 5, 12, 19, 26.
      const isWeekend = [4, 5, 11, 12, 18, 19, 25, 26].includes(day);
      const isFullyBooked = fullyBookedDates.includes(day) || isWeekend;

      daysArray.push(
        <button
          key={`day-${day}`}
          type="button"
          disabled={isFullyBooked}
          onClick={() => {
            setBooking((prev) => ({ ...prev, date: dateStr }));
            setValidationError('');
          }}
          className={`h-9 w-9 md:h-11 md:w-11 rounded-full text-xs md:text-sm flex flex-col items-center justify-center relative transition-all cursor-pointer ${
            isFullyBooked
              ? 'bg-rose-100/40 text-rose-400 line-through cursor-not-allowed border border-rose-200/40'
              : isSelected
              ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20'
              : 'bg-stone-50 text-stone-800 hover:bg-stone-200 hover:text-stone-950'
          }`}
        >
          <span>{day}</span>
          {isFullyBooked && (
            <span className="text-[7px] font-semibold text-rose-500 uppercase tracking-tighter leading-none absolute bottom-0.5 scale-75 whitespace-nowrap">
              FULL
            </span>
          )}
        </button>
      );
    }

    return daysArray;
  };

  // WhatsApp Message Generator
  const handleWhatsAppRedirect = () => {
    const selectedAddOnNames = booking.selectedAddOns.map(id => {
      const item = ADD_ONS.find(a => a.id === id);
      return item ? item.name : '';
    }).filter(Boolean).join(', ') || 'Tidak ada';

    const textToPay = booking.paymentType === 'dp' ? invoice.dpAmount : invoice.grandTotal;

    const messageTemplate = `Swastyastu, Admin Your Happiness Tours! 🌴✨
Saya ingin mengonfirmasi pesanan tiket premium dengan detail sebagai berikut:

🆔 Kode Tiket: ${booking.bookingCode}
👤 Nama Pemesan: ${booking.name}
📧 Email: ${booking.email}
📱 No. HP: ${booking.whatsapp}
🗺️ Paket/Layanan: ${currentPackage.name}
📅 Tanggal Keberangkatan: ${booking.date ? booking.date.split('-')[2] : ''} Juli 2026
👥 Jumlah Peserta: ${isRentalOrTransfer ? `${booking.duration} Hari/Trip` : `${booking.adults} Dewasa, ${booking.children} Anak-anak`}
➕ Add-ons: ${selectedAddOnNames}
💳 Metode Bayar: ${booking.paymentType === 'dp' ? 'DP 30%' : 'Full 100%'} via ${booking.isPaid ? 'Midtrans Gateway (Lunas)' : 'Transfer Bank (Menunggu)'}
💵 TOTAL TRANSFER: ${formatIDR(textToPay)}

Mohon segera diverifikasi dan diproses. Terima kasih! 🙏 vendor: yourhappinesstours`;

    const encodedMessage = encodeURIComponent(messageTemplate);
    window.open(`https://wa.me/6282277446609?text=${encodedMessage}`, '_blank');
  };

  const stepTitles = [
    'Pilih Layanan',
    'Pilih Tanggal',
    'Jumlah Tamu',
    'Add-ons Opsional',
    'Invoice Transparan',
    'Data Diri',
    'Pembayaran',
    'Konfirmasi Sukses',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Midtrans Snap Simulation Popup */}
      <AnimatePresence>
        {showMidtransSim && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-950/70"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-stone-200">
              {/* Simulated Midtrans Header */}
              <div className="bg-gradient-to-r from-blue-700 to-sky-600 p-5 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-sky-200" />
                  <span className="font-mono text-sm font-bold tracking-widest">MIDTRANS SNAP</span>
                </div>
                <span className="bg-sky-500/20 text-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Sandbox Simulation
                </span>
              </div>

              {/* Transaction Info */}
              <div className="p-6 space-y-4 text-stone-800">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-center space-y-1">
                  <span className="text-[10px] text-stone-500 font-mono tracking-widest">TOTAL TAGIHAN</span>
                  <p className="text-xl font-bold text-stone-950">
                    {formatIDR(booking.paymentType === 'dp' ? invoice.dpAmount : invoice.grandTotal)}
                  </p>
                  <span className="text-[10px] text-stone-400 font-mono">Kode Order: {booking.bookingCode}</span>
                </div>

                {/* Simulated Channels */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-wider text-stone-400 block uppercase">PILIH SALURAN BAYAR</span>
                  
                  <button
                    onClick={() => setMidtransChannel('qris')}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      midtransChannel === 'qris'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span className="text-xs">QRIS (Gopay/OVO/ShopeePay)</span>
                    <span className="text-[9px] font-mono bg-stone-100 text-stone-500 px-2 py-0.5 rounded border">Instant</span>
                  </button>

                  <button
                    onClick={() => setMidtransChannel('bca_va')}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      midtransChannel === 'bca_va'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span className="text-xs">BCA Virtual Account</span>
                    <span className="text-[9px] font-mono bg-stone-100 text-stone-500 px-2 py-0.5 rounded border">Bank VA</span>
                  </button>

                  <button
                    onClick={() => setMidtransChannel('mandiri_va')}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      midtransChannel === 'mandiri_va'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span className="text-xs">Mandiri Virtual Account</span>
                    <span className="text-[9px] font-mono bg-stone-100 text-stone-500 px-2 py-0.5 rounded border">Bank VA</span>
                  </button>
                </div>

                {/* QR Code / VA placeholder */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-center flex flex-col items-center justify-center space-y-2">
                  {midtransChannel === 'qris' ? (
                    <>
                      {/* Fake QR code representation */}
                      <div className="w-24 h-24 bg-stone-900 p-1.5 rounded-lg border border-stone-200 shadow flex items-center justify-center">
                        <div className="w-full h-full bg-stone-50 flex items-center justify-center font-mono font-bold text-[8px] text-center text-stone-800">
                          [QRIS IMAGE PLACEHOLDER]
                        </div>
                      </div>
                      <span className="text-[9px] text-stone-500">Scan QR Code ini menggunakan aplikasi pembayaran Anda</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] text-stone-400 font-mono">NOMOR VIRTUAL ACCOUNT</span>
                      <p className="text-lg font-mono font-bold text-blue-800 tracking-wider">
                        88001 {booking.whatsapp.slice(-6) || '123456'}
                      </p>
                      <span className="text-[9px] text-stone-500">Gunakan ATM atau M-Banking untuk melakukan transfer</span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-stone-50 border-t border-stone-100 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMidtransSim(false)}
                  className="w-1/2 text-center py-2.5 bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-300 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBooking((prev) => ({ ...prev, isPaid: true }));
                    setShowMidtransSim(false);
                  }}
                  className="w-1/2 text-center py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  Bayar Sukses
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Booking Modal Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative border border-stone-200 max-h-[92vh] flex flex-col"
        id="booking-wizard-modal"
      >
        
        {/* Modal Top Header Bar */}
        <div className="bg-stone-950 p-5 text-white flex items-center justify-between border-b border-stone-900">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm md:text-base text-stone-100">Registrasi Premium Trip</h3>
              <span className="text-[10px] text-amber-500/80 font-mono tracking-widest uppercase block mt-0.5">yourhappinesstours</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-900 transition-colors cursor-pointer"
            aria-label="Close booking wizard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Step Progress Indicator Bar */}
        <div className="bg-stone-900 px-4 py-3 border-b border-stone-800" id="wizard-progress-bar">
          <div className="max-w-2xl mx-auto">
            {/* Visual Progress Steps Lines */}
            <div className="flex items-center justify-between relative mt-2 mb-2">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-800 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-[1.5px] bg-amber-500 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((booking.currentStep - 1) / 7) * 100}%` }}
              />

              {[1, 2, 3, 4, 5, 6, 7, 8].map((stepNum) => (
                <button
                  key={stepNum}
                  type="button"
                  disabled={stepNum > booking.currentStep && !booking.bookingCode} // Only clickable back to completed steps
                  onClick={() => {
                    setValidationError('');
                    setBooking((prev) => ({ ...prev, currentStep: stepNum }));
                  }}
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-mono text-[10px] md:text-xs font-bold transition-all z-10 relative cursor-pointer ${
                    stepNum === booking.currentStep
                      ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-500/20'
                      : stepNum < booking.currentStep
                      ? 'bg-stone-100 text-stone-900 ring-2 ring-stone-800'
                      : 'bg-stone-950 text-stone-500 border border-stone-800'
                  }`}
                >
                  {stepNum}
                </button>
              ))}
            </div>

            {/* Active Step Subtitle Label */}
            <div className="text-center">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                LANGKAH {booking.currentStep} OF 8: {stepTitles[booking.currentStep - 1]}
              </span>
            </div>
          </div>
        </div>

        {/* Wizard Form View Body Container */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow" id="wizard-body">
          
          {/* Validation Warning Alert */}
          {validationError && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start space-x-2.5 animate-pulse">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Dynamic Step Contents Router */}
          <div className="min-h-[300px]">
            {/* STEP 1: SELECT PACKAGE / LAYANAN */}
            {booking.currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-stone-900">Pilih Paket Wisata atau Layanan Transportasi</h4>
                  <p className="text-stone-500 text-xs">Pilih paket perjalanan atau sewa kendaraan pribadi Anda di bawah ini.</p>
                </div>

                {/* Selection Dropdown */}
                <div className="w-full">
                  <label htmlFor="package-select-dropdown" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Selek Cepat Dropdown</label>
                  <select
                    id="package-select-dropdown"
                    value={booking.selectedItem}
                    onChange={(e) => setBooking((prev) => ({ ...prev, selectedItem: e.target.value }))}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
                  >
                    {TOUR_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} ({pkg.type === 'package' ? 'Paket Tour' : 'Sewa/Logistik'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Card grids of packages/services */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="step1-card-grid">
                  {TOUR_PACKAGES.map((pkg) => {
                    const isSelected = booking.selectedItem === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setBooking((prev) => ({ ...prev, selectedItem: pkg.id }))}
                        className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-44 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/5 ring-2 ring-amber-500/20'
                            : 'border-stone-200 hover:border-stone-400 bg-stone-50 hover:bg-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-stone-400 block">
                            {pkg.category}
                          </span>
                          <h5 className="font-serif text-xs md:text-sm font-bold text-stone-900 line-clamp-2 leading-snug">
                            {pkg.name}
                          </h5>
                        </div>

                        <div className="space-y-1.5 mt-2">
                          <span className="text-[8px] font-mono text-stone-400 block">TARIF DASAR</span>
                          <span className="text-xs font-bold text-stone-950 block">
                            {formatIDR(pkg.price)}
                            <span className="text-[9px] font-normal text-stone-500">
                              {pkg.type === 'package' ? ' /pax' : pkg.type === 'rental' ? ' /hari' : ' /trip'}
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CALENDAR SELECT (JULY 2026) */}
            {booking.currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-stone-900">Pilih Tanggal Keberangkatan (Juli 2026)</h4>
                  <p className="text-stone-500 text-xs">
                    Pilih tanggal di bulan Juli 2026. Jadwal akhir pekan sudah penuh (Fully Booked) demi keamanan perjalanan berkabut.
                  </p>
                </div>

                {/* Interactive July 2026 mini calendar */}
                <div className="max-w-md mx-auto bg-white p-5 rounded-2xl border border-stone-200 shadow-md">
                  <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
                    <span className="font-serif font-bold text-base text-stone-900">JULI 2026</span>
                    <span className="text-[10px] font-mono tracking-wider text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase">
                      Active Booking Month
                    </span>
                  </div>

                  {/* Calendar Headers */}
                  <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-[10px] font-bold text-stone-400 font-mono">
                    <span>SEN</span>
                    <span>SEL</span>
                    <span>RAB</span>
                    <span>KAM</span>
                    <span>JUM</span>
                    <span>SAB</span>
                    <span>MIN</span>
                  </div>

                  {/* Calendar Grid Numbers */}
                  <div className="grid grid-cols-7 gap-1.5">
                    {renderCalendar()}
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-100/50 border border-rose-200 line-through" />
                      <span>Fully Booked</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span>Pilihan Anda</span>
                    </div>
                  </div>
                </div>

                {booking.date && (
                  <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-xl border border-emerald-100 text-xs text-center font-medium">
                    Tanggal terpilih: <span className="font-bold">{booking.date.split('-')[2]} Juli 2026</span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: QUANTITY COUNTER / SPECIAL VEHICLE LOGIC */}
            {booking.currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-stone-900">Tentukan Jumlah Peserta / Durasi Sewa</h4>
                  <p className="text-stone-500 text-xs">
                    {isRentalOrTransfer
                      ? 'Layanan kendaraan dihitung dengan tarif flat rate. Tentukan durasi sewa atau jumlah trip Anda.'
                      : 'Tentukan jumlah peserta dewasa dan anak-anak. Dapatkan diskon 30% khusus anak.'}
                  </p>
                </div>

                {/* Special Logic Switch */}
                {isRentalOrTransfer ? (
                  <div className="max-w-md mx-auto space-y-6 bg-stone-50 p-6 rounded-2xl border border-stone-200">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="block font-serif text-sm font-bold text-stone-900">Durasi Sewa</span>
                        <span className="block text-[11px] text-stone-500">Maksimum rental 30 hari</span>
                      </div>
                      <div className="flex items-center space-x-3.5">
                        <button
                          type="button"
                          onClick={() => setBooking((prev) => ({ ...prev, duration: Math.max(1, prev.duration - 1) }))}
                          className="w-8 h-8 rounded-full bg-white text-stone-800 border border-stone-200 flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-mono font-bold text-lg text-stone-900">{booking.duration}</span>
                        <button
                          type="button"
                          onClick={() => setBooking((prev) => ({ ...prev, duration: Math.min(30, prev.duration + 1) }))}
                          className="w-8 h-8 rounded-full bg-white text-stone-800 border border-stone-200 flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-stone-700 text-xs rounded-xl space-y-1">
                      <span className="block font-bold text-stone-950 uppercase text-[10px] tracking-wider font-mono">INFORMASI LOGISTIK ARMADA:</span>
                      <p className="text-stone-700">
                        {currentPackage.capacity || 'Kapasitas optimal sesuai unit pemesanan'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto space-y-6 bg-stone-50 p-6 rounded-2xl border border-stone-200">
                    {/* Adult Counter */}
                    <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                      <div className="space-y-0.5">
                        <span className="block font-serif text-sm font-bold text-stone-900">Peserta Dewasa</span>
                        <span className="block text-[10px] text-stone-400">Usia 12 tahun ke atas</span>
                      </div>
                      <div className="flex items-center space-x-3.5">
                        <button
                          type="button"
                          onClick={() => setBooking((prev) => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          className="w-8 h-8 rounded-full bg-white text-stone-800 border border-stone-200 flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-mono font-bold text-lg text-stone-900">{booking.adults}</span>
                        <button
                          type="button"
                          onClick={() => setBooking((prev) => ({ ...prev, adults: prev.adults + 1 }))}
                          className="w-8 h-8 rounded-full bg-white text-stone-800 border border-stone-200 flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Child Counter */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="block font-serif text-sm font-bold text-stone-900">Peserta Anak</span>
                        <span className="block text-[10px] text-stone-400">Usia 2 - 11 tahun (Diskon 30%)</span>
                      </div>
                      <div className="flex items-center space-x-3.5">
                        <button
                          type="button"
                          onClick={() => setBooking((prev) => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          className="w-8 h-8 rounded-full bg-white text-stone-800 border border-stone-200 flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-mono font-bold text-lg text-stone-900">{booking.children}</span>
                        <button
                          type="button"
                          onClick={() => setBooking((prev) => ({ ...prev, children: prev.children + 1 }))}
                          className="w-8 h-8 rounded-full bg-white text-stone-800 border border-stone-200 flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {booking.adults + booking.children >= 4 && (
                      <div className="p-3 bg-amber-500/10 text-amber-700 text-xs rounded-xl text-center font-medium border border-amber-500/20">
                        Selamat! Rombongan Anda mendapat **Diskon Grup Rp 150.000** 🎉
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: OPTIONAL ADD-ONS */}
            {booking.currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-stone-900">Tingkatkan Pengalaman Anda (Add-on Opsional)</h4>
                  <p className="text-stone-500 text-xs">Pilih fasilitas tambahan premium untuk menunjang kenyamanan maksimal.</p>
                </div>

                <div className="space-y-3.5" id="step4-addons-container">
                  {ADD_ONS.map((addOn) => {
                    const isSelected = booking.selectedAddOns.includes(addOn.id);
                    return (
                      <div
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`p-4 rounded-2xl border text-left cursor-pointer flex items-center justify-between transition-all duration-300 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500/20'
                            : 'border-stone-200 hover:border-stone-400 bg-stone-50 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="h-4.5 w-4.5 text-amber-500 rounded border-stone-300 focus:ring-amber-500"
                          />
                          <div className="space-y-0.5">
                            <span className="block text-xs md:text-sm font-serif font-bold text-stone-900">{addOn.name}</span>
                            <span className="block text-[10px] text-stone-400">Fasilitas Tambahan VIP</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs md:text-sm font-bold text-stone-900">
                          +{formatIDR(addOn.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: AUTOMATIC TRANSPARENT INVOICE */}
            {booking.currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-stone-900">Rincian Invoice Transparan</h4>
                  <p className="text-stone-500 text-xs">Rincian kalkulasi harga liburan Anda yang transparan tanpa biaya siluman.</p>
                </div>

                <div className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-200 space-y-4 max-w-xl mx-auto shadow-sm">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                    <div>
                      <span className="font-serif font-bold text-sm text-stone-900">yourhappinesstours</span>
                      <span className="block text-[9px] text-stone-400 font-mono">TAX INVOICE GENERATOR</span>
                    </div>
                    <span className="bg-amber-500/10 text-amber-600 font-mono text-[10px] font-bold py-1 px-3 rounded-full border border-amber-500/20">
                      Standard Price Guarantee
                    </span>
                  </div>

                  {/* Pricing Breakdown Lines */}
                  <div className="space-y-2.5 text-xs md:text-sm">
                    {/* Selected Item Line */}
                    <div className="flex justify-between text-stone-700">
                      <span>{currentPackage.name}</span>
                      <span className="font-semibold text-stone-950">
                        {isRentalOrTransfer
                          ? `${booking.duration} Hari/Trip × ${formatIDR(currentPackage.price)}`
                          : `${booking.adults} Dewasa × ${formatIDR(currentPackage.price)}`}
                      </span>
                    </div>

                    {/* Children pricing if packages and children present */}
                    {!isRentalOrTransfer && booking.children > 0 && (
                      <div className="flex justify-between text-stone-700">
                        <span>Anak-anak (Diskon 30% Terpasang)</span>
                        <span className="font-semibold text-stone-950">
                          {booking.children} Anak × {formatIDR(currentPackage.price * 0.7)}
                        </span>
                      </div>
                    )}

                    {/* Add-ons line items */}
                    {booking.selectedAddOns.map((id) => {
                      const item = ADD_ONS.find((a) => a.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between text-stone-600 italic">
                          <span>+ {item.name}</span>
                          <span className="font-semibold text-stone-950">{formatIDR(item.price)}</span>
                        </div>
                      );
                    })}

                    {/* Group Discount line */}
                    {invoice.groupDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>- Diskon Rombongan (Min. 4 Pax)</span>
                        <span className="font-bold">-{formatIDR(invoice.groupDiscount)}</span>
                      </div>
                    )}
                  </div>

                  {/* Grand total border box */}
                  <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
                    <span className="font-bold text-stone-900 text-sm md:text-base">TOTAL AKHIR</span>
                    <span className="font-serif text-lg md:text-xl font-extrabold text-amber-600">
                      {formatIDR(invoice.grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: PERSONAL INFORMATION FORM */}
            {booking.currentStep === 6 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-stone-900">Lengkapi Data Diri Pemesan</h4>
                  <p className="text-stone-500 text-xs">Isi data kontak aktif untuk keperluan verifikasi pengiriman voucher tour.</p>
                </div>

                <div className="space-y-4 max-w-md mx-auto" id="personal-info-fields">
                  {/* Name field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="user-full-name" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">Nama Lengkap</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <User className="w-4.5 h-4.5" />
                      </span>
                      <input
                        type="text"
                        id="user-full-name"
                        placeholder="Contoh: Budi Santoso"
                        value={booking.name}
                        onChange={(e) => {
                          setBooking((prev) => ({ ...prev, name: e.target.value }));
                          if (e.target.value.trim()) setValidationError('');
                        }}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 text-stone-900 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* WhatsApp field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="user-whatsapp-num" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">No. WhatsApp Aktif</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Phone className="w-4.5 h-4.5" />
                      </span>
                      <input
                        type="tel"
                        id="user-whatsapp-num"
                        placeholder="Contoh: 082277446609"
                        value={booking.whatsapp}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9+]/g, ''); // Numeric only
                          setBooking((prev) => ({ ...prev, whatsapp: val }));
                          if (val.trim().length >= 9) setValidationError('');
                        }}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 text-stone-900 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <span className="text-[10px] text-stone-400 font-sans block">Format: 08xx / 628xx. Penting untuk konfirmasi WhatsApp otomatis.</span>
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="user-email-address" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">Alamat Email</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-4.5 h-4.5" />
                      </span>
                      <input
                        type="email"
                        id="user-email-address"
                        placeholder="Contoh: budi@gmail.com"
                        value={booking.email}
                        onChange={(e) => {
                          setBooking((prev) => ({ ...prev, email: e.target.value }));
                          if (e.target.value.includes('@')) setValidationError('');
                        }}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 text-stone-900 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: PAYMENT SELECT & MIDTRANS INTEGRATION */}
            {booking.currentStep === 7 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-stone-900">Pilih Metode Pembayaran</h4>
                  <p className="text-stone-500 text-xs">Pilih skema deposit atau pelunasan instan aman bergaransi.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-2xl mx-auto">
                  {/* Left Column - Payment Type Selection */}
                  <div className="md:col-span-6 space-y-4">
                    <span className="text-[10px] font-mono tracking-wider text-stone-400 block uppercase font-bold">1. PILIH SKEMA PEMBAYARAN</span>
                    
                    {/* DP Option */}
                    <div
                      onClick={() => setBooking((prev) => ({ ...prev, paymentType: 'dp' }))}
                      className={`p-4 rounded-xl border cursor-pointer text-left transition-colors ${
                        booking.paymentType === 'dp'
                          ? 'border-amber-500 bg-amber-500/5'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                      }`}
                    >
                      <span className="block font-serif text-sm font-bold text-stone-900">Uang Muka / DP 30%</span>
                      <span className="block text-[10px] text-stone-500 mt-1">Sisa tagihan dibayarkan langsung saat tiba di Bali</span>
                      <span className="block font-mono text-xs font-bold text-amber-600 mt-2">
                        Bayar Sekarang: {formatIDR(invoice.dpAmount)}
                      </span>
                    </div>

                    {/* Full Payment Option */}
                    <div
                      onClick={() => setBooking((prev) => ({ ...prev, paymentType: 'full' }))}
                      className={`p-4 rounded-xl border cursor-pointer text-left transition-colors ${
                        booking.paymentType === 'full'
                          ? 'border-amber-500 bg-amber-500/5'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                      }`}
                    >
                      <span className="block font-serif text-sm font-bold text-stone-900">Full Payment (100%)</span>
                      <span className="block text-[10px] text-stone-500 mt-1">Lunas penuh tanpa pusing tagihan lanjutan saat mendarat</span>
                      <span className="block font-mono text-xs font-bold text-amber-600 mt-2">
                        Bayar Sekarang: {formatIDR(invoice.grandTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Right Column - Payment Channels & Midtrans */}
                  <div className="md:col-span-6 space-y-4 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                    <span className="text-[10px] font-mono tracking-wider text-stone-400 block uppercase font-bold">2. BAYAR VIA PAYMENT GATEWAY</span>
                    
                    <button
                      type="button"
                      onClick={() => setShowMidtransSim(true)}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wider cursor-pointer flex items-center justify-center space-x-2 transition-all ${
                        booking.isPaid
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10'
                          : 'bg-amber-500 text-stone-950 hover:bg-amber-600 hover:scale-[1.02]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{booking.isPaid ? 'SUKSES TERBAYAR (MIDTRANS)' : 'BAYAR VIA MIDTRANS SNAP'}</span>
                    </button>

                    {/* Bank backup info */}
                    <div className="pt-3 border-t border-stone-200 text-left space-y-2">
                      <span className="text-[9px] font-mono font-bold text-stone-400 tracking-wider block uppercase">CADANGAN TRANSFER REKENING:</span>
                      <div className="text-[11px] text-stone-600 space-y-1 bg-white p-3 rounded-lg border border-stone-100 font-sans">
                        <div className="flex items-center space-x-1">
                          <Building className="w-3 h-3 text-stone-400" />
                          <span className="font-bold">Bank BCA: 135-089-8822</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Building className="w-3 h-3 text-stone-400" />
                          <span className="font-bold">Bank Mandiri: 145-00-1122-3344</span>
                        </div>
                        <span className="block text-[9px] text-stone-400 italic mt-1">a.n. Nurrbalitravel Group</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: FINAL SUCCESS & REDIRECT */}
            {booking.currentStep === 8 && (
              <div className="space-y-6 text-center max-w-lg mx-auto" id="wizard-step8-success">
                <div className="flex flex-col items-center space-y-4">
                  {/* Giant animated checkbox */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="w-9 h-9 fill-emerald-50" />
                  </motion.div>

                  <h4 className="font-serif text-2xl font-bold text-stone-900">Registrasi Pemesanan Berhasil!</h4>
                  <p className="text-stone-500 text-xs max-w-md">
                    Sistem telah mencatatkan pemesanan premium Anda. Selesaikan langkah terakhir dengan mengirimkan konfirmasi langsung ke nomor WhatsApp admin kami.
                  </p>
                </div>

                {/* Booking receipt card */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-left space-y-3 font-sans text-xs md:text-sm">
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="font-bold text-stone-900">Detail Pemesanan</span>
                    <span className="font-mono text-amber-600 font-extrabold">{booking.bookingCode}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-stone-700">
                    <span>Nama Pemesan:</span>
                    <span className="font-semibold text-stone-950 text-right">{booking.name}</span>

                    <span>Paket/Layanan:</span>
                    <span className="font-semibold text-stone-950 text-right">{currentPackage.name}</span>

                    <span>Tanggal Tour:</span>
                    <span className="font-semibold text-stone-950 text-right">
                      {booking.date ? booking.date.split('-')[2] : ''} Juli 2026
                    </span>

                    <span>Total Tagihan:</span>
                    <span className="font-semibold text-stone-950 text-right">
                      {formatIDR(booking.paymentType === 'dp' ? invoice.dpAmount : invoice.grandTotal)}
                    </span>

                    <span>Status Bayar:</span>
                    <span className={`font-bold text-right ${booking.isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {booking.isPaid ? 'PAID VIA MIDTRANS' : 'PENDING (REK TRANSFER)'}
                    </span>
                  </div>
                </div>

                {/* Big green WhatsApp CTA */}
                <div className="pt-4">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-bold py-4 px-6 rounded-full text-sm tracking-widest shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                    id="whatsapp-confirm-btn"
                  >
                    <span>KONFIRMASI & KIRIM VIA WHATSAPP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] text-stone-400 block mt-2">
                    Anda akan dialihkan ke WhatsApp API secara otomatis untuk meluncurkan detail chat rapi ke admin.
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Wizard Bottom Navigation Footer Controls */}
        {booking.currentStep < 8 && (
          <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex justify-between items-center" id="wizard-nav-controls">
            {/* Back button */}
            <button
              type="button"
              disabled={booking.currentStep === 1}
              onClick={prevStep}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                booking.currentStep === 1
                  ? 'text-stone-300 border border-stone-200 cursor-not-allowed'
                  : 'text-stone-600 border border-stone-300 bg-white hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center space-x-1.5 px-6 py-2.5 bg-amber-500 text-stone-950 font-bold hover:bg-amber-600 rounded-full text-xs tracking-widest transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md shadow-amber-500/10 hover:shadow-amber-500/20"
            >
              <span>{booking.currentStep === 7 ? 'Selesai & Konfirmasi' : 'Lanjut'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
