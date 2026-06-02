import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import { StaggeredMenu } from "@/components/StaggeredMenu/StaggeredMenu";
import type { StaggeredMenuItem } from "@/components/StaggeredMenu/StaggeredMenu";
import HeroSection from "@/components/HeroSection";
import ThemeColorBar from "@/components/ThemeColorBar";

// Lazy load non-critical sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const menuItems: StaggeredMenuItem[] = [
  { label: "About", ariaLabel: "Go to About section", link: "#about" },
  { label: "Skills", ariaLabel: "Go to Skills section", link: "#skills" },
  { label: "Projects", ariaLabel: "Go to Projects section", link: "#projects" },
  { label: "Education", ariaLabel: "Go to Education section", link: "#education" },
  { label: "Contact", ariaLabel: "Go to Contact section", link: "#contact" },
];

const socialItems = [
  { label: "GitHub", link: "https://github.com/salmanmakki" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/salman-makki-9272a8273" },
  { label: "Email", link: "mailto:salmanmakki443@gmail.com" },
];

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      {!loading && (
        <>
          <StaggeredMenu
            items={menuItems}
            socialItems={socialItems}
            isFixed
            position="right"
            colors={["#1a1714", "#2a2520"]}
            accentColor="hsl(30 15% 70%)"
            menuButtonColor="#e8e0d4"
            openMenuButtonColor="#121212"
            onItemClick={(item, e) => {
              e.preventDefault();
              const target = document.querySelector(item.link);
              target?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <ThemeColorBar />
          <main>
            <HeroSection />
            <Suspense fallback={null}>
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <EducationSection />
              <ContactSection />
            </Suspense>
          </main>
        </>
      )}
    </>
  );
};

export default Index;
