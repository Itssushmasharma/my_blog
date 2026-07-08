"use client";

import { Download, Mail, Phone, MapPin, Award, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthorProfilePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background-dark pt-28 pb-16 grid-overlay relative print:bg-white print:text-black print:pt-0">
      
      {/* Background accents (hidden in print) */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-cyan/5 rounded-full blur-[100px] pointer-events-none print:hidden" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none print:hidden" />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        
        {/* Breadcrumbs (hidden in print) */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-8 print:hidden select-none">
          <Link href="/" className="hover:text-primary-cyan transition-colors duration-300">Home</Link>
          <span>/</span>
          <span className="text-white">Author Profile & Resume</span>
        </div>

        {/* Action Header bar (hidden in print) */}
        <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-10 print:hidden">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Interactive CV</h1>
            <p className="text-xs text-text-muted mt-0.5">Print-ready stylesheet integrated. Press Ctrl+P or click print.</p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-cyan to-accent-purple text-background-dark font-bold text-xs hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all duration-300"
          >
            <Download size={14} />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Printable Resume Box */}
        <div className="glass-panel p-8 md:p-12 rounded-[32px] bg-secondary-dark/80 backdrop-blur-xl border border-white/10 shadow-2xl print:border-none print:bg-white print:p-0 print:shadow-none">
          
          {/* Top Info Header Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-white/5 print:border-black/10">
            
            {/* Avatar Frame */}
            <div className="md:col-span-3 flex justify-center">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border border-white/10 bg-background-dark print:border-black/10">
                <Image
                  src="/sushma_profile.png"
                  alt="Sushma Sharma"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Name and Info */}
            <div className="md:col-span-9 text-center md:text-left flex flex-col justify-center">
              <span className="text-xs uppercase font-mono tracking-widest text-primary-cyan font-bold mb-1.5 print:text-black">
                M.Tech Information Technology
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white print:text-black">
                Sushma Sharma
              </h2>
              <p className="text-sm text-text-muted mt-2 max-w-xl font-light print:text-black/85 leading-relaxed">
                Python Developer | UI/UX Designer | AI & ML Enthusiast | Web Developer | Digital Marketing Specialist. Building interactive, pixel-perfect, intelligent systems.
              </p>
              
              {/* Contact meta line */}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-4 text-xs text-text-muted font-mono print:text-black/80">
                <span className="flex items-center gap-1.5"><Mail size={12} className="text-primary-cyan print:text-black" /> sushma.sharma.it@gmail.com</span>
                <span className="flex items-center gap-1.5"><Phone size={12} className="text-primary-cyan print:text-black" /> +91 (000) 000-0000</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-primary-cyan print:text-black" /> Uttar Pradesh, India</span>
              </div>
            </div>

          </div>

          {/* Detailed Resume Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
            
            {/* Left Side: Story, Exp, Edu */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Profile Narrative */}
              <div>
                <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2 print:text-black print:border-b print:border-black/10 print:pb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan print:hidden" />
                  <span>Professional Summary</span>
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-light print:text-black/90">
                  Driven and detail-oriented IT professional with a postgraduate degree (M.Tech IT) focusing on computer systems engineering, layout accessibility, and smart machine learning implementations. Proven capability in building anomaly classification platforms, training OpenCV visual classifiers, and wireframing client-side dashboards. Dedicated to developing fast-loading, responsive code layouts that score top SEO core metrics.
                </p>
              </div>

              {/* Professional Experience */}
              <div>
                <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2 print:text-black print:border-b print:border-black/10 print:pb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-purple print:hidden" />
                  <span>Work Experience</span>
                </h3>
                
                <div className="space-y-6">
                  {/* Airtel */}
                  <div className="relative pl-4 border-l border-white/5 print:border-black/15">
                    <span className="text-[10px] font-mono text-primary-cyan uppercase font-semibold print:text-black">Jan 2024 - Jun 2024</span>
                    <h4 className="text-md font-bold text-white mt-1 print:text-black">UI UX Developer Intern</h4>
                    <p className="text-xs text-text-muted font-medium print:text-black/80">Bharti Airtel Digital &bull; Remote</p>
                    <ul className="text-xs text-text-muted leading-relaxed font-light mt-2 list-disc pl-4 space-y-1 print:text-black/85">
                      <li>Designed enterprise cloud billing dashboard layouts inside Figma.</li>
                      <li>Developed interactive responsive modules using React, Tailwind CSS, and Framer Motion.</li>
                      <li>Collaborated with design managers and engineering teams to audit layout metrics.</li>
                    </ul>
                  </div>

                  {/* Freelance */}
                  <div className="relative pl-4 border-l border-white/5 print:border-black/15">
                    <span className="text-[10px] font-mono text-primary-cyan uppercase font-semibold print:text-black">2022 - Present</span>
                    <h4 className="text-md font-bold text-white mt-1 print:text-black">Freelance Web Designer</h4>
                    <p className="text-xs text-text-muted font-medium print:text-black/80">Independent Technical Practice</p>
                    <ul className="text-xs text-text-muted leading-relaxed font-light mt-2 list-disc pl-4 space-y-1 print:text-black/85">
                      <li>Delivered responsive web pages and landing portfolios for client brands using WordPress, Wix, and clean client-side JS scripts.</li>
                      <li>Maintained design guidelines, handled client briefings, and optimized content pathways.</li>
                    </ul>
                  </div>
                  
                  {/* Python Trainee */}
                  <div className="relative pl-4 border-l border-white/5 print:border-black/15">
                    <span className="text-[10px] font-mono text-primary-cyan uppercase font-semibold print:text-black">2020 - 2021</span>
                    <h4 className="text-md font-bold text-white mt-1 print:text-black">Python Trainee</h4>
                    <p className="text-xs text-text-muted font-medium print:text-black/80">Technical Bootcamp Programs</p>
                    <ul className="text-xs text-text-muted leading-relaxed font-light mt-2 list-disc pl-4 space-y-1 print:text-black/85">
                      <li>Developed scripts for automated file parsing, directory sorting, and mathematical data manipulation using NumPy/Pandas.</li>
                      <li>Built web applications utilizing Django and SQL backends.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2 print:text-black print:border-b print:border-black/10 print:pb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 print:hidden" />
                  <span>Education History</span>
                </h3>

                <div className="space-y-6">
                  {/* M.Tech */}
                  <div className="relative pl-4 border-l border-white/5 print:border-black/15">
                    <span className="text-[10px] font-mono text-primary-cyan uppercase font-semibold print:text-black">2024 - Present</span>
                    <h4 className="text-md font-bold text-white mt-1 print:text-black">M.Tech in Information Technology</h4>
                    <p className="text-xs text-text-muted print:text-black/80">Postgraduate Engineering Studies</p>
                    <p className="text-xs text-text-muted font-light mt-1.5 print:text-black/85">Specializing in Advanced AI, cloud anomaly logging, and natural language model training.</p>
                  </div>

                  {/* B.Tech */}
                  <div className="relative pl-4 border-l border-white/5 print:border-black/15">
                    <span className="text-[10px] font-mono text-primary-cyan uppercase font-semibold print:text-black">2020 - 2024</span>
                    <h4 className="text-md font-bold text-white mt-1 print:text-black">B.Tech in Computer Science</h4>
                    <p className="text-xs text-text-muted print:text-black/80">Undergraduate Degree &bull; Graduated with Honors</p>
                    <p className="text-xs text-text-muted font-light mt-1.5 print:text-black/85">Acquired core principles of Data Structures, Algorithms, OOP, Database Systems, and Network topologies.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Skills, Certifications, Achievements */}
            <div className="lg:col-span-4 space-y-10">
              
              {/* Skills Card */}
              <div className="bg-white/2 border border-white/5 rounded-3xl p-6 print:border-none print:bg-transparent print:p-0">
                <h3 className="text-md font-display font-bold text-white mb-4 flex items-center gap-1.5 print:text-black print:border-b print:border-black/10 print:pb-1">
                  <span>Technical Skills</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono text-primary-cyan uppercase tracking-wider mb-2 print:text-black">Languages & Web</h4>
                    <p className="text-xs text-text-muted leading-relaxed print:text-black/90">Python, Django, JavaScript, HTML/CSS, React, Next.js, SQL</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-primary-cyan uppercase tracking-wider mb-2 print:text-black">AI & Data Science</h4>
                    <p className="text-xs text-text-muted leading-relaxed print:text-black/90">OpenCV, YOLO, NumPy, Pandas, NLP Algorithms</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-primary-cyan uppercase tracking-wider mb-2 print:text-black">Design & CMS</h4>
                    <p className="text-xs text-text-muted leading-relaxed print:text-black/90">Figma UI/UX, Canva, WordPress, Wix</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-primary-cyan uppercase tracking-wider mb-2 print:text-black">SEO & Platforms</h4>
                    <p className="text-xs text-text-muted leading-relaxed print:text-black/90">Technical SEO, Google Analytics, Git, Linux, Windows Server</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-md font-display font-bold text-white mb-4 flex items-center gap-1.5 print:text-black print:border-b print:border-black/10 print:pb-1">
                  <Award size={16} className="text-primary-cyan print:hidden" />
                  <span>Certifications</span>
                </h3>
                <ul className="text-xs text-text-muted space-y-3 font-light print:text-black/90">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-cyan font-bold font-mono mt-0.5 print:text-black">&bull;</span>
                    <span>UI / UX Specialization Interaction Design Certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-cyan font-bold font-mono mt-0.5 print:text-black">&bull;</span>
                    <span>Python for Data Science (Data modeling & Analytics)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-cyan font-bold font-mono mt-0.5 print:text-black">&bull;</span>
                    <span>Digital Marketing Specialist (Advanced SEO & Metrics)</span>
                  </li>
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-md font-display font-bold text-white mb-4 flex items-center gap-1.5 print:text-black print:border-b print:border-black/10 print:pb-1">
                  <Trophy size={16} className="text-accent-purple print:hidden" />
                  <span>Achievements</span>
                </h3>
                <ul className="text-xs text-text-muted space-y-3 font-light print:text-black/90">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-purple font-bold font-mono mt-0.5 print:text-black">&bull;</span>
                    <span>Rank holder in UPCET State Engineering Entrance Examination.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-purple font-bold font-mono mt-0.5 print:text-black">&bull;</span>
                    <span>Co-authored ML/NLP research projects in AI-driven insider anomaly models.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-purple font-bold font-mono mt-0.5 print:text-black">&bull;</span>
                    <span>Core member and developer at early stage digital consulting agency startup.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
