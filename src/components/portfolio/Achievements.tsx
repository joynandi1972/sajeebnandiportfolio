import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Trophy, Star, Users, X, ZoomIn, ImagePlus, Check, Plus, Trash2, Award, Medal } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";
import { useDynamicSection } from "@/hooks/useDynamicSection";

const achIcons = [Trophy, Star, Users, Award, Medal, Trophy, Star];
const achColors = [
  { color: "hsl(45 85% 52%)", bg: "hsl(45 80% 90%)", glow: "hsl(45 85% 52% / 0.2)" },
  { color: "hsl(220 70% 55%)", bg: "hsl(220 70% 92%)", glow: "hsl(220 70% 55% / 0.2)" },
  { color: "hsl(155 50% 30%)", bg: "hsl(155 40% 88%)", glow: "hsl(155 50% 30% / 0.2)" },
  { color: "hsl(280 55% 50%)", bg: "hsl(280 50% 92%)", glow: "hsl(280 55% 50% / 0.2)" },
  { color: "hsl(15 80% 52%)", bg: "hsl(15 80% 91%)", glow: "hsl(15 80% 52% / 0.2)" },
  { color: "hsl(45 85% 52%)", bg: "hsl(45 80% 90%)", glow: "hsl(45 85% 52% / 0.2)" },
  { color: "hsl(220 70% 55%)", bg: "hsl(220 70% 92%)", glow: "hsl(220 70% 55% / 0.2)" },
];
const CERT_STORAGE_KEY = "sajeeb_achievement_certificates";

function useCertificates() {
  const [certs, setCerts] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(CERT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const set = useCallback((index: number, dataUrl: string) => {
    setCerts(prev => {
      const next = { ...prev, [index]: dataUrl };
      try { localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const remove = useCallback((index: number) => {
    setCerts(prev => {
      const next = { ...prev };
      delete next[index];
      try { localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return { certs, set, remove };
}

function CertUpload({ index, onUpload }: { index: number; onUpload: (i: number, url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => { const r = e.target?.result as string; if (r) onUpload(index, r); };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="relative mt-4 rounded-xl flex flex-col items-center justify-center gap-2 py-5 px-4 cursor-pointer transition-all duration-200"
      style={{
        border: `2px dashed ${dragOver ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
        background: dragOver ? "hsl(var(--primary-muted))" : "hsl(var(--muted) / 0.5)",
      }}
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) processFile(f); }}
      onClick={() => inputRef.current?.click()}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--primary-muted))" }}>
        <ImagePlus className="w-4 h-4 text-primary" />
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-foreground">Upload Certificate</p>
        <p className="text-xs text-muted-foreground mt-0.5">Click or drag & drop</p>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
    </div>
  );
}

function CertLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      style={{ background: "hsl(155 50% 5% / 0.9)", backdropFilter: "blur(20px)" }}
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 40px 100px hsl(155 50% 5% / 0.6)" }}
        onClick={e => e.stopPropagation()}>
        <img src={src} alt="Certificate" className="w-full h-auto max-h-[85vh] object-contain" style={{ background: "hsl(var(--card))" }} />
        <button onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "hsl(0 55% 30% / 0.85)", color: "hsl(0 0% 97%)" }}>
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

function CertThumbnail({ src, onView, onRemove }: { src: string; onView: () => void; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="relative mt-4 rounded-xl overflow-hidden group cursor-pointer"
      style={{ border: "1px solid hsl(var(--primary) / 0.3)" }}
      onClick={onView}>
      <img src={src} alt="Certificate" className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "hsl(155 50% 5% / 0.55)" }}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          <ZoomIn className="w-3.5 h-3.5" /> View Certificate
        </div>
      </div>
      <button onClick={e => { e.stopPropagation(); onRemove(); }}
        className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        style={{ background: "hsl(0 55% 30% / 0.85)", color: "hsl(0 0% 97%)" }}>
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1"
        style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
        <Check className="w-3 h-3" /> Certificate
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isEditing, isOwnerView } = useEditMode();
  const { certs, set: setCert, remove: removeCert } = useCertificates();
  const { count, add, remove } = useDynamicSection("ach", 3);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [toast, setToast] = useState(false);

  const handleUpload = useCallback((i: number, url: string) => {
    setCert(i, url);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }, [setCert]);

  return (
    <section id="achievements" className="section-padding glass-section section-mesh relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.12), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none rounded-full"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(155 55% 50% / 0.08), transparent 60%)", filter: "blur(60px)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}>
            Recognition
          </motion.span>
          <h2 className="section-title">Achievements</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 1.5rem" }}
          />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">Recognition earned through dedication to research, leadership, and community service</p>
        </motion.div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium mb-6 w-fit mx-auto"
              style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.2)" }}>
              <Check className="w-4 h-4" /> Certificate uploaded successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {Array.from({ length: count }, (_, i) => {
              const Icon = achIcons[i % achIcons.length];
              const cert = certs[i];
              const { color, bg, glow } = achColors[i % achColors.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.1, type: "spring", stiffness: 150 }}
                  whileHover={{ y: -8 }}
                  className="relative p-7 rounded-2xl border transition-all duration-300 group overflow-hidden flex flex-col shine-on-hover"
                  style={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    boxShadow: "var(--shadow-card)",
                  }}>
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${color}80, ${color}30, transparent)` }} />
                  {/* Hover bg glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 30% 20%, ${glow}, transparent 60%)` }} />

                  {isOwnerView && count > 1 && (
                    <button
                      onClick={() => remove(i)}
                      className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                      style={{ background: "hsl(0 55% 35% / 0.12)", color: "hsl(0 55% 40%)" }}
                      title="Remove">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: bg, boxShadow: `0 4px 16px ${glow}` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </motion.div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 w-fit"
                    style={{ background: bg, color }}>
                    <EditableText contentKey={`ach.${i}.year`} className="text-xs" placeholder="Year" />
                  </span>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    <EditableText contentKey={`ach.${i}.title`} className="font-display font-semibold text-lg" placeholder="Achievement Title" />
                  </h3>
                  <p className="text-xs font-semibold mb-3" style={{ color }}>
                    <EditableText contentKey={`ach.${i}.org`} className="text-xs font-semibold" placeholder="Issuing Organisation" />
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed text-justify flex-1">
                    <EditableText contentKey={`ach.${i}.description`} multiline rows={3} className="text-sm leading-relaxed text-justify" placeholder="Describe this achievement..." />
                  </p>

                  <div className="mt-auto pt-2">
                    {cert ? (
                      <CertThumbnail src={cert} onView={() => setLightbox(i)} onRemove={() => removeCert(i)} />
                    ) : isOwnerView ? (
                      <CertUpload index={i} onUpload={handleUpload} />
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {isOwnerView && (
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={add}
            className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed text-sm font-semibold transition-all duration-200 hover:border-solid"
            style={{ borderColor: "hsl(var(--primary) / 0.4)", color: "hsl(var(--primary))", background: "hsl(var(--primary-muted) / 0.3)" }}>
            <Plus className="w-4 h-4" />
            Add Achievement
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && certs[lightbox] && (
          <CertLightbox src={certs[lightbox]} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
