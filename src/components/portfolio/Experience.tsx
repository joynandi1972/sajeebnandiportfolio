import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ChevronRight, Plus, Trash2 } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";
import { useDynamicSection } from "@/hooks/useDynamicSection";

const expColors = [
  "hsl(155 50% 20%)",
  "hsl(155 40% 30%)",
  "hsl(155 35% 38%)",
  "hsl(155 30% 44%)",
  "hsl(155 25% 50%)",
  "hsl(155 22% 54%)",
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isOwnerView, get } = useEditMode();
  const { count, add, remove } = useDynamicSection("exp", 4);

  return (
    <section id="experience" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle at 90% 50%, hsl(155 40% 85% / 0.08), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Experience</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 2rem" }}
          />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">A journey through research, leadership, and social impact</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            className="absolute left-5 top-2 w-0.5 hidden sm:block origin-top"
            style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary-muted)))" }}
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}>
            <div className="absolute inset-0" style={{ height: "100%" }} />
          </motion.div>
          <div className="absolute left-5 top-2 bottom-2 w-0.5 hidden sm:block -z-10"
            style={{ background: "hsl(var(--primary-muted))" }} />

          <div className="space-y-8">
            <AnimatePresence>
              {Array.from({ length: count }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, scale: 0.95 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                  className="relative sm:pl-14 group/item">
                  <motion.div
                    className="hidden sm:flex absolute left-[10px] top-6 w-5 h-5 rounded-full items-center justify-center z-10"
                    style={{ background: expColors[i % expColors.length], boxShadow: `0 0 0 3px hsl(var(--primary-muted)), 0 0 12px ${expColors[i % expColors.length]}40` }}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                  />
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 16px 40px -8px hsl(155 40% 20% / 0.15)" }}
                    className="p-6 rounded-xl bg-card border border-border transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                      style={{ background: "linear-gradient(135deg, hsl(155 40% 96% / 0.5) 0%, transparent 50%)" }} />
                    <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: expColors[i % expColors.length] }} />

                    {/* Remove button — owner only */}
                    {isOwnerView && count > 1 && (
                      <button
                        onClick={() => remove(i)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                        style={{ background: "hsl(0 55% 35% / 0.12)", color: "hsl(0 55% 40%)" }}
                        title="Remove entry">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3 pr-8">
                      <div className="flex items-start gap-3">
                        <motion.div whileHover={{ scale: 1.15, rotate: -5 }}
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 sm:hidden"
                          style={{ background: "hsl(var(--primary-muted))" }}>
                          <Briefcase className="w-5 h-5 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            <EditableText contentKey={`exp.${i}.title`} className="font-display font-semibold text-lg" placeholder="Job Title" />
                          </h3>
                          <p className="text-sm font-medium text-primary mt-0.5">
                            <EditableText contentKey={`exp.${i}.org`} className="text-sm font-medium" placeholder="Organisation" />
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="px-3 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))" }}>
                          <EditableText contentKey={`exp.${i}.type`} className="text-xs" placeholder="Type" />
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <EditableText contentKey={`exp.${i}.period`} className="text-xs" placeholder="Period" />
                        </span>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {[0, 1, 2].map(j => {
                        const val = get(`exp.${i}.point${j}`);
                        if (!isOwnerView && !val) return null;
                        return (
                          <li key={j} className="flex items-start gap-2 text-sm text-foreground/75 text-justify">
                            <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                            <EditableText contentKey={`exp.${i}.point${j}`} className="text-sm text-justify" placeholder={`Key point ${j + 1}`} />
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add button — owner only */}
          {isOwnerView && (
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={add}
              className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed text-sm font-semibold transition-all duration-200 hover:border-solid"
              style={{ borderColor: "hsl(var(--primary) / 0.4)", color: "hsl(var(--primary))", background: "hsl(var(--primary-muted) / 0.3)" }}>
              <Plus className="w-4 h-4" />
              Add Experience
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
