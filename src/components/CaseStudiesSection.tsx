"use client";

import React from "react";
import Link from "next/link";
import ClickSpark from "./ClickSpark";

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: "finance" | "digital" | "risk";
  bgColor: string;
  accentColor: string;
  learnMoreUrl: string;
}

interface CaseStudiesSectionProps {
  className?: string;
}

const CaseStudyCard: React.FC<{ caseStudy: CaseStudy }> = ({ caseStudy }) => {
  // Function to render appropriate icon based on type
  const renderIcon = () => {
    switch (caseStudy.iconType) {
      case "finance":
        return (
          <div className="h-12 w-12 relative">
            <div className="absolute inset-0 rounded-full bg-white/20"></div>
            <svg
              className="absolute inset-0 h-full w-full p-2.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case "digital":
        return (
          <div className="h-12 w-12 relative">
            <div className="absolute inset-0 rounded-full bg-white/20"></div>
            <svg
              className="absolute inset-0 h-full w-full p-2.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 22H15M12 17V22M8 22H16M15.5 2H8.5C7.11929 2 6 3.11929 6 4.5V15.5C6 16.8807 7.11929 18 8.5 18H15.5C16.8807 18 18 16.8807 18 15.5V4.5C18 3.11929 16.8807 2 15.5 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case "risk":
        return (
          <div className="h-12 w-12 relative">
            <div className="absolute inset-0 rounded-full bg-white/20"></div>
            <svg
              className="absolute inset-0 h-full w-full p-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12M12 16H12.01"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ClickSpark
      sparkColor={caseStudy.accentColor}
      sparkRadius={20}
      sparkCount={10}
      extraScale={1.2}
    >
      <div
        className="rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg group"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="relative w-full h-48 overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:brightness-125"
          style={{
            background: `linear-gradient(135deg, ${caseStudy.bgColor} 0%, rgba(30, 30, 60, 0.7) 100%)`,
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {caseStudy.iconType === "finance" && (
              <>
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5"></div>
                <div className="absolute top-1/3 left-0 w-full h-0.5 bg-white/3"></div>
                <div className="absolute top-2/3 left-0 w-full h-0.5 bg-white/3"></div>
                <div
                  className="absolute w-32 h-32 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(circle, ${caseStudy.accentColor} 0%, transparent 70%)`,
                  }}
                ></div>
              </>
            )}

            {caseStudy.iconType === "digital" && (
              <>
                <div className="absolute top-0 left-1/4 w-0.5 h-full bg-white/5"></div>
                <div className="absolute top-0 left-2/4 w-0.5 h-full bg-white/3"></div>
                <div className="absolute top-0 left-3/4 w-0.5 h-full bg-white/3"></div>
                <div
                  className="absolute w-36 h-36"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotate(45deg)",
                    border: `2px solid ${caseStudy.accentColor}`,
                    opacity: 0.3,
                  }}
                ></div>
              </>
            )}

            {caseStudy.iconType === "risk" && (
              <>
                <div
                  className="absolute w-40 h-40"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: `8px solid ${caseStudy.accentColor}`,
                    opacity: 0.2,
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  }}
                ></div>
                <div
                  className="absolute w-64 h-64"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: `4px solid ${caseStudy.accentColor}`,
                    opacity: 0.1,
                    borderRadius: "60% 40% 40% 60% / 60% 60% 40% 40%",
                  }}
                ></div>
              </>
            )}
          </div>

          {/* Icon */}
          <div className="z-10 transform transition-transform duration-500 group-hover:scale-110">
            {renderIcon()}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3
            className="  text-[1.5rem] font-bold leading-[1.5rem] mb-2"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            {caseStudy.title}
          </h3>
          <h4
            className=" /80 text-[1.1rem] font-semibold mb-4"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            {caseStudy.subtitle}
          </h4>
          <p className=" /70 mb-6 flex-grow">{caseStudy.description}</p>
          <Link
            href={caseStudy.learnMoreUrl}
            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center font-medium"
          >
            Know more
            <svg
              className="ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </ClickSpark>
  );
};

const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  className = "",
}) => {
  // Sample case studies data
  const caseStudies: CaseStudy[] = [
    {
      id: "finance-transformation",
      title: "Finance Transformation",
      subtitle: "Global Financial Institution",
      description:
        "At Bough, we understand that solving complex challenges goes beyond expertise. We helped this global institution modernize their financial operations, resulting in 45% reduction in processing time and $2.3M annual savings.",
      iconType: "finance",
      bgColor: "#0c3b6a",
      accentColor: "#1e88e5",
      learnMoreUrl: "/case-studies/finance-transformation",
    },
    {
      id: "digital-strategy",
      title: "Digital Strategy",
      subtitle: "Retail Manufacturing Company",
      description:
        "At Bough, we understand that solving complex challenges goes beyond expertise. Our digital transformation strategy helped this manufacturer achieve 60% increase in online sales and 30% improvement in supply chain efficiency.",
      iconType: "digital",
      bgColor: "#2a1b5a",
      accentColor: "#9c27b0",
      learnMoreUrl: "/case-studies/digital-strategy",
    },
    {
      id: "risk-management",
      title: "Risk Management",
      subtitle: "Healthcare Provider Network",
      description:
        "At Bough, we understand that solving complex challenges goes beyond expertise. We implemented an enterprise risk management framework that reduced compliance incidents by 78% and improved operational resilience.",
      iconType: "risk",
      bgColor: "#4a1c24",
      accentColor: "#ff5722",
      learnMoreUrl: "/case-studies/risk-management",
    },
  ];

  return (
    <section className={`py-20 relative ${className}`}>
      <ClickSpark
        sparkColor="#3498db"
        sparkRadius={70}
        sparkCount={10}
        sparkSize={18}
        extraScale={1.2}
        duration={500}
      >
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-[2.8rem] font-bold leading-[3rem]   mb-4"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              Leveraging leading technologies to maximize impact
            </h2>
            <p className=" /80 text-xl max-w-3xl mx-auto">
              At Bough, we understand that solving complex challenges goes
              beyond expertise—it requires collaboration. That&apos;s why we
              continuously enhance our capabilities and forge strategic
              partnerships with leading technology providers and industry
              experts.
            </p>
          </div>

          <h3
            className="text-center text-[2rem] font-semibold leading-[2.5rem] mb-12  "
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            Our results defines who we are
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg   font-medium group overflow-hidden relative"
              style={{
                border: "2px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 0 20px rgba(52, 152, 219, 0.3)",
                transition: "all 0.3s ease",
              }}
            >
              <span className="relative z-10">View all case studies</span>
              <svg
                className="ml-2 w-5 h-5 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <div
                className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
                }}
              ></div>
            </Link>
          </div>
        </div>
      </ClickSpark>
    </section>
  );
};

export default CaseStudiesSection;
