import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProjectsSection from "@/components/ProjectsSection";
import AnimatedProjects from "@/components/AnimatedProjects";
import TwoDProjects from "@/components/TwoDProjects";
import PhotographySection from "@/components/PhotographySection";
import SkillsSection from "@/components/SkillsSection";
import ContactPage from "./contact/page";
import Footer from "@/components/Footer";
import Moon from "@/components/Moon";
import HeroImage from "@/components/HeroImage";
import Ufo from "@/components/Ufo";
import Astroid from "@/components/Astroid";


export default function Home() {
  return (
     <div className="relative isolate">

      {/* Moon background */}
      <div className="relative z-15">
        <Moon />
      </div>

      {/* HERO STACK */}
      <div className="relative z-10">
        <HeroSection
          heroImage={<HeroImage />}
        />
      </div>

      <FeaturedProjects featuredIds={[4, 3, 2]} />
      <SkillsSection />
      <ProjectsSection />
      <Ufo />
      <Astroid />
      <AnimatedProjects />
      <TwoDProjects />
      <PhotographySection />
      <ContactPage />
      <Footer />
    </div>
  );
}