import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import {
  products,
  categories,
  ALL_COLORS,
  ALL_COMPOSITIONS,
  ALL_WIDTHS,
  ALL_APPLICATIONS,
  MOQ_RANGES,
  type ApplicationType,
} from "@/data/products";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

type SortOption = "newest" | "popular" | "premium";

interface Filters {
  colors: string[];
  compositions: string[];
  width: string | null;
  applications: ApplicationType[];
  moqIndex: number | null;
}

const emptyFilters: Filters = { colors: [], compositions: [], width: null, applications: [], moqIndex: null };

function FilterSection({ title, open, toggle, children }: { title: string; open: boolean; toggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-border pb-4 mb-4">
      <button onClick={toggle} className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && children}
    </div>
  );
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [openSections, setOpenSections] = useState({ color: true, composition: true, width: true, application: true, moq: true });

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const toggleFilter = <K extends keyof Filters>(key: K, value: string) => {
    setFilters((f) => {
      const arr = f[key] as string[];
      return { ...f, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const activeFilterCount = filters.colors.length + filters.compositions.length + (filters.width ? 1 : 0) + filters.applications.length + (filters.moqIndex !== null ? 1 : 0);

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? [...products] : products.filter((p) => p.category === activeCategory);

    if (filters.colors.length > 0) {
      list = list.filter((p) => filters.colors.some((c) => p.colors.includes(c)));
    }
    if (filters.compositions.length > 0) {
      list = list.filter((p) => filters.compositions.some((c) => p.composition.toLowerCase().includes(c.toLowerCase())));
    }
    if (filters.width) {
      list = list.filter((p) => {
        const wNum = parseInt(p.width);
        if (filters.width === "Narrow (≤20cm)") return wNum <= 20 || p.width.toLowerCase().includes("cm") && wNum <= 20;
        if (filters.width === "Wide (≥130cm)") return wNum >= 130;
        return wNum > 20 && wNum < 130;
      });
    }
    if (filters.applications.length > 0) {
      list = list.filter((p) => filters.applications.some((a) => p.applications.includes(a)));
    }
    if (filters.moqIndex !== null) {
      const range = MOQ_RANGES[filters.moqIndex];
      list = list.filter((p) => {
        const moqNum = parseInt(p.moq) || 0;
        const rMin = range.min ?? 0;
        const rMax = range.max ?? Infinity;
        return moqNum >= rMin && moqNum <= rMax;
      });
    }

    if (sort === "newest") list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sort === "premium") list = list.filter((p) => p.premium);

    return list;
  }, [activeCategory, sort, filters]);

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") searchParams.delete("category");
    else searchParams.set("category", cat);
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setFilters(emptyFilters);
    setActiveCategory("All");
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  const SidebarContent = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("products.filters")}</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="text-xs text-accent hover:underline flex items-center gap-1">
            <X size={10} /> {t("products.clearAll")}
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="border-b border-border pb-4 mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{t("products.categories")}</p>
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => selectCategory("All")}
            className={`text-left text-sm py-1.5 px-2 rounded-sm transition-colors ${activeCategory === "All" ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t("products.allProducts")}
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => selectCategory(c.name)}
              className={`text-left text-sm py-1.5 px-2 rounded-sm transition-colors ${activeCategory === c.name ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="border-b border-border pb-4 mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{t("products.sortBy")}</p>
        <div className="flex flex-col gap-0.5">
          {([["newest", t("products.newest")], ["popular", t("products.popular")], ["premium", t("products.premiumOnly")]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSort(val)}
              className={`text-left text-sm py-1.5 px-2 rounded-sm transition-colors ${sort === val ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Color filter */}
      <FilterSection title={t("products.color")} open={openSections.color} toggle={() => toggleSection("color")}>
        <div className="flex flex-wrap gap-1.5">
          {ALL_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => toggleFilter("colors", color)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filters.colors.includes(color)
                  ? "border-accent bg-accent/10 text-accent font-medium"
                  : "border-border text-muted-foreground hover:border-foreground/40"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Composition filter */}
      <FilterSection title={t("products.composition")} open={openSections.composition} toggle={() => toggleSection("composition")}>
        <div className="flex flex-col gap-1">
          {ALL_COMPOSITIONS.map((comp) => (
            <label key={comp} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={filters.compositions.includes(comp)}
                onChange={() => toggleFilter("compositions", comp)}
                className="rounded border-border accent-accent"
              />
              {comp}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Width filter */}
      <FilterSection title={t("products.width")} open={openSections.width} toggle={() => toggleSection("width")}>
        <div className="flex flex-col gap-1">
          {ALL_WIDTHS.map((w) => (
            <label key={w} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <input
                type="radio"
                name="width"
                checked={filters.width === w}
                onChange={() => setFilters((f) => ({ ...f, width: f.width === w ? null : w }))}
                className="accent-accent"
              />
              {w}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Application filter */}
      <FilterSection title={t("products.application")} open={openSections.application} toggle={() => toggleSection("application")}>
        <div className="flex flex-col gap-1">
          {ALL_APPLICATIONS.map((app) => (
            <label key={app} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={filters.applications.includes(app)}
                onChange={() => toggleFilter("applications", app)}
                className="rounded border-border accent-accent"
              />
              {app}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* MOQ filter */}
      <FilterSection title={t("products.moq")} open={openSections.moq} toggle={() => toggleSection("moq")}>
        <div className="flex flex-col gap-1">
          {MOQ_RANGES.map((range, i) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <input
                type="radio"
                name="moq"
                checked={filters.moqIndex === i}
                onChange={() => setFilters((f) => ({ ...f, moqIndex: f.moqIndex === i ? null : i }))}
                className="accent-accent"
              />
              {range.label}
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <Layout>
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("products.ourCollection")}</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">{t("products.title")}</h1>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t("products.subtitle")}</p>
            </div>
          </AnimatedSection>

          <div className="lg:flex gap-10">
            {/* Sidebar – Desktop */}
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-28">
                <SidebarContent />
              </div>
            </aside>

            <div className="flex-1">
              {/* Mobile filter toggle */}
              <div className="lg:hidden mb-6 flex items-center justify-between">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border px-4 py-2 rounded-sm"
                >
                  <Filter size={15} /> {t("products.filters")}
                  {activeFilterCount > 0 && (
                    <span className="ml-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="newest">{t("products.newest")}</option>
                  <option value="popular">{t("products.popular")}</option>
                  <option value="premium">{t("products.premiumOnly")}</option>
                </select>
              </div>

              {showFilters && (
                <div className="lg:hidden mb-6 p-5 bg-secondary rounded-sm relative">
                  <button onClick={() => setShowFilters(false)} className="absolute top-4 right-4 text-muted-foreground">
                    <X size={16} />
                  </button>
                  <SidebarContent />
                </div>
              )}

              {/* Active filter chips */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {filters.colors.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full border border-accent/30">
                      {c} <button onClick={() => toggleFilter("colors", c)}><X size={10} /></button>
                    </span>
                  ))}
                  {filters.compositions.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full border border-accent/30">
                      {c} <button onClick={() => toggleFilter("compositions", c)}><X size={10} /></button>
                    </span>
                  ))}
                  {filters.width && (
                    <span className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full border border-accent/30">
                      {filters.width} <button onClick={() => setFilters((f) => ({ ...f, width: null }))}><X size={10} /></button>
                    </span>
                  )}
                  {filters.applications.map((a) => (
                    <span key={a} className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full border border-accent/30">
                      {a} <button onClick={() => toggleFilter("applications", a)}><X size={10} /></button>
                    </span>
                  ))}
                  {filters.moqIndex !== null && (
                    <span className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full border border-accent/30">
                      MOQ {MOQ_RANGES[filters.moqIndex].label} <button onClick={() => setFilters((f) => ({ ...f, moqIndex: null }))}><X size={10} /></button>
                    </span>
                  )}
                </div>
              )}

              <p className="text-xs text-muted-foreground mb-6">
                {filtered.length} {filtered.length !== 1 ? t("products.results_plural") : t("products.results")}
              </p>

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
                  <p>{t("products.noProducts")}</p>
                  <button onClick={clearAllFilters} className="mt-4 text-xs text-accent hover:underline">{t("products.clearAll")}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
