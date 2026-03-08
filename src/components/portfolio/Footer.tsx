import { motion } from "framer-motion";
import { Leaf, Mail, Phone, Linkedin, Heart, ArrowUp, Github } from "lucide-react";

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
    <footer className="relative overflow-hidden" style={{ background: "var(--gradient-dark-band)" }}>
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(42 80% 52% / 0.25), hsl(155 55% 42% / 0.22), transparent)" }} />
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, hsl(155 60% 70%) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
      {/* Bottom ambient orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(155 50% 22% / 0.12), transparent 70%)" }} />

      <div className="container-max relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <motion.div className="flex items-center gap-3 mb-5" whileHover={{ x: 2 }}>
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, hsl(155 52% 18%), hsl(155 45% 26%))",
                  boxShadow: "0 4px 16px hsl(155 50% 12% / 0.4), 0 0 20px hsl(155 50% 30% / 0.12)",
                }}
                whileHover={{ rotate: 18, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 320 }}>
                <Leaf className="w-5 h-5" style={{ color: "hsl(155 60% 72%)" }} />
              </motion.div>
              <div>
                <span className="font-display font-bold text-xl block" style={{ color: "hsl(0 0% 96%)" }}>Sajeeb Nandi</span>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(42 80% 58%)", letterSpacing: "0.12em" }}>Portfolio</span>
              </div>
            </motion.div>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(155 12% 56%)" }}>
              Botany Undergraduate & Young Researcher from Bangladesh. Passionate about plant science and sustainable agriculture.
            </p>
            {/* Small divider */}
            <div className="mt-6 h-px" style={{ background: "linear-gradient(90deg, hsl(155 30% 22%), transparent)" }} />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 uppercase" style={{ color: "hsl(42 80% 58%)", letterSpacing: "0.12em" }}>
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  whileHover={{ x: 3 }}
                  className="text-left text-sm font-medium transition-colors flex items-center gap-1.5"
                  style={{ color: "hsl(155 10% 60%)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "hsl(155 50% 68%)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "hsl(155 10% 60%)")}>
                  <span className="w-1 h-1 rounded-full opacity-50 flex-shrink-0"
                    style={{ background: "hsl(155 45% 50%)" }} />
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 uppercase" style={{ color: "hsl(42 80% 58%)", letterSpacing: "0.12em" }}>
              Contact
            </h4>
            <div className="space-y-3">
              {[
                { href: "mailto:sajeebnandi7@gmail.com", icon: Mail, text: "sajeebnandi7@gmail.com" },
                { href: "tel:+8801974823760", icon: Phone, text: "+8801974-823760" },
                { href: "https://www.linkedin.com/in/sajeeb-nandi", icon: Linkedin, text: "linkedin.com/in/sajeeb-nandi", external: true },
              ].map(({ href, icon: Icon, text, external }) => (
                <motion.a
                  key={href} href={href}
                  target={external ? "_blank" : undefined} rel="noreferrer"
                  className="flex items-center gap-3 text-sm group"
                  style={{ color: "hsl(155 10% 58%)" }}
                  whileHover={{ x: 4 }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-opacity-100"
                    style={{ background: "hsl(155 40% 16%)", border: "1px solid hsl(155 30% 22%)" }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: "hsl(155 40% 52%)" }} />
                  </div>
                  <span className="transition-colors group-hover:text-primary truncate">{text}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid hsl(155 25% 16%)", color: "hsl(155 10% 42%)" }}>
          <p>© {new Date().getFullYear()} Sajeeb Nandi. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with
            <motion.span
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mx-0.5">
              <Heart className="w-3 h-3 inline" style={{ color: "hsl(42 85% 58%)" }} />
            </motion.span>
            for plant science & sustainability
          </p>
          <motion.button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full font-semibold transition-all"
            style={{ background: "hsl(155 38% 15%)", color: "hsl(155 40% 58%)", border: "1px solid hsl(155 32% 22%)" }}
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
