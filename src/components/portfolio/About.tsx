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
    <section id="about" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title"><EditableText contentKey="about.title" className="section-title" /></h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.15 }}>
            <p className="text-base leading-relaxed text-foreground/80 mb-5">
              <EditableText contentKey="about.para1" multiline rows={4} className="text-base leading-relaxed" />
            </p>
            <p className="text-base leading-relaxed text-foreground/80 mb-5">
              <EditableText contentKey="about.para2" multiline rows={4} className="text-base leading-relaxed" />
            </p>
            <p className="text-base leading-relaxed text-foreground/80">
              <EditableText contentKey="about.para3" multiline rows={4} className="text-base leading-relaxed" />
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "hsl(var(--primary-muted))", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.15)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="p-5 rounded-xl border border-border gradient-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200" style={{ background: "hsl(var(--primary-muted))" }}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
