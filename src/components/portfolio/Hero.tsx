import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { MapPin, Mail, Linkedin, ChevronDown, Camera, Upload, X, Check, Sparkles } from "lucide-react";
import profileImg from "@/assets/profile.png";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

const STORAGE_KEY = "sajeeb_portfolio_profile_photo";

function useProfilePhoto() {
  const [photo, setPhoto] = useState<string | null>(() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  });
  const save = useCallback((dataUrl: string) => {
    setPhoto(dataUrl);
    try { localStorage.setItem(STORAGE_KEY, dataUrl); } catch {}
  }, []);
  const remove = useCallback(() => {
    setPhoto(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);
  return { photo, save, remove };
}

// Floating particle component
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ y: [-20, 20, -20], x: [-8, 8, -8], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
    />
  );
}

// Typewriter hook
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

export default function Hero() {
  const { photo, save, remove } = useProfilePhoto();
  const { isEditing, get } = useEditMode();
  const [hovering, setHovering] = useState(false);
  const [toast, setToast] = useState<"saved" | "removed" | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  const typewriterText = useTypewriter([
    "Botany Undergraduate",
    "Young Researcher",
    "Plant Scientist",
    "OMLAS Fellow",
  ]);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      save(e.target?.result as string);
      setToast("saved");
      setTimeout(() => setToast(null), 3000);
    };
    reader.readAsDataURL(file);
  }, [save]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    remove();
    setToast("removed");
    setTimeout(() => setToast(null), 3000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const particles = Array.from({ length: 20 }, (_, i) => ({
    style: {
      width: `${3 + Math.random() * 5}px`,
      height: `${3 + Math.random() * 5}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background: `hsl(155 ${50 + Math.random() * 20}% ${50 + Math.random() * 20}% / 0.4)`,
    } as React.CSSProperties,
    id: i,
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(155 60% 40% / 0.15), transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(165 55% 35% / 0.12), transparent 70%)" }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(155 40% 30% / 0.06), transparent 60%)" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, hsl(155 60% 70%) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {/* Floating particles */}
        {particles.map(p => <Particle key={p.id} style={p.style} />)}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-20 left-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium shadow-lg"
            style={{ background: toast === "saved" ? "hsl(155 50% 20%)" : "hsl(0 60% 30%)", color: "hsl(0 0% 97%)", border: "1px solid hsl(155 40% 35% / 0.5)" }}
          >
            <Check className="w-4 h-4" />
            {toast === "saved" ? "Photo saved!" : "Photo removed."}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-max w-full section-padding py-28 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{ background: "hsl(155 40% 30% / 0.6)", color: "hsl(155 60% 82%)", border: "1px solid hsl(155 40% 45% / 0.4)", backdropFilter: "blur(8px)" }}>
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: "hsl(142 70% 50%)" }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <Sparkles className="w-3 h-3" />
              <EditableText contentKey="hero.status" className="bg-transparent" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4"
              style={{ color: "hsl(0 0% 97%)" }}>
              <span style={{ color: "hsl(0 0% 97%)", textTransform: "uppercase" }}>
                <EditableText contentKey="hero.name.first" className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold" style={{ color: "hsl(0 0% 97%)" } as React.CSSProperties} />
              </span>
              <br />
              <span style={{ background: "linear-gradient(135deg, hsl(155 60% 70%), hsl(165 65% 55%), hsl(145 55% 65%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textTransform: "uppercase" }}>
                <EditableText contentKey="hero.name.last" className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold" />
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
              className="text-lg font-medium mb-2 h-7" style={{ color: "hsl(155 40% 75%)" }}>
              {isEditing
                ? <EditableText contentKey="hero.role" className="text-lg font-medium" />
                : <><span>{typewriterText}</span><span className="animate-pulse ml-0.5" style={{ color: "hsl(155 60% 65%)" }}>|</span></>
              }
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
              className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: "hsl(155 15% 78%)" }}>
              <EditableText contentKey="hero.description" multiline rows={3} className="text-base leading-relaxed" />
            </motion.p>

            {/* Contact chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: MapPin, key: "hero.location", isLink: false },
                { icon: Mail, key: "hero.email", isLink: true, prefix: "mailto:" },
                { icon: Linkedin, key: "hero.linkedin", label: "LinkedIn", isLink: true },
              ].map(({ icon: Icon, key, isLink, prefix, label }) => {
                const val = get(key);
                const href = isLink ? (prefix ? `${prefix}${val}` : val) : undefined;
                return (
                  <motion.div key={key}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full cursor-pointer"
                    style={{ background: "hsl(155 35% 25% / 0.7)", color: "hsl(155 40% 80%)", border: "1px solid hsl(155 35% 40% / 0.4)", backdropFilter: "blur(8px)" }}>
                    <Icon className="w-3 h-3 flex-shrink-0" />
                    {isEditing
                      ? <EditableText contentKey={key} className="text-xs" />
                      : <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{label ?? val}</a>
                    }
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 0 30px hsl(155 60% 45% / 0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 rounded-lg font-medium text-sm relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, hsl(155 55% 45%), hsl(165 60% 38%))", color: "hsl(155 50% 8%)" }}>
                <span className="relative z-10">Get In Touch</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.06, background: "hsl(155 35% 28% / 0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200"
                style={{ background: "transparent", color: "hsl(155 40% 80%)", border: "1px solid hsl(155 35% 45% / 0.6)" }}>
                View Research
              </motion.button>
            </motion.div>
          </div>

          {/* Profile Photo with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}>
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative">
              {/* Glow rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid hsl(155 50% 55% / 0.3)" }}
                animate={{ scale: [1.08, 1.18, 1.08], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid hsl(155 50% 55% / 0.15)" }}
                animate={{ scale: [1.2, 1.35, 1.2], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              {/* Rotating halo */}
              <motion.div
                className="absolute rounded-full"
                style={{ border: "2px dashed hsl(155 40% 45% / 0.2)", inset: "-12%", borderRadius: "9999px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden cursor-pointer group"
                style={{ border: dragOver ? "3px solid hsl(155 60% 55%)" : "3px solid hsl(155 45% 45% / 0.6)", boxShadow: "0 25px 60px -10px hsl(155 50% 8% / 0.6), 0 0 60px hsl(155 50% 30% / 0.15)", transition: "border-color 0.2s" }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={() => inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <img src={photo || profileImg} alt="Sajeeb Nandi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Overlay shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(155 50% 50% / 0.1) 0%, transparent 50%, hsl(165 50% 50% / 0.1) 100%)" }}
                />
                <AnimatePresence>
                  {(hovering || dragOver) && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-full"
                      style={{ background: "hsl(155 50% 8% / 0.75)", backdropFilter: "blur(4px)" }}>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: "hsl(155 50% 55% / 0.2)", border: "1.5px solid hsl(155 50% 55% / 0.5)" }}>
                        <Camera className="w-6 h-6" style={{ color: "hsl(155 55% 70%)" }} />
                      </motion.div>
                      <p className="text-xs font-semibold text-center px-6 leading-tight" style={{ color: "hsl(155 40% 82%)" }}>
                        {dragOver ? "Drop to upload" : "Click or drag to upload"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {photo && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                    onClick={handleRemove} title="Remove photo"
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
                    style={{ background: "hsl(0 55% 30%)", border: "1.5px solid hsl(0 50% 45% / 0.6)", color: "hsl(0 0% 95%)" }}>
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-0 px-4 py-2 rounded-xl text-xs font-semibold cursor-default"
                style={{ background: "hsl(155 45% 18%)", color: "hsl(155 60% 78%)", border: "1px solid hsl(155 40% 35% / 0.6)", boxShadow: "0 8px 20px hsl(155 50% 8% / 0.4), 0 0 20px hsl(155 50% 30% / 0.15)" }}>
                <EditableText contentKey="hero.badge" className="text-xs font-semibold" />
              </motion.div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
              style={{ background: "hsl(155 35% 22% / 0.7)", color: "hsl(155 45% 72%)", border: "1px dashed hsl(155 35% 42% / 0.5)" }}>
              <Upload className="w-3 h-3" />
              {photo ? "Change photo" : "Upload your photo"}
            </motion.button>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFileChange} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-all hover:scale-110"
        style={{ color: "hsl(155 30% 65%)" }}>
        <span className="text-xs font-medium tracking-widest uppercase" style={{ letterSpacing: "0.15em" }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
