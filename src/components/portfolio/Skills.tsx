import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "Research & Data Analysis", level: 88, desc: "Fieldwork, statistical methods, and scientific documentation" },
  { name: "Scientific Presentation", level: 82, desc: "Poster presentations, seminars, and academic communication" },
  { name: "Leadership & Teamwork", level: 85, desc: "Fellowship, organizing, and team coordination" },
  { name: "Event Coordination", level: 80, desc: "Biology Olympiad, club seminars, and outreach events" },
  { name: "Communication & Documentation", level: 87, desc: "Professional writing, reporting, and stakeholder communication" },
];

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

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Skills</h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Skill bars */}
          <div className="space-y-7">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
              >
                <div className="flex items-end justify-between mb-1.5">
                  <div>
                    <span className="font-medium text-sm text-foreground">{skill.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{skill.desc}</p>
                  </div>
                  <span
                    className="text-xs font-semibold ml-3 flex-shrink-0"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: "hsl(var(--primary-muted))" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))`,
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Soft skills grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-display font-semibold text-xl text-foreground mb-6"
            >
              Core Competencies
            </motion.h3>
            <div className="grid grid-cols-2 gap-3">
              {softSkills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                    {skill.emoji}
                  </span>
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
