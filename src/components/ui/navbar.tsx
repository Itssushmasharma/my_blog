"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/author" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          scrolled
            ? "bg-background-dark/70 backdrop-blur-xl border-white/5 py-4"
            : "bg-transparent border-transparent py-6"
        } print:hidden`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-display font-bold tracking-widest text-lg md:text-xl select-none"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-accent-purple">
              SUSHMA SHARMA
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                (pathname === "/" && link.href.startsWith("/#")) ||
                (pathname !== "/" && link.href === pathname);
              
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-primary-cyan font-bold" : "text-text-muted hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/#contact"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/5 hover:bg-primary-cyan/15 hover:text-primary-cyan border border-white/10 text-xs font-bold text-white transition-all duration-300"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors duration-300"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] bg-background-dark/95 backdrop-blur-2xl border-b border-white/10 py-8 px-6 z-30 lg:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-white text-lg font-display font-semibold hover:text-primary-cyan transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-cyan to-accent-purple text-background-dark font-bold text-sm text-center block shadow-lg active:scale-95 transition-all duration-300"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
