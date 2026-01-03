import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./contexts/CartContext";
import CartDrawer from "./components/cart/CartDrawer";
import Index from "./pages/Index";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import OurStory from "./pages/about/OurStory";
import Sustainability from "./pages/about/Sustainability";
import SizeGuide from "./pages/about/SizeGuide";
import CustomerCare from "./pages/about/CustomerCare";
import StoreLocator from "./pages/about/StoreLocator";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Nova from "./pages/brands/Nova";
import LiveMoment from "./pages/brands/LiveMoment";
import XForce from "./pages/brands/XForce";
import CategoryStore from "./pages/store/CategoryStore";
import ProductDetailStore from "./pages/store/ProductDetailStore";
import Waitlist from "./pages/Waitlist";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CartDrawer />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about/our-story" element={<OurStory />} />
            <Route path="/about/sustainability" element={<Sustainability />} />
            <Route path="/about/size-guide" element={<SizeGuide />} />
            <Route path="/about/customer-care" element={<CustomerCare />} />
            <Route path="/about/store-locator" element={<StoreLocator />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/brands/nova" element={<Nova />} />
            <Route path="/brands/live-moment" element={<LiveMoment />} />
            <Route path="/brands/xforce" element={<XForce />} />
            <Route path="/store/:categorySlug" element={<CategoryStore />} />
            <Route path="/store/product/:productId" element={<ProductDetailStore />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
