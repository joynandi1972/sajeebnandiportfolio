import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Sparkles, BookOpen, School } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

const entries = [
  {
    key: "edu",
    icon: GraduationCap,
    iconSize: "w-7 h-7",
    cardSize: "w-14 h-14",
    badge: { label: "Ongoing", pulse: true },
    accent: "hsl(var(--primary))",
  },
  {
    key: "hsc",
    icon: BookOpen,
    iconSize: "w-6 h-6",
    cardSize: "w-12 h-12",
    badge: { label: "Completed", pulse: false },
    accent: "hsl(155 38% 38%)",
  },
  {
    key: "ssc",
    icon: School,
    iconSize: "w-6 h-6",
    cardSize: "w-12 h-12",
    badge: { label: "Completed", pulse: false },
    accent: "hsl(155 30% 46%)",
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get } = useEditMode();

  return (
    <section id="education" className="section-padding relative overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle at 70% 30%, hsl(155 40% 60% / 0.08), transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 80%, hsl(155 40% 60% / 0.05), transparent 60%)" }} />

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

        {/* Timeline */}
        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 hidden sm:block"
            style={{ background: "hsl(var(--primary-muted))" }} />
          <motion.div
            className="absolute left-6 top-6 w-0.5 hidden sm:block origin-top"
            style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary-glow)), hsl(var(--primary-muted)))" }}
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
          >
            <div style={{ height: "calc(100% - 0px)" }} />
          </motion.div>

          <div className="space-y-8">
            {entries.map(({ key, icon: Icon, iconSize, cardSize, badge, accent }, i) => {
              const tags = get(`${key}.tags`).split(",").map(t => t.trim()).filter(Boolean);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.18 }}
                  className="relative sm:pl-20">

                  {/* Timeline node */}
                  <motion.div
                    className="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full items-center justify-center z-10"
                    style={{ background: `linear-gradient(135deg, ${accent}, hsl(155 40% 55%))`, boxShadow: `0 0 0 4px hsl(var(--secondary)), 0 0 16px ${accent}50` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.35 + i * 0.18, type: "spring", stiffness: 250 }}
                    whileHover={{ scale: 1.12 }}>
                    <Icon className={`${iconSize} text-primary-foreground`} />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 20px 50px -10px hsl(155 40% 20% / 0.16)" }}
                    className="relative p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 group overflow-hidden">

                    {/* Left accent bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                      style={{ background: `linear-gradient(180deg, ${accent}, hsl(var(--primary-muted)))` }}
                      initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.7, delay: 0.5 + i * 0.18 }}
                    />
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ background: "radial-gradient(circle at 20% 50%, hsl(155 40% 85% / 0.06), transparent 60%)" }} />
                    {/* Top shine */}
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />

                    {/* Mobile icon */}
                    <div className="flex sm:hidden items-center gap-3 mb-4">
                      <div className={`${cardSize} rounded-xl flex items-center justify-center flex-shrink-0`}
                        style={{ background: "hsl(var(--primary-muted))" }}>
                        <Icon className={`${iconSize} text-primary`} />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display font-semibold text-lg sm:text-xl text-foreground leading-snug">
                          <EditableText contentKey={`${key}.degree`} className="font-display font-semibold" />
                        </h3>
                        <p className="font-medium mt-0.5 text-sm" style={{ color: accent }}>
                          <EditableText contentKey={`${key}.university`} className="font-medium text-sm" />
                        </p>
                      </div>
                      {badge.pulse ? (
                        <motion.span
                          animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                          style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))" }}>
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
                        <EditableText contentKey={`${key}.period`} className="text-sm" />
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <EditableText contentKey={`${key}.location`} className="text-sm" />
                      </span>
                    </div>

                    {/* Result row */}
                    <div className="flex flex-wrap gap-3 mb-4">
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
                      <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                        <EditableText contentKey={`${key}.description`} multiline rows={3} className="text-sm leading-relaxed" />
                      </p>
                    )}

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, ti) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6 + i * 0.18 + ti * 0.06 }}
                            whileHover={{ scale: 1.07 }}
                            className="px-2.5 py-0.5 rounded text-xs cursor-default"
                            style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
