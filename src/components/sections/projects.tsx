"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Cpu, Server, MapPin, Mic } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/icons";

interface CaseStudy {
  challenge: string;
  solution: string;
  results: string[];
}

interface Project {
  id: number;
  title: string;
  category: string;
  icon: React.ElementType;
  tech: string[];
  features: string[];
  gradient: string;
  github: string;
  live: string;
  caseStudy: CaseStudy;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Cloud Insider Attack Detection",
    category: "Cloud Security & AI",
    icon: Server,
    tech: ["Python", "Django", "Scikit-Learn", "HTML/CSS", "PostgreSQL"],
    features: [
      "User behavior analysis using anomaly detection models",
      "Dynamic dashboard visualizing system logs and threats",
      "Real-time alerts via WebSockets when suspicious activity fires",
    ],
    gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
    github: "https://github.com",
    live: "https://example.com",
    caseStudy: {
      challenge: "Identifying malicious internal user acts without triggering excessive false positives due to natural shifts in developer workflow logs.",
      solution: "Engineered an Isolation Forest model integrated into a Django server. Aggregated shell audit inputs, file access rates, and session logs to score behavioral deviations.",
      results: [
        "Achieved a 94.2% detection rate on insider threat test suites.",
        "Reduced analysis overhead by 40% with real-time WebSocket notifications.",
        "Implemented a customizable log threshold panel for security admins.",
      ],
    },
  },
  {
    id: 2,
    title: "YOLO Real-time Object Detection",
    category: "Computer Vision",
    icon: Cpu,
    tech: ["Python", "YOLOv8", "OpenCV", "NumPy", "PyTorch"],
    features: [
      "Multi-class item labeling and track tracing at 45+ FPS",
      "Custom training routine for low-light environmental feeds",
      "Optimized memory usage for edge devices (Raspberry Pi/Jetson)",
    ],
    gradient: "from-purple-600/20 via-pink-500/10 to-transparent",
    github: "https://github.com",
    live: "https://example.com",
    caseStudy: {
      challenge: "Running computer vision models locally on low-compute edge setups while keeping object tracking latency low.",
      solution: "Optimized weights using ONNX runtime and frame resizing routines. Utilized OpenCV tracking algorithms to interpolate paths between YOLO detection frames.",
      results: [
        "Boosted frame rate from 18 FPS to 46 FPS on standard CPU environments.",
        "Maintained detection precision above 89% for targeted class boundaries.",
        "Exported model metrics directly to dynamic JSON endpoints for client feeds.",
      ],
    },
  },
  {
    id: 3,
    title: "Smart City IoT Dashboard",
    category: "Internet of Things",
    icon: MapPin,
    tech: ["Python", "Pandas", "JavaScript", "Leaflet.js", "Chart.js"],
    features: [
      "Geo-location mapping of active sensor nodes",
      "Simulated live feeds of air index, traffic, and power grids",
      "Historical data query and statistical anomaly analysis",
    ],
    gradient: "from-green-600/20 via-emerald-500/10 to-transparent",
    github: "https://github.com",
    live: "https://example.com",
    caseStudy: {
      challenge: "Visualizing telemetry data from thousands of scattered virtual sensors without overloading client-side rendering.",
      solution: "Structured a request throttling logic using requestAnimationFrame. Clustered overlapping map coordinates dynamically and processed telemetry packets with Pandas.",
      results: [
        "Supported fluid 60 FPS rendering of 2,000 active sensor nodes.",
        "Compressed data transit package size by 65% through optimized JSON payloads.",
        "Built predictive power grid outage forecasts based on simulated patterns.",
      ],
    },
  },
  {
    id: 4,
    title: "Digital Voice Assistant",
    category: "Natural Language Processing",
    icon: Mic,
    tech: ["Python", "SpeechRecognition", "Pyttsx3", "NLP", "APIs"],
    features: [
      "Voice command capturing with noise cancellation filters",
      "NLP intent classification to route request operations",
      "Integrations with Calendar, Email, Weather, and Custom Web Search",
    ],
    gradient: "from-amber-600/20 via-orange-500/10 to-transparent",
    github: "https://github.com",
    live: "https://example.com",
    caseStudy: {
      challenge: "Providing quick responses to voice inputs in noisy environments and routing custom scripts reliably.",
      solution: "Implemented pre-processing audio thresholding filters to reduce ambient sound. Coupled string parsing with dynamic API web handlers.",
      results: [
        "Reduced request execution delay to under 1.2 seconds.",
        "Correctly recognized and mapped speech queries at 91% accuracy.",
        "Enabled seamless custom command shortcuts via simple config files.",
      ],
    },
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-secondary-dark/10">
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.3em] text-primary-cyan uppercase font-bold">
            Selected Works
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6">
            Featured Projects
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary-cyan to-accent-purple mx-auto" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => {
            const Icon = project.icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between hover:border-primary-cyan/20 transition-all duration-500"
              >
                {/* Visual Gradient Background Mesh */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 border-l border-b border-white/5 rounded-bl-full flex items-center justify-center group-hover:border-primary-cyan/25 transition-colors duration-500">
                  <Icon size={24} className="text-text-muted/65 group-hover:text-primary-cyan transition-colors duration-500" />
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-primary-cyan font-semibold">
                    {project.category}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mt-3 mb-6 group-hover:text-primary-cyan transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2 mb-8">
                    {project.features.map((f, i) => (
                      <li key={i} className="text-xs text-text-muted flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-1.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTAs */}
                <div className="flex flex-wrap gap-3 relative z-10 mt-auto pt-4 border-t border-white/5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all duration-300"
                  >
                    <Github size={12} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all duration-300"
                  >
                    <ExternalLink size={12} />
                    <span>Live Demo</span>
                  </a>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 rounded-full bg-primary-cyan/15 hover:bg-primary-cyan/25 border border-primary-cyan/25 text-xs font-semibold text-primary-cyan transition-all duration-300 ml-auto"
                  >
                    Case Study
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background-dark/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-secondary-dark border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-y-auto max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-text-muted hover:text-white transition-all duration-300"
              >
                <X size={16} />
              </button>

              <span className="text-[10px] uppercase font-mono tracking-widest text-primary-cyan font-bold">
                {selectedProject.category}
              </span>
              
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 mb-6">
                {selectedProject.title} — Case Study
              </h3>

              <div className="space-y-6 text-sm text-text-muted leading-relaxed">
                
                {/* Challenge */}
                <div>
                  <h4 className="text-white font-bold mb-2 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> The Challenge
                  </h4>
                  <p className="bg-white/3 border border-white/5 rounded-2xl p-4 font-light text-white/80">
                    {selectedProject.caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-white font-bold mb-2 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Our Solution
                  </h4>
                  <p className="bg-white/3 border border-white/5 rounded-2xl p-4 font-light text-white/80">
                    {selectedProject.caseStudy.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-white font-bold mb-2 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan" /> Key Achievements & Metrics
                  </h4>
                  <ul className="space-y-2 pl-2">
                    {selectedProject.caseStudy.results.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 font-light">
                        <span className="text-primary-cyan font-bold mt-0.5">&bull;</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all duration-300"
                >
                  <Github size={12} />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary-cyan text-background-dark font-semibold text-xs hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <ExternalLink size={12} />
                  <span>Launch Live Demo</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
