import InfinityNav from "../components/infinity/InfinityNav";
import InfinityFooter from "../components/infinity/InfinityFooter";
import HeroSection from "../components/infinity/HeroSection";
import BrandChapterRail from "../components/infinity/BrandChapterRail";
import BrandTiles from "../components/infinity/BrandTiles";
import LuxurySection from "../components/infinity/LuxurySection";
import ParallaxShowcase from "../components/infinity/ParallaxShowcase";
import ParallaxGallery from "../components/infinity/ParallaxGallery";
import HorizontalScroll from "../components/infinity/HorizontalScroll";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <InfinityNav />
      
      <main>
        <HeroSection />
        <BrandChapterRail />
        <BrandTiles />
        <ParallaxShowcase />
        <ParallaxGallery />
        <HorizontalScroll />
        <LuxurySection />
      </main>
      
      <InfinityFooter />
    </div>
  );
};

export default Index;
