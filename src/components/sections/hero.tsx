"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowDown } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/ui/icons";
import Image from "next/image";

const titles = [
  "Python Developer",
  "UI UX Designer",
  "AI Engineer",
  "Web Developer",
  "Freelancer",
  "Digital Marketer",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriting effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTitle = titles[index];
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && displayedText === currentTitle) {
      // Pause at full text before deleting
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === "") {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % titles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? currentTitle.substring(0, displayedText.length - 1)
            : currentTitle.substring(0, displayedText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, index]);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden grid-overlay">
      {/* Glow Effects in Background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-cyan/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-widest text-primary-cyan uppercase font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse" />
            Available for Freelance & Remote Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white mb-4"
          >
            Hello, I&apos;m <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan via-white to-accent-purple">
              Sushma Sharma
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-10 md:h-12 text-xl md:text-2xl font-sans text-text-muted mb-8 font-medium flex items-center gap-2"
          >
            <span>a </span>
            <span className="text-white border-r-2 border-primary-cyan pr-1 font-semibold">
              {displayedText}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-text-muted text-sm md:text-base max-w-lg mb-10 leading-relaxed font-light"
          >
            Building Digital Experiences with Creativity, Code & Intelligence. Specialized in bridging the gap between sophisticated Python AI pipelines and stunning, pixel-perfect user interfaces.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-cyan to-accent-purple text-background-dark font-semibold text-sm hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300 pointer-events-auto"
            >
              Hire Me
            </a>
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto backdrop-blur-md"
            >
              View Projects
            </a>
            <a
              href="/author"
              className="px-8 py-3.5 rounded-full bg-transparent hover:text-primary-cyan text-text-muted text-sm transition-all duration-300 flex items-center gap-1.5"
            >
              Resume Profile &rarr;
            </a>
          </motion.div>

          {/* Social Links & Floating details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-6"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted/65">
              Connect:
            </span>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary-cyan transition-colors duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary-cyan transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@sushmasharma.com"
                className="text-text-muted hover:text-primary-cyan transition-colors duration-300"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+910000000000"
                className="text-text-muted hover:text-primary-cyan transition-colors duration-300"
              >
                <Phone size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side Portrait */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
          >
            {/* Outermost rotating circular border */}
            <div className="absolute inset-0 rounded-full border border-dashed border-primary-cyan/20 animate-[spin_60s_linear_infinite]" />
            
            {/* Intermediate rotating accent border */}
            <div className="absolute -inset-4 rounded-full border border-accent-purple/20 animate-[spin_40s_linear_infinite_reverse]" />

            {/* Glowing background behind image */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary-cyan to-accent-purple opacity-20 blur-2xl animate-pulse" />

            {/* Main Portrait Mask Container */}
            <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white/10 bg-secondary-dark/80 backdrop-blur-md shadow-2xl">
              <Image
                src="/sushma_profile.png"
                alt="Sushma Sharma"
                fill
                priority
                className="object-cover object-top select-none pointer-events-none hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Interactive floating technology badges */}
            <div className="absolute -top-4 -right-4 bg-secondary-dark/95 border border-white/10 px-3 py-1.5 rounded-2xl backdrop-blur-md flex items-center gap-1.5 shadow-lg select-none hover:border-primary-cyan transition-colors duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan" />
              <span className="text-[10px] font-mono text-white font-medium">Python AI</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-secondary-dark/95 border border-white/10 px-3 py-1.5 rounded-2xl backdrop-blur-md flex items-center gap-1.5 shadow-lg select-none hover:border-accent-purple transition-colors duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              <span className="text-[10px] font-mono text-white font-medium">UI / UX</span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] uppercase font-mono tracking-widest text-text-muted/60 select-none">
          Explore
        </span>
        <button
          onClick={handleScrollDown}
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-primary-cyan hover:border-primary-cyan transition-all duration-300 animate-bounce"
        >
          <ArrowDown size={14} />
        </button>
      </div>
    </section>
  );
}
