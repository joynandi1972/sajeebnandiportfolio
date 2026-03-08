import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Trophy, Star, Users, Upload, ImageIcon, X, ZoomIn } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

const achIcons = [Trophy, Star, Users];
const CERT_STORAGE_KEY = "sajeeb_cert_images";

function loadCertImages(): Record<number, string> {
  try {
    const saved = localStorage.getItem(CERT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
}

function saveCertImages(data: Record<number, string>) {
  try { localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function CertImage({ index, isEditing }: { index: number; isEditing: boolean }) {
  const [images, setImages] = useState<Record<number, string>>(loadCertImages);
  const [lightbox, setLightbox] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      const updated = { ...loadCertImages(), [index]: base64 };
      saveCertImages(updated);
      setImages(updated);
    };
    reader.readAsDataURL(file);
  }, [index]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...loadCertImages() };
    delete updated[index];
    saveCertImages(updated);
    setImages(updated);
  }, [index]);

  const img = images[index];

  return (
    <>
      {img ? (
        <div className="relative mt-4 group/cert">
          <img
            src={img}
            alt="Certificate"
            className="w-full h-36 object-cover rounded-xl border cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            style={{ borderColor: "hsl(var(--border))" }}
            onClick={() => setLightbox(true)}
          />
          {/* View overlay */}
          <div
            className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover/cert:opacity-100 transition-opacity duration-200 cursor-pointer"
            style={{ background: "hsl(0 0% 0% / 0.35)" }}
            onClick={() => setLightbox(true)}
          >
            <ZoomIn className="w-6 h-6 text-white" />
          </div>
          {/* Remove + re-upload buttons shown in edit mode */}
          {isEditing && (
            <div className="absolute top-2 right-2 flex gap-1.5">
              <button
                onClick={() => inputRef.current?.click()}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                title="Replace certificate"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleRemove}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "hsl(0 70% 55%)", color: "white" }}
                title="Remove certificate"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : isEditing ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full mt-4 flex flex-col items-center gap-2 py-4 rounded-xl border-2 border-dashed transition-all duration-200 group/upload"
          style={{ borderColor: "hsl(var(--primary) / 0.35)", background: "hsl(var(--primary-muted) / 0.4)" }}
        >
          <ImageIcon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
          <span className="text-xs font-medium" style={{ color: "hsl(var(--primary))" }}>
            Upload Certificate
          </span>
        </button>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "hsl(0 0% 0% / 0.85)", backdropFilter: "blur(6px)" }}
          onClick={() => setLightbox(false)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative max-w-3xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img src={img} alt="Certificate" className="w-full rounded-2xl shadow-2xl" />
            <button
              onClick={() => setLightbox(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isEditing } = useEditMode();

  return (
    <section id="achievements" className="section-padding relative overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(155 40% 60% / 0.06), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Achievements</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 2rem" }}
          />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">Recognition earned through dedication to research, leadership, and community service</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map(i => {
            const Icon = achIcons[i];
            const highlight = i === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.14, type: "spring", stiffness: 150 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-7 rounded-2xl border transition-all duration-300 group overflow-hidden flex flex-col"
                style={{
                  background: highlight
                    ? "linear-gradient(145deg, hsl(var(--card)), hsl(var(--primary-muted)))"
                    : "hsl(var(--card))",
                  borderColor: highlight ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border))",
                  boxShadow: highlight ? "0 0 30px hsl(var(--primary) / 0.12)" : undefined,
                }}>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, hsl(155 40% 80% / ${highlight ? "0.1" : "0.06"}), transparent 60%)` }} />
                {/* Featured badge */}
                {highlight && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", boxShadow: "0 4px 12px hsl(var(--primary) / 0.35)" }}
                    animate={{ boxShadow: ["0 4px 12px hsl(var(--primary) / 0.35)", "0 4px 20px hsl(var(--primary) / 0.55)", "0 4px 12px hsl(var(--primary) / 0.35)"] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    ⭐ Featured
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: highlight ? 10 : -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "hsl(var(--primary-muted))" }}>
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-medium mb-3"
                  style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                  <EditableText contentKey={`ach.${i}.year`} className="text-xs" />
                </span>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  <EditableText contentKey={`ach.${i}.title`} className="font-display font-semibold text-lg" />
                </h3>
                <p className="text-xs font-medium text-primary mb-3">
                  <EditableText contentKey={`ach.${i}.org`} className="text-xs font-medium" />
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed flex-1">
                  <EditableText contentKey={`ach.${i}.description`} multiline rows={3} className="text-sm leading-relaxed" />
                </p>

                {/* Certificate image upload */}
                <CertImage index={i} isEditing={isEditing} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
