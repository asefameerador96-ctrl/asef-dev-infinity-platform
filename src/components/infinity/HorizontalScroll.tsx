import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import liveMomentVideo from "@/assets/live-moment-brand.mp4";

const scrollItems = [
  { 
    title: "Premium",
    subtitle: "Materials",
    description: "Sourced from the finest suppliers worldwide"
  },
  { 
    title: "Limited",
    subtitle: "Editions",
    description: "Exclusive drops you won't find anywhere else"
  },
  { 
    title: "Global",
    subtitle: "Delivery",
    description: "Shipped to your doorstep with care"
  },
  { 
    title: "Authentic",
    subtitle: "Experience",
    description: "Verified quality, guaranteed satisfaction"
  }
];

const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.3]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background video with parallax */}
        <motion.div 
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 -z-10"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={liveMomentVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/70" />
        </motion.div>

        {/* Horizontal scrolling content */}
        <div className="h-full flex items-center">
          <motion.div 
            style={{ x }}
            className="flex gap-8 pl-[10vw]"
          >
            {scrollItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw]"
              >
                <div className="glass rounded-3xl p-12 h-full border border-primary/20 hover:border-primary/50 transition-all group">
                  <span className="text-6xl font-display font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-4xl md:text-5xl font-bold mt-6">
                    <span className="text-gradient">{item.title}</span>
                    <br />
                    <span className="text-foreground/80">{item.subtitle}</span>
                  </h3>
                  <p className="text-lg text-muted-foreground mt-6">{item.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Final CTA card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw]"
            >
              <Link to="/products">
                <div className="relative rounded-3xl p-12 h-full bg-gradient-neon overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors" />
                  <div className="relative z-10">
                    <h3 className="font-display text-4xl md:text-5xl font-bold">
                      Explore
                      <br />
                      <span className="text-foreground/90">Now</span>
                    </h3>
                    <p className="text-lg mt-6">Discover the complete collection →</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
