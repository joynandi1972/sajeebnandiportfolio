import { Leaf, Mail, Phone, Linkedin, Heart } from "lucide-react";

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
    <footer className="gradient-hero text-primary-foreground">
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(155 40% 30%)" }}>
                <Leaf className="w-5 h-5" style={{ color: "hsl(155 60% 75%)" }} />
              </div>
              <span className="font-display font-semibold text-xl" style={{ color: "hsl(0 0% 97%)" }}>
                Sajeeb Nandi
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(155 20% 70%)" }}>
              Botany Undergraduate & Young Researcher from Bangladesh. Passionate about plant science and sustainable agriculture.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: "hsl(155 40% 65%)" }}>
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-sm transition-colors"
                  style={{ color: "hsl(155 15% 75%)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(155 55% 70%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(155 15% 75%)")}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: "hsl(155 40% 65%)" }}>
              Contact
            </h4>
            <div className="space-y-2.5">
              <a
                href="mailto:sajeebnandi7@gmail.com"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: "hsl(155 15% 75%)" }}
              >
                <Mail className="w-3.5 h-3.5" />
                sajeebnandi7@gmail.com
              </a>
              <a
                href="tel:+8801974823760"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: "hsl(155 15% 75%)" }}
              >
                <Phone className="w-3.5 h-3.5" />
                +8801974-823760
              </a>
              <a
                href="https://www.linkedin.com/in/sajeeb-nandi"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: "hsl(155 15% 75%)" }}
              >
                <Linkedin className="w-3.5 h-3.5" />
                linkedin.com/in/sajeeb-nandi
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "hsl(155 30% 25%)", color: "hsl(155 15% 55%)" }}
        >
          <p>© {new Date().getFullYear()} Sajeeb Nandi. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 mx-0.5" style={{ color: "hsl(155 50% 55%)" }} /> for plant science & sustainability
          </p>
        </div>
      </div>
    </footer>
  );
}
