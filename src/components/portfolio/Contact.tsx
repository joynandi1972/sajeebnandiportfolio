import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle } from "lucide-react";
import { EditableText } from "./Editable";
import { useEditMode } from "@/contexts/EditMode";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { get, isEditing } = useEditMode();
  const [sent, setSent] = useState(false);
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

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">Interested in research collaboration, fellowship opportunities, or just want to connect?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-semibold text-xl text-foreground mb-5">Contact Details</h3>
            {contactRows.map(({ icon: Icon, label, key, prefix, isHttp }, i) => {
              const val = get(key);
              const href = prefix ? `${prefix}${val}` : isHttp ? val : undefined;
              return (
                <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 + i * 0.08 }}>
                  <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200" style={{ background: "hsl(var(--primary-muted))" }}>
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      {isEditing ? (
                        <EditableText contentKey={key} className="text-sm font-medium text-foreground" />
                      ) : (
                        href ? (
                          <a href={href} target={isHttp ? "_blank" : undefined} rel="noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block">{val}</a>
                        ) : (
                          <p className="text-sm font-medium text-foreground">{val}</p>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3">
            <div className="p-7 rounded-2xl bg-card border border-border">
              <h3 className="font-display font-semibold text-xl text-foreground mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Your Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-lg text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Email Address</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-lg text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Subject</label>
                  <input type="text" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Research Collaboration"
                    className="w-full px-4 py-2.5 rounded-lg text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Your message here..."
                    className="w-full px-4 py-2.5 rounded-lg text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none" />
                </div>
                <button type="submit" className="w-full py-3 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-green"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                  {sent ? <><CheckCircle className="w-4 h-4" />Message Sent!</> : <><Send className="w-4 h-4" />Send Message</>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
