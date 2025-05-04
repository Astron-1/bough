import React from 'react';
import { useRouter } from 'next/router';
import Header from '@app/components/Header';
import Text, { Font } from '@app/components/Text';
import Link from 'next/link';
import { teamMembers } from '@app/pages/about-us';
// import ConnectCTA from '@app/components/ConnectCTA';
import BottomSection from '@app/components/BottomSection';

// Type definition for team member data
interface TeamMember {
  id: string;
  name: string;
  title: string;
  image?: string;
  alt?: string;
  linkedIn?: string;
  bio?: string[];
  skills?: string[];
}

// Placeholder Image Component
const ProfilePlaceholder = ({ name, title }: { name: string, title: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-blue-100 text-blue-800">
    <svg 
      className="w-32 h-32 mb-4 text-blue-400" 
      fill="currentColor" 
      viewBox="0 0 20 20" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
        clipRule="evenodd"
      />
    </svg>
    <div className="px-3 text-center">
      <p className="font-semibold">{name}</p>
      <p className="text-sm">{title}</p>
    </div>
  </div>
);

// Sample detailed team member data with bios
const teamMembersBio: Record<string, Partial<TeamMember>> = {
  'rohit-qamra': {
    bio: [
      "Rohit Qamra founded Bough Consulting with a clear mission: to create a business rooted in ethos, pathos, and logos. The name \"Bough\" reflects values like trust, reliability, dependability, honesty, humility, and nurturing, positioning it as the main branch clients can lean on and trust.",
      "Rohit brings 25 years of experience in management consulting, with deep expertise in accounting advisory, finance transformation, financial reporting, and operations management. He also excels in regulatory compliance, internal audit, and risk management. His work with senior and board-level executives has been pivotal in developing solutions that align with strategic goals and drive success.",
      "Before founding Bough, Rohit held key leadership roles at EXL, managing clients across diverse sectors such as technology, retail, distribution, services, manufacturing, and utilities. His career started at Deloitte, where he led audit and assurance engagements for major clients. At American Express, he assessed global corporations for corporate programs and spearheaded product development and market studies.",
      "Rohit is actively building Bough's ESG and market research businesses and steering the company to become a GenAI-led consulting firm through partnerships with leading GenAI technology players.",
      "Outside of work, Rohit and his wife are motorcycle enthusiasts, avid campers, and have completed the NYC marathon. Rohit holds a Bachelor's degree in Commerce from Shri Ram College of Commerce, Delhi University, and is a Chartered Accountant from the Institute of Chartered Accountants of India."
    ],
    skills: ["Management Consulting", "Accounting Advisory", "Finance Transformation", "Strategic Leadership", "Risk Management"]
  },
  'ratan-postwalla': {
    bio: [
      "Ratan Postwalla is the Chief People Officer at Bough Consulting, responsible for leading the talent strategy of the organization. With a 25 year career spanning management consulting, leadership coaching, career strategy, and academia, Ratan has gained extensive experience in India, the USA, the UK, the Middle East, and the Asia-Pacific.",
      "Ratan is a co-founder of People Trust and a visiting faculty member at the BITS School of Management. He has previously held key positions at EXL and KPMG. His diverse expertise and global perspective have made him a pivotal figure in shaping organizational talent strategies.",
      "Ratan holds a Bachelor of Commerce degree from St. Xavier's College, Kolkata, and an MBA from the Indian School of Business (ISB), Hyderabad. His interests include sports, travel, theatre, and philanthropy, and he currently serves on the boards of various non-profits."
    ],
    skills: ["Talent Strategy", "Leadership Development", "Management Consulting", "Career Coaching", "Organizational Development"]
  },
  'akshendra-sahi': {
    bio: [
      "Akshendra Pratap Sahi is a Senior Manager at Bough Consulting LLC, with over 13 years of progressive consulting experience in driving growth, process improvement, risk management, and technology transformation initiatives across global organizations. Currently, he spearheads our transformation advisory practice, leading the digital finance transformation vertical. Akshendra has extensive experience overseeing large-scale, complex, cross-functional programs and transformations.",
      "He also leads the company's growth initiatives, playing a multifaceted go-to-market role at the intersection of business development, client success, partnerships, and sales. He has his vision set to build Bough into a niche player in the market by developing growth strategies and executing plans to drive the company's next phase of growth.",
      "Passionate about improving organizational performance and developing talent, Akshendra collaborates with C-suite executives, assesses business risks and opportunities of emerging technologies, and translates insights into practical solutions. His expertise lies in fostering client relationships, overseeing client engagements, managing global operations, and driving strategic initiatives.",
      "Akshendra holds a Bachelor of Arts Honours in Economics from Hans Raj College, University of Delhi."
    ],
    skills: ["Transformation Advisory", "Growth Strategy", "Business Development", "Client Success", "Strategic Initiatives"]
  },
  'sanya-singh': {
    bio: [
      "Sanya Singh, a Senior Manager in Accounting Advisory services at Bough Consulting, has been with the organization for over 7 years. With more than 12 years of experience in accounting advisory, audit assurance, and finance transformation, she manages several accounting advisory engagements and oversees client delivery for India operations. Sanya works closely with clients' controllership and finance leadership teams to support their technical and operational accounting needs and drive process improvements to enhance efficiency and effectiveness.",
      "Sanya's expertise includes technical knowledge of US GAAP and IndAS, financial analysis and reporting, compliance, and team and project management. An alumna of the KPMG External Audit practice in India, she has conducted financial audits for companies across various sectors, including FMCG, trading, manufacturing, real estate, print media, healthcare, technology, hospitality, and other services.",
      "Sanya holds a master's degree in finance and accounting and a bachelor's degree in commerce."
    ],
    skills: ["Accounting Advisory", "Audit Assurance", "Finance Transformation", "US GAAP", "Financial Reporting"]
  },
  'jason-polyzou': {
    bio: [
      "Jason Polyzou, a Manager at Bough Consulting, brings over 12 years of extensive experience in financial planning and analysis. At Bough Consulting, he oversees financial systems and processes, ensuring seamless operations and strategic financial management. His career spans a diverse range of industries, including technology, medical manufacturing, logistics, and data management, showcasing his versatility and adaptability.",
      "Jason has successfully supported organizations from small businesses to large global corporations with revenues exceeding $3 billion. His expertise in systems, processes, and communication has been pivotal in streamlining financial analytics, optimizing budget forecasts, and enhancing overall financial performance. Prior to joining Bough, Jay provided critical financial support to the global IT team, managed financial analytics, and oversaw the OneStream consolidation and planning platform at his former organization."
    ],
    skills: ["Financial Planning", "Financial Analysis", "Budget Forecasting", "Financial Systems", "Process Optimization"]
  },
  'abhishek-anand': {
    bio: [
      "Abhishek Anand is a Senior Consultant at Bough Consulting with expertise in accounting advisory and financial services. He specializes in technical accounting, process improvement, and financial reporting across multiple sectors."
    ],
    skills: ["Accounting Advisory", "Financial Reporting", "Process Improvement", "Technical Accounting"]
  },
  'gunjan-rajpal': {
    bio: [
      "Gunjan Rajpal is a Manager in Accounting Advisory services at Bough. She specializes in streamlining processes, enhancing value, and ensuring timely delivery of top-tier outcomes. Gunjan has expertise in US GAAP, ASC 606 revenue recognition, and excels in audit planning and reporting. She is proficient with software systems such as SAP, Salesforce, and other data management tools.",
      "Before joining Bough, Gunjan worked at Deloitte, leading external audits for a diverse portfolio of consumer and industrial clients. Her role included oversight of SOX Controls, substantive testing, and risk assessment.",
      "Gunjan holds a Bachelor's degree in Commerce from Shaheed Bhagat Singh College, Delhi University, and is a licensed Certified Public Accountant (US CPA). Outside of work, Gunjan enjoys home décor, dancing, and traveling to explore new cultures and places."
    ],
    skills: ["Accounting Advisory", "US GAAP", "ASC 606", "Audit Planning", "Financial Reporting"]
  },
  'firdaush-ansari': {
    bio: [
      "Firdaush Ansari is a Manager in Accounting Advisory Services at Bough, where he has been contributing for over 3 years. With extensive experience in Accounting Advisory, financial analysis & reporting and project management, Firdaush specializes in revenue assurance, particularly focusing on ASC 606 for technology clients.",
      "Firdaush is proficient in US GAAP and ASC 606 revenue recognition and reporting. He collaborates closely with clients' finance leadership teams to support their technical and operational accounting needs. Additionally, Firdaush oversees the quarter-end close process, which includes reconciling accounts, and updating financial records to ensure accuracy and completeness.",
      "Firdaush holds a bachelor's degree in commerce from Symbiosis College of Arts & Commerce, Pune. Outside of work, he enjoys cricket, exploring new cafes, and experiencing different cultures."
    ],
    skills: ["Accounting Advisory", "Revenue Assurance", "ASC 606", "Financial Analysis", "Project Management"]
  },
  'aditya-sharma': {
    bio: [
      "Aditya Sharma is a Senior Consultant in the Accounting Advisory Services at Bough, with 5+ years of experience in accounting advisory, audit, and assurance. He excels at statutory audit, ASC 606 financial reporting, and process transformations; and has led accounting and transformation engagements.",
      "Aditya previously worked at Deloitte, where he audited UK-based consumer and retail businesses; performed substantive testing procedures and analyzed their internal controls per the PCAOB standards. He holds a Bachelor's degree in Commerce from Shaheed Bhagat Singh College, Delhi University, and has cleared CFA Level 1.",
      "Outside of work, Aditya enjoys playing golf and badminton on weekends and is a dedicated gym enthusiast. He is also passionate about animal welfare, actively collaborating with an NGO to provide food and shelter for stray dogs."
    ],
    skills: ["Accounting Advisory", "ASC 606", "Financial Reporting", "Audit & Assurance", "Process Transformation"]
  },
  'shubham-kapoor': {
    bio: [
      "Shubham is a consultant at Bough Consulting with over 2+ years of experience. He drives strategic FP&A engagements for diverse clients and leverage various tools like Excel, Power BI, Salesforce, and NetSuite to deliver impactful, actionable, key, and data-driven insights.",
      "He performs comprehensive financial risk and flux analyses to pinpoint financial outliers and provide insights. He has also created dynamic, user-friendly Excel dashboards and project planners to streamline workflows, automated manual tasks with Power Automate, and advanced macros.",
      "Holding a B.Com (Hons) from the University of Delhi, Shubham has also cleared CFA Level I and FRM Part I. Outside work, he enjoys dissecting finance and macroeconomic trends, playing basketball, and going to the gym."
    ],
    skills: ["Financial Planning & Analysis", "Data Analytics", "Process Automation", "Financial Risk Analysis", "Dashboard Development"]
  },
  'puneeta-puri': {
    bio: [
      "Puneeta is a seasoned professional with over 25+ years of experience in finance, governance, assurance, and risk management. She is deeply involved in ESG (Environmental, Social, and Governance) and serves as a Consultant with the Sustainability Reporting Standards Board (SRSB) at the Institute of Chartered Accountants of India (ICAI) and as a Director at the Indian ESG Network.",
      "Her expertise includes building capacity for sustainable practices and providing training on ESG Readiness and BRSR (Business Responsibility and Sustainability Reporting) reporting and disclosures. Puneeta is passionate about environmental awareness and excels in researching and developing resources to enhance ESG capabilities.",
      "Puneeta aims to guide stakeholders towards sustainable transformation by integrating ESG principles into their business operations. She is also a frequent speaker at various forums, simplifying ESG complexities for her audience.",
      "Puneeta believes that life is defined by experiences, not just qualifications. This blend of passion and knowledge shapes her purpose as an ESG and Sustainability professional and mentor, working with corporates, startups, and impact groups to drive sustainable change."
    ],
    skills: ["ESG Advisory", "Sustainability Reporting", "BRSR", "Corporate Governance", "Risk Management"]
  },
  'rohan-budhraja': {
    bio: [
      "Rohan Budhraja is a Manager at Bough Consulting with over 14+ years of experience in ESG, sustainability, and transaction advisory services. He has worked with leading EPC organizations and Big4 consultancies specializing in WASH, wastewater management, and climate change mitigation. Rohan has led ESG strategy development, compliance, risk assessments, and sustainability reporting (GRI, BRSR).",
      "He holds a PGDM in International Business from IIFT and a degree in Chemical Engineering from Panjab University. His expertise supports clients in transitioning to sustainable practices, adopting renewable energy, and strengthening climate resilience."
    ],
    skills: ["ESG Strategy", "Sustainability Reporting", "Climate Change Mitigation", "Risk Assessment", "Transaction Advisory"]
  },
  'saket-gupta': {
    bio: [
      "Saket Gupta is a Senior Consultant at Bough with expertise in financial advisory and consulting services. He specializes in accounting transformations and process improvements for clients across various industries."
    ],
    skills: ["Financial Advisory", "Process Improvement", "Accounting Transformation"]
  },
  'khushi-singh': {
    bio: [
      "Khushi Singh is an Associate at Bough, bringing a rich background in economic research, financial inclusion, and CSR strategy. A recent Economics graduate from Shri Ram College of Commerce, University of Delhi, Khushi has interned at NITI Aayog, HDFC Bank, and SBI, where she analyzed economic data and supported MSME financial inclusion.",
      "As a social entrepreneur with CDF-SRCC, she led impactful projects empowering marginalized communities. Currently working in the ESG consulting space, Khushi aims to integrate environmental stewardship, social responsibility, and governance into finance and policy.",
      "Outside work, she enjoys basketball, theatre, and animal welfare."
    ],
    skills: ["Economic Research", "Financial Inclusion", "CSR Strategy", "ESG Consulting", "Social Entrepreneurship"]
  },
  'rishabh-singhal': {
    bio: [
      "Rishabh Singhal is a Manager in the IT Enterprise Risk Services division at Bough Consulting. With extensive experience in IT auditing, he specializes in risk-based and general IT controls audits, focusing on SOX and SSAE18 reports for clients in the Financial Services and Life Sciences & Healthcare industries. Rishabh has formerly worked with firms like EY, Deloitte, KPMG, and Credit Suisse.",
      "He holds a Bachelor of Technology in Computer Science from The NorthCap University, Gurgaon. Beyond his professional work, Rishabh is dedicated to giving back to the community, actively volunteering with Literacy India, a non-profit organization committed to providing holistic education and vocational skills to underprivileged children, youth, and women across India."
    ],
    skills: ["IT Auditing", "SOX Compliance", "SSAE18", "Risk Management", "IT Controls"]
  },
  'anoushka-bhati': {
    bio: [
      "Anoushka is a Manager in Risk Advisory Services at Bough, with 7+ years of work experience, specializing in Sarbanes-Oxley (SOX) compliance and risk management. She has experience in financial audits and risk-based control assessments.",
      "Before joining Bough, Anoushka was part of EY GDS's external audit team, focusing on substantive testing and risk assessment for retail, luxury, and technology clients.",
      "Anoushka finds joy in creating connections, whether it's through hosting meaningful gatherings or unwinding with her dog. She also loves the thrill of driving on wide, open roads - a simple pleasure that lets her escape the buzz of the city!",
      "Anoushka holds a Bachelor of Commerce degree from Mount Carmel College, Bangalore."
    ],
    skills: ["SOX Compliance", "Risk Management", "Financial Audits", "Control Assessments", "Risk Assessment"]
  },
  'sakshi-vaishnav': {
    bio: [
      "Sakshi is an Associate in the Risk Advisory vertical of Bough, where she has been working for the past year. She focuses on helping organizations strengthen their risk management frameworks and streamline processes. Over the past year, she has gained experience across SOX Assessment, risk and control matrix development, and process improvement initiatives.",
      "Sakshi holds a Bachelor of Commerce (Finance & Accountancy) degree from Christ University, Bangalore, where she graduated among the top of her class. Outside of work, she is passionate about painting, reading about entrepreneurship, and exploring creative side projects."
    ],
    skills: ["Risk Advisory", "SOX Assessment", "Process Improvement", "Risk Management", "Control Matrix Development"]
  },
  'saurabh-sharma': {
    bio: [
      "Saurabh Sharma is a Senior Consultant at Bough with expertise in accounting and financial advisory services. He specializes in process optimization and financial reporting solutions for clients across multiple industries."
    ],
    skills: ["Accounting Advisory", "Financial Reporting", "Process Optimization"]
  },
  'khushbu-singh': {
    bio: [
      "Khushbu Singh is a Senior Visual Communications Designer at Bough. With 3+ years of experience in conceptualizing, designing, and strategizing marketing, branding, and communication collaterals. She brings expertise across a diverse range of formats — from impactful PowerPoint presentations to animated and AI-driven videos. At Bough, she plays a key role in driving creative strategy and visual storytelling across consulting and finance industry clients.",
      "She has significantly contributed to the rebranding of Bough Consulting and the redesign of its website. In her previous roles, she worked on office branding projects and provided design support to the launch of an award-winning ad film campaign, earning her the Rising Star Award. Passionate about communicating stories and bringing even the smallest ideas to life, Khushbu crafts designs that transform concepts into memorable visual experiences.",
      "Outside of work, she is a trekking and travelling enthusiast who also likes to read and play video games. Khushbu holds a bachelor's degree in design from the National Institute of Fashion Technology (NIFT), Mumbai."
    ],
    skills: ["Visual Design", "Brand Strategy", "Animation", "UI/UX Design", "Creative Direction"]
  },
  'uddeshya-pal': {
    bio: [
      "Uddeshya is a Senior Consultant at Bough, leads the Center of Excellence for Automation, Analytics, and AI.",
      "With over 6+ years of experience in analytics and automation, he specializes in identifying and integrating technology-driven solutions that enhance business efficiency and decision-making. Uddeshya has worked across the Insurance, Mortgage, and Telecommunications industries, gaining broad sectoral exposure and a deep understanding of data-driven processes. His academic background includes a Bachelor's degree in Economics from the University of Delhi and a Master's degree in Economics from Guru Gobind Singh Indraprastha University.",
      "Passionate about the transformative potential of emerging technologies, he takes a keen interest in how AI and automation are reshaping industries and the future of work. Outside of his professional role, Uddeshya enjoys exploring creativity through cooking and finds balance on the basketball court. An avid manga reader and plant enthusiast, he believes in continuous learning and nurturing growth — both personally and professionally.",
      "He is committed to combining technical expertise with a curious mindset to drive meaningful change, both within organizations and in the broader community."
    ],
    skills: ["Automation", "Analytics", "Artificial Intelligence", "Process Optimization", "Technology Solutions"]
  },
  'ridhima-arora': {
    bio: [
      "Ridhima Arora is an HR Business Partner at Bough, where she's the go-to person for all things people-related, from leading recruitment efforts to ensuring compliance and making sure the employee experience is top-notch. With 5+ years of experience, Ridhima is an ambassador for a workplace where people feel valued, supported, and empowered to thrive.",
      "She holds a master's degree from Xavier Institute of Social Service. Outside of work, you'll find Ridhima practicing yoga to find her balance, watching movies, and practicing mindfulness. In short, she believes in balance – at work, in life, and in everything she does."
    ],
    skills: ["HR Management", "Recruitment", "Compliance", "Employee Experience", "People Operations"]
  }
};

export default function TeamMemberPage() {
  const router = useRouter();
  const { id } = router.query;
  
  // Handle loading state
  if (router.isFallback || !id) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center">
        <Text type={Font.GARAMOND} className="text-xl">Loading...</Text>
      </div>
    );
  }
  
  // Get member data from the imported team members array
  const memberBasic = teamMembers.find((m: TeamMember) => m.id === id);
  // Get additional bio data if available
  const memberBio = id && typeof id === 'string' ? teamMembersBio[id] : undefined;
  
  // Combine the data
  const member = memberBasic ? {
    ...memberBasic,
    ...memberBio
  } : undefined;
  
  // Handle member not found
  if (!member) {
    return (
      <div className="min-h-screen bg-[#f0f7ff]">
        <Header transparent={false} />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <Text type={Font.GARAMOND} className="text-3xl mb-6">Team member not found</Text>
          <Link href="/about-us" className="text-blue-600 hover:underline">
            <Text type={Font.SOURCE_SANS}>Return to team</Text>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f7ff] overflow-x-hidden relative w-full">
      {/* Header */}
      <div className="relative z-50">
        <Header transparent={false} />
      </div>

      {/* Team Member Profile */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6">
          {/* Image Column */}
          <div className="md:col-span-4 md:self-start sticky top-24">
            <div className="aspect-[4/5] w-full rounded-lg overflow-hidden">
              {member.linkedIn ? (
                <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  {member.image ? (
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform hover:scale-105"
                      style={{ backgroundImage: `url(${member.image})` }}
                    />
                  ) : (
                    <div className="w-full h-full transition-transform hover:scale-105">
                      <ProfilePlaceholder name={member.name} title={member.title} />
                    </div>
                  )}
                </a>
              ) : (
                <>
                  {member.image ? (
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${member.image})` }}
                    />
                  ) : (
                    <ProfilePlaceholder name={member.name} title={member.title} />
                  )}
                </>
              )}
            </div>
            
            {/* LinkedIn Reach Out button */}
            {member.linkedIn && (
              <div className="mt-4 flex justify-center">
                <a 
                  href={member.linkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-8 bg-[#0074FF] text-white rounded-md hover:bg-[#0055bb] transition-colors shadow-sm"
                >
                  <span className="font-medium text-base">Reach Out</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </a>
              </div>
            )}
          </div>
          
          {/* Bio Column */}
          <div className="md:col-span-8">
            {/* Name and Title */}
            <div className="mb-8">
              {member.linkedIn ? (
                <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-[#0074FF] transition-colors">
                  <Text type={Font.GARAMOND} className="text-3xl font-semibold mb-2 text-black">
                    {member.name}
                  </Text>
                </a>
              ) : (
                <Text type={Font.GARAMOND} className="text-3xl font-semibold mb-2 text-black">
                  {member.name}
                </Text>
              )}
              <Text type={Font.SOURCE_SANS} className="text-lg text-blue-600">
                {member.title}
              </Text>
            </div>
            
            <div className="space-y-5 pr-4">
              {member.bio ? (
                member.bio.map((paragraph: string, idx: number) => (
                  <Text key={idx} type={Font.SOURCE_SANS} className="text-lg text-black/80 leading-relaxed">
                    {paragraph}
                  </Text>
                ))
              ) : (
                <Text type={Font.SOURCE_SANS} className="text-lg text-black/80 leading-relaxed">
                  Bio information coming soon.
                </Text>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Connect CTA Section */}
      <BottomSection />
    </main>
  );
} 