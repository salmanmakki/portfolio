import { useEffect, useRef } from "react";
import gsap from "gsap";

const roles = [
  "MERN Stack Developer",
  "Frontend Developer",
  "CSE Student",
  "DSA Enthusiast",
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const nameWrapperRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const roleTextRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Name reveal
      tl.fromTo(
        nameRef.current?.querySelectorAll(".char") || [],
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.025,
        }
      );

      // Role text reveal
      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        "-=0.5"
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55 },
        "-=0.3"
      );
    }, sectionRef);

    const timeoutIds: number[] = [];
    let roleIndex = 0;

    const clearTimers = () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
      timeoutIds.length = 0;
    };

    const typeRole = (index: number, charIndex = 0) => {
      const roleEl = roleTextRef.current;
      if (!roleEl) return;
      const roleText = roles[index];
      roleEl.textContent = roleText.slice(0, charIndex + 1);

      if (charIndex < roleText.length - 1) {
        timeoutIds.push(
          window.setTimeout(() => typeRole(index, charIndex + 1), 70)
        );
      } else {
        timeoutIds.push(
          window.setTimeout(() => deleteRole(index), 1200)
        );
      }
    };

    const deleteRole = (index: number, charIndex = roles[index].length - 1) => {
      const roleEl = roleTextRef.current;
      if (!roleEl) return;
      roleEl.textContent = roles[index].slice(0, charIndex);

      if (charIndex > 0) {
        timeoutIds.push(
          window.setTimeout(() => deleteRole(index, charIndex - 1), 40)
        );
      } else {
        roleIndex = (index + 1) % roles.length;
        timeoutIds.push(window.setTimeout(() => typeRole(roleIndex), 300));
      }
    };

    typeRole(roleIndex);

    const scrollState = { ticking: false };

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const imageMove = scrollY * 0.5;

      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(-${imageMove}px)`;
      }
      scrollState.ticking = false;
    };

    const handleScroll = () => {
      if (!scrollState.ticking) {
        scrollState.ticking = true;
        window.requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx.revert();
      clearTimers();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const nameChars = "Salman Makki".split("");

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-between section-padding relative overflow-hidden"
    >
      {/* Fixed centered portrait */}
      <div className="fixed inset-0 z-0 flex justify-center items-center pointer-events-none">
        <img
          ref={imageRef}
          src="/images/portrait.png"
          alt="Portrait"
          className="h-[85%] md:h-[90%] w-auto object-contain select-none will-change-transform"
          style={{ maskImage: 'linear-gradient(to bottom, black 15%, transparent 65%)', WebkitMaskImage: 'linear-gradient(to bottom, black 15%, transparent 65%)', transition: 'transform 0.15s ease-out' }}
        />
        {/* Left fade - desktop only */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent hidden md:block" />
        {/* Bottom fade - stronger on mobile for smooth blend */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] md:h-[35%] bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
      <div className="max-w-[95vw] relative z-10 pt-32 md:pt-24">
        <p className="body-sm text-muted-foreground mb-6 tracking-[0.3em]">
          Computer Science Engineering Student
        </p>
      </div>
      <div className="max-w-[95vw] relative z-10 pb-32 md:pb-40">
        <h1
          ref={(el) => {
            nameRef.current = el;
            nameWrapperRef.current = el;
          }}
          className="heading-xl text-accent font-extrabold text-shadow-lg text-reveal-mask will-change-transform max-sm:translate-y-[-100px] sm:translate-y-[70px]"
          style={{ fontFamily: "'Allura', cursive", fontSize: "12vw", fontWeight: "400", letterSpacing: "0.08em", transition: 'transform 0.15s ease-out' }}
        >
          {nameChars.map((char, i) => (
            <span key={i} className="char inline-block" style={{ opacity: 0 }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <div ref={roleRef} className="mt-8 opacity-0 max-sm:-translate-y-[80px] sm:translate-y-[12rem]">
          <span className="body-lg text-muted-foreground">
            I'm a{" "}
            <span
              ref={roleTextRef}
              className="role-text inline-block text-accent font-normal"
            />
            <span className="inline-block text-accent ml-1" style={{ opacity: 0.8 }}>
              |
            </span>
          </span>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs text-muted-foreground tracking-[0.3em] uppercase font-body">
          Scroll
        </span>
        <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
          <div className="w-full h-full bg-foreground animate-[scrollLine_1.5s_ease-in-out_infinite] origin-top" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
