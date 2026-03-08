import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Users } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Silver Innovator Award",
    org: "International Poster Presentation Competition",
    year: "2025",
    description:
      'Awarded the Silver Innovator Award for co-authoring the research "Soil-less Vertical Farming: Sustainable Fresh Food Production in Urban Areas of Bangladesh" at an international level competition.',
    highlight: true,
  },
  {
    icon: Star,
    title: "OMLAS Fellow",
    org: "OMLAS Fellowship Program",
    year: "2025",
    description:
      "Competitively selected as an OMLAS Fellow for outstanding leadership potential. Received intensive training in public policy, governance frameworks, sustainability, and global leadership.",
    highlight: false,
  },
  {
    icon: Users,
    title: "Regional Organizer",
    org: "Bangladesh Biology Olympiad",
    year: "Ongoing",
    description:
      "Recognized for exceptional organizational leadership in managing the Barishal region of the Bangladesh Biology Olympiad, inspiring hundreds of students toward biological sciences.",
    highlight: false,
  },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="section-padding" style={{ background: "hsl(var(--secondary))" }}>
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Achievements</h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Recognition earned through dedication to research, leadership, and community service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
              className={`relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-2 group ${
                item.highlight
                  ? "border-primary/40 shadow-green"
                  : "border-border hover:border-primary/30 hover:shadow-card-hover"
              }`}
              style={{
                background: item.highlight
                  ? "linear-gradient(145deg, hsl(var(--card)), hsl(var(--primary-muted)))"
                  : "hsl(var(--card))",
              }}
            >
              {item.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)",
                  }}
                >
                  ⭐ Featured
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 ${
                  item.highlight ? "" : ""
                }`}
                style={{ background: "hsl(var(--primary-muted))" }}
              >
                <item.icon className="w-6 h-6 text-primary" />
              </div>

              <span
                className="inline-block px-2.5 py-0.5 rounded text-xs font-medium mb-3"
                style={{
                  background: "hsl(var(--accent))",
                  color: "hsl(var(--accent-foreground))",
                }}
              >
                {item.year}
              </span>

              <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs font-medium text-primary mb-3">{item.org}</p>
              <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
