import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, ArrowLeft, Clock, Tag, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import laceChantilly from "@/assets/lace-chantilly.jpg";
import laceGuipure from "@/assets/lace-guipure.jpg";
import laceEmbroidered from "@/assets/lace-embroidered.jpg";
import laceCord from "@/assets/lace-cord.jpg";
import factory from "@/assets/factory.jpg";

type BlogCategory = "All" | "Lace Knowledge" | "Trend & Inspiration" | "Company News";

interface BlogPost {
  id: string;
  slug: string;
  category: Exclude<BlogCategory, "All">;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "understanding-lace-types",
    category: "Lace Knowledge",
    title: "Understanding Different Types of Lace: A Comprehensive Guide",
    excerpt: "From Chantilly to Guipure, learn the key differences between lace varieties and their best applications in fashion design.",
    content: `
Lace has been a symbol of luxury and elegance for centuries. Today's fashion industry relies on a wide variety of lace types, each with unique characteristics suited to different applications.

**Chantilly Lace**
Originating from the city of Chantilly in France, this delicate lace is characterized by its fine, hexagonal mesh ground and intricate floral motifs. The fine silk or nylon threads create a lightweight, semi-transparent fabric ideal for bridal gowns, lingerie, and evening wear. Its defining feature is the outlined motif achieved through careful thread work.

**Guipure Lace**
Unlike Chantilly, Guipure lace has no net background. The motifs are connected to each other by bars or brides, creating a heavier, more structured fabric. This makes it excellent for statement fashion pieces, structured wedding dresses, and high-fashion garments where dramatic visual impact is desired.

**Embroidered Lace**
Embroidered lace is created by applying embroidery stitches onto a base fabric such as tulle or organza. This allows for incredible design flexibility, including 3D effects, metallic threads, and beading. It's widely used in bridal, evening wear, and luxury ready-to-wear.

**Cord Lace**
Cord lace features designs outlined with a heavier cord or thread, giving it a bold, dimensional quality. Often seen in African fashion and contemporary design, cord lace creates strong visual patterns with a sculptural quality.

**Elastic Lace**
Designed with stretch fibers woven into the structure, elastic lace combines beauty with function. Essential for lingerie, swimwear, and activewear, it provides comfortable stretch without sacrificing aesthetic appeal.

**Choosing the Right Lace**
When selecting lace for your collection, consider the garment's purpose, the desired drape, the level of structure needed, and the composition requirements. Our team at Cardzglobal Limited is always available to guide you through the selection process.
    `,
    date: "Feb 10, 2025",
    readTime: "5 min read",
    image: laceChantilly,
    tags: ["Lace Types", "Chantilly", "Guipure", "Education"],
  },
  {
    id: "2",
    slug: "lace-trends-2025",
    category: "Trend & Inspiration",
    title: "Lace Trends for 2025: What Designers Need to Know",
    excerpt: "Explore the latest lace trends shaping bridal, haute couture, and ready-to-wear collections this season.",
    content: `
The 2025 fashion season has brought exciting new directions for lace in both bridal and ready-to-wear markets. Here's what's dominating the runways and showrooms.

**3D Dimensional Textures**
Flat lace is giving way to textured, dimensional alternatives. Designers are gravitating toward raised embroidery, floral appliqués, and sculpted guipure that creates visual depth and tactile interest.

**Sustainability Meets Luxury**
Eco-conscious lace is no longer a compromise. Brands are demanding lace woven from recycled nylon, organic cotton, and Tencel blends. At Cardzglobal Limited, we've expanded our sustainable range to meet this growing demand.

**Oversized Motifs**
Gone are the days of all-over petit motifs. 2025 sees bold, architectural patterns with large-scale florals, geometric shapes, and abstract designs making a statement in both bridal and evening wear.

**Color Exploration**
While white and ivory remain bridal staples, 2025 sees a surge in colored lace — champagne, blush, dusty rose, and even deep jewel tones like sapphire and emerald finding their way into wedding collections.

**Lace as a Main Fabric**
Lace is no longer reserved for overlay or trim; it's being used as the primary fabric in entire garments. Structural guipure dresses, cord lace coordinates, and embroidered gowns are all on-trend.

**Digital Customization**
With advances in digital printing and weaving technology, fully custom lace designs are more accessible than ever. Brands can now develop exclusive patterns at lower minimums, opening new creative possibilities.
    `,
    date: "Jan 28, 2025",
    readTime: "4 min read",
    image: laceEmbroidered,
    tags: ["Trends 2025", "Bridal", "Haute Couture", "Design"],
  },
  {
    id: "3",
    slug: "sustainability-in-lace",
    category: "Company News",
    title: "Our Commitment to Sustainable Lace Manufacturing",
    excerpt: "How Cardzglobal Limited is reducing environmental impact through eco-friendly materials and responsible production practices.",
    content: `
At Cardzglobal Limited, we believe that exceptional quality and environmental responsibility go hand in hand. Over the past three years, we've made significant investments in sustainability across every aspect of our manufacturing process.

**Eco-Friendly Materials**
We've introduced a full line of lace fabrics made from recycled nylon (Econyl®), organic cotton certified by GOTS, and OEKO-TEX® certified polyester. These materials meet the highest environmental and safety standards without compromising on quality.

**Water Conservation**
Our dyeing and finishing processes have been upgraded to closed-loop water systems that recycle and treat water before discharge. This has reduced our water consumption by 40% compared to industry averages.

**Energy Efficiency**
In 2024, we installed solar panels across our manufacturing facility, now generating 35% of our total energy needs from renewable sources. We aim to reach 60% renewable energy by 2027.

**Reducing Waste**
Fabric waste from our production processes is collected and repurposed — cutting room scraps are donated to local artisan cooperatives, and damaged samples are recycled into padding materials.

**Packaging Innovation**
We've transitioned to fully recyclable packaging for all sample and shipment materials, eliminating single-use plastics from our supply chain.

**Looking Forward**
Our goal is to achieve carbon-neutral manufacturing by 2030. We're currently working with third-party consultants to map our complete carbon footprint and identify additional reduction opportunities.
    `,
    date: "Jan 15, 2025",
    readTime: "6 min read",
    image: factory,
    tags: ["Sustainability", "Eco-Friendly", "Company", "Environment"],
  },
  {
    id: "4",
    slug: "choosing-lace-for-bridal",
    category: "Lace Knowledge",
    title: "How to Choose the Perfect Lace for Bridal Gowns",
    excerpt: "A designer's guide to selecting lace weight, pattern, and composition for wedding dress collections.",
    content: `
Selecting the right lace for a bridal gown is one of the most important decisions a wedding dress designer makes. The lace defines not just the look, but the feel, movement, and longevity of the garment.

**Consider the Silhouette**
Different lace types suit different silhouettes. Lightweight Chantilly flows beautifully in A-line and empire cuts. Heavy guipure works best in structured ball gowns. Elastic lace adapts perfectly to fitted mermaid styles.

**Weight and Drape**
Test lace drape by holding a sample at arm's length. Lace that collapses into graceful folds will perform well in flowing designs. Lace that holds its shape will work better in structured or corseted gowns.

**Pattern Scale**
Consider the bride's size and the gown's overall scale. Large-scale motifs can overwhelm a petite figure but create stunning impact on a full-length train. Small, allover patterns provide a consistently elegant look regardless of size.

**Composition Matters**
- Silk-based lace: Most luxurious feel, breathable, but delicate and expensive
- Nylon/polyester lace: Durable, wash-friendly, excellent value, wide range of designs
- Cotton lace: Natural, breathable, slightly stiffer, excellent for structure
- Blend compositions: Best of multiple worlds, the most versatile option

**Edge Treatments**
Consider how the lace edge will be finished. Scalloped edges eliminate the need for hemming and create beautiful natural borders. Straight edges require finishing but offer more design flexibility.

**Testing Before Commitment**
Always request samples before placing bulk orders. Test the lace against your proposed lining fabric, check how it responds to pressing, and assess colorfastness with a water test.

Our sampling service at Cardzglobal Limited provides up to 5 meters of any design for evaluation before commitment to a full order.
    `,
    date: "Dec 20, 2024",
    readTime: "7 min read",
    image: laceGuipure,
    tags: ["Bridal", "Selection Guide", "Wedding", "Tips"],
  },
  {
    id: "5",
    slug: "cord-lace-fashion-guide",
    category: "Trend & Inspiration",
    title: "Cord Lace in Contemporary Fashion: Bold Statements for Modern Designers",
    excerpt: "How cord lace is making its mark beyond traditional applications, influencing global fashion from Africa to Europe.",
    content: `
Cord lace — once primarily associated with traditional African occasion wear — has undergone a remarkable transformation, emerging as a global fashion statement embraced by designers from Lagos to London.

**The African Heritage**
Cord lace, also known as chemical lace or water-soluble lace, has deep roots in West African fashion culture. Worn at weddings, ceremonies, and celebrations, it carries rich cultural significance while providing dramatic visual impact.

**Global Fashion Adoption**
International designers have recognized cord lace's unique qualities: its bold patterns, dimensional surface, and ability to hold structure. It now appears on runways in Europe and America, often paired with contemporary silhouettes.

**Design Versatility**
Modern cord lace comes in an extraordinary range of patterns — from geometric and abstract to botanicals and contemporary prints. The available colorways have expanded dramatically, with metallic, ombré, and multicolor options now available.

**Styling Contemporary Cord Lace**
- Tone-on-tone: matching cord lace to a mono garment for sophisticated texture
- Contrast blocking: using cord lace as a feature panel against solid fabrics
- All-over statements: cord lace jumpsuits, dresses, and coordinates
- Mixed media: combining cord lace with leather, denim, or technical fabrics

**For Designers and Buyers**
When sourcing cord lace for your collection, consider pattern scale, backing requirements, and care instructions. Our team at Cardzglobal Limited can advise on the best approaches for your specific designs.
    `,
    date: "Dec 5, 2024",
    readTime: "5 min read",
    image: laceCord,
    tags: ["Cord Lace", "Fashion", "Africa", "Contemporary"],
  },
  {
    id: "6",
    slug: "elastic-lace-lingerie",
    category: "Lace Knowledge",
    title: "Elastic Lace for Lingerie: Comfort, Function and Style",
    excerpt: "Everything brands and designers need to know about specifying elastic lace for lingerie collections.",
    content: `
Elastic lace has become the backbone of modern lingerie design, combining the aesthetic appeal of traditional lace with the functionality required by today's consumers.

**How Elastic Lace is Made**
Unlike traditional lace woven on a solid base, elastic lace incorporates spandex or elastane fibers directly into the weave structure. This creates a fabric that stretches in one or both directions while maintaining its decorative pattern.

**Key Performance Properties**
- Stretch percentage: typically 30–120% depending on spandex content
- Recovery: how well the lace returns to its original dimensions
- Elongation at break: important for durability
- Soft hand: critical for skin-contact comfort

**Composition Ranges**
Standard elastic lace typically features:
- 80–90% Nylon for strength and dyeability
- 10–20% Spandex for stretch

Premium options may incorporate:
- Modal or Tencel for ultra-soft hand
- Organic cotton for natural-fiber preference
- Recycled nylon for sustainable collections

**Width Options**
- Narrow (1–5cm): Waistbands, trim, strap accents
- Medium (6–20cm): Cup edges, side panels
- Wide (20cm+): Bralette body, brief sides

**Care and Durability**
Elastic lace should be tested for: chlorine bleach resistance, wash durability (typically 50+ wash cycles), ozone resistance for storage longevity, and UV resistance for swimwear applications.

**Cardzglobal Limited Elastic Range**
We offer over 200 elastic lace styles from stock, with custom development available for orders above 500m. Lead times for custom elastic lace start at 3 weeks.
    `,
    date: "Nov 22, 2024",
    readTime: "6 min read",
    image: laceEmbroidered,
    tags: ["Elastic Lace", "Lingerie", "Technical", "Guide"],
  },
];

// ── Blog Detail Page ──────────────────────────────────────────────────────────
function BlogDetail({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);
  const { t } = useTranslation();
  if (!post) return (
    <Layout>
      <section className="pt-36 pb-20 container mx-auto px-6 text-center">
        <h1 className="font-serif text-3xl text-foreground">{t("blog.postNotFound")}</h1>
        <button onClick={() => navigate("/blog")} className="mt-6 text-accent hover:underline">← {t("blog.backToBlog")}</button>
      </section>
    </Layout>
  );

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-72 lg:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
          <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-accent mb-2">{post.category}</span>
          <h1 className="font-serif text-2xl lg:text-4xl font-semibold text-primary-foreground max-w-3xl">{post.title}</h1>
          <div className="flex items-center gap-4 mt-3 text-primary-foreground/70 text-xs">
            <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <button onClick={() => navigate("/blog")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </button>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 bg-secondary rounded-full text-muted-foreground">
                  <Tag size={9} />{tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-sm max-w-none">
              {post.content.split('\n').map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="mb-4" />;
                if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                  return <h3 key={i} className="font-serif text-xl font-semibold text-foreground mt-8 mb-3">{trimmed.replace(/\*\*/g, '')}</h3>;
                }
                if (trimmed.startsWith('- ')) {
                  return <li key={i} className="text-muted-foreground leading-relaxed ml-4 mb-1">{trimmed.replace('- ', '')}</li>;
                }
                return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{trimmed}</p>;
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 p-6 bg-secondary rounded-sm text-center">
              <h4 className="font-serif text-lg font-medium text-foreground mb-2">Interested in our lace products?</h4>
              <p className="text-sm text-muted-foreground mb-4">Request samples or a custom quote from our team.</p>
              <Link to="/quote" className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity">
                Request a Quote <ArrowRight size={12} />
              </Link>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="mt-14">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Related Articles</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link key={r.id} to={`/blog/${r.slug}`} className="group block overflow-hidden rounded-sm bg-card">
                      <div className="aspect-video overflow-hidden">
                        <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">{r.category}</span>
                        <h4 className="font-serif text-base font-medium text-foreground group-hover:text-accent transition-colors mt-1">{r.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{r.date} · {r.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

// ── Blog List Page ────────────────────────────────────────────────────────────
export default function Blog() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [search, setSearch] = useState("");

  const categories: BlogCategory[] = ["All", "Lace Knowledge", "Trend & Inspiration", "Company News"];

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  if (slug) return <BlogDetail slug={slug} />;

  return (
    <Layout>
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">{t("nav.blog")}</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">{t("blog.title")}</h1>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t("blog.subtitle")}</p>
            </div>
          </AnimatedSection>

          {/* Search + Filter bar */}
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("blog.search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 text-sm rounded-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                />
              </div>
              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs px-4 py-2 rounded-sm transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat === "All" ? t("blog.all") : cat === "Lace Knowledge" ? t("blog.laceKnowledge") : cat === "Trend & Inspiration" ? t("blog.trend") : t("blog.news")}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Featured post */}
          {activeCategory === "All" && !search && (
            <AnimatedSection>
              <Link to={`/blog/${filtered[0].slug}`} className="group block overflow-hidden rounded-sm bg-card mb-10 lg:flex">
                <div className="lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden">
                  <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-3">{filtered[0].category}</span>
                  <h2 className="font-serif text-2xl lg:text-3xl font-medium text-foreground group-hover:text-accent transition-colors">{filtered[0].title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{filtered[0].excerpt}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{filtered[0].date} · {filtered[0].readTime}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                      {t("blog.readMore")} <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )}

          {/* Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(activeCategory === "All" && !search ? filtered.slice(1) : filtered).map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.08}>
                <Link to={`/blog/${post.slug}`} className="group block overflow-hidden rounded-sm bg-card hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">{post.category}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h2 className="font-serif text-lg font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={11} />{post.readTime}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                        {t("blog.readMore")} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
