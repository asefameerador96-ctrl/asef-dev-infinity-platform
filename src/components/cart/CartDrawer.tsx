import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { formatBDT, getBrandColor } from '@/data/products';
import { Button } from '@/components/ui/button';

const CartDrawer = () => {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    totalItems, 
    totalPrice,
    updateQuantity,
    removeFromCart 
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg font-display font-semibold">Your Cart</h2>
                <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Add some items to get started
                  </p>
                  <Button onClick={() => setIsCartOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 pb-6 border-b border-border last:border-0"
                    >
                      {/* Product Image */}
                      <Link 
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                        >
                          <h3 className={`font-medium text-sm truncate ${getBrandColor(item.product.brand)}`}>
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          Size: {item.size}
                        </p>
                        <p className="font-semibold mt-2">
                          {formatBDT(item.product.discountedPrice)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="p-2 hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="p-2 hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatBDT(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-border">
                  <span>Total</span>
                  <span>{formatBDT(totalPrice)}</span>
                </div>
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors text-center py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
