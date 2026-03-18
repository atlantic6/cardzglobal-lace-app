import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const RECIPIENT_EMAIL = "beautyatlantic6@gmail.com";

export default function Quote() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const prefillProduct = searchParams.get("product") || "";

  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", country: "",
    product: prefillProduct, quantity: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.product) {
      toast.error(t("quote.required"));
      return;
    }
    setSending(true);

    const subject = encodeURIComponent(`Quote Request: ${form.product} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nCountry: ${form.country}\nProduct: ${form.product}\nQuantity: ${form.quantity}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`, "_self");

    await new Promise((r) => setTimeout(r, 1000));
    setSuccess(true);
    setSending(false);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  if (success) {
    return (
      <Layout>
        <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="container mx-auto px-6">
            <div className="max-w-lg mx-auto text-center">
              <AnimatedSection>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle size={32} className="text-accent" />
                </div>
                <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("quote.successTitle")}</h1>
                <p className="mt-4 text-muted-foreground">{t("quote.successDesc")}</p>
                <a
                  href="/"
                  className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {t("quote.backToHome")}
                </a>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">RFQ</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">{t("quote.title")}</h1>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t("quote.subtitle")}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("quote.fullName")} *</label>
                  <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("quote.company")}</label>
                  <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("quote.email")} *</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("quote.phone")}</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("quote.country")}</label>
                <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("quote.product")} *</label>
                  <input type="text" value={form.product} onChange={(e) => update("product", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("quote.quantity")}</label>
                  <input type="text" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("quote.details")}</label>
                <textarea rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{t("quote.designRef")}</label>
                <div className="flex items-center justify-center rounded-sm border-2 border-dashed border-border px-4 py-8 text-center cursor-pointer hover:border-accent transition-colors">
                  <p className="text-sm text-muted-foreground">{t("quote.uploadText")}</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {sending ? "..." : <><Send size={14} /> {t("quote.submit")}</>}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
