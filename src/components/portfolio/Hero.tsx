import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin, ChevronDown, Download } from "lucide-react";
import profileImg from "@/assets/profile.png";

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden gradient-hero"
    >
      {/* Background botanical pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(155 60% 60%), transparent 70%)" }}
        />
        <div className="absolute bottom-12 -left-16 w-72 h-72 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(155 50% 50%), transparent 70%)" }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(155 60% 70%) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <div className="container-max w-full section-padding py-28 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{ background: "hsl(155 40% 30% / 0.6)", color: "hsl(155 60% 82%)", border: "1px solid hsl(155 40% 45% / 0.4)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to Research & Collaboration
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4"
              style={{ color: "hsl(0 0% 97%)" }}
            >
              Sajeeb
              <br />
              <span style={{ color: "hsl(155 60% 70%)" }}>Nandi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-lg font-medium mb-2"
              style={{ color: "hsl(155 40% 75%)" }}
            >
              Botany Undergraduate · Young Researcher
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-base leading-relaxed mb-8 max-w-lg"
              style={{ color: "hsl(155 15% 78%)" }}
            >
              University of Barishal, Bangladesh — Passionate about plant science,
              sustainable agriculture, and driving research that bridges academia with real-world impact.
            </motion.p>

            {/* Contact chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {[
                { icon: MapPin, text: "Jashore, Bangladesh" },
                { icon: Mail, text: "sajeebnandi7@gmail.com", href: "mailto:sajeebnandi7@gmail.com" },
                { icon: Linkedin, text: "LinkedIn", href: "https://www.linkedin.com/in/sajeeb-nandi" },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href || undefined}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    background: "hsl(155 35% 25% / 0.7)",
                    color: "hsl(155 40% 80%)",
                    border: "1px solid hsl(155 35% 40% / 0.4)",
                    cursor: href ? "pointer" : "default",
                  }}
                >
                  <Icon className="w-3 h-3" />
                  {text}
                </a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:shadow-green"
                style={{ background: "hsl(155 50% 55%)", color: "hsl(155 50% 8%)" }}
              >
                Get In Touch
              </button>
              <button
                onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "transparent",
                  color: "hsl(155 40% 80%)",
                  border: "1px solid hsl(155 35% 45% / 0.6)",
                }}
              >
                View Research
              </button>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative rings */}
              <div
                className="absolute inset-0 rounded-full scale-110 opacity-20"
                style={{ border: "2px solid hsl(155 50% 55%)" }}
              />
              <div
                className="absolute inset-0 rounded-full scale-125 opacity-10"
                style={{ border: "1px solid hsl(155 50% 55%)" }}
              />
              {/* Photo container */}
              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden animate-float"
                style={{
                  border: "4px solid hsl(155 45% 45% / 0.5)",
                  boxShadow: "0 20px 60px -10px hsl(155 50% 10% / 0.5), 0 0 40px hsl(155 50% 30% / 0.2)",
                }}
              >
                <img
                  src={profileImg}
                  alt="Sajeeb Nandi — Botany Researcher"
                  className="w-full h-full object-cover"
                  style={{ background: "hsl(155 20% 85%)" }}
                />
              </div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-0 px-4 py-2 rounded-xl text-xs font-semibold"
                style={{
                  background: "hsl(155 45% 22%)",
                  color: "hsl(155 60% 78%)",
                  border: "1px solid hsl(155 40% 35% / 0.6)",
                  boxShadow: "0 8px 20px hsl(155 50% 8% / 0.4)",
                }}
              >
                🌿 Plant Scientist
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-all hover:scale-110"
        style={{ color: "hsl(155 30% 65%)" }}
      >
        <span className="text-xs font-medium">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  );
}
