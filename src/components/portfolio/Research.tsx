import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, Award, Calendar, ChevronRight, Microscope } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

const resIcons = [Microscope, Award];

export default function Research() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get } = useEditMode();
  const interests = get("research.interests").split(",").map(t => t.trim()).filter(Boolean);

  const pointCounts = [3, 4];

  return (
    <section id="research" className="section-padding" style={{ background: "hsl(var(--secondary))" }}>
      <div className="container-max" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Research</h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">Exploring plant science and sustainable food systems through rigorous research</p>
        </motion.div>

        <div className="space-y-8 mb-14">
          {[0, 1].map(i => {
            const Icon = resIcons[i];
            const tags = get(`res.${i}.tags`).split(",").map(t => t.trim()).filter(Boolean);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
                className="p-7 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200" style={{ background: "hsl(var(--primary-muted))" }}>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                          <EditableText contentKey={`res.${i}.title`} className="font-display font-semibold text-lg leading-snug" />
                        </h3>
                        <p className="text-sm text-primary font-medium mt-0.5">
                          <EditableText contentKey={`res.${i}.subtitle`} className="text-sm font-medium" />
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))" }}>
                          <EditableText contentKey={`res.${i}.badge`} className="text-xs" />
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <EditableText contentKey={`res.${i}.period`} className="text-xs" />
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                      <EditableText contentKey={`res.${i}.description`} multiline rows={3} className="text-sm leading-relaxed" />
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {Array.from({ length: pointCounts[i] }, (_, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-foreground/70">
                          <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <EditableText contentKey={`res.${i}.point${j}`} className="text-sm" />
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 rounded text-xs font-medium" style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Research Interests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="text-center">
          <h3 className="font-display font-semibold text-xl text-foreground mb-5">Research Interests</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest, i) => (
              <motion.span key={interest} initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.55 + i * 0.06 }}
                className="px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 hover:shadow-green cursor-default"
                style={{ background: "hsl(var(--card))", color: "hsl(var(--primary))", borderColor: "hsl(var(--primary) / 0.3)" }}>
                🌱 {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
