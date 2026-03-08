import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

const experiences = [
  {
    title: "Admin & HR Intern",
    org: "YSSE Social Responsibility Wing",
    period: "Dec 2025 – Present",
    type: "Internship",
    color: "hsl(155 50% 20%)",
    points: [
      "Supporting administrative and HR operations for the social responsibility wing",
      "Assisting in coordination, documentation, and professional communication",
      "Contributing to social impact initiatives and organizational development",
    ],
  },
  {
    title: "OMLAS Fellow",
    org: "OMLAS Fellowship",
    period: "Jul 2025 – Oct 2025",
    type: "Fellowship",
    color: "hsl(155 40% 30%)",
    points: [
      "Training in governance frameworks, public policy analysis, and sustainability",
      "Leadership development through hands-on policy simulation exercises",
      "Collaboration with an international cohort of fellows from diverse backgrounds",
    ],
  },
  {
    title: "Regional Organizer",
    org: "Bangladesh Biology Olympiad — Barishal Region",
    period: "Ongoing",
    type: "Volunteer",
    color: "hsl(155 35% 38%)",
    points: [
      "Managed participant coordination and volunteer teams across the region",
      "Oversaw event logistics and operations for the Biology Olympiad",
      "Fostered engagement of young students in biological sciences",
    ],
  },
  {
    title: "Organizer — Botany Club Seminar",
    org: 'Event: "Generation Green: Voices for Climate Resilience"',
    period: "2024",
    type: "Organizing",
    color: "hsl(155 30% 44%)",
    points: [
      "Coordinated event management and logistical planning",
      "Led team collaboration and participant engagement activities",
      "Championed climate awareness and environmental advocacy through the event",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Experience</h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            A journey through research, leadership, and social impact
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div
            className="absolute left-5 top-2 bottom-2 w-0.5 hidden sm:block"
            style={{ background: "hsl(var(--primary-muted))" }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
                className="relative sm:pl-14"
              >
                {/* Timeline dot */}
                <div
                  className="hidden sm:flex absolute left-3 top-6 w-5 h-5 rounded-full items-center justify-center z-10"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 0 3px hsl(var(--primary-muted))`,
                  }}
                />

                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 sm:hidden"
                        style={{ background: "hsl(var(--primary-muted))" }}
                      >
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-sm font-medium text-primary mt-0.5">{exp.org}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className="px-3 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: "hsl(var(--primary-muted))",
                          color: "hsl(var(--primary))",
                        }}
                      >
                        {exp.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {exp.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-foreground/75">
                        <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
