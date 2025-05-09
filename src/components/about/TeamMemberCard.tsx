"use client";

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
          }}
          aria-label={alt || `${name}, ${title}`}
        />
      ) : (
        <div className="aspect-square w-full bg-blue-100 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-105">
          <PlaceholderImage />
        </div>
      )}
    </div>
  );

  // Entire card with image linking to profile and name/title below
  return (
    <div className="flex flex-col items-start" style={cardStyle}>
      {/* Image always links to profile */}
      <Link 
        href={`/team/${id}`}
        className="block transition-all duration-500 group w-full"
      >
        <ImageContent />
        
        {/* Content below image */}
        <div className="mt-4 w-full transition-all duration-500">
          <div className="flex items-start justify-between">
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
            
            {/* LinkedIn icon - improved styling */}
            {linkedIn && (
              <a 
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 bg-[#0A66C2] hover:bg-[#004182] text-white p-1.5 rounded transition-colors duration-300 flex items-center justify-center"
                aria-label={`View ${name}'s LinkedIn profile`}
                style={{ minWidth: "28px", height: "28px" }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
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