import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Quote() {
  const [searchParams] = useSearchParams();
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
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
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
                <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">Quote Request Received</h1>
                <p className="mt-4 text-muted-foreground">
                  Thank you for your inquiry! Our team will review your request and get back to you within 24 hours with a detailed quotation.
                </p>
                <a
                  href="/"
                  className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Back to Home
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
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">Request a Quote</h1>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                Fill out the form below and our team will provide a detailed quotation within 24 hours.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Full Name *</label>
                  <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Your full name" />
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
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" placeholder="+1 (234) 567-890" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Country</label>
                <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Your country" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Product of Interest *</label>
                  <input type="text" value={form.product} onChange={(e) => update("product", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" placeholder="e.g. Embroidered Lace" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Quantity (yards)</label>
                  <input type="text" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Estimated quantity" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Additional Details</label>
                <textarea rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent resize-none" placeholder="Colors, patterns, usage, or any specific requirements..." />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Design Reference (optional)</label>
                <div className="flex items-center justify-center rounded-sm border-2 border-dashed border-border px-4 py-8 text-center cursor-pointer hover:border-accent transition-colors">
                  <p className="text-sm text-muted-foreground">Click to upload or drag & drop your design files</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {sending ? "Submitting..." : <><Send size={14} /> Submit Quote Request</>}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
