import FeaturedSections from "./components/FeaturedSection";
import HeroSection from "./components/HeroSection";
import Newsletter from "./components/Newsletter";
import RollingGallery from "./components/RollingGallery";

import { useGetMeQuery } from "@/redux/features/authApi";

export default function Home() {
  const { data } = useGetMeQuery(undefined);
  console.log(data);

  return (
    <div>
      <HeroSection />
      <RollingGallery />
      <FeaturedSections />
      <Newsletter />
    </div>
  );
}
