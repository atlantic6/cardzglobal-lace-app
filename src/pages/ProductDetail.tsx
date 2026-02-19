import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { getProductBySlug } from "@/data/products";
import { ArrowLeft, Download, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");

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
            {/* Image Gallery */}
            <AnimatedSection className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="aspect-square overflow-hidden rounded-sm bg-secondary">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              {product.images.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {product.images.map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-sm bg-secondary cursor-pointer border-2 border-transparent hover:border-accent transition-colors">
                      <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                    </div>
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
