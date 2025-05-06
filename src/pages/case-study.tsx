import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Header from "@app/components/Header";
import BlogHeader from "@app/components/case-study/BlogHeader";
import MDXContent from "@app/components/case-study/MDXContent";
import { getCaseStudyBySlug, getCaseStudyById } from "@app/lib/mdxUtils";

interface FrontMatter {
  title: string;
  description: string;
  date?: string | null;
  coverImage: string;
  readTime?: string;
  tags?: string[];
  author?: string;
  [key: string]: string | string[] | undefined | null;
}

interface CaseStudyProps {
  source: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
}

export default function CaseStudy({ source, frontMatter }: CaseStudyProps) {
  const router = useRouter();

  // If the page is still being generated, show loading state
  if (router.isFallback) {
    return <div className="container mx-auto px-6 py-12">Loading...</div>;
  }

  // If no content was found
  if (!source || !frontMatter) {
    return (
      <div className="container mx-auto px-6 py-12">Case study not found</div>
    );
  }

  return (
    <div className="text-black relative">
      <Header transparent={false} />
      <BlogHeader
        title={frontMatter.title}
        description={frontMatter.description}
        date={frontMatter.date}
        coverImage={frontMatter.coverImage}
        readTime={frontMatter.readTime}
        tags={frontMatter.tags}
      />
      <MDXContent content={source} title={frontMatter.title} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get case study name from query
  const { name } = context.query;
  
  if (!name || typeof name !== 'string') {
    return {
      notFound: true,
    };
  }

  // First try to find by ID/title
  let caseStudy = getCaseStudyById(name);
  
  if (!caseStudy) {
    const slug = name.replace(/\s+/g, '-').toLowerCase();
    caseStudy = getCaseStudyBySlug(slug);
  }
  
  if (!caseStudy || !caseStudy.content) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(caseStudy.content);

  return {
    props: {
      source: mdxSource,
      frontMatter: serializeData(caseStudy.frontMatter),
    },
  };
};
