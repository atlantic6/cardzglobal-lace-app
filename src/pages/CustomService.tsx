import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Paintbrush, Clock, Package, Settings, ArrowRight, CheckCircle } from "lucide-react";
import laceCustom from "@/assets/lace-custom.jpg";

const processSteps = [
  { icon: Paintbrush, title: "Share Your Vision", description: "Send us your design sketches, mood boards, or reference images. Our team reviews and provides feedback." },
  { icon: Settings, title: "Design Development", description: "Our designers create digital patterns and prototypes based on your requirements." },
  { icon: Package, title: "Sampling", description: "We produce physical samples for your approval. Iterations are included until you're satisfied." },
  { icon: CheckCircle, title: "Production", description: "Once approved, we begin bulk production with strict quality control at every stage." },
];

const samplingTimeline = [
  { phase: "Design Review", time: "2–3 days" },
  { phase: "Pattern Development", time: "5–7 days" },
  { phase: "First Sample", time: "7–10 days" },
  { phase: "Revisions (if needed)", time: "3–5 days" },
  { phase: "Final Approval Sample", time: "5–7 days" },
];

const moqData = [
  { type: "Standard Designs", moq: "200–500 yards", leadTime: "10–20 days" },
  { type: "Custom Colors", moq: "300–500 yards", leadTime: "15–25 days" },
  { type: "Custom Patterns", moq: "500–1,000 yards", leadTime: "25–35 days" },
  { type: "Bespoke / Exclusive", moq: "Negotiable", leadTime: "30–45 days" },
];

export default function CustomService() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-0 lg:pb-0 lg:min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src={laceCustom} alt="Custom lace design" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="relative container mx-auto px-6 py-20">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Custom Service</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground max-w-xl">Your Vision, Our Craft</h1>
            <p className="mt-4 text-muted-foreground max-w-md">
              From custom designs to OEM/ODM partnerships, we bring your lace concepts to life with precision and artistry.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Custom Design Process */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Process</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">Custom Design Process</h2>
            </div>
          </AnimatedSection>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                    <step.icon size={24} className="text-accent" />
                  </div>
                  <span className="text-xs font-semibold text-accent">Step {i + 1}</span>
                  <h3 className="mt-1 font-serif text-lg font-medium text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sampling Timeline */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Timeline</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">Sampling Process</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              {samplingTimeline.map((item, i) => (
                <div key={item.phase} className="flex items-center gap-6 py-4 border-b border-border">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.phase}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MOQ & Lead Time */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Ordering</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">MOQ & Lead Time</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Type</th>
                    <th className="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">MOQ</th>
                    <th className="text-left py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Lead Time</th>
                  </tr>
                </thead>
                <tbody>
                  {moqData.map((row) => (
                    <tr key={row.type} className="border-b border-border/50">
                      <td className="py-3 pr-4 font-medium text-foreground">{row.type}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{row.moq}</td>
                      <td className="py-3 text-muted-foreground">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* OEM/ODM */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="lg:flex gap-12 items-center">
            <AnimatedSection className="lg:w-1/2 mb-8 lg:mb-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Partnership</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">OEM / ODM Service</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We offer comprehensive OEM and ODM services for brands looking for a trusted manufacturing partner. From concept to delivery, our team ensures consistent quality and on-time fulfillment.
              </p>
              <ul className="mt-6 space-y-3">
                {["Exclusive pattern development", "Private label manufacturing", "Dedicated account management", "Flexible order quantities", "Global logistics support"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle size={16} className="text-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection className="lg:w-1/2" delay={0.15}>
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                <img src={laceCustom} alt="OEM/ODM service" className="h-full w-full object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">Start Your Custom Project</h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Tell us about your design needs and let's create something extraordinary together.
            </p>
            <Link
              to="/quote"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Request a Quote <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
