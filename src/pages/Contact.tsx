import { useState } from "react";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", country: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    // Simulated submission
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Your message has been sent. We'll get back to you shortly!");
    setForm({ name: "", company: "", email: "", country: "", message: "" });
    setSending(false);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <Layout>
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Contact</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">Get in Touch</h1>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                We'd love to hear from you. Reach out for inquiries, partnerships, or to discuss your lace needs.
              </p>
            </div>
          </AnimatedSection>

          <div className="lg:flex gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <AnimatedSection className="lg:w-2/5 mb-10 lg:mb-0">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Email</h3>
                    <a href="mailto:info@laceatelier.com" className="text-sm text-muted-foreground hover:text-accent transition-colors">info@laceatelier.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Phone size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Phone</h3>
                    <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-accent transition-colors">+1 (234) 567-890</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <MessageCircle size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">+1 (234) 567-890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <MapPin size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">Address</h3>
                    <p className="text-sm text-muted-foreground">123 Textile Avenue, Fashion District<br />New York, NY 10001</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 aspect-video rounded-sm bg-secondary flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Map Placeholder</p>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection className="lg:w-3/5" delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Name *</label>
                    <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Company</label>
                    <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Company name" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Country</label>
                    <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Your country" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Message *</label>
                  <textarea rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent resize-none" placeholder="Tell us about your requirements..." />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
