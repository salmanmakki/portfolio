import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce web app with user authentication, product management, cart functionality, and payment integration.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "/images/forever.png",
    live: "https://forever-frontend-lovat.vercel.app",
    github: "https://github.com/salmanmakki/forever-copy",
  },
  {
    title: "Real-Time Chat Application",
    description:
      "A real-time messaging app with WebSocket integration, user rooms, and message history.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    live: "https://chatapp-frontend-ten-opal.vercel.app",
    github: "https://github.com/salmanmakki/chatapp",
  },
  {
    title: "Portfolio Website",
    description:
      "This very portfolio — an Awwwards-inspired design with GSAP animations, smooth scroll, and a custom cursor.",
    tech: ["React", "GSAP", "Tailwind CSS", "Lenis"],
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&q=80",
    live: "#",
    github: "#",
  },
  {
    title: "RepScore",
    description:
      "An online reputation checker and rating/review app for measuring brand trust and customer sentiment.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "/images/repscore.png",
    live: "https://repscore.vercel.app",
    github: "https://github.com/salmanmakki/RepScore",
  },
  {
    title: "Tomato",
    description:
      "A food delivery app that helps users browse menus, place orders, and track deliveries in real time.",
    tech: ["React", "Netlify", "Tailwind CSS", "JavaScript"],
    image: "/images/tomato.png",
    live: "https://gentle-liger-89ad5b.netlify.app",
    github: "https://github.com/salmanmakki/Tomato",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgElRef = useRef<HTMLImageElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Follow mouse within section
  useEffect(() => {
    const section = sectionRef.current;
    const imageContainer = imageRef.current;
    if (!section || !imageContainer || activeIndex === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(imageContainer, {
        x: x - 50,
        y: y - 50,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [activeIndex]);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    if (imgElRef.current) {
      gsap.killTweensOf(imgElRef.current);
      imgElRef.current.src = projects[index].image;
      gsap.fromTo(
        imgElRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    if (imageRef.current) {
      gsap.to(imageRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-32 md:py-48 section-padding relative z-50">
      {/* Floating preview image */}
      <div
        ref={imageRef}
        className="absolute top-0 left-0 w-[400px] h-[280px] rounded-sm overflow-hidden pointer-events-none z-50 opacity-0 hidden md:block"
        style={{ willChange: "transform" }}
      >
        <img
          ref={imgElRef}
          src=""
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <span className="body-sm text-muted-foreground tracking-[0.3em] mb-16 block">
        Selected Projects
      </span>
      <div className="space-y-0">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="project-card group border-t border-border py-12 md:py-16 cursor-pointer transition-all duration-500 hover:bg-muted/30 hover:px-4 hover:mx-[-1rem]"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <span className="text-muted-foreground font-body text-sm mb-2 block group-hover:text-accent transition-colors duration-500">
                  0{index + 1}
                </span>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground group-hover:text-accent transition-all duration-500 group-hover:translate-x-2">
                  {project.title}
                </h3>
              </div>
              <div className="flex-1 max-w-lg">
                <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-body tracking-wider uppercase text-muted-foreground"
                    >
                      {t}
                      {project.tech.indexOf(t) < project.tech.length - 1 && (
                        <span className="mx-2 text-border">·</span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.live}
                    data-cursor-hover
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300 text-sm font-body tracking-wide"
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                  <a
                    href={project.github}
                    data-cursor-hover
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300 text-sm font-body tracking-wide"
                  >
                    <Github size={14} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default ProjectsSection;
