import { useRef } from "react";
import ServiceCard from "./ServiceCard";
// import ServicePath from "./ServicePath";
import accountingImage from "../../public/ac1.webp";
import esgImage from "../../public/esg1.webp";
import transformationImage from "../../public/transformation1.webp";
import riskImage from "../../public/risk1.webp";
import AccountingSec from "../../public/ac2.webp";
import RiskSec from "../../public/risk2.webp";
import TransformationSec from "../../public/transformation2.webp";
import ESGSec from "../../public/esg2.webp";

// Services array with names, images, and descriptions
const services = [
  { name: "Accounting", image: accountingImage, sec: AccountingSec, description: "Navigating changing regulations and new accounting standards can be daunting. Developing a forward-looking strategy, enriched by diverse insights, often requires resources beyond your current capabilities" },
  { name: "Risk", image: riskImage, sec: RiskSec, description: "Risk is inevitable in all businesses, and whether minor or significant, it must not be overlooked or underestimated. Bough equips your business with the right defenses and controls to manage and mitigate risks effectively" },
  {
    name: "Transformation",
    image: transformationImage,
    sec: TransformationSec,
    description: "In a world where disruptive technologies and emerging methodologies have become the norm, not every business can fully capitalize on these constant changes",
  },
  { name: "ESG", image: esgImage, sec: ESGSec, description: "We partner with our clients to create comprehensive solutions which enable integration of Environmental, Social and Governance (ESG) Principles with business model and strategy for sustainable value creation" },
];

export default function BoughServices({
  servicePage,
}: {
  servicePage?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // const [animate, setAnimate] = useState<boolean>(false);

  // useEffect(() => {
  //   // Check if section is in viewport
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         // Start animation when component is in view
  //         setTimeout(() => {
  //           setAnimate(true);
  //         }, 300);
  //       }
  //     },
  //     { threshold: 0.1 }
  //   );

  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current);
  //   }

  //   return () => {
  //     if (sectionRef.current) {
  //       observer.unobserve(sectionRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div className="relative w-full py-8 md:py-12" style={{ minHeight: "100px" }}> {/* Reduced py for tighter look if needed */}
      {/* Service Cards Container */}
      <div
        ref={sectionRef}
        // Removed negative margins, relying on no padding/margin on children for no gap
        // Added justify-start to ensure cards align to the start if not filling the row
        className="relative flex flex-row flex-wrap w-full justify-start"
      >
        {/* SVG Path connecting the service cards */}
        {/* <ServicePath
          className="hidden md:block"
          animate={animate}
          pathColor="#0066FF"
          strokeWidth={3}
          showBall={true}
        /> */}

        {services.map((service, i) => {
          return (
            // Each card container is now a column in the flex row
            // Removed px (padding) and mb (margin-bottom) to eliminate gaps
            // Widths: w-full on smallest, then w-1/2, then w-1/4 for responsiveness
            <div
              key={service.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="w-full sm:w-1/2 lg:w-1/4" // No padding/margin for no gaps
            >
              <ServiceCard
                image={servicePage ? service.sec : service.image}
                serviceType={service.name}
                description={service.description} // Pass description
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
