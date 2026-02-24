import { useState } from "react";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const WHATSAPP_NUMBER = "01892749000";
const PHONE_NUMBER = "+01892749000";
const EMAIL = "beautyatlantic6@gmail.com";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", company: "", email: "", country: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success(t("contact.success"));
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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("nav.contact")}</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">{t("contact.title")}</h1>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t("contact.subtitle")}</p>
            </div>
          </AnimatedSection>

          <div className="lg:flex gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <AnimatedSection className="lg:w-2/5 mb-10 lg:mb-0">
              <div className="space-y-6">
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{t("contact.emailUs")}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-accent transition-colors">{EMAIL}</p>
                  </div>
                </a>
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-start gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Phone size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{t("contact.callUs")}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-accent transition-colors">{PHONE_NUMBER}</p>
                  </div>
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <MessageCircle size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{t("contact.whatsapp")}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-accent transition-colors">+{WHATSAPP_NUMBER}</p>
                  </div>
                </a>
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

              <div className="mt-8 aspect-video rounded-sm bg-secondary flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Map Placeholder</p>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection className="lg:w-3/5" delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("contact.name")} *</label>
                    <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("contact.company")}</label>
                    <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("contact.email")} *</label>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("contact.country")}</label>
                    <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("contact.message")} *</label>
                  <textarea rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent resize-none" />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {sending ? "Sending..." : t("contact.send")}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
