import { useState, useCallback, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Tag, Plus, Upload, ImagePlus, Trash2, Check } from "lucide-react";

import fieldworkMaigold from "@/assets/gallery/fieldwork-marigold.jpg";
import labResearch from "@/assets/gallery/lab-research.jpg";
import posterPresentation from "@/assets/gallery/poster-presentation.jpg";
import verticalFarming from "@/assets/gallery/vertical-farming.jpg";
import biologyOlympiad from "@/assets/gallery/biology-olympiad.jpg";
import climateSeminar from "@/assets/gallery/climate-seminar.jpg";
import omlasFellowship from "@/assets/gallery/omlas-fellowship.jpg";
import marigoldStudy from "@/assets/gallery/marigold-study.jpg";

type Category = "All" | "Fieldwork" | "Research" | "Events" | "Leadership";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  isCustom?: boolean;
}

const STORAGE_KEY = "sajeeb_gallery_custom_photos";

const defaultItems: GalleryItem[] = [
  { id: "d1", src: fieldworkMaigold, title: "Marigold Fieldwork", description: "Examining Tagetes erecta in the field — collecting data on floral traits and growth patterns under different PGR treatments.", category: "Fieldwork" },
  { id: "d2", src: labResearch, title: "Laboratory Research", description: "Analyzing plant specimens under the microscope at University of Barishal botany laboratory.", category: "Research" },
  { id: "d3", src: posterPresentation, title: "International Poster Presentation", description: "Presenting 'Soil-less Vertical Farming' research at the international competition — awarded Silver Innovator Award.", category: "Research" },
  { id: "d4", src: marigoldStudy, title: "Floral Measurement Study", description: "Precise morphological measurements of Tagetes erecta flowers for the undergraduate research project on plant growth regulators.", category: "Fieldwork" },
  { id: "d5", src: verticalFarming, title: "Vertical Farming Systems", description: "Exploring hydroponic vertical farming infrastructure — core subject of the Silver Innovator Award-winning research.", category: "Research" },
  { id: "d6", src: biologyOlympiad, title: "Bangladesh Biology Olympiad", description: "Regional organizer for the Bangladesh Biology Olympiad, Barishal — inspiring hundreds of students in biological sciences.", category: "Events" },
  { id: "d7", src: climateSeminar, title: "Generation Green Seminar", description: "Organizing the Botany Club seminar 'Generation Green: Voices for Climate Resilience' — uniting student voices for the environment.", category: "Events" },
  { id: "d8", src: omlasFellowship, title: "OMLAS Fellowship", description: "Collaborative sessions with the international OMLAS cohort — training in governance, public policy, and sustainable leadership.", category: "Leadership" },
];

const categories: Category[] = ["All", "Fieldwork", "Research", "Events", "Leadership"];

const categoryColors: Record<Exclude<Category, "All">, string> = {
  Fieldwork: "hsl(30 90% 50%)",
  Research: "hsl(155 50% 30%)",
  Events: "hsl(220 70% 50%)",
  Leadership: "hsl(280 55% 45%)",
};

function useCustomPhotos() {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const add = useCallback((item: GalleryItem) => {
    setItems(prev => {
      const next = [...prev, item];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return { items, add, remove };
}

// ── Upload Modal ─────────────────────────────────────────────────────────────
interface UploadModalProps {
  onClose: () => void;
  onAdd: (item: GalleryItem) => void;
}

function UploadModal({ onClose, onAdd }: UploadModalProps) {
  const [step, setStep] = useState<"pick" | "details">("pick");
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Exclude<Category, "All">>("Fieldwork");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => {
      setPreview(e.target?.result as string);
      setStep("details");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleAdd = () => {
    if (!preview || !title.trim()) return;
    onAdd({
      id: `custom_${Date.now()}`,
      src: preview,
      title: title.trim(),
      description: description.trim() || title.trim(),
      category,
      isCustom: true,
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "hsl(155 50% 5% / 0.85)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", boxShadow: "0 30px 80px hsl(155 50% 5% / 0.5)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "hsl(var(--border))" }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--primary-muted))" }}>
              <ImagePlus className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base text-foreground">Add Photo</h3>
              <p className="text-xs text-muted-foreground">{step === "pick" ? "Choose an image to upload" : "Add details for this photo"}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === "pick" ? (
              <motion.div key="pick" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                {/* Drop zone */}
                <div
                  className="relative flex flex-col items-center justify-center gap-3 rounded-xl p-10 cursor-pointer transition-all duration-200"
                  style={{
                    border: `2px dashed ${dragOver ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                    background: dragOver ? "hsl(var(--primary-muted))" : "hsl(var(--muted))",
                  }}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "hsl(var(--primary-muted))" }}>
                    <Upload className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm text-foreground">Drop your photo here</p>
                    <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
                  </div>
                  <p className="text-xs text-muted-foreground">JPG, PNG, WEBP supported</p>
                </div>
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
              </motion.div>
            ) : (
              <motion.div key="details" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} className="space-y-4">
                {/* Preview */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden group">
                  <img src={preview!} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => { setPreview(null); setStep("pick"); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    style={{ background: "hsl(0 60% 30% / 0.9)", color: "hsl(0 0% 97%)" }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Photo Title <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Lab Session 2025"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
                    style={{ "--tw-ring-color": "hsl(var(--primary) / 0.4)" } as React.CSSProperties}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Description <span className="text-muted-foreground">(optional)</span></label>
                  <textarea
                    rows={2}
                    placeholder="A brief caption for this photo..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {(["Fieldwork", "Research", "Events", "Leadership"] as Exclude<Category, "All">[]).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 hover:scale-105"
                        style={category === cat
                          ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                          : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }
                        }
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => { setStep("pick"); setPreview(null); }}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:bg-accent transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleAdd}
                    disabled={!title.trim()}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                  >
                    <Check className="w-4 h-4" />
                    Add to Gallery
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Gallery ──────────────────────────────────────────────────────────────
export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const { items: customItems, add, remove } = useCustomPhotos();

  const allItems = [...defaultItems, ...customItems];

  const filtered = activeCategory === "All"
    ? allItems
    : allItems.filter(item => item.category === activeCategory);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const handleAdd = useCallback((item: GalleryItem) => {
    add(item);
    setToast("Photo added to gallery!");
    setTimeout(() => setToast(null), 3000);
  }, [add]);

  const handleDelete = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirm(id);
  }, []);

  const confirmDelete = useCallback((id: string) => {
    if (lightboxIndex !== null) closeLightbox();
    remove(id);
    setDeleteConfirm(null);
    setToast("Photo removed from gallery.");
    setTimeout(() => setToast(null), 3000);
  }, [remove, lightboxIndex, closeLightbox]);

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="section-title">Gallery</h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            A visual journey through fieldwork, research milestones, and impactful events
          </p>
        </motion.div>

        {/* Filter row + Add button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-10"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                style={activeCategory === cat
                  ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", boxShadow: "var(--shadow-green)" }
                  : { background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Add Photo button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", boxShadow: "var(--shadow-green)" }}
          >
            <Plus className="w-4 h-4" />
            Add Photo
          </motion.button>
        </motion.div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium mb-6 w-fit mx-auto"
              style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.2)" }}
            >
              <Check className="w-4 h-4" />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="break-inside-avoid mb-4 group relative overflow-hidden rounded-xl cursor-pointer"
                style={{ boxShadow: "var(--shadow-md)" }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Custom photo badge */}
                {item.isCustom && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                    My Photo
                  </div>
                )}

                {/* Delete button for custom photos */}
                {item.isCustom && (
                  <button
                    onClick={e => handleDelete(item.id, e)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 hover:scale-110"
                    style={{ background: "hsl(0 55% 35% / 0.9)", color: "hsl(0 0% 97%)" }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: "linear-gradient(to top, hsl(155 50% 8% / 0.9) 0%, transparent 60%)" }}
                >
                  <span
                    className="inline-flex items-center gap-1 self-start px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
                    style={{ background: `${categoryColors[item.category]}22`, color: categoryColors[item.category], border: `1px solid ${categoryColors[item.category]}55` }}
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {item.category}
                  </span>
                  <h3 className="font-display font-semibold text-base leading-snug mb-1" style={{ color: "hsl(0 0% 97%)" }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "hsl(155 15% 80%)" }}>
                    {item.description}
                  </p>
                </div>

                {/* Zoom icon */}
                <div
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100"
                  style={{ background: "hsl(0 0% 100% / 0.15)", backdropFilter: "blur(8px)" }}
                >
                  <ZoomIn className="w-4 h-4" style={{ color: "hsl(0 0% 95%)" }} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-3">No photos in this category yet.</p>
            <button onClick={() => setShowUpload(true)} className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
              <Plus className="w-4 h-4 inline mr-1" />Add a Photo
            </button>
          </div>
        )}

        {/* Empty custom section CTA */}
        {customItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed"
            style={{ borderColor: "hsl(var(--primary) / 0.2)", background: "hsl(var(--primary-muted) / 0.3)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--primary-muted))" }}>
              <ImagePlus className="w-6 h-6 text-primary" />
            </div>
            <p className="font-semibold text-sm text-foreground">Add your own photos</p>
            <p className="text-xs text-muted-foreground text-center max-w-xs">
              Upload your personal fieldwork, event, or research photos to personalize your gallery.
            </p>
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              <Plus className="w-4 h-4" />
              Upload First Photo
            </button>
          </motion.div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && <UploadModal onClose={() => setShowUpload(false)} onAdd={handleAdd} />}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "hsl(155 50% 5% / 0.7)", backdropFilter: "blur(8px)" }}
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-6 rounded-2xl w-full max-w-sm"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ background: "hsl(0 60% 95%)" }}>
                <Trash2 className="w-6 h-6" style={{ color: "hsl(0 60% 45%)" }} />
              </div>
              <h3 className="font-display font-semibold text-lg text-center text-foreground mb-2">Remove Photo?</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">This will remove the photo from your gallery. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:bg-accent transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(deleteConfirm)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
                  style={{ background: "hsl(0 60% 45%)", color: "hsl(0 0% 97%)" }}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "hsl(155 50% 5% / 0.95)", backdropFilter: "blur(16px)" }}
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
              style={{ background: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 95%)" }}>
              <X className="w-5 h-5" />
            </button>
            <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
              style={{ background: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 95%)" }}>
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full mx-14"
              onClick={e => e.stopPropagation()}
            >
              <img src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].title}
                className="w-full max-h-[72vh] object-contain rounded-xl"
                style={{ boxShadow: "0 30px 80px hsl(155 50% 5% / 0.6)" }} />
              <div className="mt-4 text-center px-4">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold mb-2"
                  style={{ background: `${categoryColors[filtered[lightboxIndex].category]}22`, color: categoryColors[filtered[lightboxIndex].category], border: `1px solid ${categoryColors[filtered[lightboxIndex].category]}55` }}>
                  <Tag className="w-2.5 h-2.5" />{filtered[lightboxIndex].category}
                  {filtered[lightboxIndex].isCustom && <span className="ml-1 opacity-70">· My Photo</span>}
                </span>
                <h3 className="font-display font-semibold text-xl mb-1" style={{ color: "hsl(0 0% 97%)" }}>{filtered[lightboxIndex].title}</h3>
                <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: "hsl(155 15% 72%)" }}>{filtered[lightboxIndex].description}</p>
                <p className="mt-3 text-xs" style={{ color: "hsl(155 15% 50%)" }}>{lightboxIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>

            <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
              style={{ background: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 95%)" }}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
