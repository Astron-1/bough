import React from "react";
import Link from "next/link";
import Text, { Font } from "@app/components/Text";

export interface TeamMemberProps {
  id: string;
  name: string;
  title: string;
  image?: string;
  alt?: string;
  linkedIn?: string;
}

const PlaceholderImage = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-blue-100 text-blue-800">
    <svg 
      className="w-16 h-16 mb-3 text-blue-400" 
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
  </div>
);

const TeamMemberCard: React.FC<TeamMemberProps> = ({ id, name, title, image, alt, linkedIn }) => {
  const cardStyle = {
    width: "19rem",
    height: "auto",
    flexShrink: 0
  };

  const ImageContent = () => (
    <div className="overflow-hidden rounded-lg w-full">
      {image ? (
        <div 
          className="aspect-square w-full transition-all duration-500 ease-in-out filter grayscale hover:grayscale-0 group-hover:grayscale-0 group-hover:scale-105"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: "25rem"
          }}
          aria-label={alt || `${name}, ${title}`}
        />
      ) : (
        <div className="aspect-square w-full bg-blue-100 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-105" style={{ height: "21rem" }}>
          <PlaceholderImage />
        </div>
      )}
    </div>
  );

  // Entire card with image linking to profile and name/title below
  return (
    <div className="flex flex-col items-center" style={cardStyle}>
      {/* Image always links to profile */}
      <Link 
        href={`/team/${id}`}
        className="block transition-all duration-500 group w-full"
      >
        <ImageContent />
        
        {/* Text container - now part of the same group for consistent hover */}
        <div className="text-center mt-4 w-full group-hover:transform group-hover:translate-y-[-5px] transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <Text 
                type={Font.GARAMOND} 
                className="text-xl font-semibold mb-1 text-gray-700 group-hover:text-black transition-colors duration-500"
              >
                {name}
              </Text>
              <Text 
                type={Font.SOURCE_SANS} 
                className="text-base text-gray-500 group-hover:text-blue-600 transition-colors duration-500"
              >
                {title}
              </Text>
            </div>
            
            {/* LinkedIn icon in separate column */}
            {linkedIn && (
              <a 
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0074FF] transition-colors duration-300"
                aria-label={`View ${name}'s LinkedIn profile`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeamMemberCard; 