import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Calendar, ChevronRight, Microscope, Award, FlaskConical, Leaf, Plus, Trash2 } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";
import { useDynamicSection } from "@/hooks/useDynamicSection";

const resIcons = [Microscope, Award, FlaskConical, Leaf, Microscope, Award];
const resAccents = [
  "hsl(155 50% 25%)",
  "hsl(155 45% 32%)",
  "hsl(165 50% 28%)",
  "hsl(150 48% 30%)",
];

export default function Research() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get, isOwnerView } = useEditMode();
  const { count, add, remove } = useDynamicSection("res", 2);
  const interests = get("research.interests").split(",").map(t => t.trim()).filter(Boolean);

  return (
    <section id="research" className="section-padding relative overflow-hidden" style={{ background: "var(--gradient-section-alt)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)" }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 80%, hsl(155 40% 60% / 0.07), transparent 60%)" }} />
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, hsl(155 40% 60% / 0.06), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}>
            Scientific Work
          </motion.span>
          <h2 className="section-title">Research</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 1.5rem" }}
          />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">Exploring plant science and sustainable food systems through rigorous research</p>
        </motion.div>

        <div className="space-y-8 mb-16">
          <AnimatePresence>
            {Array.from({ length: count }, (_, i) => {
              const Icon = resIcons[i % resIcons.length];
              const accent = resAccents[i % resAccents.length];
              const tags = get(`res.${i}.tags`).split(",").map(t => t.trim()).filter(Boolean);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.18 }}
                  whileHover={{ y: -5 }}
                  className="p-7 rounded-2xl bg-card border border-border transition-all duration-300 group relative overflow-hidden shine-on-hover"
                  style={{ boxShadow: "var(--shadow-card)" }}>
                  {/* Left accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ background: `linear-gradient(180deg, ${accent}, hsl(var(--primary-muted)))` }} />
                  {/* Hover bg */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(ellipse at 10% 50%, hsl(155 40% 80% / 0.06), transparent 60%)" }} />
                  {/* Top shine */}
                  <motion.div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)" }} />

                  {isOwnerView && count > 1 && (
                    <button
                      onClick={() => remove(i)}
                      className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                      style={{ background: "hsl(0 55% 35% / 0.12)", color: "hsl(0 55% 40%)" }}
                      title="Remove">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="flex flex-col sm:flex-row gap-5 pl-3">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, hsl(var(--primary-muted)), hsl(var(--accent)))`,
                        boxShadow: `0 4px 12px ${accent}40`,
                      }}>
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div className="flex-1 pr-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                            <EditableText contentKey={`res.${i}.title`} className="font-display font-semibold text-lg leading-snug" placeholder="Research Title" />
                          </h3>
                          <p className="text-sm text-primary font-medium mt-0.5">
                            <EditableText contentKey={`res.${i}.subtitle`} className="text-sm font-medium" placeholder="Subtitle / Category" />
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.2)" }}>
                            <EditableText contentKey={`res.${i}.badge`} className="text-xs" placeholder="Badge / Award" />
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <EditableText contentKey={`res.${i}.period`} className="text-xs" placeholder="Period" />
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/75 leading-relaxed mb-4 text-justify">
                        <EditableText contentKey={`res.${i}.description`} multiline rows={3} className="text-sm leading-relaxed text-justify" placeholder="Research description..." />
                      </p>
                      <ul className="space-y-1.5 mb-4">
                        {[0, 1, 2, 3].map(j => {
                          const val = get(`res.${i}.point${j}`);
                          if (!isOwnerView && !val) return null;
                          return (
                            <li key={j} className="flex items-start gap-2 text-sm text-foreground/70 text-justify">
                              <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                              <EditableText contentKey={`res.${i}.point${j}`} className="text-sm text-justify" placeholder={`Key point ${j + 1}`} />
                            </li>
                          );
                        })}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, ti) => (
                          <motion.span key={tag}
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + ti * 0.06 }}
                            whileHover={{ scale: 1.06, y: -1 }}
                            className="px-2.5 py-0.5 rounded-full text-xs font-medium cursor-default"
                            style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))", border: "1px solid hsl(var(--border))" }}>
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {isOwnerView && (
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={add}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed text-sm font-semibold transition-all duration-200 hover:border-solid mb-16"
            style={{ borderColor: "hsl(var(--primary) / 0.4)", color: "hsl(var(--primary))", background: "hsl(var(--primary-muted) / 0.3)" }}>
            <Plus className="w-4 h-4" />
            Add Research
          </motion.button>
        )}

        {/* Research Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}>
          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: "hsl(var(--border))" }} />
            <h3 className="font-display font-semibold text-xl text-foreground whitespace-nowrap">Research Interests</h3>
            <div className="flex-1 h-px" style={{ background: "hsl(var(--border))" }} />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest, i) => (
              <motion.span key={interest}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.55 + i * 0.07, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -3, boxShadow: "0 8px 24px hsl(155 40% 20% / 0.15)" }}
                className="px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-default"
                style={{
                  background: "hsl(var(--card))",
                  color: "hsl(var(--primary))",
                  borderColor: "hsl(var(--primary) / 0.3)",
                  boxShadow: "var(--shadow-card)",
                }}>
                🌱 {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
