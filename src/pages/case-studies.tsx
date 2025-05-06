import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Header from '@app/components/Header';
import Text, { Font } from '@app/components/Text';
import { getAllCaseStudies } from '@app/lib/mdxUtils';

interface CaseStudyMeta {
  slug: string;
  frontMatter: {
    title: string;
    description: string;
    date?: string | null;
    coverImage: string;
    readTime?: string;
    tags?: string[];
  };
}

interface CaseStudiesProps {
  caseStudies: CaseStudyMeta[];
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  return (
    <div className="min-h-screen">
      <Header transparent={false} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12 text-center">
          <Text type={Font.GARAMOND} className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Case Studies
          </Text>
          <Text type={Font.SOURCE_SANS} className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore how we&apos;ve helped businesses overcome challenges and achieve their goals
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {caseStudies.map((study) => (
            <Link 
              key={study.slug} 
              href={`/case-study?name=${encodeURIComponent(study.frontMatter.title)}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={study.frontMatter.coverImage}
                    alt={study.frontMatter.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  {study.frontMatter.date && study.frontMatter.date !== null && (
                    <Text type={Font.SOURCE_SANS} className="text-sm text-gray-500 mb-2">
                      {new Date(study.frontMatter.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      {study.frontMatter.readTime && ` · ${study.frontMatter.readTime} min read`}
                    </Text>
                  )}
                  
                  <Text type={Font.GARAMOND} className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {study.frontMatter.title}
                  </Text>
                  
                  <Text type={Font.SOURCE_SANS} className="text-gray-600 mb-4 line-clamp-3">
                    {study.frontMatter.description}
                  </Text>
                  
                  {study.frontMatter.tags && study.frontMatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {study.frontMatter.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add this function to ensure all data is serializable
function serializeData<T>(data: T): unknown {
  if (data === null || data === undefined) {
    return null; // Convert undefined to null for JSON serialization
  }
  
  if (data instanceof Date) {
    return data.toISOString();
  }
  
  if (Array.isArray(data)) {
    return data.map(item => serializeData(item));
  }
  
  if (typeof data === 'object' && data !== null) {
    const serialized: Record<string, unknown> = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = (data as Record<string, unknown>)[key];
        serialized[key] = value === undefined ? null : serializeData(value);
      }
    }
    return serialized;
  }
  
  return data;
}

export const getStaticProps: GetStaticProps = async () => {
  const caseStudies = getAllCaseStudies();
  
  return {
    props: {
      caseStudies: serializeData(caseStudies),
    },
    // Revalidate every hour
    revalidate: 3600,
  };
}; 