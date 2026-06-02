import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const greetings = ["Hello", "नमस्ते", "Bonjour", "Hola", "مرحبا"];

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    const cycleGreetings = (index: number) => {
      if (index >= greetings.length) {
        // Exit animation
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.2,
          onComplete,
        });
        return;
      }

      setCurrentIndex(index);
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(textRef.current, {
              opacity: 0,
              y: -30,
              duration: 0.15,
              ease: "power2.in",
              delay: 0.1,
              onComplete: () => cycleGreetings(index + 1),
            });
          },
        }
      );
    };

    cycleGreetings(0);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <span
        ref={textRef}
        className="heading-lg text-foreground opacity-0"
      >
        {greetings[currentIndex]}
      </span>
    </div>
  );
};

export default Preloader;
