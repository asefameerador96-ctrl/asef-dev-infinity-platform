import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, Heart, Share2, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, Size, formatBDT, getBrandDisplayName, getBrandColor, getCategoryBySlug } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Brand logos
import novaLogo from '@/assets/brands/nova-logo.png';
import xforceLogo from '@/assets/brands/xforce-logo.jpg';
import liveMomentLogo from '@/assets/brands/live-moment-logo.png';

const brandLogos: Record<string, string> = {
  'nova': novaLogo,
  'xforce': xforceLogo,
  'live-moment': liveMomentLogo,
};

interface StoreProductInfoProps {
  product: Product;
}

const StoreProductInfo = ({ product }: StoreProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const category = getCategoryBySlug(product.category);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, quantity, selectedSize);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/store/${product.category}`}>{category?.name || product.category}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <img
          src={brandLogos[product.brand]}
          alt={getBrandDisplayName(product.brand)}
          className="h-8 w-auto object-contain"
        />
        <span className={`text-sm font-medium ${getBrandColor(product.brand)}`}>
          {getBrandDisplayName(product.brand)}
        </span>
      </div>

      {/* Product Title & Price */}
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          {product.name}
        </h1>
        
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-foreground">
            {formatBDT(product.discountedPrice)}
          </span>
          <span className="text-lg text-muted-foreground line-through">
            {formatBDT(product.originalPrice)}
          </span>
          <span className="px-3 py-1 text-sm font-bold bg-destructive text-destructive-foreground rounded-full">
            -{product.discountPercentage}% OFF
          </span>
        </div>

        <p className="text-muted-foreground">
          {product.description}
        </p>
      </div>

      {/* Size Selection */}
      {product.sizes.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Select Size</span>
            <button className="text-xs text-primary hover:underline">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <motion.button
                key={size}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                  selectedSize === size
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            {!selectedSize && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-amber-500"
              >
                Please select a size
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-3">
        <span className="text-sm font-medium">Quantity</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-3 hover:bg-muted transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-6 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-3 hover:bg-muted transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product.inStock ? (
              <span className="flex items-center gap-1 text-green-500">
                <Check className="w-4 h-4" /> In Stock
              </span>
            ) : (
              <span className="text-destructive">Out of Stock</span>
            )}
          </span>
        </div>
      </div>

      {/* Add to Cart & Wishlist */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={!selectedSize || !product.inStock}
          size="lg"
          className="flex-1 gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={isWishlisted ? 'text-destructive border-destructive' : ''}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
        <div className="flex flex-col items-center text-center gap-2">
          <Truck className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Free Delivery</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">7 Day Returns</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <Shield className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Authentic</span>
        </div>
      </div>

      {/* Product Details Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 text-sm">
              {product.details.material && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material</span>
                  <span>{product.details.material}</span>
                </div>
              )}
              {product.details.dimensions && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span>{product.details.dimensions}</span>
                </div>
              )}
              {product.details.weight && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <span>{product.details.weight}</span>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="features">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm">
              {product.details.features?.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping & Returns</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Free standard delivery on orders over ৳5,000</p>
              <p>Express delivery available for ৳200</p>
              <p>7-day return policy for unused items</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StoreProductInfo;
