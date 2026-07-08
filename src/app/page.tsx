import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ServicesSection from "@/components/sections/services";
import TestimonialsSection from "@/components/sections/testimonials";
import GallerySection from "@/components/sections/gallery";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div id="top" className="flex flex-col min-h-screen">
      {/* Hero Intro */}
      <HeroSection />

      {/* Narrative & Timeline */}
      <AboutSection />

      {/* Skills Grid & Tech Globe */}
      <SkillsSection />

      {/* Grid of Projects & Case Study Modals */}
      <ProjectsSection />

      {/* Custom Services Grid */}
      <ServicesSection />

      {/* Star Testimonials Reviews */}
      <TestimonialsSection />

      {/* Graphic Works & Credentials Gallery */}
      <GallerySection />

      {/* Spam-protected Mail Form */}
      <ContactSection />

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
