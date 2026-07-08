"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Rss } from "lucide-react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime: string;
}

// Client-side mock fetch or data load (simulating server fetch)
const mockPosts: Post[] = [
  {
    slug: "cloud-insider-detection",
    title: "How We Built a Cloud Insider Attack Detection System using Python and ML",
    date: "2026-07-05",
    excerpt: "A technical deep dive into identifying anomalies in user behaviors using Django endpoints and Scikit-Learn classifiers.",
    category: "Artificial Intelligence",
    tags: ["Python", "Machine Learning", "Security", "Django"],
    readingTime: "6 min read",
  },
  {
    slug: "yolo-object-detection",
    title: "Deep Dive: Real-time Object Detection with YOLO and OpenCV",
    date: "2026-07-01",
    excerpt: "Optimizing YOLOv8 convolutional weights using frame interpolation for low-compute edge deployment.",
    category: "Python",
    tags: ["Python", "YOLO", "OpenCV", "Computer Vision"],
    readingTime: "5 min read",
  },
  {
    slug: "ui-ux-design-principles",
    title: "Modern UI/UX Design Principles: Glassmorphism and Micro-interactions",
    date: "2026-06-25",
    excerpt: "How to craft stunning developer portfolio cards and digital interfaces with HSL coloring and blur layers.",
    category: "UI UX",
    tags: ["UI UX", "Figma", "Web Design", "Aesthetics"],
    readingTime: "4 min read",
  },
];

const allCategories = ["All", "Artificial Intelligence", "Python", "UI UX", "Machine Learning", "Computer Vision"];
const allTags = ["Python", "Machine Learning", "Security", "Django", "YOLO", "OpenCV", "UI UX", "Figma", "Web Design"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Filter posts based on search and category directly during render
  const posts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background-dark pt-28 pb-16 grid-overlay relative">
      {/* Background glow highlights */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-8">
          <Link href="/" className="hover:text-primary-cyan transition-colors duration-300">Home</Link>
          <span>/</span>
          <span className="text-white">Blog</span>
        </div>

        {/* Title and Intro */}
        <div className="max-w-3xl mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Technical Blog & Insights
          </motion.h1>
          <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-2xl font-light">
            Sharing deep dives, code tutorials, architecture structures, and design thoughts on AI/ML, Python coding, and UI/UX implementation.
          </p>
        </div>

        {/* Search and Category Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5 mb-12">
          {/* Categories slider */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary-cyan border-primary-cyan text-background-dark shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-primary-cyan rounded-full pl-10 pr-4 py-2 text-xs text-white outline-none transition-all duration-300"
            />
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          </div>
        </div>

        {/* Main Grid: Articles + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Articles */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {posts.length > 0 ? (
                posts.map((post, idx) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="glass-panel p-6 md:p-8 rounded-3xl group hover:border-primary-cyan/25 transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 items-center text-xs text-text-muted mb-4 font-mono select-none">
                        <span className="text-primary-cyan font-bold uppercase tracking-wider">{post.category}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readingTime}</span>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="group">
                        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-cyan transition-colors duration-300 leading-tight">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-text-muted text-sm leading-relaxed mb-6 font-light">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/5 gap-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-muted"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1.5 text-xs font-semibold text-primary-cyan hover:text-white transition-colors duration-300"
                      >
                        <span>Read Article</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>

                  </motion.article>
                ))
              ) : (
                <div className="text-center py-20 bg-white/2 rounded-3xl border border-dashed border-white/10">
                  <p className="text-text-muted text-sm font-mono">No matching articles found.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28 h-fit">
            
            {/* Sidebar Author Bio */}
            <div className="glass-panel p-6 rounded-3xl text-center flex flex-col items-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-primary-cyan font-bold mb-4">
                Author
              </span>
              <h3 className="text-lg font-bold text-white">Sushma Sharma</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                M.Tech IT postgraduate and developer building AI integrations and client UI layouts.
              </p>
              <Link
                href="/author"
                className="mt-4 text-xs text-primary-cyan hover:underline"
              >
                View Profile &rarr;
              </Link>
            </div>

            {/* Tags Cloud */}
            <div className="glass-panel p-6 rounded-3xl">
              <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-4">
                Trending Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted hover:border-primary-cyan hover:text-primary-cyan transition-all duration-300"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="glass-panel p-6 rounded-3xl">
              <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-2 flex items-center gap-1.5">
                <Rss size={14} className="text-primary-cyan" /> Newsletter
              </h4>
              <p className="text-text-muted text-xs leading-relaxed mb-4">
                Get technical articles, code walkthroughs, and designs directly in your inbox.
              </p>
              
              {subscribed ? (
                <div className="text-xs text-primary-cyan bg-primary-cyan/10 border border-primary-cyan/20 p-3 rounded-2xl text-center">
                  Successfully subscribed! Thank you.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary-cyan rounded-2xl px-4 py-2.5 text-xs text-white outline-none transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-primary-cyan to-accent-purple text-background-dark font-bold text-xs hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
