import { useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Tag } from "lucide-react";

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
  src: string;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  span?: "wide" | "tall" | "normal";
}

const galleryItems: GalleryItem[] = [
  {
    src: fieldworkMaigold,
    title: "Marigold Fieldwork",
    description: "Examining Tagetes erecta in the field — collecting data on floral traits and growth patterns under different PGR treatments.",
    category: "Fieldwork",
    span: "wide",
  },
  {
    src: labResearch,
    title: "Laboratory Research",
    description: "Analyzing plant specimens under the microscope at University of Barishal botany laboratory.",
    category: "Research",
  },
  {
    src: posterPresentation,
    title: "International Poster Presentation",
    description: "Presenting 'Soil-less Vertical Farming' research at the international competition — awarded Silver Innovator Award.",
    category: "Research",
  },
  {
    src: marigoldStudy,
    title: "Floral Measurement Study",
    description: "Precise morphological measurements of Tagetes erecta flowers for the undergraduate research project on plant growth regulators.",
    category: "Fieldwork",
  },
  {
    src: verticalFarming,
    title: "Vertical Farming Systems",
    description: "Exploring hydroponic vertical farming infrastructure — core subject of the Silver Innovator Award-winning research.",
    category: "Research",
    span: "wide",
  },
  {
    src: biologyOlympiad,
    title: "Bangladesh Biology Olympiad",
    description: "Regional organizer for the Bangladesh Biology Olympiad, Barishal — inspiring hundreds of students in biological sciences.",
    category: "Events",
  },
  {
    src: climateSeminar,
    title: "Generation Green Seminar",
    description: "Organizing the Botany Club seminar 'Generation Green: Voices for Climate Resilience' — uniting student voices for the environment.",
    category: "Events",
  },
  {
    src: omlasFellowship,
    title: "OMLAS Fellowship",
    description: "Collaborative sessions with the international OMLAS cohort — training in governance, public policy, and sustainable leadership.",
    category: "Leadership",
  },
];

const categories: Category[] = ["All", "Fieldwork", "Research", "Events", "Leadership"];

const categoryColors: Record<Exclude<Category, "All">, string> = {
  Fieldwork: "hsl(30 90% 50%)",
  Research: "hsl(155 50% 30%)",
  Events: "hsl(220 70% 50%)",
  Leadership: "hsl(280 55% 45%)",
};

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [closeLightbox, prev, next]
  );

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

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              style={
                activeCategory === cat
                  ? {
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "var(--shadow-green)",
                    }
                  : {
                      background: "hsl(var(--card))",
                      color: "hsl(var(--muted-foreground))",
                      border: "1px solid hsl(var(--border))",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
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
                {/* Overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: "linear-gradient(to top, hsl(155 50% 8% / 0.9) 0%, transparent 60%)",
                  }}
                >
                  {/* Category badge */}
                  <span
                    className="inline-flex items-center gap-1 self-start px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
                    style={{
                      background: `${categoryColors[item.category]}22`,
                      color: categoryColors[item.category],
                      border: `1px solid ${categoryColors[item.category]}55`,
                    }}
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {item.category}
                  </span>
                  <h3 className="font-display font-semibold text-base leading-snug mb-1"
                    style={{ color: "hsl(0 0% 97%)" }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2"
                    style={{ color: "hsl(155 15% 80%)" }}>
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

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No photos in this category yet.</div>
        )}
      </div>

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
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              style={{ background: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 95%)" }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              style={{ background: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 95%)" }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full mx-14"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                className="w-full max-h-[75vh] object-contain rounded-xl"
                style={{ boxShadow: "0 30px 80px hsl(155 50% 5% / 0.6)" }}
              />
              {/* Caption */}
              <div className="mt-4 text-center px-4">
                <span
                  className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold mb-2"
                  style={{
                    background: `${categoryColors[filtered[lightboxIndex].category]}22`,
                    color: categoryColors[filtered[lightboxIndex].category],
                    border: `1px solid ${categoryColors[filtered[lightboxIndex].category]}55`,
                  }}
                >
                  <Tag className="w-2.5 h-2.5" />
                  {filtered[lightboxIndex].category}
                </span>
                <h3
                  className="font-display font-semibold text-xl mb-1"
                  style={{ color: "hsl(0 0% 97%)" }}
                >
                  {filtered[lightboxIndex].title}
                </h3>
                <p className="text-sm max-w-xl mx-auto leading-relaxed"
                  style={{ color: "hsl(155 15% 72%)" }}>
                  {filtered[lightboxIndex].description}
                </p>
                <p className="mt-3 text-xs" style={{ color: "hsl(155 15% 50%)" }}>
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              style={{ background: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 95%)" }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
