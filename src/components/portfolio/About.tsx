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
      {/* Decorative orb */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, hsl(155 40% 85% / 0.12), transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 80%, hsl(155 40% 85% / 0.08), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">
            <EditableText contentKey="about.title" className="section-title" />
          </h2>
          <motion.div
            className="section-divider mx-auto"
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 2rem" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}>
            <div className="space-y-5">
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
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 rounded-full text-xs font-medium cursor-default"
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
                initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 16px 40px -8px hsl(155 40% 20% / 0.15)" }}
                className="p-5 rounded-xl border border-border bg-card transition-all duration-300 group relative overflow-hidden">
                {/* card shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, hsl(155 40% 96%) 0%, transparent 60%)" }} />
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 relative z-10"
                  style={{ background: "hsl(var(--primary-muted))" }}>
                  <Icon className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="font-semibold text-sm text-foreground mb-1 relative z-10">{label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed relative z-10">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
