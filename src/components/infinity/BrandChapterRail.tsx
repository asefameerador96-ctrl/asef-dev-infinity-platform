import { motion } from "framer-motion";
import BrandCard from "./BrandCard";

const brands = [
  {
    id: "nova",
    name: "NOVA",
    tagline: "Future-ready drops. Cosmic motion. Neon clarity.",
    description: "Nova represents the cutting edge of style and innovation. Every piece is designed for those who dare to lead, not follow.",
    color: "nova",
    path: "/brands/nova",
    stats: [
      { label: "Products", value: "48" },
      { label: "Collections", value: "12" },
      { label: "Events", value: "8" },
    ]
  },
  {
    id: "live-the-moment",
    name: "LIVE THE MOMENT",
    tagline: "Capture now. Share instantly. Feel everything.",
    description: "For those who live in the present. Every design captures the essence of fleeting moments and makes them eternal.",
    color: "live-moment",
    path: "/brands/live-moment",
    stats: [
      { label: "Products", value: "36" },
      { label: "Collections", value: "9" },
      { label: "Events", value: "15" },
    ]
  },
  {
    id: "xforce",
    name: "XFORCE",
    tagline: "Power, precision, performance — tuned for limits.",
    description: "Built for champions. Xforce combines aggressive aesthetics with uncompromising quality for peak performance lifestyle.",
    color: "xforce",
    path: "/brands/xforce",
    stats: [
      { label: "Products", value: "52" },
      { label: "Collections", value: "14" },
      { label: "Events", value: "22" },
    ]
  }
];

const BrandChapterRail = () => {
  return (
    <section className="relative py-32 bg-gradient-dark">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            The Brands
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            <span className="text-gradient">Three Worlds.</span>{" "}
            <span className="text-foreground/80">One Platform.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Infinity is the platform. Each brand is a world. Discover the universe that speaks to your soul.
          </p>
        </motion.div>

        {/* Stacked Brand Cards */}
        <div className="space-y-8 md:space-y-[-100px]">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandChapterRail;
