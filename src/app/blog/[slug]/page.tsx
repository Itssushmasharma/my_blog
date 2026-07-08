import { getPostBySlug, getAllPosts } from "@/utils/markdown";
import CommentsSection from "@/components/blog/comments";
import { ArrowLeft, Calendar, Clock, Bookmark, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";

// Import custom layout styling or components for Markdown rendering if needed.
const options = {
  overrides: {
    h1: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 {...props} className="text-2xl md:text-3xl font-display font-bold text-white mt-8 mb-4">
          {children}
        </h1>
      ),
    },
    h2: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 {...props} className="text-xl md:text-2xl font-display font-bold text-white mt-8 mb-4 border-l-2 border-primary-cyan pl-4">
          {children}
        </h2>
      ),
    },
    p: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p {...props} className="text-sm text-text-muted leading-relaxed font-light mb-6">
          {children}
        </p>
      ),
    },
    pre: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre {...props} className="bg-white/3 border border-white/5 rounded-3xl p-6 overflow-x-auto text-xs font-mono text-cyan-400 mb-6 max-w-full">
          {children}
        </pre>
      ),
    },
    code: {
      component: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code {...props} className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-xs text-white font-mono">
          {children}
        </code>
      ),
    },
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-background-dark pt-28 pb-16 grid-overlay relative">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-primary-cyan transition-colors duration-300 mb-8 font-mono select-none"
        >
          <ArrowLeft size={14} />
          <span>Back to Articles</span>
        </Link>

        {/* Article Container */}
        <article className="glass-panel p-6 md:p-10 rounded-3xl relative overflow-hidden">
          
          {/* Header Meta */}
          <div className="flex flex-wrap gap-4 items-center text-xs text-text-muted mb-6 font-mono select-none">
            <span className="text-primary-cyan font-bold uppercase tracking-wider bg-primary-cyan/10 px-3 py-1 rounded-full border border-primary-cyan/20">
              {post.category}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="flex items-center gap-1"><Clock size={12} /> {post.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author Details & Quick Share actions */}
          <div className="flex flex-wrap justify-between items-center py-4 border-y border-white/5 mb-10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-cyan/15 flex items-center justify-center text-primary-cyan font-bold text-sm">
                SS
              </div>
              <div>
                <span className="text-white text-xs font-semibold block">{post.author}</span>
                <span className="text-[10px] text-text-muted font-mono uppercase">Author &bull; IT Specialist</span>
              </div>
            </div>
            
            {/* Quick Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-full bg-white/5 border border-white/10 text-text-muted hover:text-white transition-all duration-300"
                title="Bookmark article"
              >
                <Bookmark size={14} />
              </button>
              <button
                className="p-2 rounded-full bg-white/5 border border-white/10 text-text-muted hover:text-white transition-all duration-300"
                title="Share article"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>

          {/* Body Content (Markdown parsed) */}
          <div className="prose prose-invert max-w-none">
            <Markdown options={options}>{post.content}</Markdown>
          </div>

          {/* Tag Cloud List */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/3 border border-white/3 text-text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Discussion section */}
          <CommentsSection postSlug={post.slug} />

        </article>

      </div>
    </div>
  );
}
