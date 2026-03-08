import { useState, useEffect, useRef } from "react";
import { Menu, X, Leaf, Sun, Moon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const subItems = [
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills" },
];

const topNavItems = [
  { label: "Home", href: "#home" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const allSections = ["home", "about", "education", "experience", "research", "skills", "achievements", "gallery", "contact"];

function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;
  const isDark = theme === "dark";
  return (
    <motion.button
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors"
      style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))" }}
      aria-label="Toggle dark mode">
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
            <Sun className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
            <Moon className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      // Scroll progress
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      // Active section
      for (const section of [...allSections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    setAboutOpen(false);
    setMobileAboutOpen(false);
    setTimeout(() => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const aboutActive = ["about", "education", "experience", "research", "skills", "achievements"].includes(active);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        scrolled
          ? "bg-card/92 backdrop-blur-2xl shadow-[0_2px_24px_hsl(155_30%_12%/0.10)] border-b border-border/60"
          : "bg-transparent"
      }`}>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
        <motion.div
          className="h-full origin-left"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(42 88% 52%), hsl(var(--primary-glow)))",
          }}
        />
      </div>

      <div className="container-max flex items-center justify-between h-[68px] px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <motion.button
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <div className="relative">
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)))",
                boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)",
              }}
              whileHover={{ rotate: 18, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 320 }}>
              <Leaf className="w-4.5 h-4.5 w-4 h-4 text-primary-foreground" />
            </motion.div>
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-foreground text-base leading-none block">Sajeeb Nandi</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground leading-none" style={{ letterSpacing: "0.12em" }}>Portfolio</span>
          </div>
        </motion.button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <NavBtn label="Home" isActive={active === "home"} onClick={() => scrollTo("#home")} />

          {/* About dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={() => setAboutOpen(p => !p)}
              className={`relative flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                aboutActive ? "text-primary" : "text-foreground/65 hover:text-foreground"
              }`}
              whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
              About
              <motion.span animate={{ rotate: aboutOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </motion.span>
              {aboutActive && (
                <motion.span layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-lg -z-10"
                  style={{ background: "hsl(var(--primary-muted))" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
            </motion.button>

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 w-48 rounded-2xl overflow-hidden"
                  style={{
                    background: "hsl(var(--card) / 0.95)",
                    backdropFilter: "blur(18px)",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 16px 48px hsl(155 30% 12% / 0.16)",
                  }}>
                  <div className="p-1.5">
                    <button onClick={() => scrollTo("#about")}
                      className={`w-full text-left px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors hover:bg-accent ${active === "about" ? "text-primary bg-primary-muted" : "text-foreground"}`}>
                      About Me
                    </button>
                    <div className="h-px mx-3 my-1" style={{ background: "hsl(var(--border))" }} />
                    {subItems.map((item, i) => (
                      <motion.button key={item.href}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => scrollTo(item.href)}
                        className={`w-full text-left px-3.5 py-2 text-sm rounded-xl transition-colors hover:bg-accent flex items-center gap-2.5 ${
                          active === item.href.replace("#", "") ? "text-primary font-semibold" : "text-foreground/70"
                        }`}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: active === item.href.replace("#", "") ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }} />
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavBtn label="Gallery" isActive={active === "gallery"} onClick={() => scrollTo("#gallery")} />
          <NavBtn label="Contact" isActive={active === "contact"} onClick={() => scrollTo("#contact")} />
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <motion.button
            className="lg:hidden p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-accent transition-all"
            onClick={() => setOpen(!open)} whileTap={{ scale: 0.9 }} aria-label="Toggle menu">
            <AnimatePresence mode="wait">
              {open
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-b border-border overflow-hidden"
            style={{ background: "hsl(var(--card) / 0.96)", backdropFilter: "blur(20px)" }}>
            <nav className="flex flex-col p-3 gap-0.5">
              <MobileNavBtn label="Home" isActive={active === "home"} onClick={() => scrollTo("#home")} />
              <div>
                <button
                  onClick={() => setMobileAboutOpen(p => !p)}
                  className={`w-full flex items-center justify-between text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-colors ${
                    aboutActive ? "text-primary bg-primary/8" : "text-foreground hover:text-primary hover:bg-accent"
                  }`}>
                  About
                  <motion.span animate={{ rotate: mobileAboutOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 opacity-70" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }} className="overflow-hidden ml-2">
                      <button onClick={() => scrollTo("#about")}
                        className={`w-full text-left py-2 pl-6 pr-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${active === "about" ? "text-primary" : "text-foreground/70 hover:text-primary hover:bg-accent"}`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />
                        About Me
                      </button>
                      {subItems.map((item, i) => (
                        <motion.button key={item.href}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => scrollTo(item.href)}
                          className={`w-full text-left py-2 pl-6 pr-3 rounded-xl text-sm transition-colors flex items-center gap-2 ${
                            active === item.href.replace("#", "") ? "text-primary font-semibold" : "text-foreground/60 hover:text-primary hover:bg-accent"
                          }`}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />
                          {item.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <MobileNavBtn label="Gallery" isActive={active === "gallery"} onClick={() => scrollTo("#gallery")} />
              <MobileNavBtn label="Contact" isActive={active === "contact"} onClick={() => scrollTo("#contact")} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavBtn({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <motion.button onClick={onClick}
      className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive ? "text-primary" : "text-foreground/65 hover:text-foreground"}`}
      whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
      {label}
      {isActive && (
        <motion.span layoutId="nav-active-pill" className="absolute inset-0 rounded-lg -z-10"
          style={{ background: "hsl(var(--primary-muted))" }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }} />
      )}
    </motion.button>
  );
}

function MobileNavBtn({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-colors ${
        isActive ? "text-primary bg-primary/8" : "text-foreground/70 hover:text-primary hover:bg-accent"
      }`}>
      {label}
    </button>
  );
}
