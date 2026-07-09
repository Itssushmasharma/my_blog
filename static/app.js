// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initLenis();
  initCustomCursor();
  initParticles();
  initTypewriter();
  initSkillsFilter();
  initTechGlobe();
  initProjectsModal();
  initTestimonials();
  initGalleryFilter();
  initContactForm();
});

/* ==========================================================================
   1. Page Preloader
   ========================================================================== */
function initPreloader() {
  const loader = document.getElementById("page-loader");
  const progressLine = document.getElementById("loader-progress-line");
  const progressText = document.getElementById("loader-progress-text");
  
  if (!loader) return;
  
  // Prevent body scrolling initially
  document.body.style.overflow = "hidden";
  
  let progress = 0;
  const interval = setInterval(() => {
    const step = Math.floor(Math.random() * 15) + 5;
    progress = Math.min(progress + step, 100);
    
    if (progressLine) progressLine.style.transform = `scaleX(${progress / 100})`;
    if (progressText) progressText.textContent = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      
      // GSAP Exit Animation
      if (window.gsap) {
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            loader.style.display = "none";
            
            // Check for hash in URL and scroll to it smoothly
            const hash = window.location.hash;
            if (hash) {
              const target = document.querySelector(hash);
              if (target) {
                setTimeout(() => {
                  if (typeof lenisInstance !== "undefined" && lenisInstance) {
                    lenisInstance.scrollTo(target);
                  } else {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }
            }
          }
        });
        
        tl.to("#loader-text-wrapper", {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power3.in"
        })
        .to(progressLine, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.4,
          ease: "power2.inOut"
        }, "-=0.2")
        .to(loader, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut"
        });
      } else {
        // Fallback if GSAP is not loaded
        setTimeout(() => {
          loader.style.opacity = "0";
          loader.style.pointerEvents = "none";
          document.body.style.overflow = "";
          
          const hash = window.location.hash;
          if (hash) {
            const target = document.querySelector(hash);
            if (target) {
              if (typeof lenisInstance !== "undefined" && lenisInstance) {
                lenisInstance.scrollTo(target);
              } else {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }
          }
          
          setTimeout(() => { loader.style.display = "none"; }, 500);
        }, 300);
      }
    }
  }, 100);
}

/* ==========================================================================
   2. Lenis Smooth Scroll
   ========================================================================== */
let lenisInstance = null;
function initLenis() {
  if (typeof Lenis === "undefined") return;
  
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
    smoothWheel: true,
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  
  // Smooth scroll to anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      
      if (targetEl) {
        if (typeof lenisInstance !== "undefined" && lenisInstance) {
          lenisInstance.scrollTo(targetEl);
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
        
        // If mobile menu is open, close it
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          toggleMobileMenu();
        }
      }
    });
  });
}

/* ==========================================================================
   3. Custom Cursor Follower
   ========================================================================== */
function initCustomCursor() {
  const cursorDot = document.getElementById("custom-cursor");
  const cursorRing = document.getElementById("custom-cursor-follower");
  
  if (!cursorDot || !cursorRing) return;
  
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;
  let isVisible = false;
  
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isVisible) {
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
      isVisible = true;
    }
  });
  
  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
    isVisible = false;
  });
  
  document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
    isVisible = true;
  });
  
  // Animation Loop for smoothing custom cursor ring (using requestAnimationFrame)
  function updateCursor() {
    // Smooth follow dot
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    
    // Outer Ring has delay
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    
    requestAnimationFrame(updateCursor);
  }
  
  requestAnimationFrame(updateCursor);
  
  // Detect hovering elements
  const addHoverEffects = () => {
    const interactives = document.querySelectorAll(
      'a, button, input, select, textarea, [role="button"], .hover-glow, .magnetic-btn, .project-card, .glass-panel'
    );
    interactives.forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursorDot.classList.add("hovered");
        cursorRing.classList.add("hovered");
      });
      el.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("hovered");
        cursorRing.classList.remove("hovered");
      });
    });
  };
  
  addHoverEffects();
}

/* ==========================================================================
   4. Floating Canvas Particles
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById("canvas-particles");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  
  let animationFrameId;
  let particles = [];
  const mouse = { x: -1000, y: -1000, active: false };
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticlesArray();
  };

  const initParticlesArray = () => {
    particles = [];
    const quantity = Math.floor((canvas.width * canvas.height) / 15000);
    const colors = ["rgba(213, 161, 83, 0.45)", "rgba(13, 83, 71, 0.45)"];
    
    for (let i = 0; i < quantity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const connectionDist = 120;
    const mouseRepelRadius = 150;

    // Draw and update particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce boundaries
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Interaction with mouse
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouseRepelRadius) {
          const force = (mouseRepelRadius - dist) / mouseRepelRadius;
          const angle = Math.atan2(dy, dx);
          // Gently push away
          p.x += Math.cos(angle) * force * 1.5;
          p.y += Math.sin(angle) * force * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow for performance
    });

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (connectionDist - dist) / connectionDist * 0.15;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(213, 161, 83, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  draw();

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  document.addEventListener("mouseleave", () => {
    mouse.active = false;
  });
}

/* ==========================================================================
   5. Hero Section Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById("typewriter-text");
  if (!element) return;
  
  const titles = [
    "Python Developer",
    "UI UX Designer",
    "AI Engineer",
    "Web Developer",
    "Freelancer",
    "Digital Marketer",
  ];
  
  let index = 0;
  let displayedText = "";
  let isDeleting = false;
  
  const tick = () => {
    const currentTitle = titles[index];
    const typingSpeed = isDeleting ? 40 : 100;
    
    if (!isDeleting && displayedText === currentTitle) {
      setTimeout(() => { isDeleting = true; tick(); }, 2000);
    } else if (isDeleting && displayedText === "") {
      isDeleting = false;
      index = (index + 1) % titles.length;
      setTimeout(tick, 200);
    } else {
      displayedText = isDeleting 
        ? currentTitle.substring(0, displayedText.length - 1)
        : currentTitle.substring(0, displayedText.length + 1);
        
      element.textContent = displayedText;
      setTimeout(tick, typingSpeed);
    }
  };
  
  tick();
}

/* ==========================================================================
   6. Skills Section Categories Filter
   ========================================================================== */
function initSkillsFilter() {
  const container = document.getElementById("skills-grid-container");
  if (!container) return;
  
  const buttons = document.querySelectorAll(".skill-filter-btn");
  const skillCards = container.querySelectorAll(".skill-item-card");
  
  buttons.forEach(btn => {
    btn.addEventListener("click", function() {
      // Toggle active states on buttons
      buttons.forEach(b => {
        b.classList.remove("bg-primary-cyan", "border-primary-cyan", "text-background-dark");
        b.classList.add("bg-white/5", "border-white/10", "text-white");
        b.style.boxShadow = "none";
      });
      
      this.classList.remove("bg-white/5", "border-white/10", "text-white");
      this.classList.add("bg-primary-cyan", "border-primary-cyan", "text-background-dark");
      this.style.boxShadow = "0 0 15px rgba(0, 229, 255, 0.25)";
      
      const targetCategory = this.getAttribute("data-category");
      
      skillCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (targetCategory === "all" || category === targetCategory) {
          card.style.display = "flex";
          setTimeout(() => { card.style.opacity = "1"; card.style.transform = "scale(1)"; }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => { card.style.display = "none"; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. 3D Fibonacci Canvas Tag Globe
   ========================================================================== */
function initTechGlobe() {
  const canvas = document.getElementById("tech-globe-canvas");
  const nodeInfo = document.getElementById("active-node-tag");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const skills = [
    "Python", "JavaScript", "HTML", "CSS", "Django", 
    "OpenCV", "YOLO", "NumPy", "Pandas", "Power BI", 
    "WordPress", "Wix", "Figma", "Canva", "Git", 
    "Linux", "Windows", "SEO", "Digital Marketing", 
    "Next.js", "React", "Tailwind"
  ];

  let width = canvas.width;
  let height = canvas.height;
  let radius = Math.min(width, height) * 0.4;
  const count = skills.length;
  let tags = [];
  
  let angleX = 0.003;
  let angleY = 0.003;
  let mouseX = 0;
  let mouseY = 0;
  let isMouseOver = false;

  const initTags = () => {
    tags = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

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

  const rotateX = (tag, angle) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y1 = tag.y * cos - tag.z * sin;
    const z1 = tag.z * cos + tag.y * sin;
    tag.y = y1;
    tag.z = z1;
  };

  const rotateY = (tag, angle) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x1 = tag.x * cos - tag.z * sin;
    const z1 = tag.z * cos + tag.x * sin;
    tag.x = x1;
    tag.z = z1;
  };

  const updateAndDraw = () => {
    ctx.clearRect(0, 0, width, height);

    if (isMouseOver) {
      angleX = (mouseY - height / 2) * 0.00005;
      angleY = (mouseX - width / 2) * 0.00005;
    } else {
      angleX = 0.001;
      angleY = 0.002;
    }

    const sortedTags = [...tags].sort((a, b) => b.z - a.z);
    let activeText = null;

    sortedTags.forEach((tag) => {
      rotateX(tag, angleX);
      rotateY(tag, angleY);

      const depth = 350;
      const scale = depth / (depth - tag.z);
      tag.scale = scale;
      tag.alpha = (tag.z + radius) / (2 * radius) * 0.7 + 0.3;

      const screenX = width / 2 + tag.x * scale;
      const screenY = height / 2 + tag.y * scale;

      ctx.save();
      ctx.font = `bold ${Math.max(10, Math.floor(13 * scale))}px Outfit, sans-serif`;
      
      const isHovered = isMouseOver && 
        Math.abs(mouseX - screenX) < 40 && 
        Math.abs(mouseY - screenY) < 15;

      if (isHovered) {
        ctx.fillStyle = "#D5A153";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#D5A153";
        activeText = tag.text;
      } else {
        ctx.fillStyle = tag.z > 0 
          ? `rgba(213, 161, 83, ${tag.alpha})` 
          : `rgba(148, 163, 184, ${tag.alpha * 0.6})`;
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tag.text, screenX, screenY);
      ctx.restore();
    });

    if (nodeInfo) {
      if (activeText) {
        nodeInfo.textContent = `Active Node: ${activeText}`;
        nodeInfo.style.opacity = "1";
      } else {
        nodeInfo.style.opacity = "0";
      }
    }

    requestAnimationFrame(updateAndDraw);
  };

  const resizeCanvas = () => {
    const parent = canvas.parentElement;
    if (parent) {
      width = parent.clientWidth;
      height = 360;
      canvas.width = width;
      canvas.height = height;
      radius = Math.min(width, height) * 0.38;
    }
    initTags();
  };

  window.addEventListener("resize", resizeCanvas);
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isMouseOver = true;
  });

  canvas.addEventListener("mouseleave", () => {
    isMouseOver = false;
  });
  
  resizeCanvas();
  updateAndDraw();
}

/* ==========================================================================
   8. Projects Case Study Modal
   ========================================================================== */
const projectsData = [
  {
    id: 1,
    title: "Cloud Insider Attack Detection",
    category: "Cloud Security & AI",
    tech: ["Python", "Django", "Scikit-Learn", "HTML/CSS", "PostgreSQL"],
    challenge: "Identifying malicious internal user acts without triggering excessive false positives due to natural shifts in developer workflow logs.",
    solution: "Engineered an Isolation Forest model integrated into a Django server. Aggregated shell audit inputs, file access rates, and session logs to score behavioral deviations.",
    results: [
      "Achieved a 94.2% detection rate on insider threat test suites.",
      "Reduced analysis overhead by 40% with real-time WebSocket notifications.",
      "Implemented a customizable log threshold panel for security admins."
    ]
  },
  {
    id: 2,
    title: "YOLO Real-time Object Detection",
    category: "Computer Vision",
    tech: ["Python", "YOLOv8", "OpenCV", "NumPy", "PyTorch"],
    challenge: "Running computer vision models locally on low-compute edge setups while keeping object tracking latency low.",
    solution: "Optimized weights using ONNX runtime and frame resizing routines. Utilized OpenCV tracking algorithms to interpolate paths between YOLO detection frames.",
    results: [
      "Boosted frame rate from 18 FPS to 46 FPS on standard CPU environments.",
      "Maintained detection precision above 89% for targeted class boundaries.",
      "Exported model metrics directly to dynamic JSON endpoints for client feeds."
    ]
  },
  {
    id: 3,
    title: "Smart City IoT Dashboard",
    category: "Internet of Things",
    tech: ["Python", "Pandas", "JavaScript", "Leaflet.js", "Chart.js"],
    challenge: "Visualizing telemetry data from thousands of scattered virtual sensors without overloading client-side rendering.",
    solution: "Structured a request throttling logic using requestAnimationFrame. Clustered overlapping map coordinates dynamically and processed telemetry packets with Pandas.",
    results: [
      "Supported fluid 60 FPS rendering of 2,000 active sensor nodes.",
      "Compressed data transit package size by 65% through optimized JSON payloads.",
      "Built predictive power grid outage forecasts based on simulated patterns."
    ]
  },
  {
    id: 4,
    title: "Digital Voice Assistant",
    category: "Natural Language Processing",
    tech: ["Python", "SpeechRecognition", "Pyttsx3", "NLP", "APIs"],
    challenge: "Providing quick responses to voice inputs in noisy environments and routing custom scripts reliably.",
    solution: "Implemented pre-processing audio thresholding filters to reduce ambient sound. Coupled string parsing with dynamic API web handlers.",
    results: [
      "Reduced request execution delay to under 1.2 seconds.",
      "Correctly recognized and mapped speech queries at 91% accuracy.",
      "Enabled seamless custom command shortcuts via simple config files."
    ]
  }
];

function initProjectsModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  
  if (!modal) return;
  
  const openModal = (projId) => {
    const proj = projectsData.find(p => p.id === parseInt(projId));
    if (!proj) return;
    
    // Fill Modal Data
    document.getElementById("modal-category").textContent = proj.category;
    document.getElementById("modal-title").textContent = proj.title;
    document.getElementById("modal-challenge").textContent = proj.challenge;
    document.getElementById("modal-solution").textContent = proj.solution;
    
    // Tech list
    const techWrapper = document.getElementById("modal-tech");
    techWrapper.innerHTML = "";
    proj.tech.forEach(t => {
      const span = document.createElement("span");
      span.className = "text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70";
      span.textContent = t;
      techWrapper.appendChild(span);
    });
    
    // Results list
    const resultsWrapper = document.getElementById("modal-results");
    resultsWrapper.innerHTML = "";
    proj.results.forEach(r => {
      const li = document.createElement("li");
      li.className = "flex items-start gap-2 text-xs text-text-muted leading-relaxed";
      li.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-primary-cyan mt-1.5 flex-shrink-0"></span><span>${r}</span>`;
      resultsWrapper.appendChild(li);
    });
    
    modal.classList.add("active");
    // Pause Lenis smooth scrolling when modal is open
    if (lenisInstance) lenisInstance.stop();
  };

  const closeModal = () => {
    modal.classList.remove("active");
    if (lenisInstance) lenisInstance.start();
  };
  
  // Attach listeners to Project Cards
  document.querySelectorAll(".project-card-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const projId = this.getAttribute("data-id");
      openModal(projId);
    });
  });
  
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function(e) {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. Testimonials Carousel
   ========================================================================== */
function initTestimonials() {
  const testimonials = [
    {
      quote: "Sushma's capacity to design custom UI dashboards and connect them directly to Python AI endpoints is highly impressive. She bridges design thinking and complex server architecture with ease.",
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
  
  const quoteEl = document.getElementById("testimonial-quote");
  const nameEl = document.getElementById("testimonial-name");
  const roleEl = document.getElementById("testimonial-role");
  const starsEl = document.getElementById("testimonial-stars");
  
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  
  if (!quoteEl) return;
  
  let activeIndex = 0;
  
  const updateSlide = () => {
    const data = testimonials[activeIndex];
    
    // Transition effect
    if (window.gsap) {
      gsap.to("#testimonial-content-wrapper", {
        opacity: 0,
        x: -15,
        duration: 0.25,
        onComplete: () => {
          quoteEl.textContent = `“${data.quote}”`;
          nameEl.textContent = data.name;
          roleEl.innerHTML = `${data.role} &bull; <span class="text-primary-cyan">${data.company}</span>`;
          
          starsEl.innerHTML = "";
          for(let i=0; i<data.stars; i++) {
            starsEl.innerHTML += `<i data-lucide="star" class="fill-primary-cyan text-primary-cyan w-3.5 h-3.5"></i>`;
          }
          lucide.createIcons();
          
          gsap.fromTo("#testimonial-content-wrapper", 
            { opacity: 0, x: 15 },
            { opacity: 1, x: 0, duration: 0.35 }
          );
        }
      });
    } else {
      quoteEl.textContent = `“${data.quote}”`;
      nameEl.textContent = data.name;
      roleEl.innerHTML = `${data.role} &bull; <span class="text-primary-cyan">${data.company}</span>`;
      
      starsEl.innerHTML = "";
      for(let i=0; i<data.stars; i++) {
        starsEl.innerHTML += `<i data-lucide="star" class="fill-primary-cyan text-primary-cyan w-3.5 h-3.5"></i>`;
      }
      lucide.createIcons();
    }
  };
  
  prevBtn.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    updateSlide();
  });
  
  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % testimonials.length;
    updateSlide();
  });
}

/* ==========================================================================
   10. Gallery Showcase Filter
   ========================================================================== */
function initGalleryFilter() {
  const container = document.getElementById("gallery-items-container");
  if (!container) return;
  
  const buttons = document.querySelectorAll(".gallery-filter-btn");
  const items = container.querySelectorAll(".gallery-item-card");
  
  buttons.forEach(btn => {
    btn.addEventListener("click", function() {
      buttons.forEach(b => {
        b.classList.remove("bg-primary-cyan", "border-primary-cyan", "text-background-dark");
        b.classList.add("bg-white/5", "border-white/10", "text-white");
        b.style.boxShadow = "none";
      });
      
      this.classList.remove("bg-white/5", "border-white/10", "text-white");
      this.classList.add("bg-primary-cyan", "border-primary-cyan", "text-background-dark");
      this.style.boxShadow = "0 0 15px rgba(0, 229, 255, 0.25)";
      
      const filter = this.getAttribute("data-filter");
      
      items.forEach(item => {
        const cat = item.getAttribute("data-category");
        if (filter === "All" || cat === filter) {
          item.style.display = "flex";
          setTimeout(() => { item.style.opacity = "1"; item.style.transform = "scale(1)"; }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.9)";
          setTimeout(() => { item.style.display = "none"; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   11. Contact Form Submit & Confetti
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("contact-success-msg");
  const formContent = document.getElementById("contact-form-content");
  const sendButton = document.getElementById("contact-send-btn");
  
  if (!form) return;
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Anti-spam honeypot check
    const honeypot = document.getElementById("honeypot-field").value;
    if (honeypot) {
      // Treat as successful message for bots
      if (formContent && successMessage) {
        formContent.style.display = "none";
        successMessage.style.display = "flex";
      }
      return;
    }
    
    const name = document.getElementById("form-name").value;
    const email = document.getElementById("form-email").value;
    const subject = document.getElementById("form-subject").value;
    const message = document.getElementById("form-message").value;
    
    if (!name || !email || !message) {
      alert("Please fill out all required fields.");
      return;
    }
    
    // Show loading state
    sendButton.disabled = true;
    sendButton.textContent = "Sending Message...";
    
    try {
      // Simulate API submit or post to real mock endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Toggle views
      formContent.style.display = "none";
      successMessage.style.display = "flex";
      
      // Fire premium custom confetti!
      if (typeof confetti !== "undefined") {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#D5A153", "#0D5347", "#581C2E"],
        });
      }
      
      // Reset form
      form.reset();
    } catch (err) {
      alert("Something went wrong, please try again.");
    } finally {
      sendButton.disabled = false;
      sendButton.textContent = "Send Inquiry";
    }
  });
  
  // Send another message button handler
  const resetBtn = document.getElementById("contact-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      successMessage.style.display = "none";
      formContent.style.display = "block";
    });
  }
}

/* ==========================================================================
   12. Mobile Header Toggle Drawer Menu
   ========================================================================== */
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("mobile-menu-open-icon");
  const iconClose = document.getElementById("mobile-menu-close-icon");
  
  if (!menu) return;
  
  const isOpen = menu.classList.contains("active");
  
  if (isOpen) {
    menu.classList.remove("active");
    menu.style.opacity = "0";
    menu.style.transform = "translateY(-20px)";
    setTimeout(() => { menu.style.display = "none"; }, 300);
    if(iconOpen) iconOpen.style.display = "block";
    if(iconClose) iconClose.style.display = "none";
  } else {
    menu.style.display = "flex";
    setTimeout(() => {
      menu.classList.add("active");
      menu.style.opacity = "1";
      menu.style.transform = "translateY(0)";
    }, 50);
    if(iconOpen) iconOpen.style.display = "none";
    if(iconClose) iconClose.style.display = "block";
  }
}

// Scrolled navbar header check
window.addEventListener("scroll", () => {
  const header = document.getElementById("navbar-header");
  if (!header) return;
  
  if (window.scrollY > 50) {
    header.classList.add("bg-background-dark/70", "backdrop-blur-xl", "border-white/5", "py-4");
    header.classList.remove("bg-transparent", "border-transparent", "py-6");
  } else {
    header.classList.remove("bg-background-dark/70", "backdrop-blur-xl", "border-white/5", "py-4");
    header.classList.add("bg-transparent", "border-transparent", "py-6");
  }
});
