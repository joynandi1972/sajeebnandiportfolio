import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Users } from "lucide-react";
import { EditableText } from "./Editable";

const achIcons = [Trophy, Star, Users];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="section-padding" style={{ background: "hsl(var(--secondary))" }}>
      <div className="container-max" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Achievements</h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">Recognition earned through dedication to research, leadership, and community service</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map(i => {
            const Icon = achIcons[i];
            const highlight = i === 0;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
                className={`relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-2 group ${highlight ? "border-primary/40 shadow-green" : "border-border hover:border-primary/30 hover:shadow-card-hover"}`}
                style={{ background: highlight ? "linear-gradient(145deg, hsl(var(--card)), hsl(var(--primary-muted)))" : "hsl(var(--card))" }}>
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)" }}>
                    ⭐ Featured
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200" style={{ background: "hsl(var(--primary-muted))" }}>
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-medium mb-3" style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                  <EditableText contentKey={`ach.${i}.year`} className="text-xs" />
                </span>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  <EditableText contentKey={`ach.${i}.title`} className="font-display font-semibold text-lg" />
                </h3>
                <p className="text-xs font-medium text-primary mb-3">
                  <EditableText contentKey={`ach.${i}.org`} className="text-xs font-medium" />
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  <EditableText contentKey={`ach.${i}.description`} multiline rows={3} className="text-sm leading-relaxed" />
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
