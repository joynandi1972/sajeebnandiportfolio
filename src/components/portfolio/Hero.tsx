import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { MapPin, Mail, Linkedin, ChevronDown, Camera, Upload, X, Check, Sparkles, ArrowRight } from "lucide-react";
import profileImg from "@/assets/profile.png";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";
import { useIsMobile } from "@/hooks/use-mobile";

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

function Particle({ style, dur, delay }: { style: React.CSSProperties; dur: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ y: [-18, 18, -18], x: [-10, 10, -10], opacity: [0.1, 0.4, 0.1] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

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
  const { isEditing, isOwnerView, get } = useEditMode();
  const isMobile = useIsMobile();

  const desktopScaleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };

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

  const particles = Array.from({ length: 18 }, (_, i) => ({
    style: {
      width: `${2 + (i * 7 % 4)}px`,
      height: `${2 + (i * 7 % 4)}px`,
      left: `${(i * 17 + 5) % 100}%`,
      top: `${(i * 23 + 10) % 100}%`,
      background: `hsl(155 ${45 + (i * 11 % 20)}% ${55 + (i * 13 % 20)}% / 0.35)`,
    } as React.CSSProperties,
    dur: 9 + (i % 7) * 2,
    delay: (i % 5) * 1.3,
    id: i,
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>

      {/* ── Rich layered background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial hero highlight */}
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero-radial)" }} />
        {/* Top-right orb */}
        <motion.div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(155 65% 35% / 0.12), transparent 65%)" }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bottom-left orb */}
        <motion.div
          className="absolute -bottom-20 -left-40 w-[580px] h-[580px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(165 58% 30% / 0.1), transparent 65%)" }}
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Centre subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, hsl(155 40% 25% / 0.06), transparent 60%)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.055]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(155 55% 70%) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        {/* Horizontal rule at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(155 40% 40% / 0.3), transparent)" }} />
        {/* Floating particles */}
        {particles.map(p => <Particle key={p.id} style={p.style} dur={p.dur} delay={p.delay} />)}
      </div>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-20 left-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shadow-xl"
            style={{ background: toast === "saved" ? "hsl(155 52% 18%)" : "hsl(0 60% 28%)", color: "hsl(0 0% 97%)", border: "1px solid hsl(155 40% 32% / 0.5)" }}>
            <Check className="w-4 h-4" />
            {toast === "saved" ? "Photo saved!" : "Photo removed."}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-max w-full section-padding py-32 md:py-36 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* ── Text block ── */}
          <motion.div
            className="order-2 lg:order-1"
            variants={!isMobile ? desktopScaleVariants : undefined}
            initial={!isMobile ? "hidden" : false}
            animate={!isMobile ? "visible" : false}>

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-7"
              style={{
                background: "hsl(155 45% 22% / 0.75)",
                color: "hsl(155 60% 82%)",
                border: "1px solid hsl(155 45% 42% / 0.4)",
                backdropFilter: "blur(12px)",
                letterSpacing: "0.04em",
              }}>
              <motion.span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "hsl(142 75% 48%)" }}
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }} />
              <Sparkles className="w-3.5 h-3.5 opacity-80" />
              <EditableText contentKey="hero.status" className="bg-transparent" />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.75 }}
              className="font-display font-bold leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)", color: "hsl(0 0% 97%)" }}>
              <span className="block uppercase" style={{ color: "hsl(0 0% 97%)" }}>
                <EditableText contentKey="hero.name.first" className="font-display font-bold" style={{ color: "hsl(0 0% 97%)" } as React.CSSProperties} />
              </span>
              <span className="block uppercase" style={{
                background: "linear-gradient(125deg, hsl(42 90% 65%), hsl(155 65% 60%), hsl(165 60% 52%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                <EditableText contentKey="hero.name.last" className="font-display font-bold" />
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
              className="flex items-center gap-2 mb-3 h-8">
              <div className="w-1 h-6 rounded-full flex-shrink-0"
                style={{ background: "linear-gradient(180deg, hsl(42 90% 60%), hsl(155 55% 55%))" }} />
              {isEditing
                ? <EditableText contentKey="hero.role" className="text-lg font-semibold" style={{ color: "hsl(155 38% 74%)" } as React.CSSProperties} />
                : <span className="text-lg font-semibold" style={{ color: "hsl(155 38% 74%)" }}>
                    {typewriterText}
                    <span className="animate-pulse ml-0.5" style={{ color: "hsl(42 90% 65%)" }}>|</span>
                  </span>
              }
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
              className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: "hsl(155 15% 72%)" }}>
              <EditableText contentKey="hero.description" multiline rows={3} className="text-base leading-relaxed" />
            </motion.p>

            {/* Contact chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap gap-2.5 mb-9">
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
                    className="flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full cursor-pointer font-medium"
                    style={{
                      background: "hsl(155 38% 20% / 0.65)",
                      color: "hsl(155 40% 78%)",
                      border: "1px solid hsl(155 38% 38% / 0.38)",
                      backdropFilter: "blur(10px)",
                    }}>
                    <Icon className="w-3 h-3 flex-shrink-0 opacity-80" />
                    {isEditing
                      ? <EditableText contentKey={key} className="text-xs" />
                      : <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{label ?? val}</a>
                    }
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 40px hsl(42 90% 52% / 0.35)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative px-7 py-3 rounded-xl font-semibold text-sm overflow-hidden flex items-center gap-2"
                style={{ background: "linear-gradient(135deg, hsl(42 88% 52%), hsl(42 80% 44%))", color: "hsl(160 60% 8%)" }}>
                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.15), transparent)" }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                />
                <span className="relative z-10 font-bold">Get In Touch</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, background: "hsl(155 38% 24% / 0.55)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2"
                style={{ background: "hsl(155 35% 20% / 0.4)", color: "hsl(155 40% 78%)", border: "1px solid hsl(155 38% 42% / 0.5)", backdropFilter: "blur(8px)" }}>
                View Research
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── Profile Photo (3D tilt) ── */}
          <motion.div
            variants={!isMobile ? desktopScaleVariants : undefined}
            initial={!isMobile ? "hidden" : { opacity: 0, scale: 0.85 }}
            animate={!isMobile ? "visible" : { opacity: 1, scale: 1 }}
            transition={isMobile ? { delay: 0.3, duration: 0.7, ease: "easeOut" } : undefined}
            className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-5"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}>

            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative">

              {/* Outer glow ring */}
              <motion.div className="absolute inset-0 rounded-full"
                style={{ border: "1px solid hsl(42 80% 55% / 0.3)" }}
                animate={{ scale: [1.09, 1.20, 1.09], opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="absolute inset-0 rounded-full"
                style={{ border: "1px solid hsl(155 55% 50% / 0.15)" }}
                animate={{ scale: [1.22, 1.36, 1.22], opacity: [0.12, 0.28, 0.12] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} />

              {/* Rotating dashed halo */}
              <motion.div className="absolute rounded-full"
                style={{ border: "1.5px dashed hsl(42 75% 55% / 0.2)", inset: "-14%", borderRadius: "9999px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
              {/* Counter-rotating halo */}
              <motion.div className="absolute rounded-full"
                style={{ border: "1px dashed hsl(155 50% 45% / 0.12)", inset: "-22%", borderRadius: "9999px" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }} />

              {/* Photo frame */}
              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden cursor-pointer group"
                style={{
                  border: dragOver ? "3px solid hsl(42 80% 55%)" : "2.5px solid hsl(42 70% 50% / 0.5)",
                  boxShadow: "0 30px 70px -10px hsl(160 60% 5% / 0.65), 0 0 80px hsl(155 50% 25% / 0.18), inset 0 0 30px hsl(155 50% 10% / 0.1)",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={() => isOwnerView && inputRef.current?.click()}
                onDragOver={e => { if (!isOwnerView) return; e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={isOwnerView ? handleDrop : undefined}>
                <img src={photo || profileImg} alt="Sajeeb Nandi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Inner vignette */}
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, transparent 60%, hsl(155 55% 6% / 0.3) 100%)" }} />
                {/* Hover shimmer */}
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(135deg, hsl(42 90% 60% / 0.08) 0%, transparent 50%, hsl(155 55% 50% / 0.08) 100%)" }} />

                <AnimatePresence>
                  {isOwnerView && (hovering || dragOver) && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-full"
                      style={{ background: "hsl(160 60% 6% / 0.78)", backdropFilter: "blur(6px)" }}>
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: "hsl(155 50% 52% / 0.22)", border: "1.5px solid hsl(155 50% 52% / 0.5)" }}>
                        <Camera className="w-6 h-6" style={{ color: "hsl(155 55% 70%)" }} />
                      </motion.div>
                      <p className="text-xs font-semibold text-center px-6 leading-tight" style={{ color: "hsl(155 40% 80%)" }}>
                        {dragOver ? "Drop to upload" : "Click or drag to upload"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Remove button */}
              <AnimatePresence>
                {isOwnerView && photo && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                    onClick={handleRemove} title="Remove photo"
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
                    style={{ background: "hsl(0 58% 28%)", border: "1.5px solid hsl(0 50% 42% / 0.6)", color: "hsl(0 0% 96%)" }}>
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                whileHover={{ scale: 1.06 }}
                className="absolute -bottom-1 -right-2 sm:bottom-4 sm:right-0 px-4 py-2 rounded-2xl text-xs font-bold cursor-default"
                style={{
                  background: "linear-gradient(135deg, hsl(155 52% 14%), hsl(155 48% 20%))",
                  color: "hsl(42 90% 70%)",
                  border: "1px solid hsl(42 70% 45% / 0.35)",
                  boxShadow: "0 8px 24px hsl(160 60% 5% / 0.5), 0 0 20px hsl(42 80% 50% / 0.12)",
                  backdropFilter: "blur(8px)",
                }}>
                ✦ <EditableText contentKey="hero.badge" className="text-xs font-bold" />
              </motion.div>
            </motion.div>

            {/* Upload button — owner only */}
            {isOwnerView && (
              <>
                <motion.button
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                  style={{ background: "hsl(155 38% 20% / 0.7)", color: "hsl(155 45% 72%)", border: "1px dashed hsl(155 38% 42% / 0.5)" }}>
                  <Upload className="w-3 h-3" />
                  {photo ? "Change photo" : "Upload your photo"}
                </motion.button>
                <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFileChange} />
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all hover:scale-110 z-10"
        style={{ color: "hsl(155 28% 60%)" }}>
        <span className="text-xs font-semibold tracking-[0.18em] uppercase opacity-70">Scroll</span>
        <motion.div
          className="w-6 h-9 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1.5px solid hsl(155 35% 45% / 0.4)" }}>
          <motion.div className="w-1.5 h-2.5 rounded-full" style={{ background: "hsl(42 85% 60%)" }}
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
