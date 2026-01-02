import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Star, Flame } from "lucide-react";

const showcaseItems = [
  {
    icon: Zap,
    title: "Electric Energy",
    subtitle: "Power your style",
    gradient: "from-neon-cyan via-neon-blue to-neon-purple"
  },
  {
    icon: Star,
    title: "Celestial Designs",
    subtitle: "Inspired by the cosmos",
    gradient: "from-nova via-neon-pink to-neon-magenta"
  },
  {
    icon: Flame,
    title: "Blazing Performance",
    subtitle: "Built for speed",
    gradient: "from-xforce via-neon-orange to-live-moment"
  }
];

const ParallaxShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-purple/10 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </motion.div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4 block">
            The Collection
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold">
            <span className="text-gradient">Beyond</span>{" "}
            <span className="text-foreground/80">Ordinary</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ rotateX, scale, transformPerspective: 1000 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -20, scale: 1.05 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-3xl`} />
              <div className="relative glass rounded-3xl p-10 border border-primary/20 hover:border-primary/50 transition-all h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}>
                  <item.icon className="w-8 h-8 text-background" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxShowcase;
