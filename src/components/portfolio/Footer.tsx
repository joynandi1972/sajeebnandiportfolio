import { motion } from "framer-motion";
import { Leaf, Mail, Phone, Linkedin, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Education", id: "education" },
    { label: "Experience", id: "experience" },
    { label: "Research", id: "research" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(155 50% 8%) 0%, hsl(160 48% 12%) 50%, hsl(155 44% 9%) 100%)" }}>
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(155 50% 40% / 0.4), transparent)" }} />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, hsl(155 60% 70%) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      {/* Ambient orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(155 50% 25% / 0.15), transparent 70%)" }} />

      <div className="container-max section-padding py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ x: 3 }}>
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "hsl(155 40% 22%)", boxShadow: "0 0 15px hsl(155 50% 35% / 0.3)" }}
                whileHover={{ rotate: 20, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <Leaf className="w-5 h-5" style={{ color: "hsl(155 60% 75%)" }} />
              </motion.div>
              <span className="font-display font-semibold text-xl" style={{ color: "hsl(0 0% 97%)" }}>
                Sajeeb Nandi
              </span>
            </motion.div>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(155 15% 60%)" }}>
              Botany Undergraduate & Young Researcher from Bangladesh. Passionate about plant science and sustainable agriculture.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-widest" style={{ color: "hsl(155 40% 55%)" }}>
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-sm transition-colors hover:translate-x-1"
                  style={{ color: "hsl(155 12% 65%)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "hsl(155 55% 70%)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "hsl(155 12% 65%)")}>
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-widest" style={{ color: "hsl(155 40% 55%)" }}>
              Contact
            </h4>
            <div className="space-y-2.5">
              {[
                { href: "mailto:sajeebnandi7@gmail.com", icon: Mail, text: "sajeebnandi7@gmail.com" },
                { href: "tel:+8801974823760", icon: Phone, text: "+8801974-823760" },
                { href: "https://www.linkedin.com/in/sajeeb-nandi", icon: Linkedin, text: "linkedin.com/in/sajeeb-nandi", external: true },
              ].map(({ href, icon: Icon, text, external }) => (
                <motion.a
                  key={href} href={href}
                  target={external ? "_blank" : undefined} rel="noreferrer"
                  className="flex items-center gap-2 text-sm group"
                  style={{ color: "hsl(155 12% 65%)" }}
                  whileHover={{ x: 4 }}>
                  <Icon className="w-3.5 h-3.5 group-hover:text-primary transition-colors flex-shrink-0"
                    style={{ color: "hsl(155 35% 48%)" }} />
                  <span className="group-hover:text-primary transition-colors truncate"
                    style={{ color: "hsl(155 12% 65%)" }}>
                    {text}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "hsl(155 25% 18%)", color: "hsl(155 12% 48%)" }}>
          <p>© {new Date().getFullYear()} Sajeeb Nandi. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mx-0.5">
              <Heart className="w-3 h-3 inline" style={{ color: "hsl(155 50% 55%)" }} />
            </motion.span>
            for plant science & sustainability
          </p>
          {/* Back to top */}
          <motion.button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all"
            style={{ background: "hsl(155 35% 18%)", color: "hsl(155 40% 60%)", border: "1px solid hsl(155 30% 25%)" }}
            whileHover={{ y: -2, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}>
            <ArrowUp className="w-3 h-3" />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
