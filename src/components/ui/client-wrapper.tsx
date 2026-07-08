"use client";

import { useEffect, useState } from "react";
import PageLoader from "./loader";
import CustomCursor from "./cursor";
import CanvasParticles from "./particles";
import Lenis from "lenis";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading ? (
        <PageLoader onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* Custom Mouse Follower Cursor */}
          <CustomCursor />
          
          {/* Interactive Floating Particles (Z-index: 0) */}
          <CanvasParticles />
          
          {/* Core App View */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </>
      )}
    </>
  );
}
