import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Crown, Gem } from "lucide-react";
import luxuryVideo from "@/assets/luxury-section.mp4";

const features = [
  {
    icon: Crown,
    title: "Premium Quality",
    description: "Crafted with the finest materials"
  },
  {
    icon: Gem,
    title: "Exclusive Designs",
    description: "Limited edition collections"
  },
  {
    icon: Sparkles,
    title: "Luxury Experience",
    description: "Unparalleled customer service"
  }
];

const LuxurySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 1.3]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax Video Background */}
      <motion.div 
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={luxuryVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 container mx-auto px-6 py-32 flex flex-col items-center justify-center min-h-screen"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-6"
        >
          Premium Experience
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-center max-w-4xl"
        >
          <span className="text-gradient">Luxury</span>
          <br />
          <span className="text-foreground/80">Redefined</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground text-center max-w-2xl mt-8"
        >
          Experience the pinnacle of premium merchandise. Each piece is a statement, 
          each collection a masterpiece.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 text-center border border-primary/20 hover:border-primary/40 transition-all"
            >
              <feature.icon className="w-10 h-10 mx-auto text-primary mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px hsl(320 100% 60% / 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="group px-10 py-5 bg-gradient-neon rounded-full font-display font-semibold text-xl flex items-center gap-4"
            >
              Discover Collection
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LuxurySection;
