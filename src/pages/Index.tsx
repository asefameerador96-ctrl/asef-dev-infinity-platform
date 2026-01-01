import InfinityNav from "../components/infinity/InfinityNav";
import InfinityFooter from "../components/infinity/InfinityFooter";
import HeroSection from "../components/infinity/HeroSection";
import BrandChapterRail from "../components/infinity/BrandChapterRail";
import BrandTiles from "../components/infinity/BrandTiles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <InfinityNav />
      
      <main>
        <HeroSection />
        <BrandChapterRail />
        <BrandTiles />
      </main>
      
      <InfinityFooter />
    </div>
  );
};

export default Index;
