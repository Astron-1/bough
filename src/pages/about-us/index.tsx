import React from "react";
import Header from "@app/components/Header";
import HeroSection from "@app/components/about/HeroSection";
import WhoWeAreSection from "@app/components/about/WhoWeAreSection";
import ValuesSection from "@app/components/about/ValuesSection";
import TeamSection from "@app/components/about/TeamSection";
import CoreValuesSection from "@app/components/about/CoreValuesSection";
import GallerySection from "@app/components/about/GallerySection";
import { ShieldCheck, Zap, BookOpen } from "lucide-react";
import BottomSection from "@app/components/BottomSection";
import homeBottomImage from "../../../public/bottomImage.png";

// Team members content - exported for use in other components
export const teamMembers = [
  {
    id: "rohit-qamra",
    name: "Rohit Qamra",
    title: "Founder & Chief Executive Officer",
    image: "/profile/Rohit.jpg",
    alt: "Rohit Qamra - Founder & CEO",
    linkedIn: "https://www.linkedin.com/in/rohitqamra/",
  },
  {
    id: "ratan-postwalla",
    name: "Ratan Postwalla",
    title: "Chief People Officer",
    image: "/profile/Ratan.jpg",
    alt: "Ratan Postwalla - Chief People Officer",
    linkedIn: "https://www.linkedin.com/in/ratanpostwalla/",
  },
  {
    id: "akshendra-sahi",
    name: "Akshendra Sahi",
    title: "Senior Manager",
    image: "/profile/Akshendra%20Sahi.jpg",
    alt: "Akshendra Sahi - Senior Manager",
    linkedIn: "https://www.linkedin.com/in/akshendra-sahi-a4883221/",
  },
  {
    id: "sanya-singh",
    name: "Sanya Singh",
    title: "Senior Manager",
    image: "/profile/Sanya%20Singh.JPG",
    alt: "Sanya Singh - Senior Manager",
    linkedIn: "https://www.linkedin.com/in/sanya-singh-55635a35/",
  },
  {
    id: "jason-polyzou",
    name: "Jason Polyzou",
    title: "Manager",
    image: "/profile/Jason%20Polyzou.jpg",
    alt: "Jason Polyzou - Manager",
    linkedIn: "https://www.linkedin.com/in/jason-polyzou-49382450/",
  },
  {
    id: "abhishek-anand",
    name: "Abhishek Anand",
    title: "Senior Consultant",
    image: "/profile/Abhishek.JPG",
    alt: "Abhishek Anand - Senior Consultant",
    linkedIn: "https://www.linkedin.com/in/abhishek-anand-a95a93212",
  },
  {
    id: "gunjan-rajpal",
    name: "Gunjan Rajpal",
    title: "Manager",
    image: "/profile/Gunjan%20Rajpal-Manager.JPG",
    alt: "Gunjan Rajpal - Manager",
    linkedIn: "https://www.linkedin.com/in/gunjan-rajpal-776790109/",
  },
  {
    id: "firdaush-ansari",
    name: "Firdaush Ansari",
    title: "Manager",
    image: "/profile/Firdaush%20Ansari.JPG",
    alt: "Firdaush Ansari - Manager",
    linkedIn: "https://www.linkedin.com/in/firdaush-ansari-12ba08120/",
  },
  {
    id: "aditya-sharma",
    name: "Aditya Sharma",
    title: "Senior Consultant",
    image: "/profile/Aditya%20Sharma.jpeg",
    alt: "Aditya Sharma - Senior Consultant",
    linkedIn: "https://www.linkedin.com/in/asharma13598/",
  },
  {
    id: "shubham-kapoor",
    name: "Shubham Kapoor",
    title: "Consultant",
    image: "/profile/Shubham.jpg",
    alt: "Shubham Kapoor - Consultant",
    linkedIn: "https://www.linkedin.com/in/shubham-kapoor61/",
  },
  {
    id: "puneeta-puri",
    name: "Puneeta Puri",
    image: "/profile/Puneeta%20Puri.jpg",
    title: "ESG Advisor",
    linkedIn: "https://in.linkedin.com/in/ca-puneeta-puri-35208b9",
  },
  {
    id: "rohan-budhraja",
    name: "Rohan Budhraja",
    title: "Manager",
    image: "/profile/Rohan%20Budhraja.jpg",
    alt: "Rohan Budhraja - Manager",
    linkedIn: "https://www.linkedin.com/in/rohan-budhraja-97759514/",
  },
  {
    id: "saket-gupta",
    name: "Saket Gupta",
    title: "Senior Consultant",
    image: "/profile/Saket%20Gupta_Senior%20Consultant.jpeg",
    alt: "Saket Gupta - Senior Consultant",
    linkedIn: "https://www.linkedin.com/in/saket-gupta-a1600b85/",
  },
  {
    id: "khushi-singh",
    name: "Khushi Singh",
    title: "Associate Consultant",
    image: "/profile/Khushi.JPG",
    alt: "Khushi Singh - Associate Consultant",
    linkedIn: "https://www.linkedin.com/in/khushi-singh-400081236/",
  },
  {
    id: "rishabh-singhal",
    name: "Rishabh Singhal",
    title: "Manager",
    image: "/profile/Rishabh.jpeg",
    alt: "Rishabh Singhal - Manager",
    linkedIn: "https://www.linkedin.com/in/rishabh-singhal-497686aa/",
  },
  {
    id: "anoushka-bhati",
    name: "Anoushka Bhati",
    title: "Manager",
    image: "/profile/Anoushka.jpeg",
    alt: "Anoushka Bhati - Manager",
    linkedIn: "https://www.linkedin.com/in/anoushka-bhati-b77678102/",
  },
  {
    id: "sakshi-vaishnav",
    name: "Sakshi Vaishnav",
    title: "Associate",
    image: "/profile/Sakshi.JPG",
    alt: "Sakshi Vaishnav - Associate",
    linkedIn: "https://in.linkedin.com/in/sakshi-vaishnav2003/",
  },
  {
    id: "saurabh-sharma",
    name: "Saurabh Sharma",
    title: "Senior Consultant",
    image: "/profile/Saurabh.jpeg",
    alt: "Saurabh Sharma - Senior Consultant",
    linkedIn: "https://www.linkedin.com/in/saurabh-sharma-0303/",
  },
  {
    id: "khushbu-singh",
    name: "Khushbu Singh",
    image: "/profile/Khushbu%20Singh.jpg",
    title: "Senior Visual Communications Designer",
    linkedIn: "https://www.linkedin.com/in/khushbu-singh-8b221919b/",
  },
  {
    id: "uddeshya-pal",
    name: "Uddeshya Pal",
    title: "Senior Consultant",
    image: "/profile/Uddeshya%20@%20Bough%20Consulting%20LLC.url.jpg",
    alt: "Uddeshya Pal - Senior Consultant",
    linkedIn: "https://www.linkedin.com/in/uddeshya-pal-279527149",
  },
  {
    id: "ridhima-arora",
    name: "Ridhima Arora",
    title: "HR Business Partner",
    image: "/profile/Ridhima%201.jpeg",
    alt: "Ridhima Arora - HR Business Partner",
    linkedIn: "https://www.linkedin.com/in/arora-ridhima/",
  },
];

export default function AboutUsPage() {
  // Hero section content
  const heroContent = {
    title: "Your growth, powered by Bough",
    subtitle:
      "Our purpose is fueled by trust and values to create powerful avenues and meaningful outcomes, every day.",
  };

  // Who We Are section content
  const whoWeAreContent = {
    title: "Who we are",
    paragraphs: [
      "At Bough, culture isn't just a part of who we are—it's at the core of everything we do. We came into existence with a simple but powerful vision: to deliver sustainable long-term solutions for our clients while creating an environment where our professionals can grow and thrive.",
      'The name "Bough" reflects that vision. Like the main branch of a tree, we provide strength, support, and the foundation for growth. It represents our commitment to being a trusted partner for our clients and a nurturing place for our people. We\'ve built a workplace that fosters creativity, collaboration, and a sense of ownership.',
      "Here, every voice is heard, and every team member is empowered to take responsibility for the impact they create. At Bough, we believe in the power of collective action, where diverse talents come together to deliver meaningful outcomes. Our approach is simple: We don't just aim to meet expectations—we strive to exceed them. Whether creating innovative solutions or building a workplace that inspires, we're committed to building something that lasts.",
      "With offices in the United States and India, we're proud to extend this culture across our global presence, ensuring that the values defining us remain strong in everything we do.",
    ],
    photos: [
      {
        alt: "Team in office",
        placeholderText: "Team Photo 1",
        src: "/who-we-are/im1.jpg",
      },
      {
        alt: "Better Together event",
        placeholderText: "Better Together",
        src: "/who-we-are/im2.jpg",
      },
      {
        alt: "Team with merchandise",
        placeholderText: "Team Event",
        src: "/who-we-are/im3.jpg",
      },
      {
        alt: "Team members",
        placeholderText: "Team Members",
        src: "/who-we-are/im4.jpg",
      },
      {
        alt: "Team outdoor photo",
        placeholderText: "Team Outdoor",
        src: "/who-we-are/im5.jpg",
      },
      {
        alt: "Office collaboration",
        placeholderText: "Collaboration",
        src: "/who-we-are/im6.jpg",
      },
    ],
  };

  // Values section content
  const valuesContent = [
    {
      title: "Power of knowledge",
      description:
        "We believe that knowledge is the key to unlocking endless possibilities. Our relentless pursuit of understanding drives our unwavering dedication to solving the toughest challenges. We thrive in the face of disruption, always pushing forward to ensure our clients' success with consistency and precision.",
      icon: <ShieldCheck size={40} />,
    },
    {
      title: "Impact that matters",
      description:
        "Our mission goes beyond delivering results; it's about making a meaningful impact on the world around us—both for our clients and our team. We are committed to earning and maintaining the trust of our clients, always going the extra mile to deliver excellence.",
      icon: <Zap size={40} />,
    },
    {
      title: "Pioneering trust and growth",
      description:
        "In everything we do, we strive to be a force for positive change, ensuring that our actions leave a legacy of trust, innovation, and growth.",
      icon: <BookOpen size={40} />,
    },
  ];
  // Team section content
  const teamContent = {
    title: "Say hello to some of our team members!",
    description: "",
  };

  // Core values section content
  const coreValuesContent = {
    title: "Values that drive us!",
    description:
      "Bough was born out of an eagerness to run a business with a sense of ethos, pathos & logos. We came about to create a space that calls people of varied passions to fearlessly work towards creating value for themselves and their customers. Our foundation rests on these core values:",
  };

  // Gallery section content
  const galleryContent = {
    title: "Our journey in pictures",
    description:
      "Explore our visual story — moments of collaboration, innovation, and growth that define Bough's culture and commitment to excellence.",
  };

  return (
    <main className="min-h-screen bg-[#f0f7ff] overflow-x-hidden relative w-full">
      {/* Header */}
      <div className="relative z-50">
        <Header transparent={false} />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Background Gradients */}
        <div className="w-[496px] h-[594px] left-[-197px] top-[192px] absolute bg-[rgba(0,116,255,0.30)] shadow-[624px_624px_624px] rounded-full blur-[312px] opacity-70 md:opacity-100"></div>
        <div className="w-[493px] h-[590px] right-[-100px] top-[157px] absolute bg-[rgba(0,116,255,0.30)] shadow-[624px_624px_624px] rounded-full blur-[312px] opacity-70 md:opacity-100"></div>

        {/* Hero Section */}
        <HeroSection
          title={heroContent.title}
          subtitle={heroContent.subtitle}
        />

        {/* Who We Are Section */}
        <WhoWeAreSection
          title={whoWeAreContent.title}
          paragraphs={whoWeAreContent.paragraphs}
          photos={whoWeAreContent.photos}
        />

        {/* Values Section */}
        <ValuesSection values={valuesContent} sectionTitle="What we believe" />

        {/* Team Section */}
        <TeamSection
          title={teamContent.title}
          description={teamContent.description}
          members={teamMembers}
        />

        {/* Core Values Section */}
        <CoreValuesSection
          title={coreValuesContent.title}
          description={coreValuesContent.description}
        />

        {/* Gallery Section */}
        <GallerySection
          title={galleryContent.title}
          description={galleryContent.description}
        />

        {/* Bottom Section */}
        <BottomSection
          content={"Shaping tomorrow, Starting today"}
          backgroundImage={homeBottomImage}
        />
      </div>
    </main>
  );
}
