import FeaturedSections from "./components/FeaturedSection";
import HeroSection from "./components/HeroSection";
import Newsletter from "./components/Newsletter";
import RollingGallery from "./components/RollingGallery";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <RollingGallery/> 
      <FeaturedSections />
      <Newsletter/>
      
    </div>
  );
}
