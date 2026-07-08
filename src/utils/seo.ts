export const siteConfig = {
  name: "Sushma Sharma",
  title: "Sushma Sharma | Python Developer & UI UX Specialist Portfolio",
  description: "IT Professional & software engineer specializing in Python AI pipelines, interactive UI/UX Figma models, Next.js web applications, and technical SEO campaigns.",
  url: "https://sushmasharma.com",
  ogImage: "https://sushmasharma.com/og-image.jpg",
  twitterHandle: "@sushma_sharma",
};

// JSON-LD Organization Schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sushma Sharma Brand",
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/sushma_profile.png`,
    "sameAs": [
      "https://github.com",
      "https://linkedin.com"
    ]
  };
}

// JSON-LD Website Schema
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

// JSON-LD Professional Profile / Person Schema
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "image": `${siteConfig.url}/sushma_profile.png`,
    "jobTitle": "Python Developer & UI/UX Designer",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Information Technology Department"
    },
    "knowsAbout": [
      "Python", "Django", "Machine Learning", "OpenCV", "YOLO", 
      "UI/UX Design", "Figma", "Next.js", "Web Development", "SEO"
    ]
  };
}

// JSON-LD Article Schema
export function getArticleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${siteConfig.url}/sushma_profile.png`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": siteConfig.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sushma Sharma Brand",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/sushma_profile.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`
    }
  };
}

// JSON-LD FAQ Schema
export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are Sushma Sharma's primary areas of expertise?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sushma's core competencies lie in Python development (Django, Pandas, NumPy), Computer Vision (YOLO, OpenCV), UI/UX interaction design inside Figma, Next.js Full Stack coding, and Technical SEO audit strategies."
        }
      },
      {
        "@type": "Question",
        "name": "Is Sushma available for freelance web designs or remote roles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Sushma has experience as a Freelance Web Designer and UI UX Developer Intern at Bharti Airtel. She is available for contract engagements and remote IT positions."
        }
      },
      {
        "@type": "Question",
        "name": "What AI models has Sushma integrated into web platforms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sushma has built a Cloud Insider Attack Detection system using Isolation Forest models integrated with Django backends, and a real-time tracking interface using YOLOv8 models combined with OpenCV frame resizing pipelines."
        }
      }
    ]
  };
}
