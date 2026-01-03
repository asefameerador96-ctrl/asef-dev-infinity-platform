import { motion } from 'framer-motion';

type FilterType = 'all' | 'upcoming' | 'past';

interface EventFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const EventFilters = ({ activeFilter, onFilterChange }: EventFiltersProps) => {
  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`relative px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
            activeFilter === filter.id
              ? 'text-black'
              : 'text-gray-400 hover:text-white border border-white/20 hover:border-white/40'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeFilter === filter.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{filter.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default EventFilters;
