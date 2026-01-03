import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, Clock, MapPin, ArrowLeft, Ticket, Users, Check, ExternalLink } from 'lucide-react';
import InfinityNav from '@/components/infinity/InfinityNav';
import InfinityFooter from '@/components/infinity/InfinityFooter';
import { getEventById, formatEventDate, formatTicketPrice, TicketInfo } from '@/data/events';
import { Button } from '@/components/ui/button';

const EventDetail = () => {
  const { eventId } = useParams();
  const event = getEventById(eventId || '');
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketInfo | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Experience Not Found</h1>
          <Link to="/events" className="text-purple-400 hover:underline">
            Back to Experiences
          </Link>
        </div>
      </div>
    );
  }

  const getBrandGradient = (brand: string) => {
    switch (brand) {
      case 'nova': return 'from-purple-500 to-purple-600';
      case 'xforce': return 'from-red-500 to-red-600';
      case 'live-moment': return 'from-yellow-500 to-amber-600';
      default: return 'from-white to-gray-300';
    }
  };

  const getBrandAccent = (brand: string) => {
    switch (brand) {
      case 'nova': return 'border-purple-500 text-purple-400';
      case 'xforce': return 'border-red-500 text-red-400';
      case 'live-moment': return 'border-yellow-500 text-yellow-400';
      default: return 'border-white text-white';
    }
  };

  const getTicketBg = (type: string) => {
    switch (type) {
      case 'general': return 'from-gray-800 to-gray-900 border-gray-600';
      case 'vip': return 'from-purple-900/50 to-purple-950/50 border-purple-500/50';
      case 'vvip': return 'from-yellow-900/30 to-amber-950/30 border-yellow-500/50';
      case 'platinum': return 'from-white/10 to-white/5 border-white/50';
      default: return 'from-gray-800 to-gray-900 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <InfinityNav />
      
      {/* Hero Banner */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10" />
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          className="absolute inset-0 flex items-end z-20 pb-16"
          style={{ opacity: heroOpacity, y: contentY }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            {/* Back button */}
            <Link 
              to="/events"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Experiences
            </Link>

            {/* Event info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                event.status === 'upcoming' 
                  ? 'bg-green-500/90 text-black' 
                  : 'bg-gray-600/90 text-white'
              }`}>
                {event.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/70 text-white">
                {event.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-gradient-to-r ${getBrandGradient(event.brand)} text-white`}>
                {event.brand}
              </span>
            </div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {event.title}
            </motion.h1>
            
            <motion.p 
              className={`text-2xl md:text-3xl font-light bg-gradient-to-r ${getBrandGradient(event.brand)} bg-clip-text text-transparent`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {event.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Event Details */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className={`p-6 rounded-xl border ${getBrandAccent(event.brand)} bg-white/5`}>
                  <Calendar className="w-8 h-8 mb-3" />
                  <p className="text-gray-400 text-sm mb-1">Date</p>
                  <p className="text-white font-semibold">{formatEventDate(event.date, event.endDate)}</p>
                </div>
                <div className={`p-6 rounded-xl border ${getBrandAccent(event.brand)} bg-white/5`}>
                  <Clock className="w-8 h-8 mb-3" />
                  <p className="text-gray-400 text-sm mb-1">Time</p>
                  <p className="text-white font-semibold">{event.time}</p>
                </div>
                <div className={`p-6 rounded-xl border ${getBrandAccent(event.brand)} bg-white/5`}>
                  <MapPin className="w-8 h-8 mb-3" />
                  <p className="text-gray-400 text-sm mb-1">Location</p>
                  <p className="text-white font-semibold">{event.city}</p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">About This Event</h2>
                <div className="prose prose-invert max-w-none">
                  {event.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-300 text-lg leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Venue */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Venue</h2>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">{event.venue}</h3>
                  <p className="text-gray-400 mb-4">{event.address}</p>
                  <a 
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${getBrandAccent(event.brand).split(' ')[1]} hover:underline`}
                  >
                    <ExternalLink size={16} />
                    View on Google Maps
                  </a>
                </div>
              </motion.div>

              {/* Schedule */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Event Schedule</h2>
                <div className="space-y-4">
                  {event.schedule.map((block, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6 items-start"
                    >
                      <div className={`w-24 shrink-0 text-right font-mono font-bold bg-gradient-to-r ${getBrandGradient(event.brand)} bg-clip-text text-transparent`}>
                        {block.time}
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-white/20 pl-6 relative">
                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r ${getBrandGradient(event.brand)}`} />
                        <h4 className="text-lg font-semibold text-white mb-1">{block.title}</h4>
                        <p className="text-gray-400">{block.description}</p>
                        {block.speaker && (
                          <p className="text-sm text-gray-500 mt-2">
                            <Users size={14} className="inline mr-1" />
                            {block.speaker}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tickets Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-24"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Ticket className="w-6 h-6" />
                  Tickets
                </h2>

                <div className="space-y-4">
                  {event.tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.type}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => ticket.available > 0 && setSelectedTicket(ticket)}
                      className={`p-6 rounded-xl border bg-gradient-to-br ${getTicketBg(ticket.type)} cursor-pointer transition-all duration-300 ${
                        selectedTicket?.type === ticket.type 
                          ? 'ring-2 ring-white scale-105' 
                          : 'hover:scale-102 hover:border-white/50'
                      } ${ticket.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{ticket.name}</h3>
                          {ticket.available > 0 ? (
                            <p className="text-xs text-green-400">{ticket.available} available</p>
                          ) : (
                            <p className="text-xs text-red-400">Sold Out</p>
                          )}
                        </div>
                        <p className={`text-2xl font-bold bg-gradient-to-r ${getBrandGradient(event.brand)} bg-clip-text text-transparent`}>
                          {formatTicketPrice(ticket.price)}
                        </p>
                      </div>
                      
                      <ul className="space-y-2">
                        {ticket.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                            <Check size={14} className="text-green-400" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {event.status === 'upcoming' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                  >
                    <Button
                      className={`w-full py-6 text-lg font-bold rounded-xl bg-gradient-to-r ${getBrandGradient(event.brand)} hover:opacity-90 transition-opacity`}
                      disabled={!selectedTicket}
                    >
                      {selectedTicket ? `Buy ${selectedTicket.name}` : 'Select a Ticket'}
                    </Button>
                    <p className="text-center text-gray-500 text-sm mt-3">
                      Secure checkout • Instant confirmation
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <InfinityFooter />
    </div>
  );
};

export default EventDetail;
