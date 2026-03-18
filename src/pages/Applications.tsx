import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import { applications, getProductsByApplication, type Application } from "@/data/products";
import appBridal from "@/assets/app-bridal.jpg";
import appEvening from "@/assets/app-evening.jpg";
import appFashion from "@/assets/app-fashion.jpg";
import appAccessories from "@/assets/app-accessories.jpg";
import appLingerie from "@/assets/app-lingerie.jpg";
import { ArrowRight, ArrowLeft } from "lucide-react";

const appImages: Record<string, string> = {
  "Bridal & Wedding": appBridal,
  "Lingerie": appLingerie,
  "Evening Dress": appEvening,
  "Fashion Apparel": appFashion,
  "Accessories": appAccessories,
};

export default function Applications() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  if (slug) {
    const app = applications.find((a) => a.slug === slug);
    if (!app) {
      return (
        <Layout>
          <div className="pt-32 pb-20 text-center container mx-auto px-6">
            <h1 className="font-serif text-3xl">{t("applications.notFound")}</h1>
            <Link to="/applications" className="mt-4 inline-flex items-center gap-2 text-accent hover:underline text-sm">
              <ArrowLeft size={14} /> {t("applications.backToApplications")}
            </Link>
          </div>
        </Layout>
      );
    }

    const related = getProductsByApplication(app.name as Application);

    return (
      <Layout>
        <section className="relative pt-28 pb-20 lg:pt-0 lg:pb-0 lg:min-h-[60vh] flex items-center">
          <div className="absolute inset-0">
            <img src={appImages[app.name]} alt={app.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
          </div>
          <div className="relative container mx-auto px-6 py-20">
            <Link to="/applications" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft size={14} /> {t("applications.allApplications")}
            </Link>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">{app.name}</h1>
            <p className="mt-4 text-muted-foreground max-w-md">{app.description}</p>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-10">{t("applications.relatedProducts")}</h2>
            {related.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p, i) => (
                  <AnimatedSection key={p.id} delay={i * 0.05}>
                    <ProductCard product={p} />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                {t("applications.noProducts")} <Link to="/contact" className="text-accent hover:underline">{t("applications.contactUs")}</Link> {t("applications.forCustom")}
              </p>
            )}
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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("applications.heroTag")}</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">{t("applications.heroTitle")}</h1>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t("applications.heroDesc")}</p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app, i) => (
              <AnimatedSection key={app.slug} delay={i * 0.1}>
                <Link
                  to={`/applications/${app.slug}`}
                  className="group block overflow-hidden rounded-sm bg-card"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={appImages[app.name]} alt={app.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors">{app.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{app.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                      {t("home.explore")} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
