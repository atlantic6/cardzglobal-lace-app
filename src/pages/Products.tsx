import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import { products, categories, type LaceCategory } from "@/data/products";
import { Filter, X } from "lucide-react";

type SortOption = "newest" | "popular" | "premium";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? [...products] : products.filter((p) => p.category === activeCategory);
    if (sort === "newest") list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sort === "premium") list = list.filter((p) => p.premium);
    return list;
  }, [activeCategory, sort]);

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") searchParams.delete("category");
    else searchParams.set("category", cat);
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Our Collection</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">Products</h1>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                Explore our extensive range of premium lace textiles, from delicate Chantilly to bold guipure.
              </p>
            </div>
          </AnimatedSection>

          <div className="lg:flex gap-10">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-28">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Categories</h3>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => selectCategory("All")}
                    className={`text-left text-sm py-2 px-3 rounded-sm transition-colors ${activeCategory === "All" ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    All Products
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => selectCategory(c.name)}
                      className={`text-left text-sm py-2 px-3 rounded-sm transition-colors ${activeCategory === c.name ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>

                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-8 mb-4">Sort By</h3>
                <div className="flex flex-col gap-1">
                  {([["newest", "Newest"], ["popular", "Popular"], ["premium", "Premium Only"]] as const).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setSort(val)}
                      className={`text-left text-sm py-2 px-3 rounded-sm transition-colors ${sort === val ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6 flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Filter size={16} /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="premium">Premium Only</option>
              </select>
            </div>

            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-secondary rounded-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Categories</h3>
                  <button onClick={() => setShowFilters(false)}><X size={16} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => selectCategory("All")}
                    className={`text-xs px-3 py-1.5 rounded-sm transition-colors ${activeCategory === "All" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}
                  >
                    All
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => selectCategory(c.name)}
                      className={`text-xs px-3 py-1.5 rounded-sm transition-colors ${activeCategory === c.name ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-6">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
              {filtered.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p, i) => (
                    <AnimatedSection key={p.id} delay={i * 0.05}>
                      <ProductCard product={p} />
                    </AnimatedSection>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-muted-foreground">
                  <p>No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
