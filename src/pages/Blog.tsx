import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "1", slug: "understanding-lace-types", category: "Lace Knowledge",
    title: "Understanding Different Types of Lace: A Comprehensive Guide",
    excerpt: "From Chantilly to Guipure, learn the key differences between lace varieties and their best applications in fashion design.",
    date: "Feb 10, 2025", readTime: "5 min read",
  },
  {
    id: "2", slug: "lace-trends-2025", category: "Trend & Inspiration",
    title: "Lace Trends for 2025: What Designers Need to Know",
    excerpt: "Explore the latest lace trends shaping bridal, haute couture, and ready-to-wear collections this season.",
    date: "Jan 28, 2025", readTime: "4 min read",
  },
  {
    id: "3", slug: "sustainability-in-lace", category: "Company News",
    title: "Our Commitment to Sustainable Lace Manufacturing",
    excerpt: "How Lace Atelier is reducing environmental impact through eco-friendly materials and responsible production practices.",
    date: "Jan 15, 2025", readTime: "6 min read",
  },
  {
    id: "4", slug: "choosing-lace-for-bridal", category: "Lace Knowledge",
    title: "How to Choose the Perfect Lace for Bridal Gowns",
    excerpt: "A designer's guide to selecting lace weight, pattern, and composition for wedding dress collections.",
    date: "Dec 20, 2024", readTime: "7 min read",
  },
];

const blogCategories = ["All", "Lace Knowledge", "Trend & Inspiration", "Company News"];

export default function Blog() {
  return (
    <Layout>
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3">Blog</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">News & Insights</h1>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                Stay informed with the latest lace industry trends, knowledge, and company updates.
              </p>
            </div>
          </AnimatedSection>

          {/* Category Filter */}
          <AnimatedSection>
            <div className="flex justify-center gap-2 mb-12 flex-wrap">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  className="text-xs px-4 py-2 rounded-sm bg-secondary text-muted-foreground hover:text-foreground transition-colors first:bg-primary first:text-primary-foreground"
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <article className="group bg-card rounded-sm p-6 lg:p-8 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">{post.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h2 className="font-serif text-xl lg:text-2xl font-medium text-foreground group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
