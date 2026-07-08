"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

export interface TimelineItem {
  id: number;
  type: "education" | "experience";
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  skills?: string[];
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
      {items.map((item, index) => {
        const isEdu = item.type === "education";
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="relative pl-8 md:pl-10 group"
          >
            {/* Timeline Icon Node */}
            <div className="absolute -left-[17px] top-1 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-secondary-dark text-primary-cyan group-hover:border-primary-cyan group-hover:bg-primary-cyan group-hover:text-background-dark transition-all duration-500 shadow-[0_0_15px_rgba(0,229,255,0)] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              {isEdu ? <GraduationCap size={16} /> : <Briefcase size={16} />}
            </div>

            {/* Content Card */}
            <div className="glass-panel-glow p-6 rounded-2xl relative overflow-hidden group">
              {/* Radial Hover Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-cyan/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full blur-xl" />

              <span className="inline-block text-[10px] tracking-widest text-primary-cyan uppercase font-semibold mb-2">
                {item.duration}
              </span>
              
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-cyan transition-colors duration-300">
                {item.title}
              </h3>
              
              <h4 className="text-sm font-medium text-text-muted mb-3 flex items-center gap-2">
                <span>{item.subtitle}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/55" />
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 uppercase">
                  {item.type}
                </span>
              </h4>
              
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              {item.skills && (
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
