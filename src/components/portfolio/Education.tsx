import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Sparkles, BookOpen, School, Plus, Trash2 } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";
import { useDynamicSection } from "@/hooks/useDynamicSection";

const defaultEntries = [
  { key: "edu", icon: GraduationCap, badge: { label: "Ongoing", pulse: true }, accent: "hsl(var(--primary))" },
  { key: "hsc", icon: BookOpen, badge: { label: "Completed", pulse: false }, accent: "hsl(155 38% 38%)" },
  { key: "ssc", icon: School, badge: { label: "Completed", pulse: false }, accent: "hsl(155 30% 46%)" },
];

const extraIcons = [GraduationCap, BookOpen, School, GraduationCap, BookOpen];
const extraAccents = [
  "hsl(155 28% 48%)", "hsl(155 35% 42%)", "hsl(155 32% 44%)",
  "hsl(155 40% 36%)", "hsl(155 27% 50%)",
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get, isOwnerView } = useEditMode();
  const { count, add, remove } = useDynamicSection("edu_entries", 3);

  const entries = Array.from({ length: count }, (_, i) => {
    if (i < defaultEntries.length) return { ...defaultEntries[i], isDefault: true };
    const Icon = extraIcons[(i - defaultEntries.length) % extraIcons.length];
    return {
      key: `edu_extra_${i}`,
      icon: Icon,
      badge: { label: "Completed", pulse: false },
      accent: extraAccents[(i - defaultEntries.length) % extraAccents.length],
      isDefault: false,
    };
  });

  return (
    <section id="education" className="section-padding relative overflow-hidden" style={{ background: "var(--gradient-section-alt)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)" }} />
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, hsl(155 40% 60% / 0.08), transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 80%, hsl(155 40% 60% / 0.06), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}>
            Academic Journey
          </motion.span>
          <h2 className="section-title">Education</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 1.5rem" }}
          />
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-6 top-6 bottom-6 w-0.5 hidden sm:block"
            style={{ background: "hsl(var(--primary-muted))" }} />
          <motion.div
            className="absolute left-6 top-6 w-0.5 hidden sm:block origin-top"
            style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary-glow)), hsl(var(--primary-muted)))" }}
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}>
            <div style={{ height: "calc(100% - 0px)" }} />
          </motion.div>

          <div className="space-y-8">
            <AnimatePresence>
              {entries.map(({ key, icon: Icon, badge, accent, isDefault }, i) => {
                const tags = get(`${key}.tags`).split(",").map(t => t.trim()).filter(Boolean);
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 32, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.18 }}
                    className="relative sm:pl-20 group/item">

                    <motion.div
                      className="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full items-center justify-center z-10"
                      style={{
                        background: `linear-gradient(135deg, ${accent}, hsl(155 40% 55%))`,
                        boxShadow: `0 0 0 4px hsl(var(--secondary)), 0 4px 16px ${accent}60`
                      }}
                      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.35 + i * 0.18, type: "spring", stiffness: 250 }}
                      whileHover={{ scale: 1.12 }}>
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="relative p-6 sm:p-8 rounded-2xl bg-card border border-border transition-all duration-300 group overflow-hidden"
                      style={{ boxShadow: "var(--shadow-card)" }}>

                      <motion.div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                        style={{ background: `linear-gradient(180deg, ${accent}, hsl(var(--primary-muted)))` }}
                        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 + i * 0.18 }} />
                      {/* Hover bg glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                        style={{ background: "radial-gradient(circle at 20% 50%, hsl(155 40% 85% / 0.07), transparent 65%)" }} />
                      {/* Top shine line */}
                      <div className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent}70, transparent)` }} />

                      {/* Remove button */}
                      {isOwnerView && !isDefault && (
                        <button
                          onClick={() => remove(i)}
                          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                          style={{ background: "hsl(0 55% 35% / 0.12)", color: "hsl(0 55% 40%)" }}
                          title="Remove">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Mobile icon */}
                      <div className="flex sm:hidden items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "hsl(var(--primary-muted))" }}>
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-display font-semibold text-lg sm:text-xl text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                            <EditableText contentKey={`${key}.degree`} className="font-display font-semibold" placeholder="Degree / Certificate" />
                          </h3>
                          <p className="font-semibold mt-0.5 text-sm" style={{ color: accent }}>
                            <EditableText contentKey={`${key}.university`} className="font-semibold text-sm" placeholder="Institution" />
                          </p>
                        </div>
                        {badge.pulse ? (
                          <motion.span animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                            <Sparkles className="w-3 h-3" /> {badge.label}
                          </motion.span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                            style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                            ✓ {badge.label}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <EditableText contentKey={`${key}.period`} className="text-sm" placeholder="Year – Year" />
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <EditableText contentKey={`${key}.location`} className="text-sm" placeholder="Location" />
                        </span>
                      </div>

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

                      {get(`${key}.description`) && (
                        <p className="text-sm text-foreground/75 leading-relaxed mb-4 text-justify">
                          <EditableText contentKey={`${key}.description`} multiline rows={3} className="text-sm leading-relaxed text-justify" placeholder="Description..." />
                        </p>
                      )}

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, ti) => (
                            <motion.span key={tag}
                              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + i * 0.18 + ti * 0.06 }}
                              whileHover={{ scale: 1.07 }}
                              className="px-2.5 py-0.5 rounded-full text-xs font-medium cursor-default"
                              style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))", border: "1px solid hsl(var(--border))" }}>
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {isOwnerView && (
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={add}
              className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed text-sm font-semibold transition-all duration-200 hover:border-solid"
              style={{ borderColor: "hsl(var(--primary) / 0.4)", color: "hsl(var(--primary))", background: "hsl(var(--primary-muted) / 0.3)" }}>
              <Plus className="w-4 h-4" />
              Add Education
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
