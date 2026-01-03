import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { categories } from "@/data/products";
import { brandLogos } from "@/data/brandLogos";

interface DropdownItem {
  name: string;
  path: string;
  icon?: string;
  gradient?: string;
  logo?: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  isScrolled: boolean;
}

const brandItems: DropdownItem[] = [
  { 
    name: "NOVA", 
    path: "/brands/nova", 
    gradient: "from-cyan-400 to-cyan-600",
    logo: brandLogos.nova
  },
  { 
    name: "XFORCE", 
    path: "/brands/xforce", 
    gradient: "from-red-500 to-blue-500",
    logo: brandLogos.xforce
  },
  { 
    name: "LIVE THE MOMENT", 
    path: "/brands/live-moment", 
    gradient: "from-green-500 to-pink-500",
    logo: brandLogos['live-moment']
  },
];

const productItems: DropdownItem[] = categories.map(cat => ({
  name: cat.name,
  path: `/store/${cat.slug}`,
  icon: cat.icon,
}));

const NavDropdown = ({ label, items, isScrolled }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        className="flex items-center gap-1 font-medium text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors"
        whileHover={{ y: -2 }}
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
          >
            <div className="glass-strong rounded-2xl p-2 min-w-[280px] neon-border shadow-2xl">
              <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
                {items.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ x: 5, backgroundColor: "hsl(var(--muted))" }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        item.gradient ? 'group' : ''
                      }`}
                    >
                      {item.icon && (
                        <span className="text-xl">{item.icon}</span>
                      )}
                      {item.logo ? (
                        <img 
                          src={item.logo} 
                          alt={item.name} 
                          className="h-8 w-auto max-w-[140px] object-contain"
                        />
                      ) : item.gradient ? (
                        <span className={`font-display font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                          {item.name}
                        </span>
                      ) : (
                        <span className="font-medium text-foreground/90 group-hover:text-foreground">
                          {item.name}
                        </span>
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { NavDropdown, brandItems, productItems };
export default NavDropdown;
