import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle, Sparkles } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

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
    { icon: Mail, label: "Email", key: "hero.email", prefix: "mailto:" },
    { icon: Phone, label: "Phone", key: "hero.phone", prefix: "tel:" },
    { icon: Linkedin, label: "LinkedIn", key: "hero.linkedin", isHttp: true },
    { icon: MapPin, label: "Location", key: "hero.location" },
  ];

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-lg text-sm border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 ${
      focused === field
        ? "border-primary ring-2 ring-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.08)]"
        : "border-border hover:border-primary/40"
    }`;

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(155 40% 85% / 0.06), transparent 60%)" }} />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Get In Touch</h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: "4px", background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))", borderRadius: "9999px", margin: "0 auto 2rem" }}
          />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">Interested in research collaboration, fellowship opportunities, or just want to connect?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-semibold text-xl text-foreground mb-5">Contact Details</h3>
            {contactRows.map(({ icon: Icon, label, key, prefix, isHttp }, i) => {
              const val = get(key);
              const href = prefix ? `${prefix}${val}` : isHttp ? val : undefined;
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.1 }}
                  whileHover={{ y: -3, boxShadow: "0 8px 24px hsl(155 30% 15% / 0.1)" }}>
                  <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border bg-card transition-all duration-200 group">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "hsl(var(--primary-muted))" }}>
                      <Icon className="w-4 h-4 text-primary" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{label}</p>
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
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3">
            <div className="p-7 rounded-2xl bg-card border border-border relative overflow-hidden group">
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{ background: "radial-gradient(circle at 100% 0%, hsl(155 40% 80% / 0.07), transparent 60%)" }} />

              <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                Send a Message
                <Sparkles className="w-4 h-4 text-primary opacity-60" />
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Your Name</label>
                    <input type="text" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      placeholder="John Doe" className={inputClass("name")} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Email Address</label>
                    <input type="email" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      placeholder="you@example.com" className={inputClass("email")} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Subject</label>
                  <input type="text" required value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                    placeholder="Research Collaboration" className={inputClass("subject")} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    placeholder="Your message here..."
                    className={`${inputClass("message")} resize-none`} />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px hsl(var(--primary) / 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 relative overflow-hidden"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.span key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Message Sent!
                      </motion.span>
                    ) : (
                      <motion.span key="send" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
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
