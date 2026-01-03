import { motion } from "framer-motion";
import { Brand, getBrandDisplayName } from "@/data/products";

interface BrandTabsProps {
  activeBrand: Brand;
  onBrandChange: (brand: Brand) => void;
}

const brands: Brand[] = ['nova', 'xforce', 'live-moment'];

const brandStyles: Record<Brand, { gradient: string; glow: string; border: string }> = {
  'nova': {
    gradient: 'from-purple-500 to-purple-700',
    glow: 'shadow-purple-500/50',
    border: 'border-purple-500',
  },
  'xforce': {
    gradient: 'from-red-500 to-red-700',
    glow: 'shadow-red-500/50',
    border: 'border-red-500',
  },
  'live-moment': {
    gradient: 'from-yellow-500 to-amber-600',
    glow: 'shadow-yellow-500/50',
    border: 'border-yellow-500',
  },
};

const BrandTabs = ({ activeBrand, onBrandChange }: BrandTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {brands.map((brand) => {
        const isActive = activeBrand === brand;
        const styles = brandStyles[brand];
        
        return (
          <motion.button
            key={brand}
            onClick={() => onBrandChange(brand)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`relative px-8 py-4 rounded-2xl font-display font-bold text-lg transition-all overflow-hidden ${
              isActive 
                ? `bg-gradient-to-r ${styles.gradient} text-white shadow-lg ${styles.glow}` 
                : `glass border ${styles.border}/30 hover:${styles.border}`
            }`}
          >
            {/* Animated background */}
            {isActive && (
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, white 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, white 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, white 0%, transparent 50%)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}
            
            <span className="relative z-10">{getBrandDisplayName(brand)}</span>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="brandIndicator"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-white"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default BrandTabs;
