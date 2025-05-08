import { useRef } from "react";
import ServiceCard from "./ServiceCard";
// import ServicePath from "./ServicePath";
import accountingImage from "../../public/accounting.png";
import esgImage from "../../public/esg.png";
import transformationImage from "../../public/transformation.png";
import riskImage from "../../public/risk.png";
import AccountingSec from "../../public/AccountingSec.png";
import RiskSec from "../../public/RiskSec.png";
import TransformationSec from "../../public/TransformationSec.png";
import ESGSec from "../../public/ESGSec.png";

// Services array with names and images
const services = [
  { name: "Accounting", image: accountingImage, sec: AccountingSec },
  { name: "Risk", image: riskImage, sec: RiskSec },
  {
    name: "Transformation",
    image: transformationImage,
    sec: TransformationSec,
  },
  { name: "ESG", image: esgImage, sec: ESGSec },
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
    <div className="relative w-full py-16" style={{ minHeight: "100px" }}>
      {/* Service Cards Container with embedded SVG path */}
      <div ref={sectionRef} className="relative flex flex-col gap-20 w-full">
        {/* SVG Path connecting the service cards */}
        {/* <ServicePath
          className="hidden md:block"
          animate={animate}
          pathColor="#0066FF"
          strokeWidth={3}
          showBall={true}
        /> */}

        {services.map((service, i) => {
          const isEven = i % 2 === 0;

          return (
            <div
              key={service.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`w-full flex ${
                isEven ? "justify-end" : "justify-start"
              } relative z-10`}
            >
              <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[1010px]">
                <ServiceCard
                  image={servicePage ? service.sec : service.image}
                  serviceType={service.name}
                  position={isEven ? "right" : "left"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
