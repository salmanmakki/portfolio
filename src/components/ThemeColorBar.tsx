import { useEffect, useMemo, useState } from "react";

type ThemeColor = {
  id: string;
  label: string;
  accent: string;
  accentForeground: string;
  ring: string;
  displayColor: string;
};

type BackgroundColor = {
  id: string;
  label: string;
  background: string;
  displayColor: string;
};

const themeColors: ThemeColor[] = [
  {
    id: "sunset",
    label: "Sunset",
    accent: "14 100% 62%",
    accentForeground: "0 0% 7%",
    ring: "14 100% 77%",
    displayColor: "hsl(14 100% 62%)",
  },
  {
    id: "ocean",
    label: "Ocean",
    accent: "205 87% 64%",
    accentForeground: "0 0% 7%",
    ring: "205 87% 74%",
    displayColor: "hsl(205 87% 64%)",
  },
  {
    id: "purple",
    label: "Purple",
    accent: "264 76% 63%",
    accentForeground: "0 0% 98%",
    ring: "264 76% 74%",
    displayColor: "hsl(264 76% 63%)",
  },
  {
    id: "lime",
    label: "Lime",
    accent: "80 67% 53%",
    accentForeground: "0 0% 7%",
    ring: "80 67% 64%",
    displayColor: "hsl(80 67% 53%)",
  },
  {
    id: "amber",
    label: "Amber",
    accent: "40 100% 58%",
    accentForeground: "0 0% 7%",
    ring: "40 100% 71%",
    displayColor: "hsl(40 100% 58%)",
  },
];

const backgroundColors: BackgroundColor[] = [
  {
    id: "midnight",
    label: "Midnight",
    background: "220 15% 8%",
    displayColor: "hsl(220 15% 8%)",
  },
  {
    id: "slate",
    label: "Slate",
    background: "215 18% 18%",
    displayColor: "hsl(215 18% 18%)",
  },
  {
    id: "cotton",
    label: "Cotton",
    background: "40 20% 98%",
    displayColor: "hsl(40 20% 98%)",
  },
  {
    id: "sage",
    label: "Sage",
    background: "135 20% 92%",
    displayColor: "hsl(135 20% 92%)",
  },
  {
    id: "wine",
    label: "Wine",
    background: "340 30% 12%",
    displayColor: "hsl(340 30% 12%)",
  },
];

const applyTheme = (theme: ThemeColor, background: BackgroundColor) => {
  const root = document.documentElement;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-foreground", theme.accentForeground);
  root.style.setProperty("--sidebar-accent", theme.accent);
  root.style.setProperty("--sidebar-ring", theme.ring);
  root.style.setProperty("--ring", theme.ring);
  root.style.setProperty("--background", background.background);

  const match = background.background.match(/\d+\s+\d+%\s+(\d+)%/);
  const lightness = match ? Number(match[1]) : 0;
  const isLightBackground = lightness >= 75;

  const foreground = isLightBackground ? "0 0% 7%" : "40 20% 96%";
  const mutedForeground = isLightBackground ? "0 0% 45%" : "0 0% 72%";
  const cursor = isLightBackground ? "0 0% 7%" : "40 20% 96%";

  root.style.setProperty("--foreground", foreground);
  root.style.setProperty("--cursor", cursor);
  root.style.setProperty("--cursor-border", cursor);
  root.style.setProperty("--card-foreground", foreground);
  root.style.setProperty("--popover-foreground", foreground);
  root.style.setProperty("--primary-foreground", foreground);
  root.style.setProperty("--sidebar-foreground", foreground);
  root.style.setProperty("--sidebar-primary-foreground", foreground);
  root.style.setProperty("--muted-foreground", mutedForeground);
};

const ThemeColorBar = () => {
  const defaultTheme = themeColors[0];
  const defaultBackground = backgroundColors[0];
  const [activeThemeId, setActiveThemeId] = useState(defaultTheme.id);
  const [activeBackgroundId, setActiveBackgroundId] = useState(defaultBackground.id);

  const activeTheme = useMemo(
    () => themeColors.find((theme) => theme.id === activeThemeId) ?? defaultTheme,
    [activeThemeId]
  );

  const activeBackground = useMemo(
    () => backgroundColors.find((bg) => bg.id === activeBackgroundId) ?? defaultBackground,
    [activeBackgroundId]
  );

  useEffect(() => {
    const storedThemeId = window.localStorage.getItem("app-theme-color");
    const storedBackgroundId = window.localStorage.getItem("app-background-color");

    if (storedThemeId && themeColors.some((theme) => theme.id === storedThemeId)) {
      setActiveThemeId(storedThemeId);
    }

    if (storedBackgroundId && backgroundColors.some((bg) => bg.id === storedBackgroundId)) {
      setActiveBackgroundId(storedBackgroundId);
    }

    applyTheme(defaultTheme, defaultBackground);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyTheme(activeTheme, activeBackground);
    window.localStorage.setItem("app-theme-color", activeTheme.id);
    window.localStorage.setItem("app-background-color", activeBackground.id);
  }, [activeTheme, activeBackground]);

  return (
    <div
      className="fixed top-1/2 z-[60] hidden -translate-y-1/2 rounded-none border border-border bg-background/80 p-1 shadow-xl shadow-background/40 backdrop-blur-xl md:block"
      style={{ left: "1rem", width: "2rem" }}
      aria-label="Theme color selector"
    >
      <div className="flex flex-col items-center gap-1">
        {themeColors.map((theme) => {
          const isActive = theme.id === activeThemeId;
          return (
            <button
              key={theme.id}
              type="button"
              aria-label={`Switch theme to ${theme.label}`}
              title={theme.label}
              onClick={() => setActiveThemeId(theme.id)}
              className={
                "relative flex h-10 w-7 items-center justify-center rounded-md border transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/80 " +
                (isActive ? "border-white bg-white/10" : "border-border bg-white/10 hover:border-accent")
              }
              style={{ backgroundColor: theme.displayColor }}
            >
              {isActive ? <span className="absolute inset-0 rounded-md border-2 border-white/80" /> : null}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-border pt-2">
        {backgroundColors.map((bg) => {
          const isActive = bg.id === activeBackgroundId;
          return (
            <button
              key={bg.id}
              type="button"
              aria-label={`Switch background to ${bg.label}`}
              title={bg.label}
              onClick={() => setActiveBackgroundId(bg.id)}
              className={
                "relative flex h-12 w-6 items-center justify-center rounded-md border transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/80 " +
                (isActive ? "border-white bg-white/10" : "border-border bg-white/10 hover:border-accent")
              }
              style={{ backgroundColor: bg.displayColor }}
            >
              {isActive ? <span className="absolute inset-0 rounded-md border-2 border-white/80" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeColorBar;
