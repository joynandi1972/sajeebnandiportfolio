import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle, Sparkles } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

const contactIconColors = [
  { icon: Mail, color: "hsl(220 70% 55%)", bg: "hsl(220 70% 92%)" },
  { icon: Phone, color: "hsl(155 50% 32%)", bg: "hsl(155 40% 88%)" },
  { icon: Linkedin, color: "hsl(220 80% 48%)", bg: "hsl(220 75% 92%)" },
  { icon: MapPin, color: "hsl(15 80% 50%)", bg: "hsl(15 75% 91%)" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get, isEditing } = useEditMode();
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${get("hero.email")}?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contactRows = [
    { label: "Email", key: "hero.email", prefix: "mailto:", ...contactIconColors[0] },
    { label: "Phone", key: "hero.phone", prefix: "tel:", ...contactIconColors[1] },
    { label: "LinkedIn", key: "hero.linkedin", isHttp: true, ...contactIconColors[2] },
    { label: "Location", key: "hero.location", ...contactIconColors[3] },
  ];

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-xl text-sm border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 ${
      focused === field
        ? "border-primary ring-2 ring-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.08)]"
        : "border-border hover:border-primary/40"
    }`;

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(155 40% 85% / 0.08), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}>
            Let's Connect
          </motion.span>
          <h2 className="section-title">Get In Touch</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 1.5rem" }}
          />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">Interested in research collaboration, fellowship opportunities, or just want to connect?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-semibold text-xl text-foreground mb-6">Contact Details</h3>
            {contactRows.map(({ icon: Icon, label, key, prefix, isHttp, color, bg }, i) => {
              const val = get(key);
              const href = prefix ? `${prefix}${val}` : isHttp ? val : undefined;
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="flex items-start gap-3.5 p-4 rounded-xl border border-border bg-card transition-all duration-200 group shine-on-hover"
                  style={{ boxShadow: "var(--shadow-card)" }}>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bg, boxShadow: `0 4px 12px ${color}30` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">{label}</p>
                    {isEditing ? (
                      <EditableText contentKey={key} className="text-sm font-medium text-foreground" />
                    ) : href ? (
                      <a href={href} target={isHttp ? "_blank" : undefined} rel="noreferrer"
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block">
                        {val}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{val}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3">
            <div className="p-7 rounded-2xl bg-card border border-border relative overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}>
              {/* Decorative corner gradients */}
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: "radial-gradient(circle at 100% 0%, hsl(155 40% 80% / 0.08), transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
                style={{ background: "radial-gradient(circle at 0% 100%, hsl(155 40% 80% / 0.06), transparent 60%)" }} />

              <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                Send a Message
                <Sparkles className="w-4 h-4 text-primary opacity-60" />
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Your Name</label>
                    <input type="text" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      placeholder="John Doe" className={inputClass("name")} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Email Address</label>
                    <input type="email" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      placeholder="you@example.com" className={inputClass("email")} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Subject</label>
                  <input type="text" required value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                    placeholder="Research Collaboration" className={inputClass("subject")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    placeholder="Your message here..."
                    className={`${inputClass("message")} resize-none`} />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px hsl(var(--primary) / 0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)))", color: "hsl(var(--primary-foreground))" }}>
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.1), transparent)" }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.span key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 relative z-10">
                        <CheckCircle className="w-4 h-4" /> Message Sent!
                      </motion.span>
                    ) : (
                      <motion.span key="send" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 relative z-10">
                        <Send className="w-4 h-4" /> Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
