import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Event, formatEventDate, formatTicketPrice } from '@/data/events';

interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const getBrandGlow = (brand: string) => {
    switch (brand) {
      case 'nova':
        return 'shadow-purple-500/30 hover:shadow-purple-500/50';
      case 'xforce':
        return 'shadow-red-500/30 hover:shadow-red-500/50';
      case 'live-moment':
        return 'shadow-yellow-500/30 hover:shadow-yellow-500/50';
      default:
        return 'shadow-white/20 hover:shadow-white/40';
    }
  };

  const getBrandBorder = (brand: string) => {
    switch (brand) {
      case 'nova':
        return 'border-purple-500/50 hover:border-purple-400';
      case 'xforce':
        return 'border-red-500/50 hover:border-red-400';
      case 'live-moment':
        return 'border-yellow-500/50 hover:border-yellow-400';
      default:
        return 'border-white/20 hover:border-white/50';
    }
  };

  const getBrandAccent = (brand: string) => {
    switch (brand) {
      case 'nova':
        return 'from-purple-500 to-purple-600';
      case 'xforce':
        return 'from-red-500 to-red-600';
      case 'live-moment':
        return 'from-yellow-500 to-amber-600';
      default:
        return 'from-white/80 to-white/60';
    }
  };

  const lowestPrice = Math.min(...event.tickets.map(t => t.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/events/${event.id}`}>
        <motion.div
          className={`relative group overflow-hidden rounded-2xl border bg-black/60 backdrop-blur-sm ${getBrandBorder(event.brand)} shadow-lg ${getBrandGlow(event.brand)} transition-all duration-500`}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          {/* Neon glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getBrandAccent(event.brand)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Status badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              event.status === 'upcoming' 
                ? 'bg-green-500/90 text-black' 
                : 'bg-gray-600/90 text-white'
            }`}>
              {event.status}
            </div>

            {/* Featured badge */}
            {event.featured && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-yellow-400 to-amber-500 text-black">
                Featured
              </div>
            )}

            {/* Category */}
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
              {event.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
              {event.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4">{event.subtitle}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Calendar size={14} className="text-gray-500" />
                {formatEventDate(event.date, event.endDate)}
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Clock size={14} className="text-gray-500" />
                {event.time}
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin size={14} className="text-gray-500" />
                {event.venue}, {event.city}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <p className="text-xs text-gray-500">Starting from</p>
                <p className={`text-lg font-bold bg-gradient-to-r ${getBrandAccent(event.brand)} bg-clip-text text-transparent`}>
                  {formatTicketPrice(lowestPrice)}
                </p>
              </div>
              <motion.div
                className={`flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${getBrandAccent(event.brand)} bg-clip-text text-transparent`}
                whileHover={{ x: 5 }}
              >
                View Details
                <ArrowRight size={16} />
              </motion.div>
            </div>
          </div>

          {/* Animated border glow */}
          <motion.div
            className={`absolute inset-0 rounded-2xl border-2 ${getBrandBorder(event.brand)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            style={{ pointerEvents: 'none' }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
