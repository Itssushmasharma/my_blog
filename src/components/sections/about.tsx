"use client";

import { motion } from "framer-motion";
import Timeline, { TimelineItem } from "../ui/timeline";
import { Compass, Target, Lightbulb } from "lucide-react";

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    type: "experience",
    title: "UI UX Developer Intern",
    subtitle: "Bharti Airtel Digital",
    duration: "Jan 2024 - Jun 2024",
    description: "Designed high-fidelity responsive wireframes and custom design systems. Translated interactive layouts into semantic components using React, Tailwind CSS, and Framer Motion.",
    skills: ["Figma", "React", "Tailwind CSS", "Design Systems"],
  },
  {
    id: 2,
    type: "education",
    title: "M.Tech Information Technology",
    subtitle: "Postgraduate Degree",
    duration: "2024 - Present",
    description: "Specializing in advanced data parsing, Cloud Infrastructure, Artificial Intelligence, and NLP algorithms. Researching new models for insider threat classification.",
    skills: ["Python", "AI & ML", "Cloud Security", "NLP"],
  },
  {
    id: 3,
    type: "experience",
    title: "Freelance Web Designer",
    subtitle: "Independent Practice",
    duration: "2022 - Present",
    description: "Delivering modern, responsive web experiences for global clients using custom web code, WordPress, and Wix. Handled design handoffs and technical SEO setup.",
    skills: ["WordPress", "Wix", "SEO", "Client Relations"],
  },
  {
    id: 4,
    type: "education",
    title: "B.Tech Computer Science",
    subtitle: "Undergraduate Degree",
    duration: "2020 - 2024",
    description: "Graduated with honors. Rigorous coursework in Data Structures, Algorithm Design, OOP, Databases, and Software Architecture.",
    skills: ["Data Structures", "C++", "DBMS", "Operating Systems"],
  },
  {
    id: 5,
    type: "experience",
    title: "Digital Marketing Specialist",
    subtitle: "Campaign Consultant",
    duration: "2021 - 2023",
    description: "Formulated content marketing plans and executed search engine optimization strategies, boosting organic search visibility and search ranking positions.",
    skills: ["Google Analytics", "SEO Engine", "Digital Ads"],
  },
  {
    id: 6,
    type: "education",
    title: "Diploma in Computer Science",
    subtitle: "Foundational Education",
    duration: "2017 - 2020",
    description: "Acquired fundamental computing skills, basic networking, OS administration, and client-side web development fundamentals.",
    skills: ["HTML & CSS", "JavaScript", "Linux", "Core Java"],
  },
  {
    id: 7,
    type: "experience",
    title: "Python Developer Trainee",
    subtitle: "Technical Bootcamp",
    duration: "2020 - 2021",
    description: "Acquired advanced Python scripting knowledge, backend MVC design patterns using Django, and scientific data manipulation with NumPy/Pandas.",
    skills: ["Python", "Django", "NumPy", "Pandas"],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-secondary-dark/30">
      {/* Background elements */}
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] text-primary-cyan uppercase font-bold"
          >
            My Story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6"
          >
            Crafting Digital Solutions with Passion and Logic
          </motion.h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary-cyan to-accent-purple mx-auto" />
        </div>

        {/* Narrative & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Big Quote / Intro */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <p className="text-xl md:text-2xl font-display font-medium text-white/95 leading-relaxed italic border-l-2 border-primary-cyan pl-6">
              &ldquo;Technology becomes art when designed with user intent and executed with clean, logical architecture.&rdquo;
            </p>
            <p className="text-text-muted mt-6 text-sm leading-relaxed">
              As an IT postgraduate with expertise across coding, layout design, and brand analysis, I build multi-dimensional web systems. I translate raw machine learning metrics into visual animations and custom layouts, always focusing on SEO performance and accessibility.
            </p>
          </motion.div>

          {/* Cards for Objectives, Mission, Vision */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Career Objective */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-start"
            >
              <div className="p-3 bg-primary-cyan/10 rounded-xl text-primary-cyan mb-4">
                <Compass size={20} />
              </div>
              <h4 className="text-md font-bold text-white mb-2">Objective</h4>
              <p className="text-text-muted text-xs leading-relaxed">
                To build high-performance, intelligent digital products that solve complex user problems and elevate web aesthetics.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-start"
            >
              <div className="p-3 bg-accent-purple/10 rounded-xl text-accent-purple mb-4">
                <Target size={20} />
              </div>
              <h4 className="text-md font-bold text-white mb-2">Mission</h4>
              <p className="text-text-muted text-xs leading-relaxed">
                Synthesize technical engineering structures, AI integrations, and responsive UX design to write resilient, pixel-perfect code.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-start"
            >
              <div className="p-3 bg-white/5 rounded-xl text-white mb-4">
                <Lightbulb size={20} />
              </div>
              <h4 className="text-md font-bold text-white mb-2">Vision</h4>
              <p className="text-text-muted text-xs leading-relaxed">
                Empower businesses through highly-optimized architectures, organic search excellence, and human-centric design.
              </p>
            </motion.div>

          </div>

        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          <div className="lg:col-span-4 flex flex-col items-start lg:sticky lg:top-28">
            <span className="text-[10px] tracking-[0.2em] text-accent-purple uppercase font-bold mb-2">
              Career Timeline
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
              My Academic & Professional Journey
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-8">
              A comprehensive history of my technical training, professional experiences, and formal computing education.
            </p>
            <div className="hidden lg:flex flex-col gap-3 text-xs font-mono text-text-muted/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full border border-primary-cyan bg-primary-cyan/15" />
                <span>Experience-focused timeline node</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full border border-accent-purple bg-accent-purple/15" />
                <span>Education-focused timeline node</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <Timeline items={timelineItems} />
          </div>
        </div>

      </div>
    </section>
  );
}
