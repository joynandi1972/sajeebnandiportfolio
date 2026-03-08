import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import { EditableText, EditableNumber } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";
import { useDynamicSection } from "@/hooks/useDynamicSection";

const softSkills = [
  { emoji: "🔬", label: "Critical Thinking" },
  { emoji: "🤝", label: "Collaboration" },
  { emoji: "📊", label: "Data Interpretation" },
  { emoji: "✍️", label: "Academic Writing" },
  { emoji: "🗣️", label: "Public Speaking" },
  { emoji: "🌍", label: "Cross-cultural Communication" },
  { emoji: "⏱️", label: "Time Management" },
  { emoji: "🧩", label: "Problem Solving" },
];

const skillGradients = [
  "linear-gradient(90deg, hsl(155 50% 20%), hsl(165 55% 40%))",
  "linear-gradient(90deg, hsl(155 45% 25%), hsl(155 60% 45%))",
  "linear-gradient(90deg, hsl(160 50% 22%), hsl(165 58% 42%))",
  "linear-gradient(90deg, hsl(150 48% 24%), hsl(160 55% 42%))",
  "linear-gradient(90deg, hsl(155 52% 20%), hsl(162 60% 40%))",
  "linear-gradient(90deg, hsl(157 48% 22%), hsl(163 56% 41%))",
  "linear-gradient(90deg, hsl(153 50% 21%), hsl(161 58% 40%))",
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get } = useEditMode();
  const { count, add, remove } = useDynamicSection("skill", 8);

  return (
    <section id="skills" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle at 10% 20%, hsl(155 40% 85% / 0.08), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Skills</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 2rem" }}
          />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Skill bars */}
          <div className="space-y-7">
            <AnimatePresence>
              {Array.from({ length: count }, (_, i) => {
                const level = parseInt(get(`skill.${i}.level`) || "80", 10);
                const gradient = skillGradients[i % skillGradients.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                    className="group relative">
                    {/* Remove button */}
                    {count > 1 && (
                      <button
                        onClick={() => remove(i)}
                        className="absolute -top-1 right-0 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                        style={{ background: "hsl(0 55% 35% / 0.12)", color: "hsl(0 55% 40%)" }}
                        title="Remove skill">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <span className="font-semibold text-sm text-foreground">
                          <EditableText contentKey={`skill.${i}.name`} className="font-semibold text-sm" placeholder="Skill Name" />
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5 text-justify">
                          <EditableText contentKey={`skill.${i}.desc`} className="text-xs text-justify" placeholder="Brief description" />
                        </p>
                      </div>
                      <div className="text-sm font-bold ml-3 flex-shrink-0 flex items-center gap-1" style={{ color: "hsl(var(--primary))" }}>
                        <EditableNumber contentKey={`skill.${i}.level`} className="text-sm font-bold" min={0} max={100} />%
                      </div>
                    </div>
                    <div className="w-full h-2.5 rounded-full overflow-hidden relative"
                      style={{ background: "hsl(var(--primary-muted))" }}>
                      <motion.div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{ background: gradient }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${level}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                        <motion.div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.25) 50%, transparent 100%)", backgroundSize: "200% 100%" }}
                          animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                          transition={{ duration: 2, delay: 0.8 + i * 0.1, repeat: Infinity, repeatDelay: 3 }}
                        />
                      </motion.div>
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                        style={{ background: "hsl(var(--primary-glow))", boxShadow: "0 0 8px hsl(var(--primary-glow))" }}
                        initial={{ left: 0 }}
                        animate={inView ? { left: `calc(${level}% - 6px)` } : { left: 0 }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Add skill button */}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={add}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-sm font-semibold transition-all duration-200 hover:border-solid"
              style={{ borderColor: "hsl(var(--primary) / 0.4)", color: "hsl(var(--primary))", background: "hsl(var(--primary-muted) / 0.3)" }}>
              <Plus className="w-4 h-4" />
              Add Skill
            </motion.button>
          </div>

          {/* Soft skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }} className="font-display font-semibold text-xl text-foreground mb-6">
              Core Competencies
            </motion.h3>
            <div className="grid grid-cols-2 gap-3">
              {softSkills.map((skill, i) => (
                <motion.div key={skill.label}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.07, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -4, scale: 1.03, boxShadow: "0 8px 24px hsl(155 30% 15% / 0.12)" }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card transition-all duration-200 group cursor-default">
                  <motion.span className="text-xl" whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}>
                    {skill.emoji}
                  </motion.span>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{skill.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
