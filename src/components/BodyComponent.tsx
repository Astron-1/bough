import BottomSection from "./BottomSection";
import MainCarousel from "./MainCarousel";
import GlobalClickSpark from "./GlobalClickSpark";
import HeroText from "./heroText";
import PartnersSection from "./PartnersSection";
import BoughServices from "./Services";

export default function BodyComponent() {
  return (
    <div className="bg-[url('/body.png')] bg-no-repeat  bg-center h-full w-full">
      <GlobalClickSpark>
        <HeroText />
        <BoughServices />
        <MainCarousel />
        <PartnersSection />
        <BottomSection />
      </GlobalClickSpark>
    </div>
  );
}
