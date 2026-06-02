import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Languages",
    skills: ["C", "C++", "Python", "JavaScript"],
    count: "04",
  },
  {
    title: "Frontend",
    skills: ["React", "HTML", "CSS", "Tailwind CSS"],
    count: "04",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js"],
    count: "02",
  },
  {
    title: "Database & Cloud",
    skills: ["MongoDB", "MongoDB Atlas", "Cloudinary"],
    count: "03",
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Postman", "VS Code"],
    count: "04",
  },
  {
    title: "CS Fundamentals",
    skills: ["Data Structures & Algorithms"],
    count: "01",
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-row",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="skills" className="py-32 md:py-48 section-padding relative z-50">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 md:mb-28 gap-6">
        <span className="body-sm text-muted-foreground tracking-[0.3em]">
          Skills & Expertise
        </span>
        <p className="font-body text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
          Technologies and tools I work with to bring ideas to life.
        </p>
      </div>

      <div className="space-y-0">
        {skillGroups.map((group, index) => (
          <div
            key={group.title}
            className="skill-row border-t border-border group cursor-pointer"
            onClick={() => handleToggle(index)}
            data-cursor-hover
          >
            <div className="flex items-center justify-between py-8 md:py-10">
              <div className="flex items-center gap-6 md:gap-10">
                <span className="text-muted-foreground font-body text-sm tabular-nums">
                  {group.count}
                </span>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground group-hover:text-accent transition-colors duration-500">
                  {group.title}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground font-body text-xs tracking-wider uppercase hidden md:block">
                  {group.skills.length} {group.skills.length === 1 ? "skill" : "skills"}
                </span>
                <div
                  className={`w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all duration-500 group-hover:border-accent ${
                    expandedIndex === index ? "rotate-45 border-accent" : ""
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-foreground group-hover:text-accent transition-colors duration-500"
                  >
                    <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                expandedIndex === index ? "max-h-40 pb-8" : "max-h-0"
              }`}
            >
              <div className="flex flex-wrap gap-3 pl-12 md:pl-20">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-5 py-2.5 border border-border text-foreground text-sm font-body tracking-wide hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default SkillsSection;
