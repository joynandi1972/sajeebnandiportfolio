import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FlaskConical, Award, Users, CalendarCheck } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 18, mass: 0.8 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  if (inView) raw.set(target);
  return <motion.span ref={ref}>{display}</motion.span>;
}

const statIcons = [FlaskConical, Award, CalendarCheck, Users];
const statColors = [
  { color: "hsl(155 50% 20%)", bg: "hsl(155 40% 14%)" },
  { color: "hsl(45 80% 52%)", bg: "hsl(45 60% 12%)" },
  { color: "hsl(220 70% 62%)", bg: "hsl(220 50% 12%)" },
  { color: "hsl(280 55% 65%)", bg: "hsl(280 40% 12%)" },
];

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { get } = useEditMode();

  return (
    <section ref={ref} className="relative overflow-hidden py-0">
      <div className="py-10 px-4"
        style={{ background: "linear-gradient(135deg, hsl(155 50% 11%) 0%, hsl(160 45% 16%) 50%, hsl(155 42% 13%) 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, hsl(155 60% 70%) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container-max relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map(i => {
              const Icon = statIcons[i];
              const { color, bg } = statColors[i];
              const value = parseInt(get(`stats.${i}.value`) || "1", 10);
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center px-4 py-3 group">
                  <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.45, delay: 0.1 + i * 0.1, type: "spring" }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200" style={{ background: bg }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </motion.div>
                  <div className="text-4xl font-display font-bold leading-none mb-1" style={{ color }}>
                    {inView ? <AnimatedNumber target={value} suffix="+" /> : `0+`}
                  </div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "hsl(0 0% 90%)" }}>
                    <EditableText contentKey={`stats.${i}.label`} className="text-sm font-semibold" />
                  </p>
                  <p className="text-xs" style={{ color: "hsl(155 15% 55%)" }}>
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
