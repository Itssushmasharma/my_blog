"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Award, Monitor, Heart } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: "Certificates" | "Designs" | "Achievements";
  description: string;
  icon: React.ElementType;
  color: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "UI / UX Specialization",
    category: "Certificates",
    description: "Interaction design frameworks, dynamic wireframes, and design systems verification.",
    icon: Award,
    color: "from-cyan-500/10 to-blue-500/5",
  },
  {
    id: 2,
    title: "Python for Data Science",
    category: "Certificates",
    description: "Advanced Pandas, NumPy operations, and machine learning prediction pipelines certification.",
    icon: Award,
    color: "from-purple-500/10 to-indigo-500/5",
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    category: "Certificates",
    description: "Search Engine Optimization, technical analytics, and campaign funnel strategies verification.",
    icon: Award,
    color: "from-green-500/10 to-emerald-500/5",
  },
  {
    id: 4,
    title: "Enterprise Dashboard Concept",
    category: "Designs",
    description: "Figma wireframe design system created for complex multi-role client portals.",
    icon: Monitor,
    color: "from-blue-500/10 to-purple-500/5",
  },
  {
    id: 5,
    title: "Threat Monitor Console UI",
    category: "Designs",
    description: "High-fidelity mockups of user session behaviors and real-time network anomaly scoring.",
    icon: Monitor,
    color: "from-indigo-500/10 to-pink-500/5",
  },
  {
    id: 6,
    title: "UPCET State Entrance Rank",
    category: "Achievements",
    description: "Achieved elite state rank matching academic excellence criteria in computer science.",
    icon: Heart,
    color: "from-amber-500/10 to-orange-500/5",
  },
];

export default function GallerySection() {
  const [filter, setFilter] = useState<string>("All");

  const filteredItems = galleryItems.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <section id="gallery" className="py-24 relative overflow-hidden grid-overlay">
      <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] text-primary-cyan uppercase font-bold">
            Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6">
            Certifications & Design Work
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary-cyan to-accent-purple mx-auto" />
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {["All", "Certificates", "Designs", "Achievements"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full border text-xs font-semibold tracking-wider transition-all duration-300 ${
                filter === cat
                  ? "bg-primary-cyan border-primary-cyan text-background-dark shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`glass-panel p-6 rounded-3xl relative overflow-hidden group flex flex-col justify-between hover:border-primary-cyan/25 transition-all duration-500 bg-gradient-to-br ${item.color}`}
                >
                  <div>
                    {/* Category Label */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[9px] font-mono tracking-widest text-primary-cyan uppercase bg-primary-cyan/10 border border-primary-cyan/20 px-2.5 py-1 rounded-full">
                        {item.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-text-muted/65 group-hover:text-primary-cyan group-hover:bg-primary-cyan/15 transition-all duration-500">
                        <Icon size={14} />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-cyan transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-text-muted leading-relaxed font-light mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-text-muted group-hover:text-white transition-colors duration-300 select-none">
                    <span className="font-mono">ID: SSP-{item.id.toString().padStart(3, '0')}</span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} className="text-primary-cyan" /> View Details
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
