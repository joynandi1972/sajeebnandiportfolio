import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { GraduationCap, Calendar, MapPin, Sparkles, BookOpen, School, ImagePlus, X, ZoomIn } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

// ── Certificate image hook ───────────────────────────────────────────────────
function useCertImage(storageKey: string) {
  const [img, setImg] = useState<string | null>(() => {
    try { return localStorage.getItem(storageKey); } catch { return null; }
  });
  const save = useCallback((dataUrl: string) => {
    setImg(dataUrl);
    try { localStorage.setItem(storageKey, dataUrl); } catch {}
  }, [storageKey]);
  const remove = useCallback(() => {
    setImg(null);
    try { localStorage.removeItem(storageKey); } catch {}
  }, [storageKey]);
  return { img, save, remove };
}

// ── Certificate upload button + lightbox ────────────────────────────────────
function CertUpload({ storageKey, label }: { storageKey: string; label: string }) {
  const { img, save, remove } = useCertImage(storageKey);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lightbox, setLightbox] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const process = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => save(e.target?.result as string);
    reader.readAsDataURL(file);
  }, [save]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files?.[0]; if (f) process(f);
  };

  return (
    <div className="mt-4">
      {img ? (
        <div className="relative group inline-block">
          <img
            src={img} alt={`${label} certificate`}
            className="h-28 w-auto rounded-xl border border-border object-cover cursor-zoom-in shadow-sm group-hover:shadow-md transition-shadow duration-200"
            onClick={() => setLightbox(true)}
          />
          {/* Actions overlay */}
          <div className="absolute inset-0 rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "hsl(155 50% 8% / 0.55)", backdropFilter: "blur(4px)" }}>
            <button onClick={() => setLightbox(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "hsl(155 40% 30% / 0.8)" }}>
              <ZoomIn className="w-4 h-4 text-white" />
            </button>
            <button onClick={remove}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "hsl(0 55% 30% / 0.8)" }}>
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">Click to view · hover for actions</p>
        </div>
      ) : (
        <motion.div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          animate={{ borderColor: dragOver ? "hsl(155 50% 45%)" : "hsl(var(--border))" }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 group"
          style={{ background: dragOver ? "hsl(155 40% 96%)" : "transparent" }}
          whileHover={{ scale: 1.02 }}>
          <ImagePlus className="w-4 h-4 text-primary opacity-70" />
          <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
            Upload {label} Certificate
          </span>
        </motion.div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) process(f); e.target.value = ""; }} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && img && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "hsl(155 50% 5% / 0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightbox(false)}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="relative max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <img src={img} alt={`${label} certificate`} className="w-full h-full object-contain" />
              <button onClick={() => setLightbox(false)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "hsl(0 0% 10% / 0.7)", color: "white" }}>
                <X className="w-5 h-5" />
              </button>
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/70 bg-black/40 px-3 py-1 rounded-full">
                {label} Certificate
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Education entries config ─────────────────────────────────────────────────
const entries = [
  {
    key: "edu",
    icon: GraduationCap,
    iconSize: "w-7 h-7",
    badge: { label: "Ongoing", pulse: true },
    accent: "hsl(var(--primary))",
    accentRaw: "hsl(155 50% 22%)",
    certLabel: "BSc",
  },
  {
    key: "hsc",
    icon: BookOpen,
    iconSize: "w-6 h-6",
    badge: { label: "Completed", pulse: false },
    accent: "hsl(155 38% 38%)",
    accentRaw: "hsl(155 38% 38%)",
    certLabel: "HSC",
  },
  {
    key: "ssc",
    icon: School,
    iconSize: "w-6 h-6",
    badge: { label: "Completed", pulse: false },
    accent: "hsl(155 30% 46%)",
    accentRaw: "hsl(155 30% 46%)",
    certLabel: "SSC",
  },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get } = useEditMode();

  return (
    <section id="education" className="section-padding relative overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle at 70% 30%, hsl(155 40% 60% / 0.08), transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 80%, hsl(155 40% 60% / 0.05), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Education</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 2rem" }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto relative">
          {/* Static bg line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 hidden sm:block"
            style={{ background: "hsl(var(--primary-muted))" }} />
          {/* Animated fill line */}
          <motion.div
            className="absolute left-6 top-6 w-0.5 hidden sm:block origin-top"
            style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary-glow)), hsl(var(--primary-muted)))" }}
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}>
            <div style={{ height: "100%" }} />
          </motion.div>

          <div className="space-y-8">
            {entries.map(({ key, icon: Icon, iconSize, badge, accentRaw, certLabel }, i) => {
              const tags = get(`${key}.tags`).split(",").map(t => t.trim()).filter(Boolean);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.18 }}
                  className="relative sm:pl-20">

                  {/* Timeline node */}
                  <motion.div
                    className="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full items-center justify-center z-10"
                    style={{ background: `linear-gradient(135deg, ${accentRaw}, hsl(155 40% 55%))`, boxShadow: `0 0 0 4px hsl(var(--secondary)), 0 0 16px ${accentRaw}55` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.35 + i * 0.18, type: "spring", stiffness: 250 }}
                    whileHover={{ scale: 1.12 }}>
                    <Icon className={`${iconSize} text-white`} />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 20px 50px -10px hsl(155 40% 20% / 0.16)" }}
                    className="relative p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 group overflow-hidden">

                    {/* Left accent bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                      style={{ background: `linear-gradient(180deg, ${accentRaw}, hsl(var(--primary-muted)))` }}
                      initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.7, delay: 0.5 + i * 0.18 }}
                    />
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ background: "radial-gradient(circle at 20% 50%, hsl(155 40% 85% / 0.06), transparent 60%)" }} />
                    {/* Top shine on hover */}
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${accentRaw}60, transparent)` }} />

                    {/* Mobile icon */}
                    <div className="flex sm:hidden items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "hsl(var(--primary-muted))" }}>
                        <Icon className={`${iconSize} text-primary`} />
                      </div>
                    </div>

                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display font-semibold text-lg sm:text-xl text-foreground leading-snug">
                          <EditableText contentKey={`${key}.degree`} className="font-display font-semibold" />
                        </h3>
                        <p className="font-medium mt-0.5 text-sm" style={{ color: accentRaw }}>
                          <EditableText contentKey={`${key}.university`} className="font-medium text-sm" />
                        </p>
                      </div>
                      {badge.pulse ? (
                        <motion.span
                          animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                          style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))" }}>
                          <Sparkles className="w-3 h-3" /> {badge.label}
                        </motion.span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                          style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                          ✓ {badge.label}
                        </span>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <EditableText contentKey={`${key}.period`} className="text-sm" />
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <EditableText contentKey={`${key}.location`} className="text-sm" />
                      </span>
                    </div>

                    {/* Group & Result badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[`${key}.group`, `${key}.result`].map((k) => {
                        const val = get(k);
                        return val ? (
                          <span key={k} className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold"
                            style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))" }}>
                            <EditableText contentKey={k} className="text-xs font-semibold" />
                          </span>
                        ) : null;
                      })}
                    </div>

                    {/* Optional description */}
                    {get(`${key}.description`) && (
                      <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                        <EditableText contentKey={`${key}.description`} multiline rows={3} className="text-sm leading-relaxed" />
                      </p>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, ti) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6 + i * 0.18 + ti * 0.06 }}
                            whileHover={{ scale: 1.07 }}
                            className="px-2.5 py-0.5 rounded text-xs cursor-default"
                            style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {/* Certificate upload */}
                    <CertUpload storageKey={`edu_cert_${key}`} label={certLabel} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
