import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text into words and apply highlight classes to key terms
      if (textRef.current) {
        const highlightKeys = new Set([
          "computer",
          "science",
          "engineering",
          "mern",
          "stack",
          "data",
          "structures",
          "algorithms",
          "algorithm",
        ]);

        const text = textRef.current.textContent || "";
        const words = text.split(" ");

        textRef.current.innerHTML = words
          .map((word) => {
            const normalized = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            const highlightClass = highlightKeys.has(normalized) ? "text-accent font-semibold" : "";
            return `<span class="inline-block overflow-hidden"><span class="word-reveal inline-block ${highlightClass}" style="transform: translateY(100%); opacity: 0">${word}</span></span>`;
          })
          .join(" ");

        gsap.to(".word-reveal", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 50%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 md:py-48 section-padding"
    >
      <div className="max-w-5xl">
        <span className="body-sm text-muted-foreground tracking-[0.3em] mb-12 block">
          About
        </span>
        <p ref={textRef} className="heading-md text-foreground leading-[1.3] font-display">
          I'm a Computer Science Engineering student passionate about building modern, performant web applications. With strong expertise in the MERN stack and a deep focus on Data Structures and Algorithms, I craft clean, scalable solutions that merge functionality with exceptional user experience. Currently seeking internship opportunities to apply my skills in real-world projects.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
