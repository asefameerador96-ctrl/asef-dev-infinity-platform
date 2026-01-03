import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import InfinityNav from "@/components/infinity/InfinityNav";
import InfinityFooter from "@/components/infinity/InfinityFooter";
import ProductCard from "@/components/store/ProductCard";
import BrandTabs from "@/components/store/BrandTabs";
import { 
  Brand, 
  getCategoryBySlug, 
  getProductsByCategoryAndBrand,
  categories 
} from "@/data/products";
import luxuryVideo from "@/assets/luxury-section.mp4";

const CategoryStore = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [activeBrand, setActiveBrand] = useState<Brand>('nova');
  const { scrollYProgress } = useScroll();
  
  const category = getCategoryBySlug(categorySlug || '');
  const products = getProductsByCategoryAndBrand(categorySlug || '', activeBrand);

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <InfinityNav />

      {/* Hero Section with Parallax Video */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ scale: videoScale }}
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
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        </motion.div>

        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl mb-4"
          >
            {category.icon}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-gradient mb-4"
          >
            {category.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            {category.description}
          </motion.p>
        </motion.div>
      </section>

      {/* Brand Tabs */}
      <section className="py-12 px-6">
        <BrandTabs activeBrand={activeBrand} onBrandChange={setActiveBrand} />
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 pb-24">
        <motion.div
          key={activeBrand}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No products available for this brand yet. Stay tuned!
            </p>
          </div>
        )}
      </section>

      <InfinityFooter />
    </div>
  );
};

export default CategoryStore;
