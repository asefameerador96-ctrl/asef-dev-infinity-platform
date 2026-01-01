import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const tiles = [
  {
    name: "NOVA",
    color: "nova",
    path: "/brands/nova",
    gradient: "from-nova/30 to-nova-glow/10"
  },
  {
    name: "LIVE THE MOMENT",
    color: "live-moment",
    path: "/brands/live-the-moment",
    gradient: "from-live-moment/30 to-live-moment-glow/10"
  },
  {
    name: "XFORCE",
    color: "xforce",
    path: "/brands/xforce",
    gradient: "from-xforce/30 to-xforce-glow/10"
  },
  {
    name: "INFINITY",
    color: "primary",
    path: "/brands",
    gradient: "from-primary/30 to-accent/10"
  }
];

const BrandTiles = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={tile.path}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative aspect-square rounded-2xl overflow-hidden group cursor-pointer
                    bg-gradient-to-br ${tile.gradient} border border-border/50 hover:border-${tile.color}/50
                    transition-all duration-500
                  `}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      background: [
                        `radial-gradient(circle at 0% 0%, hsl(var(--${tile.color})) 0%, transparent 50%)`,
                        `radial-gradient(circle at 100% 100%, hsl(var(--${tile.color})) 0%, transparent 50%)`,
                        `radial-gradient(circle at 0% 0%, hsl(var(--${tile.color})) 0%, transparent 50%)`,
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                    <motion.h3
                      className={`font-display text-xl md:text-2xl lg:text-3xl font-bold text-center
                        ${tile.color === 'nova' ? 'text-gradient-nova' : ''}
                        ${tile.color === 'live-moment' ? 'text-gradient-live' : ''}
                        ${tile.color === 'xforce' ? 'text-gradient-xforce' : ''}
                        ${tile.color === 'primary' ? 'text-gradient' : ''}
                      `}
                    >
                      {tile.name}
                    </motion.h3>
                    
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 0.6, y: 0 }}
                      className="text-xs uppercase tracking-widest mt-2 text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      Explore →
                    </motion.span>
                  </div>

                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 
                    bg-gradient-to-bl ${tile.gradient} opacity-50 group-hover:opacity-80 transition-opacity
                  `} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandTiles;
