import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="py-32 md:py-48 section-padding relative z-50">
      <span className="body-sm text-muted-foreground tracking-[0.3em] mb-16 block">
        Education
      </span>
      <div className="max-w-3xl">
        <div className="edu-content border-l-2 border-accent/30 pl-8 md:pl-12">
          <span className="text-muted-foreground font-body text-sm tracking-wider uppercase block mb-2">
            2022 — Present
          </span>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
            Bachelor of Technology
          </h3>
          <p className="text-accent font-body text-lg mb-3">
            Computer Science & Engineering
          </p>
          <p className="text-muted-foreground font-body text-base leading-relaxed">
            Focused on software development, data structures & algorithms, and full-stack web technologies. Building strong foundations in computer science while actively developing real-world projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
