import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Paintbrush, Clock, Package, Settings, ArrowRight, CheckCircle } from "lucide-react";
import laceCustom from "@/assets/lace-custom.jpg";

const stepIcons = [Paintbrush, Settings, Package, CheckCircle];

export default function CustomService() {
  const { t } = useTranslation();
  const steps = t("customService.steps", { returnObjects: true }) as { title: string; description: string }[];
  const samplingSteps = t("customService.samplingSteps", { returnObjects: true }) as { phase: string; time: string }[];
  const moqData = t("customService.moqData", { returnObjects: true }) as { type: string; moq: string; leadTime: string }[];
  const oemFeatures = t("customService.oemFeatures", { returnObjects: true }) as string[];

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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("customService.heroTag")}</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground max-w-xl">{t("customService.heroTitle")}</h1>
            <p className="mt-4 text-muted-foreground max-w-md">{t("customService.heroDesc")}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Custom Design Process */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("customService.processTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("customService.processTitle")}</h2>
            </div>
          </AnimatedSection>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = stepIcons[i] || CheckCircle;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <span className="text-xs font-semibold text-accent">{t("customService.step")} {i + 1}</span>
                    <h3 className="mt-1 font-serif text-lg font-medium text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sampling Timeline */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("customService.timelineTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("customService.timelineTitle")}</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              {samplingSteps.map((item, i) => (
                <div key={i} className="flex items-center gap-6 py-4 border-b border-border">
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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("customService.orderingTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("customService.orderingTitle")}</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("customService.tableType")}</th>
                    <th className="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("customService.tableMoq")}</th>
                    <th className="text-left py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("customService.tableLeadTime")}</th>
                  </tr>
                </thead>
                <tbody>
                  {moqData.map((row, i) => (
                    <tr key={i} className="border-b border-border/50">
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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("customService.partnershipTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("customService.partnershipTitle")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("customService.partnershipDesc")}</p>
              <ul className="mt-6 space-y-3">
                {oemFeatures.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground">
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
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("customService.ctaTitle")}</h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">{t("customService.ctaDesc")}</p>
            <Link
              to="/quote"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {t("hero.requestQuote")} <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
