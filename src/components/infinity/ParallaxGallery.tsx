import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import novaVideo from "@/assets/nova-brand.mp4";
import xforceVideo from "@/assets/xforce-brand.mp4";

const ParallaxGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const centerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-6 h-full">
        <div className="sticky top-20 h-[80vh] flex items-center justify-center">
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Left Video - moves up */}
            <motion.div
              style={{ y: leftY, rotate: rotateZ }}
              className="absolute -left-10 md:left-0 top-0 w-1/2 md:w-2/5 aspect-[3/4] z-10"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden neon-border">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={novaVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <Link to="/brands/nova" className="group flex items-center gap-2">
                    <span className="font-display text-2xl font-bold text-nova">NOVA</span>
                    <ArrowUpRight className="w-5 h-5 text-nova group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Video - moves down */}
            <motion.div
              style={{ y: rightY, rotate: useTransform(rotateZ, v => -v) }}
              className="absolute -right-10 md:right-0 bottom-0 w-1/2 md:w-2/5 aspect-[3/4] z-10"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden neon-border">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={xforceVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6">
                  <Link to="/brands/xforce" className="group flex items-center gap-2">
                    <span className="font-display text-2xl font-bold text-xforce">XFORCE</span>
                    <ArrowUpRight className="w-5 h-5 text-xforce group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Center content */}
            <motion.div
              style={{ scale: centerScale }}
              className="relative z-20 text-center py-32"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-display text-6xl md:text-8xl font-bold"
              >
                <span className="text-gradient">Define</span>
                <br />
                <span className="text-foreground/80">Your Style</span>
              </motion.h2>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxGallery;
