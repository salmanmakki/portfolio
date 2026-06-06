import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-el",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
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
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 section-padding"
    >
      <span className="body-sm text-muted-foreground tracking-[0.3em] mb-12 block contact-el">
        Get in Touch
      </span>
      <h2 className="heading-lg text-foreground mb-16 contact-el">
        Let's work<br />
        <span className="text-accent italic">together</span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
        <a
          href="mailto:salmanmakki443@gmail.com"
          data-cursor-hover
          className="contact-el flex items-center gap-3 text-foreground hover:text-accent transition-colors duration-300 font-body text-lg"
        >
          <Mail size={20} />
          salmanmakki443@gmail.com
        </a>
        <a
          href="https://github.com/salmanmakki"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="contact-el flex items-center gap-3 text-foreground hover:text-accent transition-colors duration-300 font-body text-lg"
        >
          <Github size={20} />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/salman-makki-9272a8273"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="contact-el flex items-center gap-3 text-foreground hover:text-accent transition-colors duration-300 font-body text-lg"
        >
          <Linkedin size={20} />
          LinkedIn
        </a>
      </div>

      <div className="mt-12 contact-el flex flex-col sm:flex-row gap-4">
        <a
          href="/My_resume.pdf"
          download="My_resume.pdf"
          data-cursor-hover
          className="inline-flex items-center gap-3 px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-500 font-body text-sm tracking-[0.2em] uppercase rounded-sm"
        >
          <Download size={16} />
          Download Resume
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=salmanmakki443@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="inline-flex items-center gap-3 px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-500 font-body text-sm tracking-[0.2em] uppercase rounded-sm"
        >
          <Mail size={16} />
          Send Email
        </a>
      </div>

      <div className="mt-32 pt-8 border-t border-border relative z-50">
        <p className="font-body text-xs tracking-wider font-semibold" style={{ color: "hsl(30 15% 100%)" }}>
          © {new Date().getFullYear()} — Designed & Built with passion
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
