import { Lamp } from "../components/ui/Lamp";
import Testimonials from "../components/ui/Testimonials";
import FAQ from "../components/ui/Faq";
import StickyContent from "../pages/StickyContent";
import { Navbar } from "../components/Navbar";
import Footer from "../components/ui/Footer";
// import { MacbookScroll } from "../components/ui/MacbookScroll";

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
