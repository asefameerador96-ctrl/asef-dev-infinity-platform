import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import InfinityNav from "@/components/infinity/InfinityNav";
import InfinityFooter from "@/components/infinity/InfinityFooter";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import novaBrandVideo from "@/assets/nova-brand.mp4";
import novaLogo from "@/assets/brands/nova-logo.png";
import novaGallery1 from "@/assets/brands/nova-gallery-1.mp4";
import novaGallery2 from "@/assets/brands/nova-gallery-2.mp4";
import novaGallery3 from "@/assets/brands/nova-gallery-3.mp4";

const Nova = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: galleryProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: productsProgress } = useScroll({
    target: productsRef,
    offset: ["start end", "end start"]
  });

  // Hero parallax transforms
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.3]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const textY = useTransform(heroProgress, [0, 1], [0, -100]);
  const videoBorderRadius = useTransform(heroProgress, [0, 0.5], [0, 100]);

  // Gallery parallax transforms
  const galleryY1 = useTransform(galleryProgress, [0, 1], [100, -100]);
  const galleryY2 = useTransform(galleryProgress, [0, 1], [200, -50]);
  const galleryY3 = useTransform(galleryProgress, [0, 1], [50, -150]);
  const galleryRotate1 = useTransform(galleryProgress, [0, 1], [-5, 5]);
  const galleryRotate2 = useTransform(galleryProgress, [0, 1], [5, -5]);
  const galleryScale = useTransform(galleryProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  // Products parallax transforms
  const productsX = useTransform(productsProgress, [0, 1], [-100, 100]);

  const products = [
    { name: "Nova Ring", price: "$2,450", image: "🔮" },
    { name: "Cosmic Pendant", price: "$1,890", image: "✨" },
    { name: "Stellar Bracelet", price: "$3,200", image: "💫" },
    { name: "Nebula Earrings", price: "$1,650", image: "🌟" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-hidden">
      <InfinityNav />

      {/* Cinematic Hero Section */}
      <section ref={heroRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background Video with Parallax */}
          <motion.div 
            style={{ 
              scale: heroScale, 
              y: heroY,
              borderRadius: videoBorderRadius
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={novaBrandVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-nova/30 via-background/50 to-background" />
          </motion.div>

          {/* Hero Content */}
          <motion.div 
            style={{ y: textY, opacity: heroOpacity }}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 text-nova mx-auto" />
            </motion.div>

            <motion.img
              src={novaLogo}
              alt="NOVA"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-24 md:h-40 lg:h-56 w-auto object-contain drop-shadow-2xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-2xl md:text-4xl text-foreground/80 font-light mt-4 max-w-2xl"
            >
              BORN FOR MORE
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex gap-6"
            >
              <Link to="/category/nova">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(320, 100%, 60%, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-nova text-white rounded-full font-medium flex items-center gap-2"
                >
                  Shop Collection <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-nova/50 text-nova rounded-full font-medium"
              >
                View Experience
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-nova/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Motion Gallery Section */}
      <section ref={galleryRef} className="relative py-32 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2 
            style={{ scale: galleryScale }}
            className="font-display text-5xl md:text-7xl font-bold text-center mb-20 text-gradient-nova"
          >
            Motion Gallery
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gallery Item 1 - Cosmic Glow */}
            <motion.div
              style={{ y: galleryY1, rotate: galleryRotate1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              >
                <source src={novaGallery1} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-nova/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-bold text-white">Cosmic Origins</h3>
                <p className="text-white/70 mt-2">Where light meets matter</p>
              </div>
              <motion.div
                className="absolute inset-0 border-2 border-nova/0 rounded-3xl"
                whileHover={{ borderColor: "hsl(320, 100%, 60%, 0.5)" }}
              />
            </motion.div>

            {/* Gallery Item 2 - Holographic Touch */}
            <motion.div
              style={{ y: galleryY2, rotate: galleryRotate2 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer mt-16"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              >
                <source src={novaGallery2} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-nova/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-bold text-white">Stellar Craft</h3>
                <p className="text-white/70 mt-2">Precision in every particle</p>
              </div>
            </motion.div>

            {/* Gallery Item 3 - Galaxy Vision */}
            <motion.div
              style={{ y: galleryY3, rotate: galleryRotate1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              >
                <source src={novaGallery3} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-nova/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-bold text-white">Neon Dreams</h3>
                <p className="text-white/70 mt-2">Illuminate your essence</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Horizontal Scroll Products Strip */}
      <section ref={productsRef} className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-nova/10 to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-gradient-nova">
            Signature Collection
          </h2>
          <p className="text-muted-foreground mt-4 text-xl">Pieces that define the cosmos</p>
        </motion.div>

        <motion.div 
          style={{ x: productsX }}
          className="flex gap-8 px-8"
        >
          {[...products, ...products].map((product, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20, scale: 1.05 }}
              className="flex-shrink-0 w-80 glass rounded-3xl p-8 border border-nova/20 hover:border-nova/50 transition-all cursor-pointer group"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-nova/20 to-transparent flex items-center justify-center text-8xl mb-6 group-hover:scale-110 transition-transform">
                {product.image}
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">{product.name}</h3>
              <p className="text-nova font-medium mt-2">{product.price}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full py-3 bg-nova/20 hover:bg-nova/40 rounded-full text-nova font-medium transition-colors"
              >
                Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section with Parallax */}
      <section className="relative py-32 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, value: "47", label: "Collections" },
              { icon: Zap, value: "2.1M", label: "Community" },
              { icon: Star, value: "156", label: "Exclusives" },
              { icon: ArrowRight, value: "12", label: "Countries" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="text-center glass rounded-3xl p-8 border border-nova/20 hover:border-nova/50 transition-all"
              >
                <stat.icon className="w-8 h-8 text-nova mx-auto mb-4" />
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-nova">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-2 uppercase tracking-wide text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-gradient-nova mb-8">
            Enter the Nova Universe
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join exclusive experiences, access limited drops, and become part of the cosmic community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/category/nova">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px hsl(320, 100%, 60%, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-nova text-white rounded-full font-medium text-lg flex items-center gap-2 mx-auto"
              >
                Shop Products <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 border border-nova/50 text-nova rounded-full font-medium text-lg"
            >
              Upcoming Experience
            </motion.button>
          </div>
        </motion.div>
      </section>

      <InfinityFooter />
    </div>
  );
};

export default Nova;
