import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { getProductBySlug } from "@/data/products";
import { ArrowLeft, Download, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center container mx-auto px-6">
          <h1 className="font-serif text-3xl">Product Not Found</h1>
          <Link to="/products" className="mt-4 inline-flex items-center gap-2 text-accent hover:underline text-sm">
            <ArrowLeft size={14} /> Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  const allImages = product.images;

  const specs = [
    { label: "Lace Type", value: product.category },
    { label: "Composition", value: product.composition },
    { label: "Width", value: product.width },
    { label: "Color Options", value: product.colors.join(", ") },
    { label: "Applications", value: product.applications.join(", ") },
    { label: "MOQ", value: product.moq },
    { label: "Lead Time", value: product.leadTime },
    { label: "Customization", value: product.customizable ? "Available" : "Not available" },
  ];

  const prevImage = () => setActiveImage((i) => (i === 0 ? allImages.length - 1 : i - 1));
  const nextImage = () => setActiveImage((i) => (i === allImages.length - 1 ? 0 : i + 1));

  return (
    <Layout>
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft size={14} /> Back to Products
            </Link>
          </AnimatedSection>

          <div className="lg:flex gap-12">
            {/* Alibaba-style Image Gallery */}
            <AnimatedSection className="lg:w-1/2 mb-8 lg:mb-0">
              {/* Main image with navigation arrows */}
              <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary group">
                <img
                  src={allImages[activeImage]}
                  alt={`${product.name} - Image ${activeImage + 1}`}
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-background"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-background"
                    >
                      <ChevronRight size={20} />
                    </button>
                    {/* Image counter */}
                    <div className="absolute bottom-3 right-3 bg-foreground/70 text-primary-foreground text-xs px-2.5 py-1 rounded-sm">
                      {activeImage + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`shrink-0 w-16 h-16 lg:w-20 lg:h-20 overflow-hidden rounded-sm border-2 transition-all duration-200 ${
                        activeImage === i
                          ? "border-accent ring-1 ring-accent/30"
                          : "border-transparent hover:border-muted-foreground/30"
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </AnimatedSection>

            {/* Product Info */}
            <AnimatedSection className="lg:w-1/2" delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-2">{product.category}</p>
              <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">{product.name}</h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Specs */}
              <div className="mt-8 space-y-0">
                {specs.map((s) => (
                  <div key={s.label} className="flex py-3 border-b border-border">
                    <span className="w-40 shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</span>
                    <span className="text-sm text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={`/quote?product=${encodeURIComponent(product.name)}`}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart size={14} /> Request Quote
                </Link>
                <button className="inline-flex items-center gap-2 rounded-sm border border-border px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-secondary transition-colors">
                  <Download size={14} /> Download Spec PDF
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
