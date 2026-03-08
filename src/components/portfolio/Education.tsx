import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get } = useEditMode();
  const tags = get("edu.tags").split(",").map(t => t.trim()).filter(Boolean);

  return (
    <section id="education" className="section-padding" style={{ background: "hsl(var(--secondary))" }}>
      <div className="container-max" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Education</h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-8 rounded-2xl bg-card border border-border shadow-md hover:shadow-green transition-all duration-300 group">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-primary" />
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200" style={{ background: "hsl(var(--primary-muted))" }}>
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
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
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))" }}>
                    Ongoing
                  </span>
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
                  {tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 rounded text-xs" style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
                      {tag}
                    </span>
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
