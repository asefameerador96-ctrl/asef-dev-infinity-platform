import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import InfinityLogo from "./InfinityLogo";
import { NavDropdown, brandItems, productItems } from "./NavDropdown";

const InfinityNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass-strong py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <InfinityLogo size={50} animated={!isScrolled} />
            <motion.span 
              className="font-display text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              INFINITY
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Home Link */}
            <Link to="/" className="relative group">
              <motion.span
                className={`font-medium text-sm tracking-wide transition-colors ${
                  location.pathname === "/" 
                    ? "text-primary" 
                    : "text-foreground/70 hover:text-foreground"
                }`}
                whileHover={{ y: -2 }}
              >
                Home
              </motion.span>
              {location.pathname === "/" && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                />
              )}
            </Link>

            {/* Brands Dropdown */}
            <NavDropdown label="Brands" items={brandItems} isScrolled={isScrolled} />

            {/* Products Dropdown */}
            <NavDropdown label="Products" items={productItems} isScrolled={isScrolled} />

            {/* Events Link */}
            <Link to="/events" className="relative group">
              <motion.span
                className={`font-medium text-sm tracking-wide transition-colors ${
                  location.pathname === "/events" 
                    ? "text-primary" 
                    : "text-foreground/70 hover:text-foreground"
                }`}
                whileHover={{ y: -2 }}
              >
                Events
              </motion.span>
              {location.pathname === "/events" && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                />
              )}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
              </motion.div>
            </Link>
            
            <Link to="/auth" className="relative group hidden sm:block">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <User className="w-5 h-5" />
              </motion.div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden pt-20"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <motion.nav
              className="relative flex flex-col items-center justify-center h-full gap-6 overflow-y-auto py-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
              }}
            >
              {/* Home */}
              <motion.div
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
              >
                <Link
                  to="/"
                  className={`text-3xl font-display font-bold tracking-tight ${
                    location.pathname === "/" ? "text-gradient" : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  Home
                </Link>
              </motion.div>

              {/* Brands Section */}
              <motion.div
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground mb-2">Brands</p>
                <div className="flex flex-col gap-2">
                  {brandItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`text-2xl font-display font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Products Section */}
              <motion.div
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground mb-2">Products</p>
                <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                  {productItems.slice(0, 6).map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-sm font-medium text-foreground/70 hover:text-foreground px-3 py-1 rounded-full border border-border"
                    >
                      {item.icon} {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Events */}
              <motion.div
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
              >
                <Link
                  to="/events"
                  className={`text-3xl font-display font-bold tracking-tight ${
                    location.pathname === "/events" ? "text-gradient" : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  Events
                </Link>
              </motion.div>

              <motion.div
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
                className="flex gap-4 mt-4"
              >
                <Link
                  to="/auth"
                  className="px-8 py-3 neon-border rounded-full font-medium hover:neon-glow transition-all"
                >
                  Sign In
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InfinityNav;
