"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position of the actual mouse cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring settings for custom smoothing
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const followerSpringConfig = { damping: 25, stiffness: 180, mass: 0.8 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const followerX = useSpring(mouseX, followerSpringConfig);
  const followerY = useSpring(mouseY, followerSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hovers on interactive components
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .hover-glow, .magnetic-btn, .blog-card, .project-card'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    // Add hover listeners initially and on DOM mutations
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Small Dot */}
      <motion.div
        className={`custom-cursor ${isHovered ? "hovered" : ""}`}
        style={{
          left: cursorX,
          top: cursorY,
        }}
      />
      {/* Delayed Outer Ring */}
      <motion.div
        className={`custom-cursor-follower ${isHovered ? "hovered" : ""}`}
        style={{
          left: followerX,
          top: followerY,
        }}
      />
    </>
  );
}
