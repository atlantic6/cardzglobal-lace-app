import { Link } from "react-router-dom";
import { ArrowRight, Award, Globe, Users, Factory } from "lucide-react";
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
  { icon: Factory, value: "18+", label: "Years of Experience" },
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Users, value: "2,000+", label: "Brand Partners" },
  { icon: Award, value: "15+", label: "Quality Certifications" },
];

const Index = () => {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroLace} alt="Luxury lace textile" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 py-32 lg:py-0">
          <div className="max-w-xl">
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-4">Premium Lace Manufacturer</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h1 className="font-serif text-5xl lg:text-7xl font-semibold leading-[1.1] text-foreground">
                Crafting Elegance, Thread by Thread
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
                We design and manufacture exquisite lace textiles for the world's most discerning fashion houses, bridal designers, and luxury brands.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
                >
                  View Products <ArrowRight size={14} />
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 rounded-sm border border-foreground/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-secondary"
                >
                  Request Quote
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">About Us</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">A Legacy of Artisanal Excellence</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                For over 18 years, Lace Atelier has been at the forefront of lace innovation. From our state-of-the-art facility, we combine traditional craftsmanship with modern technology to produce lace of unparalleled quality — trusted by over 2,000 brands worldwide.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Our Collection</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">Browse by Category</h2>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.name} delay={i * 0.1}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group block overflow-hidden rounded-sm bg-card"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-accent transition-colors">{cat.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Featured</p>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">Selected Products</h2>
              </div>
              <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                View All <ArrowRight size={14} />
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
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Applications</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">Where Our Lace Comes to Life</h2>
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
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <s.icon size={28} className="mx-auto mb-3 text-accent" />
                  <p className="font-serif text-3xl font-semibold text-foreground">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
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
              Ready to Create Something Beautiful?
            </h2>
            <p className="mt-4 text-primary-foreground/70 max-w-md mx-auto">
              Share your vision with us. Our team will work closely with you to bring your lace designs to life.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
              >
                Request a Quote <ArrowRight size={14} />
              </Link>
              <Link
                to="/custom-service"
                className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:border-primary-foreground/60"
              >
                Custom Service
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
