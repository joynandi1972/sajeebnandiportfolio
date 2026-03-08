import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Users } from "lucide-react";
import { EditableText } from "./Editable";

const achIcons = [Trophy, Star, Users];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="section-padding relative overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(155 40% 60% / 0.06), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Achievements</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 2rem" }}
          />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">Recognition earned through dedication to research, leadership, and community service</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map(i => {
            const Icon = achIcons[i];
            const highlight = i === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.14, type: "spring", stiffness: 150 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-7 rounded-2xl border transition-all duration-300 group overflow-hidden"
                style={{
                  background: highlight
                    ? "linear-gradient(145deg, hsl(var(--card)), hsl(var(--primary-muted)))"
                    : "hsl(var(--card))",
                  borderColor: highlight ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border))",
                  boxShadow: highlight ? "0 0 30px hsl(var(--primary) / 0.12)" : undefined,
                }}>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, hsl(155 40% 80% / ${highlight ? "0.1" : "0.06"}), transparent 60%)` }} />
                {/* Featured badge */}
                {highlight && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", boxShadow: "0 4px 12px hsl(var(--primary) / 0.35)" }}
                    animate={{ boxShadow: ["0 4px 12px hsl(var(--primary) / 0.35)", "0 4px 20px hsl(var(--primary) / 0.55)", "0 4px 12px hsl(var(--primary) / 0.35)"] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    ⭐ Featured
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: highlight ? 10 : -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "hsl(var(--primary-muted))" }}>
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-medium mb-3"
                  style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
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
