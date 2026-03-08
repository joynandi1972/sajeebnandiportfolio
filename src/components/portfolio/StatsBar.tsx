import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FlaskConical, Award, Users, CalendarCheck } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 50, damping: 15, mass: 0.8 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  if (inView) raw.set(target);
  return <motion.span ref={ref}>{display}</motion.span>;
}

const statIcons = [FlaskConical, Award, CalendarCheck, Users];
const statColors = [
  { color: "hsl(155 65% 65%)", bg: "hsl(155 40% 20% / 0.5)", glow: "hsl(155 60% 55% / 0.25)" },
  { color: "hsl(45 85% 62%)", bg: "hsl(45 60% 18% / 0.5)", glow: "hsl(45 80% 55% / 0.25)" },
  { color: "hsl(220 75% 70%)", bg: "hsl(220 50% 18% / 0.5)", glow: "hsl(220 70% 60% / 0.25)" },
  { color: "hsl(280 60% 72%)", bg: "hsl(280 40% 18% / 0.5)", glow: "hsl(280 55% 65% / 0.25)" },
];

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { get } = useEditMode();

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="py-12 px-4 relative"
        style={{ background: "linear-gradient(135deg, hsl(155 50% 9%) 0%, hsl(160 48% 14%) 50%, hsl(155 44% 11%) 100%)" }}>
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, hsl(155 60% 70%) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(155 50% 40% / 0.4), transparent)" }} />
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(155 50% 40% / 0.4), transparent)" }} />

        <div className="container-max relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map(i => {
              const Icon = statIcons[i];
              const { color, bg, glow } = statColors[i];
              const value = parseInt(get(`stats.${i}.value`) || "1", 10);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center text-center px-4 py-4 rounded-2xl group transition-all duration-300 relative overflow-hidden"
                  style={{ background: "hsl(155 35% 14% / 0.6)", border: "1px solid hsl(155 30% 25% / 0.4)", backdropFilter: "blur(8px)" }}>
                  {/* Hover glow bg */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${glow}, transparent 70%)` }} />

                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.12, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                    style={{ background: bg, boxShadow: `0 0 20px ${glow}` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </motion.div>

                  <div className="text-4xl font-display font-bold leading-none mb-1 relative z-10" style={{ color }}>
                    {inView ? <AnimatedNumber target={value} suffix="+" /> : `0+`}
                  </div>
                  <p className="text-sm font-semibold mb-0.5 relative z-10" style={{ color: "hsl(0 0% 92%)" }}>
                    <EditableText contentKey={`stats.${i}.label`} className="text-sm font-semibold" />
                  </p>
                  <p className="text-xs relative z-10" style={{ color: "hsl(155 15% 52%)" }}>
                    <EditableText contentKey={`stats.${i}.sub`} className="text-xs" />
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
