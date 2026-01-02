import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

const brandPills = [
  { name: "NOVA", color: "nova", path: "/brands/nova" },
  { name: "LIVE THE MOMENT", color: "live-moment", path: "/brands/live-the-moment" },
  { name: "XFORCE", color: "xforce", path: "/brands/xforce" },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Content animations
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  // Video container - narrows down (scales) and fades as you scroll
  const videoScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.5]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.4, 0]);
  const videoBorderRadius = useTransform(scrollYProgress, [0, 0.6], [0, 60]);
  const videoY = useTransform(scrollYProgress, [0, 0.6], [0, 150]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] flex items-start overflow-hidden">
      {/* Video Background - full width, narrowing effect on scroll */}
      <motion.div 
        style={{ 
          scaleX: videoScale,
          scaleY: videoScale,
          opacity: videoOpacity,
          borderRadius: videoBorderRadius,
          y: videoY
        }}
        className="fixed top-0 left-0 right-0 w-full h-screen z-0 overflow-hidden origin-center"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 container mx-auto px-6 pt-32 min-h-screen flex items-center"
      >
        <div className="max-w-5xl">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter">
              <span className="text-gradient">INFINITY</span>
            </h1>
            <h2 className="font-display text-[clamp(2rem,8vw,6rem)] font-light text-foreground/80 -mt-4">
              PLATFORM
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-2xl md:text-3xl font-light mt-8 neon-text"
          >
            A timeless experience.
          </motion.p>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-xl mt-6"
          >
            Infinity is the hub for neon futures — Nova for launches, 
            Live the moment for presence, Xforce for performance.
          </motion.p>

          {/* Brand Pills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {brandPills.map((brand, index) => (
              <motion.div
                key={brand.name}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Link
                  to={brand.path}
                  className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide
                    ${brand.color === 'nova' ? 'bg-nova/20 text-nova border border-nova/40 hover:bg-nova/30' : ''}
                    ${brand.color === 'live-moment' ? 'bg-live-moment/20 text-live-moment border border-live-moment/40 hover:bg-live-moment/30' : ''}
                    ${brand.color === 'xforce' ? 'bg-xforce/20 text-xforce border border-xforce/40 hover:bg-xforce/30' : ''}
                    transition-all duration-300
                  `}
                >
                  {brand.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-12"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px hsl(320 100% 60% / 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-gradient-neon rounded-full font-display font-semibold text-lg flex items-center gap-3"
              >
                PRODUCTS
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 neon-border rounded-full font-display font-semibold text-lg flex items-center gap-3 hover:neon-glow transition-all"
              >
                EVENTS
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-primary rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
