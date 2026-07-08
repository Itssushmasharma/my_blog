"use client";

import { Mail, Phone, Heart } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/ui/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-dark/60 border-t border-white/5 py-12 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand/Owner */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-white font-display font-bold tracking-widest text-lg">
            SUSHMA SHARMA
          </span>
          <p className="text-[10px] text-text-muted mt-1 uppercase font-sans tracking-[0.2em] font-light">
            Creativity &bull; Code &bull; Intelligence
          </p>
        </div>

        {/* Copy / Heart */}
        <div className="text-xs text-text-muted flex items-center gap-1 select-none Order-2 md:order-2">
          <span>&copy; {currentYear} Sushma Sharma. Made with</span>
          <Heart size={10} className="text-red-500 fill-red-500" />
          <span>in India. All rights reserved.</span>
        </div>

        {/* Social Bar */}
        <div className="flex items-center gap-4 order-1 md:order-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary-cyan/10 hover:text-primary-cyan border border-white/10 flex items-center justify-center text-text-muted transition-all duration-300"
          >
            <Github size={14} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary-cyan/10 hover:text-primary-cyan border border-white/10 flex items-center justify-center text-text-muted transition-all duration-300"
          >
            <Linkedin size={14} />
          </a>
          <a
            href="mailto:contact@sushmasharma.com"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary-cyan/10 hover:text-primary-cyan border border-white/10 flex items-center justify-center text-text-muted transition-all duration-300"
          >
            <Mail size={14} />
          </a>
          <a
            href="tel:+910000000000"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary-cyan/10 hover:text-primary-cyan border border-white/10 flex items-center justify-center text-text-muted transition-all duration-300"
          >
            <Phone size={14} />
          </a>
        </div>

      </div>
    </footer>
  );
}
