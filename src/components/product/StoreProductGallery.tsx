import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Product, getBrandBgClass } from "@/data/products";

// Import lifestyle images for hover preview
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
  'luxury-perfume': perfumeLifestyle,
  'limited-watches': watchLifestyle,
};

interface StoreProductGalleryProps {
  product: Product;
}

const StoreProductGallery = ({ product }: StoreProductGalleryProps) => {
  const lifestyleImage = lifestyleImages[product.category] || lifestyleImages['tshirt'];
  const allImages = [product.image, lifestyleImage, ...product.galleryImages.slice(1)];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextImage() : prevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-4">
        {/* Thumbnails */}
        <div className="col-span-1 space-y-3">
          {allImages.slice(0, 5).map((img, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>

        {/* Main Image */}
        <div className="col-span-4 relative">
          <motion.div
            className={`relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${getBrandBgClass(product.brand)}`}
            layoutId="productImage"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={allImages[currentIndex]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              />
            </AnimatePresence>

            {/* Zoom Button */}
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute top-4 right-4 p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-primary w-6' : 'bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div
          className={`relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${getBrandBgClass(product.brand)}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={allImages[currentIndex]}
              alt={product.name}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {allImages.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'bg-primary w-4' : 'bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={allImages[currentIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreProductGallery;
