import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(follower, { scale: 2.5, opacity: 0.15, duration: 0.3 });
      gsap.to(cursor, { scale: 0, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, { scale: 1, opacity: 0.3, duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Re-bind on DOM changes
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll("a, button, [data-cursor-hover]");
      newElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full hidden md:block"
        style={{ backgroundColor: "hsl(var(--cursor))" }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full opacity-30 border hidden md:block"
        style={{ borderColor: "hsl(var(--cursor-border))" }}
      />
    </>
  );
};

export default CustomCursor;
