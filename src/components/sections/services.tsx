"use client";

import { motion } from "framer-motion";
import { Code, LayoutTemplate, BrainCircuit, SearchCheck } from "lucide-react";

interface Service {
  title: string;
  icon: React.ElementType;
  description: string;
  tags: string[];
  gradient: string;
}

const servicesData: Service[] = [
  {
    title: "Full Stack Web Development",
    icon: Code,
    description: "Engineering performant, dynamic, and responsive web products using Next.js, React, Tailwind, and Django servers. Adhering to Core Web Vitals and SEO specifications.",
    tags: ["React/Next.js", "Django Core", "REST APIs", "TypeScript"],
    gradient: "group-hover:text-cyan-400 border-cyan-500/10 hover:border-cyan-500/30",
  },
  {
    title: "UI / UX Interface Design",
    icon: LayoutTemplate,
    description: "Designing structured wireframes, prototypes, and user interfaces inside Figma. Creating clean, reusable component systems and fluid user experiences.",
    tags: ["Figma Design", "User Journeys", "Typography", "Prototypes"],
    gradient: "group-hover:text-purple-400 border-purple-500/10 hover:border-purple-500/30",
  },
  {
    title: "AI & ML Integrations",
    icon: BrainCircuit,
    description: "Connecting custom computer vision frameworks (YOLO, OpenCV) and NLP pipelines directly to modern user dashboards. Automating analytics workflows.",
    tags: ["YOLO Detection", "OpenCV Vision", "NLP Pipelines", "Python Sci"],
    gradient: "group-hover:text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30",
  },
  {
    title: "Technical SEO & Marketing",
    icon: SearchCheck,
    description: "Optimizing website structures for schema markup, search crawler indexing, speed benchmarks, and running campaign audits to maximize conversion.",
    tags: ["Technical SEO", "Google Analytics", "Schema Markup", "Auditing"],
    gradient: "group-hover:text-amber-400 border-amber-500/10 hover:border-amber-500/30",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 relative overflow-hidden grid-overlay">
      <div className="absolute right-0 bottom-1/3 w-96 h-96 bg-primary-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.3em] text-primary-cyan uppercase font-bold">
            Offerings
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6">
            Services & Value Proposition
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary-cyan to-accent-purple mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-panel p-8 rounded-3xl group flex flex-col justify-between transition-all duration-500 border ${service.gradient}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted group-hover:text-white group-hover:bg-white/10 transition-all duration-500 mb-6">
                    <Icon size={22} className="transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-cyan transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/3 border border-white/3 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
