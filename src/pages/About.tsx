import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Award, Globe, Users, Factory as FactoryIcon, Shield, CheckCircle, ArrowRight, Eye, Target } from "lucide-react";
import factory from "@/assets/factory.jpg";
import heroLace from "@/assets/hero-lace.jpg";

const certifications = [
  "OEKO-TEX Standard 100",
  "ISO 9001:2015",
  "ISO 14001",
  "GOTS Certified",
  "BSCI Audited",
  "Sedex Member",
];

const whyChooseIcons = [Award, Globe, Shield, Users];

export default function About() {
  const { t } = useTranslation();
  const qcSteps = t("about.qcSteps", { returnObjects: true }) as string[];
  const whyChoose = t("about.whyChoose", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-0 lg:pb-0 lg:min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src={factory} alt="Our facility" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="relative container mx-auto px-6 py-20">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("about.heroTag")}</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground max-w-xl">{t("about.heroTitle")}</h1>
            <p className="mt-4 text-muted-foreground max-w-md">{t("about.heroDesc")}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="lg:flex gap-12 items-center">
            <AnimatedSection className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="aspect-[4/3] overflow-hidden rounded-sm">
                <img src={heroLace} alt="Our lace craftsmanship" className="h-full w-full object-cover" />
              </div>
            </AnimatedSection>
            <AnimatedSection className="lg:w-1/2" delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("about.storyTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("about.storyTitle")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.storyDesc")}</p>
              <div className="mt-6 flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Eye size={20} className="text-accent" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("about.vision")}</p>
                    <p className="text-sm font-medium text-foreground">{t("about.visionText")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Target size={20} className="text-accent" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("about.mission")}</p>
                    <p className="text-sm font-medium text-foreground">{t("about.missionText")}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Factory & Equipment */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("about.facilitiesTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("about.facilitiesTitle")}</h2>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t("about.facilitiesDesc")}</p>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "20,000 sqm", subtitle: t("about.facility") },
              { title: "50+", subtitle: t("about.machines") },
              { title: "200+", subtitle: t("about.artisans") },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-card p-8 rounded-sm text-center">
                  <p className="font-serif text-3xl font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("about.qualityTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("about.qualityTitle")}</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-2xl mx-auto">
            {qcSteps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="flex items-center gap-4 py-4 border-b border-border/50">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium text-foreground">{step}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("about.certsTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("about.certsTitle")}</h2>
            </div>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
            {certifications.map((cert, i) => (
              <AnimatedSection key={cert} delay={i * 0.08}>
                <div className="flex items-center gap-3 bg-card p-4 rounded-sm">
                  <Shield size={18} className="text-accent shrink-0" />
                  <p className="text-sm font-medium text-foreground">{cert}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("about.advantagesTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("about.advantagesTitle")}</h2>
            </div>
          </AnimatedSection>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item, i) => {
              const Icon = whyChooseIcons[i] || Award;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {t("about.partnerWithUs")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
