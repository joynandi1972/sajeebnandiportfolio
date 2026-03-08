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
  const [active, setActive] = useState("home");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  // Close dropdown on outside click
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
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const aboutActive = ["about", "education", "experience", "research", "skills", "achievements"].includes(active);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/90 backdrop-blur-xl shadow-lg border-b border-border" : "bg-transparent"
      }`}>
      <div className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.button onClick={() => scrollTo("#home")} className="flex items-center gap-2 group" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <motion.div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center" whileHover={{ rotate: 20 }} transition={{ type: "spring", stiffness: 300 }}>
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </motion.div>
          <span className="font-display font-semibold text-primary text-lg hidden sm:block">Sajeeb Nandi</span>
        </motion.button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Home */}
          <NavBtn label="Home" isActive={active === "home"} onClick={() => scrollTo("#home")} />

          {/* About (with dropdown) */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={() => setAboutOpen(p => !p)}
              className={`relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                aboutActive ? "text-primary" : "text-foreground/70 hover:text-primary"
              }`}
              whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}>
              About
              <motion.span animate={{ rotate: aboutOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
              {aboutActive && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-lg -z-10"
                  style={{ background: "hsl(var(--primary-muted))" }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 w-44 rounded-xl overflow-hidden shadow-lg border border-border"
                  style={{ background: "hsl(var(--card))", backdropFilter: "blur(16px)" }}>
                  {/* About link itself */}
                  <button onClick={() => scrollTo("#about")}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold border-b border-border transition-colors hover:bg-accent ${active === "about" ? "text-primary" : "text-foreground"}`}>
                    About
                  </button>
                  {subItems.map((item, i) => (
                    <motion.button key={item.href}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => scrollTo(item.href)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-accent flex items-center gap-2 ${
                        active === item.href.replace("#", "") ? "text-primary font-medium" : "text-foreground/75"
                      }`}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "hsl(var(--primary))" }} />
                      {item.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Gallery & Contact */}
          <NavBtn label="Gallery" isActive={active === "gallery"} onClick={() => scrollTo("#gallery")} />
          <NavBtn label="Contact" isActive={active === "contact"} onClick={() => scrollTo("#contact")} />
        </nav>

        {/* Right: dark mode + mobile */}
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <motion.button
            className="lg:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-accent transition-colors"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-border overflow-hidden">
            <nav className="flex flex-col py-3 px-4">
              {/* Home */}
              <MobileNavBtn label="Home" isActive={active === "home"} onClick={() => scrollTo("#home")} />

              {/* About expandable */}
              <div>
                <button
                  onClick={() => setMobileAboutOpen(p => !p)}
                  className={`w-full flex items-center justify-between text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    aboutActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-accent"
                  }`}>
                  About
                  <motion.span animate={{ rotate: mobileAboutOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }} className="overflow-hidden">
                      {/* About itself */}
                      <button onClick={() => scrollTo("#about")}
                        className={`w-full text-left py-2 pl-7 pr-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${active === "about" ? "text-primary" : "text-foreground/70 hover:text-primary hover:bg-accent"}`}>
                        <span className="w-1 h-1 rounded-full" style={{ background: "hsl(var(--primary))" }} />
                        About Me
                      </button>
                      {subItems.map((item, i) => (
                        <motion.button key={item.href}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => scrollTo(item.href)}
                          className={`w-full text-left py-2 pl-7 pr-3 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                            active === item.href.replace("#", "") ? "text-primary font-medium" : "text-foreground/65 hover:text-primary hover:bg-accent"
                          }`}>
                          <span className="w-1 h-1 rounded-full" style={{ background: "hsl(var(--primary))" }} />
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
      className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
      whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}>
      {label}
      {isActive && (
        <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-lg -z-10"
          style={{ background: "hsl(var(--primary-muted))" }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }} />
      )}
    </motion.button>
  );
}

function MobileNavBtn({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
        isActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-accent"
      }`}>
      {label}
    </button>
  );
}
