// Product Data for Infinity Store

// Product Images
import ashtrayBase from '@/assets/products/ashtray-base.jpg';
import lighterBase from '@/assets/products/lighter-base.jpg';
import tshirtBase from '@/assets/products/tshirt-base.jpg';
import jacketBase from '@/assets/products/jacket-base.jpg';
import coatPinBase from '@/assets/products/coat-pin-base.jpg';
import perfumeBase from '@/assets/products/perfume-base.jpg';
import cigaretteBoxBase from '@/assets/products/cigarette-box-base.jpg';
import mugBase from '@/assets/products/mug-base.jpg';
import posterBase from '@/assets/products/poster-base.jpg';
import bannerBase from '@/assets/products/banner-base.jpg';
import paintingBase from '@/assets/products/painting-base.jpg';
import watchBase from '@/assets/products/watch-base.jpg';

export type Brand = 'nova' | 'xforce' | 'live-moment';

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: Brand;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  image: string;
  hoverImage: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Ashtray', slug: 'ashtray', description: 'Premium designer ashtrays', icon: '🔥' },
  { id: '2', name: 'Lighter', slug: 'lighter', description: 'Luxury branded lighters', icon: '🔥' },
  { id: '3', name: 'T-Shirt', slug: 'tshirt', description: 'Exclusive branded tees', icon: '👕' },
  { id: '4', name: 'Jacket', slug: 'jacket', description: 'Premium designer jackets', icon: '🧥' },
  { id: '5', name: 'Coat Pin', slug: 'coat-pin', description: 'Elegant coat pins', icon: '📍' },
  { id: '6', name: 'Perfume', slug: 'perfume', description: 'Signature fragrances', icon: '🌸' },
  { id: '7', name: 'Cigarette Box', slug: 'cigarette-box', description: 'Designer cigarette cases', icon: '📦' },
  { id: '8', name: 'Mug', slug: 'mug', description: 'Premium coffee mugs', icon: '☕' },
  { id: '9', name: 'Poster', slug: 'poster', description: 'Art prints & posters', icon: '🖼️' },
  { id: '10', name: 'Banner', slug: 'banner', description: 'Decorative banners', icon: '🏳️' },
  { id: '11', name: 'Luxury Paintings', slug: 'luxury-paintings', description: 'Exclusive art pieces', icon: '🎨' },
  { id: '12', name: 'Luxury Perfume', slug: 'luxury-perfume', description: 'Premium fragrances', icon: '💎' },
  { id: '13', name: 'Limited Edition Watches', slug: 'limited-watches', description: 'Collector timepieces', icon: '⌚' },
];

// Image mapping for categories
const categoryImages: Record<string, string> = {
  'ashtray': ashtrayBase,
  'lighter': lighterBase,
  'tshirt': tshirtBase,
  'jacket': jacketBase,
  'coat-pin': coatPinBase,
  'perfume': perfumeBase,
  'cigarette-box': cigaretteBoxBase,
  'mug': mugBase,
  'poster': posterBase,
  'banner': bannerBase,
  'luxury-paintings': paintingBase,
  'luxury-perfume': perfumeBase,
  'limited-watches': watchBase,
};

// Generate products for each category and brand
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const brands: Brand[] = ['nova', 'xforce', 'live-moment'];
  
  categories.forEach((category) => {
    brands.forEach((brand) => {
      // Generate 3 products per brand per category
      for (let i = 1; i <= 3; i++) {
        const basePrice = getBasePrice(category.slug);
        const discountPercentage = Math.floor(Math.random() * 30) + 10; // 10-40%
        const originalPrice = basePrice * (1 + (i * 0.2));
        const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
        
        products.push({
          id: `${category.slug}-${brand}-${i}`,
          name: `${getBrandPrefix(brand)} ${category.name} ${getProductSuffix(i)}`,
          category: category.slug,
          brand,
          originalPrice: Math.round(originalPrice),
          discountedPrice,
          discountPercentage,
          image: categoryImages[category.slug] || '/placeholder.svg',
          hoverImage: categoryImages[category.slug] || '/placeholder.svg',
          description: `Premium ${category.name.toLowerCase()} from ${getBrandDisplayName(brand)} collection. Exclusive design with brand logo.`,
          inStock: Math.random() > 0.2,
        });
      }
    });
  });
  
  return products;
};

const getBasePrice = (category: string): number => {
  const prices: Record<string, number> = {
    'ashtray': 1500,
    'lighter': 2500,
    'tshirt': 3500,
    'jacket': 15000,
    'coat-pin': 800,
    'perfume': 5000,
    'cigarette-box': 2000,
    'mug': 1200,
    'poster': 1500,
    'banner': 3000,
    'luxury-paintings': 50000,
    'luxury-perfume': 25000,
    'limited-watches': 150000,
  };
  return prices[category] || 2000;
};

const getBrandPrefix = (brand: Brand): string => {
  const prefixes: Record<Brand, string> = {
    'nova': 'Nova Elite',
    'xforce': 'X-Force Pro',
    'live-moment': 'Live The Moment',
  };
  return prefixes[brand];
};

const getProductSuffix = (index: number): string => {
  const suffixes = ['Edition', 'Series', 'Collection'];
  return suffixes[index - 1] || 'Edition';
};

export const getBrandDisplayName = (brand: Brand): string => {
  const names: Record<Brand, string> = {
    'nova': 'NOVA',
    'xforce': 'XFORCE',
    'live-moment': 'LIVE THE MOMENT',
  };
  return names[brand];
};

export const getBrandColor = (brand: Brand): string => {
  const colors: Record<Brand, string> = {
    'nova': 'text-gradient-nova',
    'xforce': 'text-gradient-xforce',
    'live-moment': 'text-gradient-live',
  };
  return colors[brand];
};

export const getBrandBgClass = (brand: Brand): string => {
  const classes: Record<Brand, string> = {
    'nova': 'from-purple-600/20 to-purple-900/20 border-purple-500/30',
    'xforce': 'from-red-600/20 to-red-900/20 border-red-500/30',
    'live-moment': 'from-yellow-600/20 to-amber-900/20 border-yellow-500/30',
  };
  return classes[brand];
};

export const products = generateProducts();

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(p => p.category === categorySlug);
};

export const getProductsByBrand = (brand: Brand): Product[] => {
  return products.filter(p => p.brand === brand);
};

export const getProductsByCategoryAndBrand = (categorySlug: string, brand: Brand): Product[] => {
  return products.filter(p => p.category === categorySlug && p.brand === brand);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};

export const formatBDT = (amount: number): string => {
  return `৳${amount.toLocaleString('en-BD')}`;
};
