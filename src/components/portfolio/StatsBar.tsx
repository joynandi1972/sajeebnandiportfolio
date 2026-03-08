import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FlaskConical, Award, Users, CalendarCheck } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 45, damping: 14, mass: 0.8 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  if (inView) raw.set(target);
  return <motion.span ref={ref}>{display}</motion.span>;
}

const statIcons = [FlaskConical, Award, CalendarCheck, Users];

const statThemes = [
  {
    color: "hsl(155 62% 62%)",
    numColor: "hsl(155 65% 68%)",
    bg: "hsl(155 45% 18% / 0.55)",
    border: "hsl(155 50% 32% / 0.35)",
    glow: "hsl(155 55% 45% / 0.22)",
    iconBg: "hsl(155 48% 22% / 0.8)",
  },
  {
    color: "hsl(42 90% 68%)",
    numColor: "hsl(42 92% 72%)",
    bg: "hsl(42 60% 16% / 0.55)",
    border: "hsl(42 70% 35% / 0.35)",
    glow: "hsl(42 80% 50% / 0.22)",
    iconBg: "hsl(42 55% 20% / 0.8)",
  },
  {
    color: "hsl(218 78% 72%)",
    numColor: "hsl(218 82% 76%)",
    bg: "hsl(218 50% 16% / 0.55)",
    border: "hsl(218 60% 35% / 0.35)",
    glow: "hsl(218 70% 55% / 0.22)",
    iconBg: "hsl(218 52% 20% / 0.8)",
  },
  {
    color: "hsl(275 62% 74%)",
    numColor: "hsl(275 65% 78%)",
    bg: "hsl(275 40% 16% / 0.55)",
    border: "hsl(275 50% 35% / 0.35)",
    glow: "hsl(275 55% 55% / 0.22)",
    iconBg: "hsl(275 42% 20% / 0.8)",
  },
];

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { get } = useEditMode();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "var(--gradient-dark-band)" }}>
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, hsl(155 55% 70%) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
      {/* Top edge */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(42 80% 50% / 0.25), hsl(155 55% 45% / 0.25), transparent)" }} />
      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(155 50% 38% / 0.2), transparent)" }} />
      {/* Centre ambient */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[700px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(155 45% 30% / 0.06), transparent 70%)" }} />

      <div className="container-max relative py-14 px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[0, 1, 2, 3].map(i => {
            const Icon = statIcons[i];
            const theme = statThemes[i];
            const value = parseInt(get(`stats.${i}.value`) || "1", 10);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: i * 0.11, type: "spring", stiffness: 180 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative flex flex-col items-center text-center px-5 py-6 rounded-2xl group transition-all duration-300 overflow-hidden"
                style={{
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 20px hsl(0 0% 0% / 0.2)",
                }}>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${theme.glow}, transparent 70%)` }} />
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.color}60, transparent)` }} />

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.18 + i * 0.11, type: "spring", stiffness: 220 }}
                  whileHover={{ scale: 1.18, rotate: 6 }}
                  className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: theme.iconBg,
                    border: `1px solid ${theme.border}`,
                    boxShadow: `0 4px 20px ${theme.glow}`,
                  }}>
                  <Icon className="w-5 h-5" style={{ color: theme.color }} />
                </motion.div>

                {/* Number */}
                <div className="text-4xl font-display font-bold leading-none mb-1.5 relative z-10" style={{ color: theme.numColor }}>
                  {inView ? <AnimatedNumber target={value} suffix="+" /> : "0+"}
                </div>

                {/* Label */}
                <p className="text-sm font-semibold mb-0.5 relative z-10" style={{ color: "hsl(155 10% 88%)" }}>
                  <EditableText contentKey={`stats.${i}.label`} className="text-sm font-semibold" />
                </p>
                <p className="text-xs relative z-10" style={{ color: "hsl(155 12% 52%)" }}>
                  <EditableText contentKey={`stats.${i}.sub`} className="text-xs" />
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
