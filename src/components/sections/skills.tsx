"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechGlobe from "../ui/tech-globe";
import { Terminal, Database, Shield, Layout, Globe, Star } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage
  category: "languages" | "ai" | "tools" | "design" | "marketing";
}

const skillCategories = [
  { id: "all", label: "All Skills", icon: Star },
  { id: "languages", label: "Languages & Web", icon: Terminal },
  { id: "ai", label: "AI & Data Science", icon: Database },
  { id: "design", label: "UI / UX Design", icon: Layout },
  { id: "tools", label: "Platforms & Tools", icon: Shield },
  { id: "marketing", label: "SEO & Marketing", icon: Globe },
];

const skillsData: SkillItem[] = [
  { name: "Python", level: 92, category: "languages" },
  { name: "Django", level: 85, category: "languages" },
  { name: "JavaScript", level: 88, category: "languages" },
  { name: "HTML & CSS", level: 90, category: "languages" },
  { name: "Next.js & React", level: 80, category: "languages" },

  { name: "OpenCV", level: 85, category: "ai" },
  { name: "YOLO Object Detection", level: 88, category: "ai" },
  { name: "NumPy & Pandas", level: 90, category: "ai" },
  { name: "Natural Language Processing", level: 82, category: "ai" },

  { name: "Git & GitHub", level: 85, category: "tools" },
  { name: "Linux Administration", level: 78, category: "tools" },
  { name: "Windows Server", level: 80, category: "tools" },
  { name: "Power BI", level: 85, category: "tools" },

  { name: "Figma UI/UX", level: 90, category: "design" },
  { name: "Canva Design", level: 88, category: "design" },
  { name: "WordPress", level: 85, category: "design" },
  { name: "Wix Site Builder", level: 82, category: "design" },

  { name: "Technical SEO", level: 90, category: "marketing" },
  { name: "Digital Marketing", level: 86, category: "marketing" },
  { name: "Content Strategy", level: 82, category: "marketing" },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 relative overflow-hidden grid-overlay">
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-primary-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.3em] text-primary-cyan uppercase font-bold">
            Competencies
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6">
            Interactive Skill Grid & Knowledge Sphere
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary-cyan to-accent-purple mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Interactive Skills List */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-10">
              {skillCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary-cyan border-primary-cyan text-background-dark shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-h-[300px]">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:border-primary-cyan/35 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-medium text-sm group-hover:text-primary-cyan transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-text-muted">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary-cyan to-accent-purple rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: 3D Globe Tag Sphere */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="glass-panel p-4 rounded-3xl w-full border border-white/5 bg-secondary-dark/40 backdrop-blur-lg">
              <div className="text-center pb-2 border-b border-white/5 mb-4">
                <span className="text-[9px] uppercase font-mono tracking-widest text-text-muted">
                  Drag / Hover to Orbit Space
                </span>
              </div>
              <TechGlobe />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
