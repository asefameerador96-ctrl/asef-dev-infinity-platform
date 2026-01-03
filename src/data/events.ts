// Events Data for Infinity

export type EventStatus = 'upcoming' | 'past';
export type TicketType = 'general' | 'vip' | 'vvip' | 'platinum';

export interface ScheduleBlock {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

export interface TicketInfo {
  type: TicketType;
  name: string;
  price: number;
  benefits: string[];
  available: number;
}

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  image: string;
  bannerImage: string;
  status: EventStatus;
  brand: 'nova' | 'xforce' | 'live-moment' | 'infinity';
  category: string;
  schedule: ScheduleBlock[];
  tickets: TicketInfo[];
  featured: boolean;
  mapUrl: string;
}

export const events: Event[] = [
  {
    id: 'nova-launch-2026',
    title: 'NOVA Universe Launch',
    subtitle: 'The Future Begins Here',
    description: 'Experience the grand unveiling of Nova\'s 2026 collection at Bashundhara Convention Center.',
    longDescription: `Join us for an extraordinary evening as NOVA unveils its most ambitious collection yet. The Universe Launch will showcase cutting-edge designs that push the boundaries of luxury streetwear.

This exclusive event brings together fashion enthusiasts, industry leaders, and celebrities for a night of innovation and style. Witness live runway shows, interactive installations, and be the first to shop the new collection.

The evening will feature special performances, gourmet dining, and exclusive networking opportunities with the NOVA design team.`,
    date: '2026-02-15',
    time: '7:00 PM',
    venue: 'Bashundhara Convention Center',
    address: 'Kuril, Dhaka-1229',
    city: 'Dhaka',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920',
    status: 'upcoming',
    brand: 'nova',
    category: 'Launch Event',
    featured: true,
    mapUrl: 'https://maps.google.com/?q=Bashundhara+Convention+Center+Dhaka',
    schedule: [
      { time: '7:00 PM', title: 'Red Carpet & Welcome', description: 'Guest arrival and cocktail reception', speaker: '' },
      { time: '8:00 PM', title: 'Opening Ceremony', description: 'Welcome address and brand vision presentation', speaker: 'CEO, NOVA' },
      { time: '8:30 PM', title: 'Runway Show', description: 'Universe Collection showcase', speaker: '' },
      { time: '9:30 PM', title: 'Live Performance', description: 'Special musical performance', speaker: 'TBA Artist' },
      { time: '10:00 PM', title: 'Collection Preview', description: 'Exclusive first access to shop the collection', speaker: '' },
      { time: '11:00 PM', title: 'After Party', description: 'DJ set and networking', speaker: '' },
    ],
    tickets: [
      { type: 'general', name: 'General Admission', price: 5000, benefits: ['Event access', 'Welcome drink', 'Collection preview'], available: 200 },
      { type: 'vip', name: 'VIP Pass', price: 15000, benefits: ['Priority seating', 'Exclusive lounge access', 'Complimentary dinner', 'Gift bag', 'Meet & greet'], available: 50 },
      { type: 'vvip', name: 'VVIP Experience', price: 35000, benefits: ['Front row seating', 'Private lounge', 'Premium dinner', 'Exclusive merchandise', 'After party access', 'Personal concierge'], available: 20 },
      { type: 'platinum', name: 'Platinum Table (8 guests)', price: 200000, benefits: ['Reserved table', 'All VVIP benefits', 'Brand ambassador meeting', 'Exclusive collection preview', 'Complimentary merchandise'], available: 5 },
    ],
  },
  {
    id: 'xforce-championship-2026',
    title: 'XFORCE Championship Night',
    subtitle: 'Where Legends Are Made',
    description: 'The ultimate gaming and esports championship at Radisson Blu Dhaka.',
    longDescription: `XFORCE Championship Night brings together the best gamers and esports enthusiasts for an electrifying competition. This premiere gaming event features multiple tournament brackets, pro-player exhibitions, and exclusive reveals.

Experience cutting-edge gaming setups, participate in open tournaments, and witness epic battles between top-tier players. The event showcases XFORCE's commitment to gaming culture and competitive excellence.

Special attractions include gaming peripherals showcase, pro-gamer meet and greets, and exclusive merchandise drops.`,
    date: '2026-03-22',
    time: '4:00 PM',
    venue: 'Radisson Blu Dhaka Water Garden',
    address: 'Airport Road, Dhaka',
    city: 'Dhaka',
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920',
    status: 'upcoming',
    brand: 'xforce',
    category: 'Championship',
    featured: true,
    mapUrl: 'https://maps.google.com/?q=Radisson+Blu+Dhaka+Water+Garden',
    schedule: [
      { time: '4:00 PM', title: 'Registration & Setup', description: 'Check-in and tournament registration', speaker: '' },
      { time: '5:00 PM', title: 'Opening Ceremony', description: 'XFORCE Championship inauguration', speaker: 'XFORCE Team' },
      { time: '5:30 PM', title: 'Qualifier Rounds', description: 'Initial tournament brackets', speaker: '' },
      { time: '7:00 PM', title: 'Pro Exhibition Match', description: 'Professional players showcase', speaker: 'Pro Gaming Team' },
      { time: '8:00 PM', title: 'Semi-Finals', description: 'Top competitors battle', speaker: '' },
      { time: '9:30 PM', title: 'Grand Finals', description: 'Championship final match', speaker: '' },
      { time: '10:30 PM', title: 'Award Ceremony', description: 'Winners announcement and prizes', speaker: '' },
    ],
    tickets: [
      { type: 'general', name: 'Spectator Pass', price: 2000, benefits: ['Event access', 'Viewing area', 'XFORCE merchandise discount'], available: 500 },
      { type: 'vip', name: 'Competitor Pass', price: 5000, benefits: ['Tournament entry', 'Gaming station access', 'Competitor kit', 'Practice sessions'], available: 128 },
      { type: 'vvip', name: 'Pro Lounge Access', price: 20000, benefits: ['Premium viewing', 'Pro player meet & greet', 'Exclusive merchandise', 'Gaming gear showcase', 'Dinner included'], available: 30 },
    ],
  },
  {
    id: 'live-moment-beach-festival',
    title: 'Live The Moment Beach Festival',
    subtitle: 'Sunset Sessions by the Sea',
    description: 'Three days of music, art, and lifestyle at Cox\'s Bazar.',
    longDescription: `Escape to the world's longest natural sea beach for an unforgettable three-day festival. Live The Moment Beach Festival combines music, art, fashion, and wellness into one spectacular experience.

Featuring international DJs, live bands, art installations, beach yoga sessions, and exclusive pop-up shops. The festival celebrates the brand's philosophy of living in the present moment.

Premium beach cabanas, sunset parties, and exclusive brand experiences await you at this coastal paradise.`,
    date: '2026-04-10',
    endDate: '2026-04-12',
    time: '12:00 PM',
    venue: 'Inani Beach Resort',
    address: 'Inani, Cox\'s Bazar',
    city: 'Cox\'s Bazar',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920',
    status: 'upcoming',
    brand: 'live-moment',
    category: 'Festival',
    featured: true,
    mapUrl: 'https://maps.google.com/?q=Inani+Beach+Cox+Bazar',
    schedule: [
      { time: '12:00 PM', title: 'Festival Gates Open', description: 'Welcome to the beach', speaker: '' },
      { time: '2:00 PM', title: 'Beach Yoga & Wellness', description: 'Guided meditation and yoga session', speaker: 'Wellness Expert' },
      { time: '4:00 PM', title: 'Art Walk', description: 'Interactive art installations tour', speaker: '' },
      { time: '6:00 PM', title: 'Sunset Session', description: 'DJ set with ocean views', speaker: 'Various Artists' },
      { time: '8:00 PM', title: 'Main Stage Performance', description: 'Headline act', speaker: 'TBA Headliner' },
      { time: '10:00 PM', title: 'Beach Bonfire', description: 'Acoustic sessions and chill vibes', speaker: '' },
    ],
    tickets: [
      { type: 'general', name: 'Day Pass', price: 3500, benefits: ['Single day access', 'Beach activities', 'Pop-up shop access'], available: 1000 },
      { type: 'vip', name: '3-Day Festival Pass', price: 8000, benefits: ['Full festival access', 'Priority entry', 'Exclusive merchandise', 'Lounge access'], available: 500 },
      { type: 'vvip', name: 'VIP Beach Cabana', price: 50000, benefits: ['Private cabana', 'Butler service', 'All meals included', 'Artist meet & greet', 'Spa access'], available: 20 },
      { type: 'platinum', name: 'Platinum Beach House (10 guests)', price: 300000, benefits: ['Private beach house', 'All VVIP benefits', 'Private chef', 'Yacht trip', 'Exclusive party'], available: 5 },
    ],
  },
  {
    id: 'infinity-gala-2026',
    title: 'INFINITY Annual Gala',
    subtitle: 'A Night of Infinite Possibilities',
    description: 'The most prestigious fashion and lifestyle gala at InterContinental Dhaka.',
    longDescription: `The INFINITY Annual Gala brings together all three brands for one spectacular evening. This black-tie event celebrates the year's achievements and previews upcoming innovations.

Experience runway shows from Nova, XFORCE, and Live The Moment, along with exclusive collaborations and limited edition releases. The gala features celebrity appearances, live entertainment, and gourmet dining.

This is the event of the year for INFINITY's most valued customers and partners.`,
    date: '2026-05-20',
    time: '7:00 PM',
    venue: 'InterContinental Dhaka',
    address: '1 Minto Road, Dhaka',
    city: 'Dhaka',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1920',
    status: 'upcoming',
    brand: 'infinity',
    category: 'Gala',
    featured: true,
    mapUrl: 'https://maps.google.com/?q=InterContinental+Dhaka',
    schedule: [
      { time: '7:00 PM', title: 'Champagne Reception', description: 'Welcome cocktails on the terrace', speaker: '' },
      { time: '8:00 PM', title: 'Grand Opening', description: 'INFINITY vision and year in review', speaker: 'INFINITY Founders' },
      { time: '8:30 PM', title: 'Nova Showcase', description: 'Exclusive collection preview', speaker: '' },
      { time: '9:00 PM', title: 'XFORCE Showcase', description: 'Gaming lifestyle collection', speaker: '' },
      { time: '9:30 PM', title: 'Live The Moment Showcase', description: 'Beach and lifestyle collection', speaker: '' },
      { time: '10:00 PM', title: 'Gala Dinner', description: 'Seven-course culinary experience', speaker: '' },
      { time: '11:30 PM', title: 'Awards & Recognition', description: 'Celebrating our community', speaker: '' },
      { time: '12:00 AM', title: 'Grand Ball', description: 'Dancing and celebration', speaker: '' },
    ],
    tickets: [
      { type: 'vip', name: 'Individual Ticket', price: 25000, benefits: ['Gala access', 'Full dinner', 'Gift bag', 'Collection preview'], available: 200 },
      { type: 'vvip', name: 'Couple Package', price: 45000, benefits: ['Priority seating', 'Champagne table', 'Exclusive gifts', 'VIP lounge', 'After party'], available: 50 },
      { type: 'platinum', name: 'Corporate Table (10 guests)', price: 400000, benefits: ['Premium table', 'Brand recognition', 'All VVIP benefits', 'Private meeting room', 'Custom gift selection'], available: 10 },
    ],
  },
  {
    id: 'nova-chittagong-pop-up',
    title: 'NOVA Pop-up Experience',
    subtitle: 'Luxury Comes to Chittagong',
    description: 'Exclusive three-day pop-up store at Peninsula Chittagong.',
    longDescription: `NOVA brings its signature luxury experience to Chittagong for the first time. This exclusive pop-up features the complete 2026 collection, personalized styling sessions, and limited edition pieces.

Meet the Nova design team, enjoy exclusive previews, and be the first in Chittagong to access the newest releases. The pop-up includes interactive brand experiences and special launch offers.`,
    date: '2026-06-05',
    endDate: '2026-06-07',
    time: '11:00 AM',
    venue: 'Peninsula Chittagong',
    address: 'Bulbul Center, O.R. Nizam Road',
    city: 'Chittagong',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1920',
    status: 'upcoming',
    brand: 'nova',
    category: 'Pop-up Store',
    featured: false,
    mapUrl: 'https://maps.google.com/?q=Peninsula+Chittagong',
    schedule: [
      { time: '11:00 AM', title: 'Doors Open', description: 'Browse the collection', speaker: '' },
      { time: '2:00 PM', title: 'Styling Session', description: 'Personal styling consultation', speaker: 'Nova Style Team' },
      { time: '4:00 PM', title: 'Designer Talk', description: 'Meet the design team', speaker: 'Nova Design Director' },
      { time: '6:00 PM', title: 'Evening Preview', description: 'Exclusive evening collection', speaker: '' },
    ],
    tickets: [
      { type: 'general', name: 'Free Entry', price: 0, benefits: ['Store access', 'Collection browsing', 'Refreshments'], available: 500 },
      { type: 'vip', name: 'VIP Styling Session', price: 5000, benefits: ['1-hour personal styling', 'Exclusive discount', 'Gift bag', 'Priority access'], available: 30 },
    ],
  },
  {
    id: 'xforce-sylhet-gaming',
    title: 'XFORCE Gaming Meetup',
    subtitle: 'Level Up in Sylhet',
    description: 'Community gaming event at Rose View Hotel Sylhet.',
    longDescription: `XFORCE brings competitive gaming to Sylhet! Join fellow gamers for casual tournaments, pro-player meet and greets, and exclusive merchandise drops.

Experience the latest gaming gear, participate in community matches, and connect with the XFORCE gaming community. Open to all skill levels!`,
    date: '2026-07-15',
    time: '3:00 PM',
    venue: 'Rose View Hotel',
    address: 'Shahjalal Upashahar',
    city: 'Sylhet',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=1920',
    status: 'upcoming',
    brand: 'xforce',
    category: 'Gaming Meetup',
    featured: false,
    mapUrl: 'https://maps.google.com/?q=Rose+View+Hotel+Sylhet',
    schedule: [
      { time: '3:00 PM', title: 'Check-in', description: 'Registration and setup', speaker: '' },
      { time: '4:00 PM', title: 'Community Tournament', description: 'Open bracket tournament', speaker: '' },
      { time: '6:00 PM', title: 'Pro Showcase', description: 'Watch professional gameplay', speaker: 'Pro Players' },
      { time: '7:30 PM', title: 'Awards & Closing', description: 'Prizes and merchandise giveaway', speaker: '' },
    ],
    tickets: [
      { type: 'general', name: 'Spectator', price: 500, benefits: ['Event access', 'Snacks', 'Merchandise discount'], available: 200 },
      { type: 'vip', name: 'Tournament Entry', price: 1500, benefits: ['Tournament participation', 'XFORCE t-shirt', 'Prizes for winners'], available: 64 },
    ],
  },
  // Past Events
  {
    id: 'infinity-launch-2025',
    title: 'INFINITY Brand Launch',
    subtitle: 'The Beginning of Everything',
    description: 'The historic launch of INFINITY at BICC Dhaka.',
    longDescription: `On December 10, 2025, INFINITY made history with its grand launch at the Bangladesh International Convention Center. This landmark event introduced all three brands to the world.

The evening featured spectacular performances, celebrity appearances, and the unveiling of inaugural collections from Nova, XFORCE, and Live The Moment.`,
    date: '2025-12-10',
    time: '6:00 PM',
    venue: 'BICC (Bangladesh International Convention Center)',
    address: 'Agargaon, Dhaka',
    city: 'Dhaka',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920',
    status: 'past',
    brand: 'infinity',
    category: 'Launch Event',
    featured: false,
    mapUrl: 'https://maps.google.com/?q=BICC+Dhaka',
    schedule: [
      { time: '6:00 PM', title: 'Red Carpet', description: 'Celebrity arrivals', speaker: '' },
      { time: '7:00 PM', title: 'Brand Unveiling', description: 'The birth of INFINITY', speaker: 'Founders' },
      { time: '8:00 PM', title: 'Collection Reveals', description: 'All three brands showcase', speaker: '' },
      { time: '10:00 PM', title: 'Celebration Party', description: 'Live music and festivities', speaker: '' },
    ],
    tickets: [
      { type: 'general', name: 'Launch Pass', price: 10000, benefits: ['Full event access', 'Dinner', 'Launch merchandise'], available: 0 },
    ],
  },
  {
    id: 'live-moment-sunset-2025',
    title: 'Sunset Sessions Vol. 1',
    subtitle: 'The First Sunset',
    description: 'Inaugural beach party at Laboni Beach, Cox\'s Bazar.',
    longDescription: `The first ever Live The Moment Sunset Session was a magical evening on Laboni Beach. Guests enjoyed live DJs, beach activities, and the most spectacular sunset views.

This event set the tone for the brand's commitment to creating unforgettable moments.`,
    date: '2025-11-20',
    time: '4:00 PM',
    venue: 'Laboni Beach',
    address: 'Cox\'s Bazar Seafront',
    city: 'Cox\'s Bazar',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800',
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920',
    status: 'past',
    brand: 'live-moment',
    category: 'Beach Party',
    featured: false,
    mapUrl: 'https://maps.google.com/?q=Laboni+Beach+Cox+Bazar',
    schedule: [
      { time: '4:00 PM', title: 'Beach Gates Open', description: 'Welcome to paradise', speaker: '' },
      { time: '5:30 PM', title: 'Sunset Session', description: 'DJ set as the sun sets', speaker: 'DJ Collective' },
      { time: '8:00 PM', title: 'Bonfire Party', description: 'Beach bonfire and acoustic music', speaker: '' },
    ],
    tickets: [
      { type: 'general', name: 'Beach Pass', price: 2500, benefits: ['Beach access', 'Drinks', 'Beach activities'], available: 0 },
    ],
  },
];

export const getEventById = (id: string): Event | undefined => {
  return events.find(e => e.id === id);
};

export const getUpcomingEvents = (): Event[] => {
  return events.filter(e => e.status === 'upcoming');
};

export const getPastEvents = (): Event[] => {
  return events.filter(e => e.status === 'past');
};

export const getFeaturedEvents = (): Event[] => {
  return events.filter(e => e.featured);
};

export const getEventsByBrand = (brand: string): Event[] => {
  return events.filter(e => e.brand === brand);
};

export const formatEventDate = (date: string, endDate?: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  const start = new Date(date).toLocaleDateString('en-US', options);
  if (endDate) {
    const end = new Date(endDate).toLocaleDateString('en-US', options);
    return `${start} - ${end}`;
  }
  return start;
};

export const formatTicketPrice = (price: number): string => {
  if (price === 0) return 'Free';
  return `৳${price.toLocaleString('en-BD')}`;
};
