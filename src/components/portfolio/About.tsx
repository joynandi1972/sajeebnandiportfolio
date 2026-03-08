import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, BookOpen, Globe, Award } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

const highlights = [
  { icon: BookOpen, label: "Research Experience", desc: "Undergraduate plant science research with fieldwork and data analysis", color: "hsl(155 52% 22%)", bg: "hsl(155 40% 88%)" },
  { icon: Globe, label: "International Exposure", desc: "International poster competition with Silver Innovator Award", color: "hsl(218 70% 50%)", bg: "hsl(218 65% 92%)" },
  { icon: Award, label: "OMLAS Fellow", desc: "Leadership & public policy fellowship with global cohort", color: "hsl(42 85% 48%)", bg: "hsl(42 85% 91%)" },
  { icon: User, label: "Admin & HR Intern", desc: "YSSE Social Responsibility Wing — organizational operations", color: "hsl(275 55% 50%)", bg: "hsl(275 50% 92%)" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get } = useEditMode();
  const tags = get("about.tags").split(",").map(t => t.trim()).filter(Boolean);

  return (
    <section
      id="about"
      className="section-padding glass-section section-mesh relative overflow-hidden"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle at 85% 10%, hsl(155 55% 50% / 0.10), transparent 62%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle at 15% 90%, hsl(42 80% 55% / 0.07), transparent 60%)", filter: "blur(50px)" }} />
      <div className="absolute top-0 left-0 right-0 h-px section-separator" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.span className="section-label"
            initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}>
            Who I Am
          </motion.span>
          <h2 className="section-title">About Me</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-divider-line mx-auto" style={{ width: undefined }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}>
            <div className="relative pl-5 mb-7 border-l-2" style={{ borderColor: "hsl(var(--primary) / 0.35)" }}>
              <div className="absolute -left-px top-0 bottom-0 w-0.5 rounded-full"
                style={{ background: "linear-gradient(180deg, hsl(42 88% 52%), hsl(var(--primary)))" }} />
              <p className="text-sm font-bold italic" style={{ color: "hsl(var(--primary))" }}>
                Plant Scientist · Researcher · OMLAS Fellow
              </p>
            </div>
            <div className="space-y-4">
              {["about.para1","about.para2","about.para3"].map(k => (
                <p key={k} className="text-base leading-[1.85] text-foreground/75 text-justify">
                  <EditableText contentKey={k} multiline rows={4} className="text-base leading-[1.85] text-justify" />
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  whileHover={{ scale: 1.07, y: -2 }}
                  className="px-3.5 py-1 rounded-full text-xs font-semibold cursor-default"
                  style={{
                    background: "hsl(var(--primary-muted))",
                    color: "hsl(var(--primary))",
                    border: "1px solid hsl(var(--primary) / 0.18)",
                  }}>
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards — 3D glass */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, label, desc, color, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 28, scale: 0.93 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }}
                className="p-5 rounded-2xl transition-all duration-300 group relative overflow-hidden glass-card-3d shine-sweep"
                style={{ transformStyle: "preserve-3d", perspective: "800px" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${color}60, ${color}20, transparent)` }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 20% 20%, ${bg}50, transparent 65%)` }} />
                <motion.div
                  whileHover={{ scale: 1.14, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{ background: bg, boxShadow: `0 4px 14px ${color}28` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </motion.div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-1.5 relative z-10 group-hover:text-primary transition-colors duration-200 leading-snug">
                  {label}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed relative z-10">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
