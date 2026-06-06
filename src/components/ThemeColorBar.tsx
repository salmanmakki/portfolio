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
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const activeTheme = useMemo(
    () => themeColors.find((theme) => theme.id === activeThemeId) ?? defaultTheme,
    [activeThemeId]
  );

  const activeBackground = useMemo(
    () => backgroundColors.find((bg) => bg.id === activeBackgroundId) ?? defaultBackground,
    [activeBackgroundId]
  );

  const isLightBackground = useMemo(() => {
    const match = activeBackground.background.match(/\d+\s+\d+%\s+(\d+)%/);
    const lightness = match ? Number(match[1]) : 0;
    return lightness >= 75;
  }, [activeBackground.background]);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    applyTheme(activeTheme, activeBackground);
    window.localStorage.setItem("app-theme-color", activeTheme.id);
    window.localStorage.setItem("app-background-color", activeBackground.id);
  }, [activeTheme, activeBackground]);

  return (
    <div
      className="fixed top-1/2 z-[60] flex -translate-y-1/2 flex-col items-center gap-2"
      style={{ left: isMobile ? "0.5rem" : "1rem", transform: "translateY(-40%)", height: isMobile ? "50vh" : "80vh" }}
      aria-label="Theme color selector"
    >
      {/* Upper vertical line for text/theme color */}
      <div
        className="relative flex-1"
        onMouseEnter={() => !isMobile && setShowThemeMenu(true)}
        onMouseLeave={() => !isMobile && setShowThemeMenu(false)}
        onClick={() => isMobile && setShowThemeMenu(!showThemeMenu)}
      >
        {/* Invisible hover bridge to menu */}
        {showThemeMenu && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 pointer-events-auto"
            style={{ left: "0px", right: "-200px", height: "100%" }}
            onMouseEnter={() => !isMobile && setShowThemeMenu(true)}
            onMouseLeave={() => !isMobile && setShowThemeMenu(false)}
          />
        )}
        
        <div
          className="w-full h-full rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg"
          style={{
            width: "5px",
            backgroundColor: activeTheme.displayColor,
            borderRadius: "4px",
          }}
        />
        {/* Theme color menu - appears on hover */}
        {showThemeMenu && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 bg-background/95 border border-border rounded-lg shadow-xl p-2 backdrop-blur-xl whitespace-nowrap z-50 pointer-events-auto"
            style={{ left: "20px" }}
            onMouseEnter={() => setShowThemeMenu(true)}
            onMouseLeave={() => setShowThemeMenu(false)}
          >
            <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">Text Color</div>
            <div className="flex flex-col gap-1">
              {themeColors.map((theme) => {
                const isActive = theme.id === activeThemeId;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    aria-label={`Switch theme to ${theme.label}`}
                    onClick={() => {
                      setActiveThemeId(theme.id);
                      setShowThemeMenu(false);
                    }}
                    className={`px-3 py-2 rounded-md text-sm transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/20 text-foreground"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded border border-border"
                      style={{ backgroundColor: theme.displayColor }}
                    />
                    {theme.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lower vertical line for background color */}
      <div
        className="relative flex-1"
        onMouseEnter={() => !isMobile && setShowBackgroundMenu(true)}
        onMouseLeave={() => !isMobile && setShowBackgroundMenu(false)}
        onClick={() => isMobile && setShowBackgroundMenu(!showBackgroundMenu)}
      >
        {/* Invisible hover bridge to menu */}
        {showBackgroundMenu && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 pointer-events-auto"
            style={{ left: "0px", right: "-200px", height: "100%" }}
            onMouseEnter={() => !isMobile && setShowBackgroundMenu(true)}
            onMouseLeave={() => !isMobile && setShowBackgroundMenu(false)}
          />
        )}
        
        <div
          className="w-full h-full rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg"
          style={{
            width: "5px",
            backgroundColor: activeBackground.displayColor,
            borderRadius: "4px",
            border: `1px solid ${isLightBackground ? "black" : "white"}`,
          }}
        />
        {/* Background color menu - appears on hover */}
        {showBackgroundMenu && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 bg-background/95 border border-border rounded-lg shadow-xl p-2 backdrop-blur-xl whitespace-nowrap z-50 pointer-events-auto"
            style={{ left: "20px" }}
            onMouseEnter={() => setShowBackgroundMenu(true)}
            onMouseLeave={() => setShowBackgroundMenu(false)}
          >
            <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">Background Color</div>
            <div className="flex flex-col gap-1">
              {backgroundColors.map((bg) => {
                const isActive = bg.id === activeBackgroundId;
                return (
                  <button
                    key={bg.id}
                    type="button"
                    aria-label={`Switch background to ${bg.label}`}
                    onClick={() => {
                      setActiveBackgroundId(bg.id);
                      setShowBackgroundMenu(false);
                    }}
                    className={`px-3 py-2 rounded-md text-sm transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/20 text-foreground"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded border border-border"
                      style={{ backgroundColor: bg.displayColor }}
                    />
                    {bg.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeColorBar;
