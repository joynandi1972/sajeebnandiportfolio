import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, Award, Calendar, ChevronRight, Microscope } from "lucide-react";

const projects = [
  {
    icon: Microscope,
    title: "Plant Growth Regulators & Floral Traits of Marigold",
    subtitle: "Undergraduate Research Project — Botany",
    period: "Jan 2025 – Aug 2025",
    badge: "Botany Research",
    badgeColor: "hsl(155 50% 20%)",
    description:
      "Investigated the effects of plant growth regulators on the floral traits and development of Tagetes erecta (African Marigold). Conducted systematic fieldwork, morphological measurements, and statistical analysis to derive insights into PGR-mediated growth responses.",
    points: [
      "Designed and executed field experiments with controlled PGR treatments",
      "Collected morphological and phenological data over the growing season",
      "Performed statistical analysis and prepared comprehensive research documentation",
    ],
    tags: ["Plant Biology", "Tagetes Erecta", "Field Research", "Statistical Analysis"],
  },
  {
    icon: Award,
    title: "Soil-less Vertical Farming: Sustainable Fresh Food Production in Urban Areas",
    subtitle: "International Poster Presentation Competition",
    period: "Jul 2025 – Oct 2025",
    badge: "🥈 Silver Innovator Award",
    badgeColor: "hsl(45 70% 40%)",
    description:
      "Co-authored and presented research on hydroponic and aeroponic vertical farming as a solution to urban food security challenges in Bangladesh. The research received the prestigious Silver Innovator Award at the international competition.",
    points: [
      "Co-authored research on vertical farming for urban Bangladesh context",
      "Developed research poster and presentation for international audience",
      "Explored hydroponics, aeroponics, and nutrient film technique (NFT) systems",
      "Received Silver Innovator Award at the international competition",
    ],
    tags: ["Vertical Farming", "Hydroponics", "Urban Agriculture", "Sustainability"],
  },
];

const interests = [
  "Plant Science Research",
  "Sustainable Agriculture",
  "Vertical & Urban Farming",
  "Environmental Sustainability",
  "Climate Resilience",
  "Plant Growth Regulators",
];

export default function Research() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="research" className="section-padding" style={{ background: "hsl(var(--secondary))" }}>
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Research</h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Exploring plant science and sustainable food systems through rigorous research
          </p>
        </motion.div>

        <div className="space-y-8 mb-14">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              className="p-7 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: "hsl(var(--primary-muted))" }}
                >
                  <project.icon className="w-6 h-6 text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm text-primary font-medium mt-0.5">{project.subtitle}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: "hsl(var(--primary-muted))",
                          color: project.badgeColor,
                        }}
                      >
                        {project.badge}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {project.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/75 leading-relaxed mb-4">{project.description}</p>

                  <ul className="space-y-1.5 mb-4">
                    {project.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-foreground/70">
                        <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded text-xs font-medium"
                        style={{
                          background: "hsl(var(--accent))",
                          color: "hsl(var(--accent-foreground))",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="font-display font-semibold text-xl text-foreground mb-5">Research Interests</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.06 }}
                className="px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 hover:shadow-green cursor-default"
                style={{
                  background: "hsl(var(--card))",
                  color: "hsl(var(--primary))",
                  borderColor: "hsl(var(--primary) / 0.3)",
                }}
              >
                🌱 {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
