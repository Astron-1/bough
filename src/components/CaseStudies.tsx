import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface CaseStudiesProps {
  className?: string;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ className = "" }) => {
  const caseStudies: CaseStudy[] = [
    {
      id: "resilience",
      title: "Building resilience through better governance",
      description: "Helping organizations establish robust governance frameworks to navigate regulatory challenges.",
      imageUrl: "/bottomImage.png",
      link: "/insights/case-studies/resilience"
    },
    {
      id: "sox",
      title: "Revamping SOX compliance for enhanced agility and cost efficiency",
      description: "Streamlining compliance processes to reduce costs while improving operational effectiveness.",
      imageUrl: "/insightheroImage.jpg",
      link: "/insights/case-studies/sox-compliance"
    },
    {
      id: "erp",
      title: "Seeing a complex ERP implementation through RAR implementation",
      description: "Managing and optimizing complex enterprise system implementations with effective risk management.",
      imageUrl: "/corporate.jpg",
      link: "/insights/case-studies/erp-implementation"
    }
  ];

  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-12 text-black">Featured case studies</h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          {caseStudies.map((study) => (
            <div 
              key={study.id} 
              className="flex flex-col rounded-[1.25rem] border border-[#D9D9D9] bg-[#FBFBFB] shadow-sm"
              style={{ width: '21.25rem', height: '30rem', flexShrink: 0 }}
            >
              <div className="h-[200px] w-full relative rounded-t-[1.25rem] overflow-hidden">
                <Image 
                  src={study.imageUrl}
                  alt={study.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-6 leading-tight text-black">{study.title}</h3>
                <p className="text-base text-gray-700 mb-auto">{study.description}</p>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link 
                    href={study.link}
                    className="inline-flex items-center text-black font-medium hover:opacity-80 transition-opacity"
                  >
                    <span className="text-base">Read more</span>
                    <div className="flex items-center justify-center rounded-full border border-black w-7 h-7 ml-4">
                      <ArrowRight size={16} className="text-black" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center mx-2 hover:bg-gray-50 transition-colors">
            <span className="sr-only">Previous</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center mx-2 hover:bg-gray-50 transition-colors">
            <span className="sr-only">Next</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies; 