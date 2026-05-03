import { Scroll } from '@react-three/drei';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import BlogSection from './BlogSection';
import ContactSection from './ContactSection';

export default function Hero() {
  return (
    <Scroll html style={{ width: '100%', height: '100%' }}>
      {/* Reverted to standard drei Scroll component to save memory. 
          The circular JSON and style crashes were fixed by removing PostProcessing. */}
      <div className="relative z-50">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </div>
    </Scroll>
  );
}
