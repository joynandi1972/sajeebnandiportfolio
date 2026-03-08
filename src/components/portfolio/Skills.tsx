import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EditableText, EditableNumber } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

const SKILL_COUNT = 5;

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

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get } = useEditMode();

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Skills</h2>
          <div className="section-divider mx-auto" />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Skill bars */}
          <div className="space-y-7">
            {Array.from({ length: SKILL_COUNT }, (_, i) => {
              const level = parseInt(get(`skill.${i}.level`) || "80", 10);
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}>
                  <div className="flex items-end justify-between mb-1.5">
                    <div>
                      <span className="font-medium text-sm text-foreground">
                        <EditableText contentKey={`skill.${i}.name`} className="font-medium text-sm" />
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <EditableText contentKey={`skill.${i}.desc`} className="text-xs" />
                      </p>
                    </div>
                    <div className="text-xs font-semibold ml-3 flex-shrink-0 flex items-center gap-1" style={{ color: "hsl(var(--primary))" }}>
                      <EditableNumber contentKey={`skill.${i}.level`} className="text-xs font-semibold" min={0} max={100} />%
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--primary-muted))" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* Soft skills */}
          <div>
            <motion.h3 initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="font-display font-semibold text-xl text-foreground mb-6">
              Core Competencies
            </motion.h3>
            <div className="grid grid-cols-2 gap-3">
              {softSkills.map((skill, i) => (
                <motion.div key={skill.label} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">{skill.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{skill.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
