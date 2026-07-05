export interface TourPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  type: 'package' | 'rental' | 'transfer';
  image: string;
  category: string;
  duration: string;
  rating: number;
  capacity?: string;
  highlights?: string[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface BookingState {
  currentStep: number;
  selectedItem: string; // ID of TourPackage
  date: string; // YYYY-MM-DD (e.g. 2026-07-15)
  adults: number;
  children: number;
  duration: number; // for rental (days)
  selectedAddOns: string[]; // ids of AddOn
  name: string;
  whatsapp: string;
  email: string;
  paymentType: 'dp' | 'full'; // 'dp' (30%) or 'full' (100%)
  paymentMethod: 'midtrans' | 'bank';
  isPaid: boolean;
  bookingCode: string;
}

export const INITIAL_BOOKING_STATE: BookingState = {
  currentStep: 1,
  selectedItem: 'nusa-penida',
  date: '',
  adults: 2,
  children: 0,
  duration: 1,
  selectedAddOns: [],
  name: '',
  whatsapp: '',
  email: '',
  paymentType: 'dp',
  paymentMethod: 'midtrans',
  isPaid: false,
  bookingCode: '',
};

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'nusa-penida',
    name: 'Nusa Penida Premium Gateway',
    price: 1250000,
    description: 'Eksplorasi eksklusif pulau Nusa Penida. Nikmati keindahan Kelingking Beach, Broken Beach, dan Crystal Bay dengan pemandu privat dan makan siang di resort mewah tepi pantai.',
    type: 'package',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200',
    category: 'Luxury Day Trip',
    duration: '1 Hari (Full Day)',
    rating: 4.9,
    highlights: ['Kelingking Beach Viewpoint', 'Private Speedboat PP', 'Lunch at Luxury Beach Club', 'Private Transport & Driver']
  },
  {
    id: 'ubud-cultural',
    name: 'Ubud & Kintamani Scenic Escape',
    price: 950000,
    description: 'Selami kekayaan budaya Ubud dan pemandangan Gunung Batur yang megah di Kintamani. Mengunjungi Tegalalang Rice Terrace, Hutan Kera Ubud, dan Tirta Empul.',
    type: 'package',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
    category: 'Cultural & Nature',
    duration: '1 Hari (Full Day)',
    rating: 4.8,
    highlights: ['Tegalalang Rice Terrace', 'Kintamani Volcanic Buffet', 'Tirta Empul Holy Springs', 'Artisanal Wood Carving Village']
  },
  {
    id: 'uluwatu-sunset',
    name: 'Uluwatu Romantic Sunset Tour',
    price: 850000,
    description: 'Saksikan tarian Kecak legendaris dengan latar belakang matahari terbenam Samudra Hindia di tebing Uluwatu, dilanjutkan dengan makan malam seafood romantis di Jimbaran.',
    type: 'package',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1200',
    category: 'Romantic Escape',
    duration: '6 Jam (Half Day)',
    rating: 4.9,
    highlights: ['Uluwatu Temple Cliffside', 'Kecak Fire Dance Ticket', 'Seafood Dinner in Jimbaran', 'Scenic Sunset Views']
  },
  {
    id: 'bedugul-heritage',
    name: 'The Royal Bedugul Heritage',
    price: 900000,
    description: 'Jelajahi keindahan Danau Beratan dengan Pura Ulun Danu yang ikonik, Handara Gate yang megah, dan hutan pinus sejuk di Bedugul. Sangat menyegarkan pikiran.',
    type: 'package',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1200',
    category: 'Cultural & Nature',
    duration: '1 Hari (Full Day)',
    rating: 4.7,
    highlights: ['Ulun Danu Beratan Temple', 'Iconic Handara Gate Photo', 'Wanagiri Hidden Hills', 'Candi Kuning Fruit Market']
  },
  {
    id: 'car-zenix',
    name: 'Innova Zenix Premium Rental',
    price: 850000,
    description: 'Sewa mobil keluarga premium Toyota Innova Zenix model terbaru dengan supir pribadi, bensin, dan pelayanan ramah VIP untuk kenyamanan liburan Anda.',
    type: 'rental',
    image: '/images/innova_zenix_1783239511788.jpg', // Premium AI generated Innova Zenix
    category: 'Car Rental',
    duration: '12 Jam / Hari',
    rating: 4.9,
    capacity: 'Maks. 6 Penumpang (Kabin Luas)'
  },
  {
    id: 'car-alphard',
    name: 'Toyota Alphard Executive Rental',
    price: 2500000,
    description: 'Nikmati kemewahan berkendara tertinggi di Bali dengan Toyota Alphard. Termasuk supir eksekutif VIP, bensin, handuk dingin, dan air mineral premium.',
    type: 'rental',
    image: '/images/toyota_alphard_1783239523444.jpg', // Luxury AI generated Toyota Alphard
    category: 'Car Rental',
    duration: '12 Jam / Hari',
    rating: 5.0,
    capacity: 'Maks. 5 Penumpang (Captain Seat)'
  },
  {
    id: 'car-brio',
    name: 'Honda Brio Daily Rental',
    price: 350000,
    description: 'Mobil kompak lincah, sangat cocok untuk menyusuri jalanan Bali yang menantang dan area parkir perkotaan. Sangat hemat bahan bakar dan nyaman.',
    type: 'rental',
    image: '/images/honda_brio_1783239536615.jpg', // Compact AI generated Honda Brio
    category: 'Car Rental',
    duration: '24 Jam / Hari (Lepas Kunci)',
    rating: 4.6,
    capacity: 'Maks. 4 Penumpang'
  },
  {
    id: 'motor-nmax',
    name: 'Yamaha Nmax Premium Rental',
    price: 200000,
    description: 'Sewa motor matic bongsor premium dengan jok empuk dan performa tangguh. Dilengkapi dengan 2 helm SNI bersih dan jas hujan.',
    type: 'rental',
    image: '/images/yamaha_nmax_1783239549881.jpg', // Premium AI generated Yamaha Nmax
    category: 'Motorbike Rental',
    duration: '24 Jam / Hari',
    rating: 4.8,
    capacity: 'Kapasitas 2 Orang'
  },
  {
    id: 'motor-vespa',
    name: 'Vespa Sprint Luxury Rental',
    price: 150000,
    description: 'Jelajahi jalanan estetik Seminyak, Canggu, dan Ubud dengan gaya retro modern. Dilengkapi dengan 2 helm retro premium.',
    type: 'rental',
    image: '/images/vespa_sprint_1783239562114.jpg', // Retro AI generated Vespa Sprint
    category: 'Motorbike Rental',
    duration: '24 Jam / Hari',
    rating: 4.7,
    capacity: 'Kapasitas 2 Orang'
  },
  {
    id: 'airport-transfer',
    name: 'Airport Transfer Executive Ngurah Rai',
    price: 300000,
    description: 'Layanan antar-jemput VIP Bandara Ngurah Rai Bali ke hotel tempat Anda menginap di area Bali Selatan/Tengah. Dilengkapi supir berpengalaman.',
    type: 'transfer',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=1200', // Airport / premium arrival representation
    category: 'Airport Transfer',
    duration: 'Satu Arah (One-Way)',
    rating: 4.9,
    capacity: 'Maks. 5 Penumpang + Bagasi'
  }
];

export const ADD_ONS: AddOn[] = [
  { id: 'extra-hotel', name: 'Malam Extra Hotel', price: 450000 },
  { id: 'airport-pp', name: 'Airport Transfer PP', price: 250000 },
  { id: 'guide-photo', name: 'Private Guide & Fotografer', price: 350000 }
];
