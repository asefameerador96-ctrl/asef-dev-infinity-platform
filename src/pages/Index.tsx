import InfinityNav from "../components/infinity/InfinityNav";
import InfinityFooter from "../components/infinity/InfinityFooter";
import HeroSection from "../components/infinity/HeroSection";
import BrandChapterRail from "../components/infinity/BrandChapterRail";
import BrandTiles from "../components/infinity/BrandTiles";
import LuxurySection from "../components/infinity/LuxurySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <InfinityNav />
      
      <main>
        <HeroSection />
        <BrandChapterRail />
        <BrandTiles />
        <LuxurySection />
      </main>
      
      <InfinityFooter />
    </div>
  );
};

export default Index;
