import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, formatBDT, getBrandColor, getBrandBgClass } from "@/data/products";

// Lifestyle images for hover effect
import ashtrayLifestyle from "@/assets/products/ashtray-lifestyle.jpg";
import lighterLifestyle from "@/assets/products/lighter-lifestyle.jpg";
import tshirtLifestyle from "@/assets/products/tshirt-lifestyle.jpg";
import jacketLifestyle from "@/assets/products/jacket-lifestyle.jpg";
import coatPinLifestyle from "@/assets/products/coat-pin-lifestyle.jpg";
import perfumeLifestyle from "@/assets/products/perfume-lifestyle.jpg";
import cigaretteBoxLifestyle from "@/assets/products/cigarette-box-lifestyle.jpg";
import mugLifestyle from "@/assets/products/mug-lifestyle.jpg";
import posterLifestyle from "@/assets/products/poster-lifestyle.jpg";
import bannerLifestyle from "@/assets/products/banner-lifestyle.jpg";
import paintingLifestyle from "@/assets/products/painting-lifestyle.jpg";
import watchLifestyle from "@/assets/products/watch-lifestyle.jpg";

const lifestyleImages: Record<string, string> = {
  'ashtray': ashtrayLifestyle,
  'lighter': lighterLifestyle,
  'tshirt': tshirtLifestyle,
  'jacket': jacketLifestyle,
  'coat-pin': coatPinLifestyle,
  'perfume': perfumeLifestyle,
  'cigarette-box': cigaretteBoxLifestyle,
  'mug': mugLifestyle,
  'poster': posterLifestyle,
  'banner': bannerLifestyle,
  'luxury-paintings': paintingLifestyle,
  'limited-watches': watchLifestyle,
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative bg-gradient-to-br ${getBrandBgClass(product.brand)} rounded-2xl overflow-hidden border hover-lift`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 text-xs font-bold bg-destructive text-destructive-foreground rounded-full">
          -{product.discountPercentage}%
        </span>
      </div>

      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ x: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Hover Image - Model wearing/holding product */}
        <motion.div
          className="absolute inset-0"
          initial={{ x: "100%" }}
          animate={{ x: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img
            src={lifestyleImages[product.category] || lifestyleImages['tshirt']}
            alt={`${product.name} lifestyle`}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
        >
          <Link to={`/product/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full glass neon-border"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full glass neon-border"
          >
            <ShoppingBag className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className={`font-display font-semibold text-lg mb-1 ${getBrandColor(product.brand)}`}>
          {product.name}
        </h3>
        
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xl font-bold text-foreground">
            {formatBDT(product.discountedPrice)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {formatBDT(product.originalPrice)}
          </span>
        </div>

        {/* Stay Tuned Button */}
        <Link to="/waitlist">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 px-4 rounded-xl font-medium text-sm neon-border hover:neon-glow transition-all bg-card/50"
          >
            Stay Tuned
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
