"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  stars: number;
}

const testimonialsData: Testimonial[] = [
  {
    quote: "Sushma's capacity to design custom UI dashboards and connect them directly to Python AI endpoints is highly impressive. She bridge design thinking and complex server architecture with ease.",
    name: "Rajesh Kumar",
    role: "Senior Engineering Manager",
    company: "Bharti Airtel Digital",
    stars: 5,
  },
  {
    quote: "Working with Sushma on our company website rebranding was a seamless experience. She handled the visual layout in Figma and built a lightning-fast custom WordPress site optimized for SEO and mobile feeds.",
    name: "Sarah Jenkins",
    role: "Co-Founder & COO",
    company: "Apex Tech Venture Labs",
    stars: 5,
  },
  {
    quote: "A dedicated researcher in cloud anomaly modeling. Her M.Tech project successfully merged Python neural models with a React dashboard, demonstrating advanced technical and presentation capabilities.",
    name: "Dr. Anil Sharma",
    role: "Professor & Research Advisor",
    company: "Department of Information Technology",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-secondary-dark/30">
      <div className="absolute left-1/4 top-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.3em] text-primary-cyan uppercase font-bold">
            Endorsements
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6">
            Testimonials & Reviews
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary-cyan to-accent-purple mx-auto" />
        </div>

        {/* Carousel Box */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          
          <div className="glass-panel-glow p-8 md:p-12 rounded-3xl min-h-[250px] flex flex-col justify-between relative overflow-hidden">
            {/* Big quote background decoration */}
            <div className="absolute top-6 right-8 text-white/5 pointer-events-none">
              <Quote size={120} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* Star rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonialsData[activeIndex].stars }).map((_, i) => (
                    <Star key={i} size={14} className="fill-primary-cyan text-primary-cyan" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-white text-md md:text-lg font-light leading-relaxed mb-8 italic">
                  &ldquo;{testimonialsData[activeIndex].quote}&rdquo;
                </p>

                {/* Author Bio */}
                <div>
                  <h4 className="text-md font-bold text-white group-hover:text-primary-cyan transition-colors duration-300">
                    {testimonialsData[activeIndex].name}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    {testimonialsData[activeIndex].role} &bull; <span className="text-primary-cyan">{testimonialsData[activeIndex].company}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all duration-300 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all duration-300 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
