import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Directory where case study content is stored
const caseStudiesDirectory = path.join(process.cwd(), 'public/content/case-studies');

// Define default values for frontmatter
const defaultFrontMatter = {
  title: '',
  description: '',
  coverImage: '/insightheroImage.jpg', // Default image
};

interface CaseStudyFrontMatter {
  title: string;
  description: string;
  date?: string | null;
  coverImage: string;
  readTime?: string;
  tags?: string[];
  author?: string;
  headline?: string;
  [key: string]: string | string[] | undefined | null;
}

interface CaseStudyData {
  slug: string;
  frontMatter: CaseStudyFrontMatter;
  content?: string;
}

// Ensure directory exists
function ensureDirectoryExists(directory: string): boolean {
  if (!fs.existsSync(directory)) {
    try {
      fs.mkdirSync(directory, { recursive: true });
      return true;
    } catch (err) {
      console.error(`Error creating directory ${directory}:`, err);
      return false;
    }
  }
  return true;
}

// Get all case study slugs
export function getCaseStudySlugs() {
  if (!ensureDirectoryExists(caseStudiesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(caseStudiesDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, '')
      }
    };
  });
}

// Get a list of all case studies with their metadata
export function getAllCaseStudies(): CaseStudyData[] {
  if (!ensureDirectoryExists(caseStudiesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(caseStudiesDirectory);
  const allCaseStudiesData = fileNames
    .filter(fileName => {
      // Skip directories and only process .mdx files
      const fullPath = path.join(caseStudiesDirectory, fileName);
      return fs.statSync(fullPath).isFile() && fileName.endsWith('.mdx');
    })
    .map(fileName => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '');

      // Read markdown file as string
      const fullPath = path.join(caseStudiesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the case study metadata
      const { data: matterData, content } = matter(fileContents);
      
      // Extract headline content directly
      let headlineContent = '';
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('## Headline') && i + 1 < lines.length) {
          // Make sure we have a non-empty line after "## Headline"
          const nextLine = lines[i + 1].trim();
          if (nextLine) {
            headlineContent = nextLine;
            break;
          }
          // If the next line is empty, look for the next non-empty line
          for (let j = i + 2; j < lines.length; j++) {
            const potentialHeadline = lines[j].trim();
            if (potentialHeadline && !potentialHeadline.startsWith('#')) {
              headlineContent = potentialHeadline;
              break;
            }
            // Stop if we hit another heading
            if (potentialHeadline.startsWith('#')) {
              break;
            }
          }
          break;
        }
      }
      
      // Extract title from first heading if not in frontmatter
      let title = matterData.title;
      if (!title) {
        // Look for the headline section first - this is a higher priority
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('## Headline') && i + 1 < lines.length) {
            title = lines[i + 1].trim();
            break;
          }
        }
        
        // If no headline found, fall back to first h1
        if (!title) {
          const match = content.match(/^#\s+(.+)$/m);
          if (match) {
            title = match[1].replace(/\*\*/g, '').trim();
          } else {
            title = slug;
          }
        }
      }
      
      // Extract description from content if not in frontmatter
      let description = matterData.description;
      if (!description) {
        // First try to find content under "At a glance" or "At a Glance" section
        const lines = content.split('\n');
        let foundAtGlance = false;
        
        for (let i = 0; i < lines.length; i++) {
          if ((lines[i].startsWith('## At a glance') || lines[i].startsWith('## At a Glance')) && i + 1 < lines.length) {
            description = lines[i + 1].trim();
            foundAtGlance = true;
            break;
          }
        }
        
        // If no "At a glance" section, try to find content under "Headline" section
        if (!foundAtGlance) {
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('## Headline') && i + 1 < lines.length) {
              description = lines[i + 1].trim();
              break;
            }
          }
        }
      }

      // Ensure date is a string if it exists
      let date = matterData.date;
      if (date instanceof Date) {
        date = date.toISOString();
      } else if (date === undefined) {
        date = null; // Use null instead of undefined for serialization
      }

      // Create frontmatter with defaults and extracted data
      const frontMatter: CaseStudyFrontMatter = {
        ...defaultFrontMatter,
        ...matterData,
        title: title,
        description: description || '',
        date: date,
        headline: headlineContent || title,
      };

      // Combine the data with the slug
      return {
        slug,
        frontMatter,
      };
    });

  // Sort case studies by date if available
  return allCaseStudiesData.sort((a, b) => {
    if (!a.frontMatter.date || !b.frontMatter.date) return 0;
    return a.frontMatter.date < b.frontMatter.date ? 1 : -1;
  });
}

// Get case study data by slug
export function getCaseStudyBySlug(slug: string): CaseStudyData | null {
  try {
    if (!ensureDirectoryExists(caseStudiesDirectory)) {
      return null;
    }
    
    const fullPath = path.join(caseStudiesDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: matterData, content: rawContent } = matter(fileContents);
    
    // Process the content to replace base64 images with proper image paths
    const content = processContent(rawContent, slug);
    
    // Extract headline content directly
    let headlineContent = '';
    const lines = rawContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('## Headline') && i + 1 < lines.length) {
        // Make sure we have a non-empty line after "## Headline"
        const nextLine = lines[i + 1].trim();
        if (nextLine) {
          headlineContent = nextLine;
          break;
        }
        // If the next line is empty, look for the next non-empty line
        for (let j = i + 2; j < lines.length; j++) {
          const potentialHeadline = lines[j].trim();
          if (potentialHeadline && !potentialHeadline.startsWith('#')) {
            headlineContent = potentialHeadline;
            break;
          }
          // Stop if we hit another heading
          if (potentialHeadline.startsWith('#')) {
            break;
          }
        }
        break;
      }
    }
    
    // Extract title and description from content if not in frontmatter
    let title = matterData.title;
    if (!title) {
      // Look for the headline section first - this is a higher priority
      const lines = rawContent.split('\n');
      let foundHeadline = false;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('## Headline') && i + 1 < lines.length) {
          title = lines[i + 1].trim();
          foundHeadline = true;
          break;
        }
      }
      
      // If no headline found, fall back to first h1
      if (!foundHeadline) {
        const match = rawContent.match(/^#\s+(.+)$/m);
        if (match) {
          title = match[1].replace(/\*\*/g, '').trim();
        } else {
          title = slug;
        }
      }
    }
    
    // Extract description from content if not in frontmatter
    let description = matterData.description;
    if (!description) {
      // First try to find content under "At a glance" or "At a Glance" section
      const lines = rawContent.split('\n');
      let foundAtGlance = false;
      
      for (let i = 0; i < lines.length; i++) {
        if ((lines[i].startsWith('## At a glance') || lines[i].startsWith('## At a Glance')) && i + 1 < lines.length) {
          description = lines[i + 1].trim();
          foundAtGlance = true;
          break;
        }
      }
      
      // If no "At a glance" section, try to find content under "Headline" section
      if (!foundAtGlance) {
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('## Headline') && i + 1 < lines.length) {
            description = lines[i + 1].trim();
            break;
          }
        }
      }
    }
    
    // Get first image for cover if not specified
    let coverImage = matterData.coverImage;
    if (!coverImage) {
      const imgMatch = rawContent.match(/!\[.*?\]\(((?!data:image).+?)\)/);
      coverImage = imgMatch ? imgMatch[1] : defaultFrontMatter.coverImage;
    }

    // Ensure date is a string if it exists
    let date = matterData.date;
    if (date instanceof Date) {
      date = date.toISOString();
    } else if (date === undefined) {
      date = null; // Use null instead of undefined for serialization
    }

    const frontMatter: CaseStudyFrontMatter = {
      ...defaultFrontMatter,
      ...matterData,
      title: title,
      description: description || '',
      coverImage: coverImage,
      date: date,
      headline: headlineContent || title,
    };

    return {
      slug,
      frontMatter,
      content
    };
  } catch (error) {
    console.error(`Error loading case study: ${slug}`, error);
    return null;
  }
}

// Find a case study by its id/title
export function getCaseStudyById(id: string): CaseStudyData | null {
  if (!ensureDirectoryExists(caseStudiesDirectory)) {
    return null;
  }
  
  const allCaseStudies = getAllCaseStudies();
  const study = allCaseStudies.find(study => 
    study.frontMatter.title === id || 
    study.slug === id ||
    study.slug === id.replace(/\s+/g, '-').toLowerCase()
  );
  
  if (!study) return null;
  
  // If found, get the full content
  return getCaseStudyBySlug(study.slug);
}

// Process the content to handle image paths and other adjustments
function processContent(content: string, slug: string): string {
  // Replace base64 images with numbered images for the case study
  let processedContent = content;
  let imageCount = 1;
  
  // Create directory for case study images if needed
  const imagesDir = path.join(process.cwd(), 'public/content/case-studies/images');
  ensureDirectoryExists(imagesDir);
  
  // Extract the title to remove it later
  const titleMatch = processedContent.match(/^#\s+(.+?)$/m);
  let titleToRemove = '';
  if (titleMatch) {
    titleToRemove = titleMatch[0];
  }
  
  // Remove the duplicate title at the beginning of the content if found
  if (titleToRemove) {
    processedContent = processedContent.replace(titleToRemove, '').trim();
    // Also remove any initial empty lines
    processedContent = processedContent.replace(/^\s*\n+/, '');
  }
  
  // Replace data:image patterns with paths to standard images
  processedContent = processedContent.replace(/!\[.*?\]\(data:image\/[^)]+\)/g, () => {
    return `![Figure ${imageCount++}](/content/case-studies/images/${slug}-image${imageCount-1}.png)`;
  });
  
  // Fix relative image paths to use absolute paths with leading slash
  processedContent = processedContent.replace(/!\[(.*?)\]\(\.\/(images\/.*?)\)/g, (_, alt, path) => {
    return `![${alt}](/content/case-studies/${path})`;
  });
  
  // Fix image paths without leading slash
  processedContent = processedContent.replace(/!\[(.*?)\]\((?!\/|http)(.*?)\)/g, (_, alt, path) => {
    if (path.startsWith('./')) {
      return `![${alt}](/content/case-studies${path.substring(1)})`;
    }
    return `![${alt}](/content/case-studies/images/${path})`;
  });
  
  return processedContent;
} 