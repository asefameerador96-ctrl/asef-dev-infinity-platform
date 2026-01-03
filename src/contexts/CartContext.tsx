import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Size, formatBDT } from '@/data/products';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  product: Product;
  quantity: number;
  size: Size;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: Size) => void;
  removeFromCart: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, quantity: number, size: Size) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.size === size
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, size }];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} (${size}) x${quantity} - ${formatBDT(product.discountedPrice * quantity)}`,
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: Size) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.size === size)
    ));
  };

  const updateQuantity = (productId: string, size: Size, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setItems(prev => prev.map(item =>
      item.product.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
