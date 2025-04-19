import BottomSection from "./BottomSection";
import CaseStudyCarousel from "./CaseStudyCarousel";
import HeroText from "./heroText";
import PartnersSection from "./PartnersSection";
import BoughServices from "./Services";

export default function BodyComponent() {
  return (
    <div className="bg-[url('/body.svg')]  bg-center h-full w-full">
      <HeroText />
      <BoughServices />
      <CaseStudyCarousel />
      <PartnersSection />
      <BottomSection />
    </div>
  );
}
