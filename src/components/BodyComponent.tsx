import BottomSection from "./BottomSection";

import HeroText from "./heroText";
import PartnersSection from "./PartnersSection";
import BoughServices from "./Services";
import CaseStudyCarousel from "./CaseStudyCarousel";
import homeBottomImage from "../../public/bottomImage.png";
import HomeInsights from "./HomeInsights";

export default function BodyComponent() {
  return (
    <div className=" h-full w-full">
      <HeroText />
      <div className="3xl:mt-96">
        <div
          className="absolute left-0 w-full h-full overflow-visible pointer-events-none"
          style={{
            zIndex: 0,
            top: "600px",
            height: "calc(100% - 200px)",
            opacity: 0.7,
          }}
        >
          <svg
            width="150%"
            height="3000"
            viewBox="0 0 1720 3000"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "-10%" }}
          >
            <path
              opacity="0.2"
              d="M-250 460C-112.5 671.999 356.8 685.899 1250 431.4995C2100 177.1 1300 1143.5 638 1389.5C-218.5 1910.5 219.4 3345.9 683 3423.5"
              stroke="#6fa3e1"
              strokeWidth="200"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <BoughServices />
        <CaseStudyCarousel />
        <HomeInsights />
        <PartnersSection />
        <BottomSection
          content={"Shaping tomorrow, Starting today"}
          backgroundImage={homeBottomImage}
        />
      </div>
    </div>
  );
}
