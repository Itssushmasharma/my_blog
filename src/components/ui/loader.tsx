"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scrolling while loading
    document.body.style.overflow = "hidden";

    // Simulate progress load
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment randomly for natural feel
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          if (onComplete) onComplete();
        },
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power3.in",
      })
        .to(
          progressLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=0.2"
        )
        .to(containerRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
        });
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="loader-wrapper"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-4">
        {/* Dynamic morphing brand text */}
        <div
          ref={textRef}
          className="text-white font-display text-2xl font-bold tracking-widest mb-6 text-center select-none"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-accent-purple">
            SUSHMA SHARMA
          </span>
          <div className="text-[10px] text-text-muted mt-2 tracking-[0.4em] uppercase font-sans">
            Creative Portfolio
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            ref={progressLineRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-cyan to-accent-purple rounded-full origin-left transition-transform duration-200"
            style={{ transform: `scaleX(${progress / 100})`, width: "100%" }}
          />
        </div>

        {/* Percentage text */}
        <div className="text-primary-cyan font-display text-sm tracking-wider font-semibold self-end select-none">
          {progress}%
        </div>
      </div>
    </div>
  );
}
