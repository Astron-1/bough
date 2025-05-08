import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import Text, { Font } from '@app/components/Text';
import { motion } from 'framer-motion';

interface MDXContentProps {
  content: MDXRemoteSerializeResult;
  title: string; // Add title prop to identify which h1 to skip
}

const MDXContent: React.FC<MDXContentProps> = ({ content, title }) => {
  // Define animation variants for images
  const imageAnimationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  // Track if we're looking at the paragraph following a Headline section
  let afterHeadline = false;
  
  // Define custom components for MDX with title-aware rendering
  const components = {
    h1: ({ children }: { children: React.ReactNode }) => {
      // Skip rendering the title if it matches the one in BlogHeader
      const text = typeof children === 'string' ? children : '';
      
      // Always hide any h1 containing case study
      if (text.toLowerCase().includes('case study')) {
        return null;
      }
      
      // Handle various formats of title text including bold markers and case variations
      const cleanText = text.replace(/\*\*/g, '').trim();
      const titleLowerCase = title.toLowerCase().trim();
      const cleanTextLowerCase = cleanText.toLowerCase().trim();
      
      // Check if this is the main title (either exact match or contains the title)
      if (cleanText === title || 
          cleanTextLowerCase === titleLowerCase || 
          cleanTextLowerCase.includes(titleLowerCase) || 
          titleLowerCase.includes(cleanTextLowerCase)
      ) {
        return null;
      }
      
      return (
        <Text type={Font.SOURCE_SANS} className="text-4xl font-bold mb-6 text-gray-800 mt-8">
          {children}
        </Text>
      );
    },
    h2: ({ children }: { children: React.ReactNode }) => {
      // Special styling for specific case study sections
      const text = typeof children === 'string' ? children : '';
      
      // For Headline section, set a flag to format the next paragraph
      if (text === 'Headline') {
        afterHeadline = true;
        return null;
      }
      
      // Reset the flag when we hit another section
      afterHeadline = false;
      
      const isSection = text.includes('At a Glance') || 
                        text.includes('At a glance') ||
                        text.includes('What We Did') || 
                        text.includes('What we did') || 
                        text.includes('Case Story') || 
                        text.includes('Case story') || 
                        text.includes('Results');
      
      return (
        <Text 
          type={Font.SOURCE_SANS} 
          className={`text-2xl font-bold ${isSection ? 'mt-12 mb-4 text-gray-900 border-b pb-2' : 'mt-10 mb-4 text-gray-800'}`}
        >
          {children}
        </Text>
      );
    },
    h3: ({ children }: { children: React.ReactNode }) => {
      // Reset headline flag
      afterHeadline = false;
      return (
        <Text type={Font.SOURCE_SANS} className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          {children}
        </Text>
      );
    },
    h4: ({ children }: { children: React.ReactNode }) => {
      // Reset headline flag
      afterHeadline = false;
      return (
        <Text type={Font.SOURCE_SANS} className="text-lg font-semibold mt-6 mb-2 text-gray-800">
          {children}
        </Text>
      );
    },
    p: ({ children }: { children: React.ReactNode }) => {
      // Check if this paragraph follows the Headline section
      if (afterHeadline) {
        // Reset the flag so we only format the first paragraph after the headline
        afterHeadline = false;
        
        // Format the headline content as an H1 with Garamond font
        return (
          <Text type={Font.GARAMOND} className="text-4xl font-bold mb-6 text-gray-900 mt-4">
            {children}
          </Text>
        );
      }
      
      // Regular paragraph formatting
      return (
        <Text type={Font.SOURCE_SANS} className="mb-4 text-gray-700 text-lg">
          {children}
        </Text>
      );
    },
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc space-y-4 pl-6 mb-6">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal space-y-4 pl-6 mb-6">{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => {
      return (
        <li className="text-base pl-2">
          <div className="flex">
            <div className="flex-1">
              <Text type={Font.SOURCE_SANS} className="text-gray-700">
                {children}
              </Text>
            </div>
          </div>
        </li>
      );
    },
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-6">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-8 border-t border-gray-200" />,
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
      <a href={href} className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      // Check if the image is a base64 encoded image
      if (src && src.startsWith('data:image')) {
        // For base64 images, we'll just show a placeholder with the alt text
        return (
          <div className="my-6 bg-gray-100 p-4 rounded-lg text-center">
            <Text type={Font.SOURCE_SANS} className="text-gray-700">
              {alt || 'Image'}
            </Text>
          </div>
        );
      }
      
      // Convert relative paths to absolute paths
      let imageSrc = src || '';
      if (imageSrc.startsWith('./')) {
        imageSrc = `/content/case-studies${imageSrc.substring(1)}`;
      } else if (!imageSrc.startsWith('/') && !imageSrc.startsWith('http')) {
        imageSrc = `/content/case-studies/images/${imageSrc}`;
      }
      
      return (
        <motion.div 
          className="my-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageAnimationVariants}
        >
          <div className="flex justify-center">
            <Image
              src={imageSrc}
              alt={alt || ''}
              width={800}
              height={450}
              className="w-full max-w-3xl h-auto rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          {alt && (
            <Text type={Font.SOURCE_SANS} className="mt-3 text-sm text-gray-500 italic text-center">
              {alt}
            </Text>
          )}
        </motion.div>
      );
    },
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    // Special component for key metrics section often found in case studies
    KeyMetrics: ({ children }: { children: React.ReactNode }) => (
      <div className="bg-gray-50 p-6 rounded-lg my-8 border-l-4 border-blue-500">
        <Text type={Font.GARAMOND} className="text-xl font-bold mb-4 text-gray-800">
          Key Metrics:
        </Text>
        <div className="space-y-2">
          {children}
        </div>
      </div>
    ),
  };

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <MDXRemote {...content} components={components} />
      </div>
    </div>
  );
};

export default MDXContent; 