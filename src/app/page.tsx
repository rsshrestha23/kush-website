import { Lamp } from "@/components/ui/lamp";
import Testimonials from "@/components/ui/testimonials";
import FAQ from "@/components/ui/faq";
import StickyContent from "@/pages/StickyContent";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/ui/footer";
// import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function Home() {
  return (
    <div>
          <Navbar />
          <Lamp />
          <StickyContent />
          <Testimonials />
          <FAQ />
          <Footer />
    
    
    </div>
  );
}