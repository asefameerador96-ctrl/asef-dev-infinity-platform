import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import novaBrandVideo from "@/assets/nova-brand.mp4";
import liveMomentBrandVideo from "@/assets/live-moment-brand.mp4";
import xforceBrandVideo from "@/assets/xforce-brand.mp4";

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    color: string;
    path: string;
    stats: { label: string; value: string }[];
  };
  index: number;
}

const brandVideos: Record<string, string> = {
  'nova': novaBrandVideo,
  'xforce': xforceBrandVideo,
  'live-moment': liveMomentBrandVideo,
};

const BrandCard = ({ brand, index }: BrandCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);

  const getGradientClass = () => {
    switch (brand.color) {
      case 'nova': return 'text-gradient-nova';
      case 'xforce': return 'text-gradient-xforce';
      case 'live-moment': return 'text-gradient-live';
      default: return 'text-gradient';
    }
  };

  const getBorderClass = () => {
    switch (brand.color) {
      case 'nova': return 'border-nova/30 hover:border-nova/60';
      case 'xforce': return 'border-xforce/30 hover:border-xforce/60';
      case 'live-moment': return 'border-live-moment/30 hover:border-live-moment/60';
      default: return 'border-primary/30 hover:border-primary/60';
    }
  };

  const getGlowClass = () => {
    switch (brand.color) {
      case 'nova': return 'shadow-[0_0_60px_hsl(320,100%,60%,0.3)]';
      case 'xforce': return 'shadow-[0_0_60px_hsl(210,100%,60%,0.3)]';
      case 'live-moment': return 'shadow-[0_0_60px_hsl(45,100%,50%,0.3)]';
      default: return '';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="sticky top-32"
    >
      <Link to={brand.path}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`glass relative overflow-hidden rounded-3xl border ${getBorderClass()} ${getGlowClass()} transition-all duration-500 group`}
        >
          <div className="p-8 md:p-12 lg:p-16 grid md:grid-cols-2 gap-8 items-center min-h-[400px]">
            {/* Left Content */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-sm font-mono text-muted-foreground mb-4 block"
              >
                0{index + 1}
              </motion.span>
              
              <h3 className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold ${getGradientClass()}`}>
                {brand.name}
              </h3>
              
              <p className="text-xl text-foreground/80 mt-4 font-light">
                {brand.tagline}
              </p>
              
              <p className="text-muted-foreground mt-4 max-w-md">
                {brand.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {brand.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`font-display text-2xl font-bold ${getGradientClass()}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <motion.div
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all"
              >
                Explore Brand
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.div>
            </div>

            {/* Right - Video Visual */}
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <motion.div 
                style={{ scale: videoScale }}
                className="absolute inset-0"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={brandVideos[brand.color]} type="video/mp4" />
                </video>
              </motion.div>
              
              {/* Overlay gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t 
                ${brand.color === 'nova' ? 'from-nova/20 to-transparent' : ''}
                ${brand.color === 'xforce' ? 'from-xforce/20 to-transparent' : ''}
                ${brand.color === 'live-moment' ? 'from-live-moment/20 to-transparent' : ''}
              `} />
              
              {/* Animated ring overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity }
                  }}
                  className={`w-32 h-32 rounded-full border-2 opacity-50
                    ${brand.color === 'nova' ? 'border-nova' : ''}
                    ${brand.color === 'xforce' ? 'border-xforce' : ''}
                    ${brand.color === 'live-moment' ? 'border-live-moment' : ''}
                  `}
                />
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-4 right-8 font-display text-[150px] font-bold text-foreground/[0.02] select-none pointer-events-none">
            0{index + 1}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default BrandCard;
