import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, BookOpen, Globe, Award } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

const highlights = [
  { icon: BookOpen, label: "Research Experience", desc: "Undergraduate plant science research with fieldwork and data analysis" },
  { icon: Globe, label: "International Exposure", desc: "International poster competition with Silver Innovator Award" },
  { icon: Award, label: "OMLAS Fellow", desc: "Leadership & public policy fellowship with global cohort" },
  { icon: User, label: "Admin & HR Intern", desc: "YSSE Social Responsibility Wing — organizational operations" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get } = useEditMode();
  const tags = get("about.tags").split(",").map(t => t.trim()).filter(Boolean);

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 10%, hsl(155 40% 85% / 0.14), transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 90%, hsl(155 40% 85% / 0.09), transparent 60%)" }} />
      {/* Decorative horizontal rule at top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.12), transparent)" }} />

      <div className="container-max" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}>
            Who I Am
          </motion.span>
          <h2 className="section-title">
            <EditableText contentKey="about.title" className="section-title" />
          </h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 1.5rem" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}>
            {/* Quote-style accent bar */}
            <div className="relative pl-5 mb-6 border-l-2" style={{ borderColor: "hsl(var(--primary) / 0.4)" }}>
              <div className="absolute -left-px top-0 bottom-0 w-0.5 rounded-full"
                style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }} />
              <p className="text-sm font-medium italic" style={{ color: "hsl(var(--primary))" }}>
                Plant Scientist · Researcher · OMLAS Fellow
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-foreground/80 text-justify">
                <EditableText contentKey="about.para1" multiline rows={4} className="text-base leading-relaxed text-justify" />
              </p>
              <p className="text-base leading-relaxed text-foreground/80 text-justify">
                <EditableText contentKey="about.para2" multiline rows={4} className="text-base leading-relaxed text-justify" />
              </p>
              <p className="text-base leading-relaxed text-foreground/80 text-justify">
                <EditableText contentKey="about.para3" multiline rows={4} className="text-base leading-relaxed text-justify" />
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 rounded-full text-xs font-semibold cursor-default"
                  style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.2)" }}>
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 28, scale: 0.94 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-5 rounded-2xl border transition-all duration-300 group relative overflow-hidden shine-on-hover"
                style={{
                  background: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  boxShadow: "var(--shadow-card)",
                }}>
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />
                {/* Card shine on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: "linear-gradient(135deg, hsl(155 40% 96%) 0%, transparent 55%)" }} />
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary-muted)), hsl(var(--accent)))",
                    boxShadow: "0 4px 12px hsl(var(--primary) / 0.15)",
                  }}>
                  <Icon className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="font-semibold text-sm text-foreground mb-1 relative z-10 group-hover:text-primary transition-colors duration-200">{label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed relative z-10">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
