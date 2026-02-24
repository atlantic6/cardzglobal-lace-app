import { Link } from "react-router-dom";
import { ArrowRight, Award, Globe, Users, Factory } from "lucide-react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import { categories, getFeaturedProducts, applications } from "@/data/products";
import heroLace from "@/assets/hero-lace.jpg";
import appBridal from "@/assets/app-bridal.jpg";
import appEvening from "@/assets/app-evening.jpg";
import appFashion from "@/assets/app-fashion.jpg";
import appAccessories from "@/assets/app-accessories.jpg";
import appLingerie from "@/assets/app-lingerie.jpg";
import factory from "@/assets/factory.jpg";

const appImages: Record<string, string> = {
  "Bridal & Wedding": appBridal,
  "Lingerie": appLingerie,
  "Evening Dress": appEvening,
  "Fashion Apparel": appFashion,
  "Accessories": appAccessories,
};

const stats = [
  { icon: Factory, value: "18+", labelKey: "home.statYears" },
  { icon: Globe, value: "50+", labelKey: "home.statCountries" },
  { icon: Users, value: "2,000+", labelKey: "home.statPartners" },
  { icon: Award, value: "15+", labelKey: "home.statCerts" },
];

const Index = () => {
  const featured = getFeaturedProducts().slice(0, 4);
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero – reduced height */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroLace} alt="Luxury lace textile" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 py-24 lg:py-0">
          <div className="max-w-xl">
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-4">{t("hero.tagline")}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h1 className="font-serif text-5xl lg:text-7xl font-semibold leading-[1.1] text-foreground">
                {t("hero.headline")}
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
                {t("hero.sub")}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {t("hero.viewProducts")} <ArrowRight size={14} />
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 rounded-sm border border-foreground/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-secondary"
                >
                  {t("hero.requestQuote")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Product Categories – Premium Redesign */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("home.collectionTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("home.browseCategory")}</h2>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto text-sm">{t("home.categorySubtitle")}</p>
            </div>
          </AnimatedSection>

          {/* Top row: 3 large cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-5">
            {categories.slice(0, 3).map((cat, i) => (
              <AnimatedSection key={cat.name} delay={i * 0.1}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-md"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500 group-hover:from-foreground/90" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl font-semibold text-primary-foreground group-hover:translate-y-0 transition-transform duration-300">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-primary-foreground/70 max-w-[80%] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {cat.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      {t("home.explore")} <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Bottom row: 3 smaller cards */}
          <div className="grid gap-5 sm:grid-cols-3">
            {categories.slice(3).map((cat, i) => (
              <AnimatedSection key={cat.name} delay={(i + 3) * 0.1}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group relative block aspect-[3/2] overflow-hidden rounded-md"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500 group-hover:from-foreground/90" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-primary-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {cat.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      {t("home.explore")} <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("home.aboutTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("home.aboutTitle")}</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">{t("home.aboutDesc")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("home.featuredTag")}</p>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("home.featuredTitle")}</h2>
              </div>
              <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                {t("home.viewAll")} <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <ProductCard product={p} />
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              {t("home.viewAll")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("home.appsTag")}</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{t("home.appsTitle")}</h2>
            </div>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {applications.map((app, i) => (
              <AnimatedSection key={app.slug} delay={i * 0.08}>
                <Link
                  to={`/applications/${app.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
                >
                  <img src={appImages[app.name] || factory} alt={app.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-serif text-base font-medium text-primary-foreground">{app.name}</h3>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <AnimatedSection key={s.labelKey} delay={i * 0.1}>
                <div className="text-center">
                  <s.icon size={28} className="mx-auto mb-3 text-accent" />
                  <p className="font-serif text-3xl font-semibold text-foreground">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t(s.labelKey)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={factory} alt="Our factory" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="relative container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl lg:text-5xl font-semibold text-primary-foreground max-w-2xl mx-auto">
              {t("home.ctaTitle")}
            </h2>
            <p className="mt-4 text-primary-foreground/70 max-w-md mx-auto">{t("home.ctaDesc")}</p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t("hero.requestQuote")} <ArrowRight size={14} />
              </Link>
              <Link
                to="/custom-service"
                className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:border-primary-foreground/60"
              >
                {t("nav.customService")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
