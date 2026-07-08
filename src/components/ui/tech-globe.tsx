"use client";

import { useEffect, useRef, useState } from "react";

interface Tag {
  text: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  alpha: number;
}

const skills = [
  "Python", "JavaScript", "HTML", "CSS", "Django", 
  "OpenCV", "YOLO", "NumPy", "Pandas", "Power BI", 
  "WordPress", "Wix", "Figma", "Canva", "Git", 
  "Linux", "Windows", "SEO", "Digital Marketing", 
  "Next.js", "React", "Tailwind"
];

export default function TechGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    const radius = Math.min(width, height) * 0.4;
    const count = skills.length;
    let tags: Tag[] = [];
    
    // Rotation speeds
    let angleX = 0.003;
    let angleY = 0.003;
    
    // Mouse coords
    let mouseX = 0;
    let mouseY = 0;
    let isMouseOver = false;

    // Create 3D spherical points (Fibonacci Sphere)
    const initTags = () => {
      tags = [];
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y); // radius at y

        const theta = phi * i; // golden angle increment

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        tags.push({
          text: skills[i],
          x: x * radius,
          y: y * radius,
          z: z * radius,
          scale: 1,
          alpha: 1,
        });
      }
    };

    const rotateX = (tag: Tag, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = tag.y * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.y * sin;
      tag.y = y1;
      tag.z = z1;
    };

    const rotateY = (tag: Tag, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = tag.x * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.x * sin;
      tag.x = x1;
      tag.z = z1;
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, width, height);

      // Adjust rotation speed based on mouse position
      if (isMouseOver) {
        angleX = (mouseY - height / 2) * 0.00005;
        angleY = (mouseX - width / 2) * 0.00005;
      } else {
        // Slow natural drift
        angleX = 0.001;
        angleY = 0.002;
      }

      // Sort tags by Z (depth buffer) so back-tags render behind front-tags
      const sortedTags = [...tags].sort((a, b) => b.z - a.z);

      sortedTags.forEach((tag) => {
        // Apply rotations
        rotateX(tag, angleX);
        rotateY(tag, angleY);

        // Perspective projection
        const depth = 350; // Camera distance
        const scale = depth / (depth - tag.z); // Perspective projection scale
        tag.scale = scale;
        tag.alpha = (tag.z + radius) / (2 * radius) * 0.7 + 0.3; // opacity based on depth

        const screenX = width / 2 + tag.x * scale;
        const screenY = height / 2 + tag.y * scale;

        ctx.save();
        ctx.font = `bold ${Math.max(10, Math.floor(12 * scale))}px var(--font-sans)`;
        
        // Highlight on hover
        const isHovered = isMouseOver && 
          Math.abs(mouseX - screenX) < 40 && 
          Math.abs(mouseY - screenY) < 15;

        if (isHovered) {
          ctx.fillStyle = "#00E5FF";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#00E5FF";
          // Track active tag
          setActiveTag(tag.text);
        } else {
          // Purple gradient for front-tags, grey/muted for back-tags
          ctx.fillStyle = tag.z > 0 
            ? `rgba(0, 229, 255, ${tag.alpha})` 
            : `rgba(148, 163, 184, ${tag.alpha * 0.6})`;
        }

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tag.text, screenX, screenY);
        ctx.restore();
      });

      requestAnimationFrame(updateAndDraw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      setActiveTag(null);
    };

    // Responsive Canvas
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = Math.max(300, parent.clientHeight || 400);
        canvas.width = width;
        canvas.height = height;
      }
      initTags();
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();
    updateAndDraw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full max-w-lg cursor-pointer" />
      {activeTag && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent-purple/20 border border-accent-purple/40 text-[10px] uppercase font-mono tracking-widest text-primary-cyan backdrop-blur-md">
          Active Node: {activeTag}
        </div>
      )}
    </div>
  );
}
