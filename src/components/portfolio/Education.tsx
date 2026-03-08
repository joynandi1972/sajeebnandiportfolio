import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Sparkles } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get } = useEditMode();
  const tags = get("edu.tags").split(",").map(t => t.trim()).filter(Boolean);

  return (
    <section id="education" className="section-padding relative overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle at 70% 30%, hsl(155 40% 60% / 0.08), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Education</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 2rem" }}
          />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4, boxShadow: "0 20px 50px -10px hsl(155 40% 20% / 0.18)" }}
            className="relative p-8 rounded-2xl bg-card border border-border shadow-md transition-all duration-300 group overflow-hidden">
            {/* Accent bar */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
              initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            {/* Glow overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
              style={{ background: "radial-gradient(circle at 30% 50%, hsl(155 40% 85% / 0.06), transparent 60%)" }} />

            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <motion.div
                whileHover={{ scale: 1.12, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--primary-muted))" }}>
                <GraduationCap className="w-7 h-7 text-primary" />
              </motion.div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-display font-semibold text-xl text-foreground">
                      <EditableText contentKey="edu.degree" className="font-display font-semibold text-xl" />
                    </h3>
                    <p className="text-primary font-medium mt-0.5">
                      <EditableText contentKey="edu.university" className="font-medium" />
                    </p>
                  </div>
                  <motion.span
                    animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))" }}>
                    <Sparkles className="w-3 h-3" />
                    Ongoing
                  </motion.span>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <EditableText contentKey="edu.period" className="text-sm" />
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <EditableText contentKey="edu.location" className="text-sm" />
                  </span>
                </div>
                <p className="mt-4 text-sm text-foreground/75 leading-relaxed">
                  <EditableText contentKey="edu.description" multiline rows={3} className="text-sm leading-relaxed" />
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.07 }}
                      whileHover={{ scale: 1.07 }}
                      className="px-2.5 py-0.5 rounded text-xs cursor-default"
                      style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
