import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Package, FolderOpen, FileText, Mail, MessageSquare, LogOut, Plus, Pencil, Trash2, Check, Star, Search,
} from "lucide-react";
import { ImageUpload, MultiImageUpload } from "@/components/admin/ImageUpload";
import type { Tables } from "@/integrations/supabase/types";

type Tab = "products" | "categories" | "blog" | "contacts" | "quotes";

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login", { replace: true });
    }
  }, [loading, user, isAdmin, navigate]);

  const [activeTab, setActiveTab] = useState<Tab>("products");

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div>;
  if (!user || !isAdmin) return null;

  const tabs: { key: Tab; label: string; icon: typeof Package }[] = [
    { key: "products", label: "Products", icon: Package },
    { key: "categories", label: "Categories", icon: FolderOpen },
    { key: "blog", label: "Blog Posts", icon: FileText },
    { key: "contacts", label: "Contact Messages", icon: Mail },
    { key: "quotes", label: "Quote Requests", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="font-serif text-lg font-semibold text-foreground">Cardzglobal</a>
          <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">{user.email}</span>
          <button onClick={() => { signOut(); navigate("/"); }} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-border bg-card min-h-[calc(100vh-57px)] p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-sm transition-colors ${
                  activeTab === tab.key ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "products" && <ProductsManager />}
          {activeTab === "categories" && <CategoriesManager />}
          {activeTab === "blog" && <BlogManager />}
          {activeTab === "contacts" && <ContactsManager />}
          {activeTab === "quotes" && <QuotesManager />}
        </main>
      </div>
    </div>
  );
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

function ProductsManager() {
  const [products, setProducts] = useState<Tables<"products">[]>([]);
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [editing, setEditing] = useState<Tables<"products"> | null>(null);
  const [creating, setCreating] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    setLoadingData(true);
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from("products").select("*").order("display_order"),
      supabase.from("categories").select("*").order("display_order"),
    ]);
    setProducts(prods || []);
    setCategories(cats || []);
    setLoadingData(false);
  };

  useEffect(() => { fetchData(); }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast.success("Product deleted");
    fetchData();
  };

  const togglePublish = async (p: Tables<"products">) => {
    await supabase.from("products").update({ is_published: !p.is_published }).eq("id", p.id);
    toast.success(p.is_published ? "Unpublished" : "Published");
    fetchData();
  };

  const toggleFeatured = async (p: Tables<"products">) => {
    await supabase.from("products").update({ is_featured: !p.is_featured }).eq("id", p.id);
    fetchData();
  };

  if (creating || editing) {
    return (
      <ProductForm
        product={editing}
        categories={categories}
        onSave={() => { setCreating(false); setEditing(null); fetchData(); }}
        onCancel={() => { setCreating(false); setEditing(null); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-foreground">Products ({products.length})</h2>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90">
          <Plus size={14} /> Add Product
        </button>
      </div>
      {loadingData ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="border border-border rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Featured</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const cat = categories.find((c) => c.id === p.category_id);
                return (
                  <tr key={p.id} className="border-t border-border hover:bg-secondary/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.images && p.images[0] && (
                          <img src={p.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{cat?.name || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => togglePublish(p)} className={`text-xs px-2 py-0.5 rounded-full ${p.is_published ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {p.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleFeatured(p)}>
                        <Star size={16} className={p.is_featured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => setEditing(p)} className="p-1.5 hover:bg-secondary rounded"><Pencil size={14} /></button>
                        <button onClick={() => deleteProduct(p.id)} className="p-1.5 hover:bg-red-50 rounded text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {products.length === 0 && <p className="text-center py-8 text-muted-foreground">No products yet. Add your first product.</p>}
        </div>
      )}
    </div>
  );
}

function ProductForm({ product, categories, onSave, onCancel }: {
  product: Tables<"products"> | null;
  categories: Tables<"categories">[];
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    short_description: product?.short_description || "",
    category_id: product?.category_id || "",
    images: (product?.images || []).join("\n"),
    colors: (product?.colors || []).join(", "),
    compositions: (product?.compositions || []).join(", "),
    widths: (product?.widths || []).join(", "),
    moq: product?.moq || "",
    price_range: product?.price_range || "",
    is_featured: product?.is_featured || false,
    is_published: product?.is_published ?? true,
    display_order: product?.display_order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.slug) { toast.error("Name and slug are required"); return; }
    setSaving(true);
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      short_description: form.short_description || null,
      category_id: form.category_id || null,
      images: form.images.split("\n").map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(",").map((s) => s.trim()).filter(Boolean),
      compositions: form.compositions.split(",").map((s) => s.trim()).filter(Boolean),
      widths: form.widths.split(",").map((s) => s.trim()).filter(Boolean),
      moq: form.moq || null,
      price_range: form.price_range || null,
      is_featured: form.is_featured,
      is_published: form.is_published,
      display_order: form.display_order,
    };

    if (product) {
      const { error } = await supabase.from("products").update(payload).eq("id", product.id);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Product updated");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Product created");
    }
    setSaving(false);
    onSave();
  };

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-foreground">{product ? "Edit Product" : "New Product"}</h2>
        <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
      </div>
      <div className="max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name *" value={form.name} onChange={(v) => update("name", v)} />
          <Field label="Slug *" value={form.slug} onChange={(v) => update("slug", v)} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Category</label>
          <select value={form.category_id} onChange={(e) => update("category_id", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm">
            <option value="">— None —</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <Field label="Short Description" value={form.short_description} onChange={(v) => update("short_description", v)} />
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Description</label>
          <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm resize-none" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Image URLs (one per line)</label>
          <textarea rows={4} value={form.images} onChange={(e) => update("images", e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm resize-none font-mono text-xs" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Colors (comma-separated)" value={form.colors} onChange={(v) => update("colors", v)} />
          <Field label="Compositions (comma-separated)" value={form.compositions} onChange={(v) => update("compositions", v)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Widths (comma-separated)" value={form.widths} onChange={(v) => update("widths", v)} />
          <Field label="MOQ" value={form.moq} onChange={(v) => update("moq", v)} />
          <Field label="Price Range" value={form.price_range} onChange={(v) => update("price_range", v)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Display Order" value={String(form.display_order)} onChange={(v) => update("display_order", parseInt(v) || 0)} />
          <div className="flex items-center gap-3 pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="checkbox" checked={form.is_published} onChange={(e) => update("is_published", e.target.checked)} className="accent-accent" />
              Published
            </label>
          </div>
          <div className="flex items-center gap-3 pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => update("is_featured", e.target.checked)} className="accent-accent" />
              Featured
            </label>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:opacity-50">
            {saving ? "Saving..." : product ? "Update Product" : "Create Product"}
          </button>
          <button onClick={onCancel} className="rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────

function CategoriesManager() {
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [editing, setEditing] = useState<Tables<"categories"> | null>(null);
  const [creating, setCreating] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    setLoadingData(true);
    const { data } = await supabase.from("categories").select("*").order("display_order");
    setCategories(data || []);
    setLoadingData(false);
  };

  useEffect(() => { fetchData(); }, []);

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await supabase.from("categories").delete().eq("id", id);
    toast.success("Category deleted");
    fetchData();
  };

  if (creating || editing) {
    return (
      <CategoryForm
        category={editing}
        onSave={() => { setCreating(false); setEditing(null); fetchData(); }}
        onCancel={() => { setCreating(false); setEditing(null); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-foreground">Categories ({categories.length})</h2>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90">
          <Plus size={14} /> Add Category
        </button>
      </div>
      {loadingData ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.id} className="border border-border rounded-sm p-4 bg-card">
              {c.image_url && <img src={c.image_url} alt={c.name} className="w-full h-32 object-cover rounded-sm mb-3" />}
              <h3 className="font-medium text-foreground">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.slug}</p>
              {c.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{c.description}</p>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => setEditing(c)} className="text-xs text-accent hover:underline flex items-center gap-1"><Pencil size={12} /> Edit</button>
                <button onClick={() => deleteCategory(c.id)} className="text-xs text-red-500 hover:underline flex items-center gap-1"><Trash2 size={12} /> Delete</button>
              </div>
            </div>
          ))}
          {categories.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No categories yet.</p>}
        </div>
      )}
    </div>
  );
}

function CategoryForm({ category, onSave, onCancel }: {
  category: Tables<"categories"> | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    image_url: category?.image_url || "",
    display_order: category?.display_order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.slug) { toast.error("Name and slug required"); return; }
    setSaving(true);
    const payload = { name: form.name, slug: form.slug, description: form.description || null, image_url: form.image_url || null, display_order: form.display_order };
    if (category) {
      await supabase.from("categories").update(payload).eq("id", category.id);
      toast.success("Category updated");
    } else {
      await supabase.from("categories").insert(payload);
      toast.success("Category created");
    }
    setSaving(false);
    onSave();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-foreground">{category ? "Edit Category" : "New Category"}</h2>
        <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
      </div>
      <div className="max-w-lg space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name *" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
          <Field label="Slug *" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} />
        </div>
        <Field label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} />
        <Field label="Image URL" value={form.image_url} onChange={(v) => setForm((f) => ({ ...f, image_url: v }))} />
        <Field label="Display Order" value={String(form.display_order)} onChange={(v) => setForm((f) => ({ ...f, display_order: parseInt(v) || 0 }))} />
        <div className="flex gap-3 pt-4">
          <button onClick={handleSave} disabled={saving} className="rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:opacity-50">
            {saving ? "Saving..." : category ? "Update" : "Create"}
          </button>
          <button onClick={onCancel} className="rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── BLOG POSTS ──────────────────────────────────────────────────────────────

function BlogManager() {
  const [posts, setPosts] = useState<Tables<"blog_posts">[]>([]);
  const [editing, setEditing] = useState<Tables<"blog_posts"> | null>(null);
  const [creating, setCreating] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    setLoadingData(true);
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoadingData(false);
  };

  useEffect(() => { fetchData(); }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Post deleted");
    fetchData();
  };

  const togglePublish = async (p: Tables<"blog_posts">) => {
    await supabase.from("blog_posts").update({
      is_published: !p.is_published,
      published_at: !p.is_published ? new Date().toISOString() : null,
    }).eq("id", p.id);
    toast.success(p.is_published ? "Unpublished" : "Published");
    fetchData();
  };

  if (creating || editing) {
    return (
      <BlogForm
        post={editing}
        onSave={() => { setCreating(false); setEditing(null); fetchData(); }}
        onCancel={() => { setCreating(false); setEditing(null); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-foreground">Blog Posts ({posts.length})</h2>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90">
          <Plus size={14} /> New Post
        </button>
      </div>
      {loadingData ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="border border-border rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-secondary/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => togglePublish(p)} className={`text-xs px-2 py-0.5 rounded-full ${p.is_published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {p.is_published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => setEditing(p)} className="p-1.5 hover:bg-secondary rounded"><Pencil size={14} /></button>
                      <button onClick={() => deletePost(p.id)} className="p-1.5 hover:bg-red-50 rounded text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && <p className="text-center py-8 text-muted-foreground">No blog posts yet.</p>}
        </div>
      )}
    </div>
  );
}

function BlogForm({ post, onSave, onCancel }: {
  post: Tables<"blog_posts"> | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    cover_image: post?.cover_image || "",
    category: post?.category || "",
    tags: (post?.tags || []).join(", "),
    is_published: post?.is_published || false,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast.error("Title and slug required"); return; }
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content || null,
      cover_image: form.cover_image || null,
      category: form.category || null,
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
    };
    if (post) {
      await supabase.from("blog_posts").update(payload).eq("id", post.id);
      toast.success("Post updated");
    } else {
      await supabase.from("blog_posts").insert(payload);
      toast.success("Post created");
    }
    setSaving(false);
    onSave();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-foreground">{post ? "Edit Post" : "New Post"}</h2>
        <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
      </div>
      <div className="max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title *" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
          <Field label="Slug *" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} />
          <Field label="Cover Image URL" value={form.cover_image} onChange={(v) => setForm((f) => ({ ...f, cover_image: v }))} />
        </div>
        <Field label="Excerpt" value={form.excerpt} onChange={(v) => setForm((f) => ({ ...f, excerpt: v }))} />
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Content (Markdown)</label>
          <textarea rows={12} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm resize-none font-mono text-xs" />
        </div>
        <Field label="Tags (comma-separated)" value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} />
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))} className="accent-accent" />
          Published
        </label>
        <div className="flex gap-3 pt-4">
          <button onClick={handleSave} disabled={saving} className="rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:opacity-50">
            {saving ? "Saving..." : post ? "Update Post" : "Create Post"}
          </button>
          <button onClick={onCancel} className="rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACTS ────────────────────────────────────────────────────────────────

function ContactsManager() {
  const [submissions, setSubmissions] = useState<Tables<"contact_submissions">[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    setLoadingData(true);
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setSubmissions(data || []);
    setLoadingData(false);
  };

  useEffect(() => { fetchData(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id);
    fetchData();
  };

  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
        Contact Messages ({submissions.length})
        {submissions.filter((s) => !s.is_read).length > 0 && (
          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{submissions.filter((s) => !s.is_read).length} unread</span>
        )}
      </h2>
      {loadingData ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div key={s.id} className={`border border-border rounded-sm p-4 ${!s.is_read ? "bg-accent/5 border-accent/20" : "bg-card"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{s.name}</p>
                    {!s.is_read && <span className="w-2 h-2 bg-accent rounded-full" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{s.email}{s.company ? ` · ${s.company}` : ""}{s.country ? ` · ${s.country}` : ""}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</span>
                  {!s.is_read && (
                    <button onClick={() => markRead(s.id)} className="text-xs text-accent hover:underline flex items-center gap-1"><Check size={12} /> Mark read</button>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-foreground">{s.message}</p>
              <div className="mt-3 flex gap-2">
                <a href={`mailto:${s.email}`} className="text-xs text-accent hover:underline">Reply via email</a>
              </div>
            </div>
          ))}
          {submissions.length === 0 && <p className="text-center py-8 text-muted-foreground">No contact messages yet.</p>}
        </div>
      )}
    </div>
  );
}

// ─── QUOTES ──────────────────────────────────────────────────────────────────

function QuotesManager() {
  const [quotes, setQuotes] = useState<Tables<"quote_requests">[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    setLoadingData(true);
    const { data } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
    setQuotes(data || []);
    setLoadingData(false);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("quote_requests").update({ status, is_read: true }).eq("id", id);
    toast.success(`Status updated to ${status}`);
    fetchData();
  };

  const statuses = ["new", "reviewing", "quoted", "accepted", "declined"];

  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
        Quote Requests ({quotes.length})
        {quotes.filter((q) => q.status === "new").length > 0 && (
          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{quotes.filter((q) => q.status === "new").length} new</span>
        )}
      </h2>
      {loadingData ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <div key={q.id} className={`border border-border rounded-sm p-4 ${q.status === "new" ? "bg-accent/5 border-accent/20" : "bg-card"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground">{q.name}</p>
                  <p className="text-xs text-muted-foreground">{q.email}{q.company ? ` · ${q.company}` : ""}{q.country ? ` · ${q.country}` : ""}{q.phone ? ` · ${q.phone}` : ""}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{new Date(q.created_at).toLocaleDateString()}</span>
                  <select
                    value={q.status || "new"}
                    onChange={(e) => updateStatus(q.id, e.target.value)}
                    className="text-xs border border-border rounded px-2 py-1 bg-background"
                  >
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              {q.product && <p className="mt-2 text-sm"><strong>Product:</strong> {q.product} {q.quantity ? `· Qty: ${q.quantity}` : ""}</p>}
              {q.message && <p className="mt-1 text-sm text-muted-foreground">{q.message}</p>}
              <div className="mt-3">
                <a href={`mailto:${q.email}`} className="text-xs text-accent hover:underline">Reply via email</a>
              </div>
            </div>
          ))}
          {quotes.length === 0 && <p className="text-center py-8 text-muted-foreground">No quote requests yet.</p>}
        </div>
      )}
    </div>
  );
}

// ─── Shared Components ───────────────────────────────────────────────────────

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent" />
    </div>
  );
}
