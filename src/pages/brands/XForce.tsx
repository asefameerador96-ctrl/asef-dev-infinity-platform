import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import InfinityNav from "@/components/infinity/InfinityNav";
import InfinityFooter from "@/components/infinity/InfinityFooter";
import { ArrowRight, Zap, Target, Gauge, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import xforceVideo from "@/assets/xforce-brand.mp4";
import xforceLogo from "@/assets/brands/xforce-logo.jpg";

const XForce = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: showcaseProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: speedProgress } = useScroll({
    target: speedRef,
    offset: ["start end", "end start"]
  });

  // Hero transforms
  const heroSkewY = useTransform(heroProgress, [0, 1], [0, -10]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.4]);
  const heroBlur = useTransform(heroProgress, [0, 0.5, 1], [0, 0, 8]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7, 1], [1, 0.6, 0]);

  // Showcase transforms
  const showcaseRotateX = useTransform(showcaseProgress, [0, 1], [20, -20]);
  const showcaseY = useTransform(showcaseProgress, [0, 1], [150, -150]);

  // Speed section transforms
  const speedX = useTransform(speedProgress, [0, 1], [-500, 500]);
  const speedScale = useTransform(speedProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  const products = [
    { name: "Force Ring", price: "$3,450", emoji: "💎" },
    { name: "Power Chain", price: "$4,200", emoji: "⚡" },
    { name: "Precision Watch", price: "$8,900", emoji: "⌚" },
    { name: "Impact Cuff", price: "$2,890", emoji: "🔥" },
  ];

  const specs = [
    { label: "Power Output", value: "∞", unit: "NM" },
    { label: "Precision", value: "0.001", unit: "MM" },
    { label: "Response Time", value: "<1", unit: "MS" },
    { label: "Durability", value: "100", unit: "YRS" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-hidden">
      <InfinityNav />

      {/* Dynamic Hero with Mouse Tracking */}
      <section ref={heroRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Video with Skew Transform */}
          <motion.div 
            style={{ 
              scale: heroScale, 
              skewY: heroSkewY,
              filter: `blur(${heroBlur}px)`,
              x: smoothMouseX,
              y: smoothMouseY,
            }}
            className="absolute inset-0 origin-center"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-125"
            >
              <source src={xforceVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-xforce/30 via-background/50 to-background" />
          </motion.div>

          {/* Hero Content */}
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-8"
            >
              <Zap className="w-20 h-20 text-xforce mx-auto" />
            </motion.div>

            <motion.img
              src={xforceLogo}
              alt="XFORCE"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-24 md:h-40 lg:h-56 w-auto object-contain drop-shadow-2xl"
            />

            <motion.p
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-2xl md:text-4xl text-foreground/80 font-light mt-4 max-w-2xl"
            >
              BOLD NEW EXPERIENCE
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 flex gap-6"
            >
              <Link to="/category/xforce">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 50px hsl(210, 100%, 60%, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-xforce text-white rounded-full font-medium flex items-center gap-2"
                >
                  Shop Power <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-xforce/50 text-xforce rounded-full font-medium"
              >
                View Experience
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Animated Grid Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-xforce/30 to-transparent w-full"
                style={{ top: `${10 + i * 10}%` }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scaleX: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3D Showcase Gallery */}
      <section ref={showcaseRef} className="relative py-32 px-4 overflow-hidden">
        <motion.div
          style={{ rotateX: showcaseRotateX, y: showcaseY }}
          className="max-w-7xl mx-auto perspective-1000"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-bold text-center mb-20 text-gradient-xforce"
          >
            Performance Gallery
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Raw Power", "Pure Precision", "Peak Performance"].map((title, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateY: -30, x: -100 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                whileHover={{ 
                  rotateY: 15, 
                  scale: 1.05,
                  z: 50,
                }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                  <source src={xforceVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-xforce/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display text-3xl font-bold text-white">{title}</h3>
                  <motion.div
                    className="h-1 bg-xforce mt-4 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                  />
                </div>
                <motion.div
                  className="absolute inset-0 border-4 border-xforce/0 rounded-3xl"
                  whileHover={{ borderColor: "hsl(210, 100%, 60%, 0.6)" }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Speed Specs Section */}
      <section ref={speedRef} className="relative py-32 px-4 overflow-hidden">
        <motion.div
          style={{ scale: speedScale }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-bold text-center mb-20 text-gradient-xforce"
          >
            Technical Specs
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateX: 10,
                  boxShadow: "0 30px 60px hsl(210, 100%, 60%, 0.3)"
                }}
                className="glass rounded-3xl p-8 border border-xforce/20 hover:border-xforce/60 transition-all text-center cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="font-display text-5xl md:text-6xl font-bold text-gradient-xforce">
                  {spec.value}
                </div>
                <div className="text-xforce text-xl font-mono mt-2">{spec.unit}</div>
                <div className="text-muted-foreground mt-4 uppercase tracking-wide text-sm">
                  {spec.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Speed Lines */}
        <motion.div
          style={{ x: speedX }}
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-0.5 bg-gradient-to-r from-transparent via-xforce/40 to-transparent my-8"
            />
          ))}
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="relative py-32 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-center mb-16 text-gradient-xforce">
            Power Collection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring" }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.05,
                  rotateZ: 2,
                  boxShadow: "0 40px 80px hsl(210, 100%, 60%, 0.3)"
                }}
                className="glass rounded-3xl p-8 border border-xforce/20 hover:border-xforce/60 transition-all cursor-pointer group"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-xforce/30 to-transparent flex items-center justify-center text-8xl mb-6 group-hover:scale-110 transition-transform">
                  {product.emoji}
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">{product.name}</h3>
                <p className="text-xforce font-medium mt-2">{product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full py-3 bg-xforce/20 hover:bg-xforce/40 rounded-full text-xforce font-medium transition-colors"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Achievement Stats */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, value: "500K", label: "Power Users" },
              { icon: Target, value: "99.9%", label: "Precision Rate" },
              { icon: Gauge, value: "10X", label: "Performance" },
              { icon: Trophy, value: "50+", label: "Awards" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="glass rounded-3xl p-6 border border-xforce/20 hover:border-xforce/50 transition-all text-center cursor-pointer"
              >
                <stat.icon className="w-10 h-10 text-xforce mx-auto mb-4" />
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-xforce">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-2 uppercase tracking-wide text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-gradient-xforce mb-8">
            Unleash Your Force
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Push beyond limits. Join the elite community of performance seekers and access exclusive power drops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/category/xforce">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 80px hsl(210, 100%, 60%, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-xforce text-white rounded-full font-medium text-lg flex items-center gap-2 mx-auto"
              >
                Shop Products <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 border border-xforce/50 text-xforce rounded-full font-medium text-lg"
            >
              Performance Experience
            </motion.button>
          </div>
        </motion.div>
      </section>

      <InfinityFooter />
    </div>
  );
};

export default XForce;
