import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import InfinityNav from "@/components/infinity/InfinityNav";
import InfinityFooter from "@/components/infinity/InfinityFooter";
import { ArrowRight, Camera, Heart, Share2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import liveMomentVideo from "@/assets/live-moment-brand.mp4";
import liveMomentLogo from "@/assets/brands/live-moment-logo.png";

const LiveMoment = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: masonryProgress } = useScroll({
    target: masonryRef,
    offset: ["start end", "end start"]
  });

  // Hero transforms with spring physics
  const heroScaleSpring = useSpring(useTransform(heroProgress, [0, 1], [1, 0.8]), { stiffness: 100, damping: 30 });
  const heroRotate = useTransform(heroProgress, [0, 1], [0, -5]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6, 1], [1, 0.5, 0]);
  const overlayOpacity = useTransform(heroProgress, [0, 0.5], [0.3, 0.8]);

  // Timeline transforms
  const timelineX = useTransform(timelineProgress, [0, 1], [-200, 0]);
  const timelineScale = useTransform(timelineProgress, [0, 0.5, 1], [0.7, 1, 0.9]);

  // Masonry transforms
  const masonryRotateX = useTransform(masonryProgress, [0, 1], [10, -10]);

  const products = [
    { name: "Moment Ring", price: "$1,890", emoji: "💍" },
    { name: "Time Pendant", price: "$2,340", emoji: "⌚" },
    { name: "Capture Bracelet", price: "$1,650", emoji: "📿" },
    { name: "Flash Earrings", price: "$1,290", emoji: "✨" },
  ];

  const moments = [
    { title: "Golden Hour", description: "Sunset memories" },
    { title: "First Light", description: "Dawn's embrace" },
    { title: "Midnight Spark", description: "Night's magic" },
    { title: "Eternal Now", description: "Present perfection" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-hidden">
      <InfinityNav />

      {/* Immersive Hero with 3D Perspective */}
      <section ref={heroRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden perspective-1000">
          {/* Video Background with 3D Transform */}
          <motion.div 
            style={{ 
              scale: heroScaleSpring, 
              rotateX: heroRotate,
              transformOrigin: "center bottom"
            }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={liveMomentVideo} type="video/mp4" />
            </video>
            <motion.div 
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-gradient-to-b from-live-moment/40 via-background/60 to-background" 
            />
          </motion.div>

          {/* Hero Content */}
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-6"
            >
              <Camera className="w-14 h-14 text-live-moment mx-auto" />
            </motion.div>

            <motion.img
              src={liveMomentLogo}
              alt="LIVE THE MOMENT"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-32 md:h-48 lg:h-64 w-auto object-contain drop-shadow-2xl"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-2xl md:text-3xl text-foreground/80 font-light mt-6 max-w-xl"
            >
              LIVE THE MOMENT
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex gap-6"
            >
              <Link to="/category/live-moment">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 50px hsl(45, 100%, 50%, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-live-moment text-black rounded-full font-medium flex items-center gap-2"
                >
                  Shop Now <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-live-moment/50 text-live-moment rounded-full font-medium"
              >
                View Experience
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Animated Light Rays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-[200%] bg-gradient-to-b from-live-moment/30 via-live-moment/10 to-transparent origin-top"
              style={{
                left: `${10 + i * 12}%`,
                top: "-50%",
                rotate: -15 + i * 5,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scaleY: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </section>

      {/* Timeline Gallery with Horizontal Scroll Effect */}
      <section ref={timelineRef} className="relative py-32 px-4 overflow-hidden">
        <motion.div
          style={{ x: timelineX, scale: timelineScale }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-bold text-center mb-20 text-gradient-live"
          >
            Captured Moments
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moments.map((moment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100, rotateY: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 10,
                  z: 50,
                }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                  <source src={liveMomentVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-xl font-bold text-white">{moment.title}</h3>
                  <p className="text-white/70 text-sm">{moment.description}</p>
                </div>
                <motion.div
                  className="absolute inset-0 bg-live-moment/20 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Masonry Product Grid with Perspective */}
      <section ref={masonryRef} className="relative py-32 px-4 overflow-hidden">
        <motion.div
          style={{ rotateX: masonryRotateX, transformPerspective: 1000 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-bold text-center mb-16 text-gradient-live"
          >
            Signature Pieces
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.05,
                  boxShadow: "0 30px 60px hsl(45, 100%, 50%, 0.2)"
                }}
                className="glass rounded-3xl p-6 border border-live-moment/20 hover:border-live-moment/60 transition-all cursor-pointer group"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-live-moment/30 to-transparent flex items-center justify-center text-7xl mb-4 group-hover:scale-110 transition-transform">
                  {product.emoji}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{product.name}</h3>
                <p className="text-live-moment font-medium mt-1">{product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full py-3 bg-live-moment/20 hover:bg-live-moment/40 rounded-full text-live-moment font-medium transition-colors"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive Stats */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Camera, value: "1.2M", label: "Moments Captured" },
              { icon: Heart, value: "890K", label: "Community Love" },
              { icon: Share2, value: "2.4M", label: "Shares" },
              { icon: Clock, value: "24/7", label: "Live Events" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  boxShadow: "0 20px 40px hsl(45, 100%, 50%, 0.2)"
                }}
                className="glass rounded-3xl p-6 border border-live-moment/20 hover:border-live-moment/50 transition-all text-center cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <stat.icon className="w-8 h-8 text-live-moment mx-auto mb-3" />
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-live">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-gradient-live mb-8">
            Make Every Second Count
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join our community of moment-makers. Access exclusive drops, live experiences, and instant connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/category/live-moment">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px hsl(45, 100%, 50%, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-live-moment text-black rounded-full font-medium text-lg flex items-center gap-2 mx-auto"
              >
                Shop Products <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 border border-live-moment/50 text-live-moment rounded-full font-medium text-lg"
            >
              Live Experience
            </motion.button>
          </div>
        </motion.div>
      </section>

      <InfinityFooter />
    </div>
  );
};

export default LiveMoment;
