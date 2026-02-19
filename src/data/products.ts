import laceEmbroidered from "@/assets/lace-embroidered.jpg";
import laceCord from "@/assets/lace-cord.jpg";
import laceGuipure from "@/assets/lace-guipure.jpg";
import laceChantilly from "@/assets/lace-chantilly.jpg";
import laceElastic from "@/assets/lace-elastic.jpg";
import laceCustom from "@/assets/lace-custom.jpg";

export type LaceCategory =
  | "Embroidered Lace"
  | "Cord Lace"
  | "Guipure Lace"
  | "Chantilly Lace"
  | "Elastic Lace"
  | "Custom Lace";

export type Application =
  | "Bridal & Wedding"
  | "Lingerie"
  | "Evening Dress"
  | "Fashion Apparel"
  | "Accessories";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: LaceCategory;
  image: string;
  images: string[];
  composition: string;
  width: string;
  colors: string[];
  applications: Application[];
  moq: string;
  leadTime: string;
  customizable: boolean;
  description: string;
  featured: boolean;
  premium: boolean;
  createdAt: string;
}

export const categories: { name: LaceCategory; image: string; description: string }[] = [
  { name: "Embroidered Lace", image: laceEmbroidered, description: "Intricate thread-work patterns on tulle or mesh base" },
  { name: "Cord Lace", image: laceCord, description: "Textured cord-based designs for bold, dimensional appeal" },
  { name: "Guipure Lace", image: laceGuipure, description: "Heavy, connected motifs without mesh background" },
  { name: "Chantilly Lace", image: laceChantilly, description: "Delicate French-style lace with fine floral patterns" },
  { name: "Elastic Lace", image: laceElastic, description: "Stretch lace perfect for intimate apparel and activewear" },
  { name: "Custom Lace", image: laceCustom, description: "Bespoke designs tailored to your exact specifications" },
];

export const applications: { name: Application; slug: string; image: string; description: string }[] = [
  { name: "Bridal & Wedding", slug: "bridal-wedding", image: "", description: "Exquisite lace for wedding gowns, veils, and bridal accessories" },
  { name: "Lingerie", slug: "lingerie", image: "", description: "Soft, delicate lace for premium intimate apparel" },
  { name: "Evening Dress", slug: "evening-dress", image: "", description: "Sophisticated lace for formal and evening wear" },
  { name: "Fashion Apparel", slug: "fashion-apparel", image: "", description: "Versatile lace for contemporary fashion garments" },
  { name: "Accessories", slug: "accessories", image: "", description: "Decorative lace for gloves, headpieces, and trim" },
];

export const products: Product[] = [
  {
    id: "1", name: "Floral Embroidered Tulle", slug: "floral-embroidered-tulle",
    category: "Embroidered Lace", image: laceEmbroidered, images: [laceEmbroidered],
    composition: "65% Nylon, 35% Cotton", width: "130 cm", colors: ["Ivory", "White", "Champagne", "Blush"],
    applications: ["Bridal & Wedding", "Evening Dress"], moq: "300 yards", leadTime: "15–20 days",
    customizable: true, description: "A luxurious embroidered tulle featuring delicate floral motifs, ideal for bridal gowns and couture eveningwear. Available in multiple colorways with custom color matching.",
    featured: true, premium: true, createdAt: "2025-01-15",
  },
  {
    id: "2", name: "Geometric Cord Lace", slug: "geometric-cord-lace",
    category: "Cord Lace", image: laceCord, images: [laceCord],
    composition: "100% Polyester", width: "120 cm", colors: ["White", "Ecru", "Black"],
    applications: ["Fashion Apparel", "Evening Dress"], moq: "200 yards", leadTime: "10–15 days",
    customizable: true, description: "Bold geometric cord lace with dimensional texture, perfect for statement fashion pieces and structured garments.",
    featured: true, premium: false, createdAt: "2025-02-01",
  },
  {
    id: "3", name: "Botanical Guipure Panel", slug: "botanical-guipure-panel",
    category: "Guipure Lace", image: laceGuipure, images: [laceGuipure],
    composition: "80% Cotton, 20% Polyester", width: "110 cm", colors: ["White", "Ivory", "Navy"],
    applications: ["Bridal & Wedding", "Fashion Apparel"], moq: "250 yards", leadTime: "15–20 days",
    customizable: true, description: "A rich guipure lace with botanical motifs, offering a heavy, luxurious drape ideal for structured bridal and fashion designs.",
    featured: true, premium: true, createdAt: "2025-01-20",
  },
  {
    id: "4", name: "Classic Chantilly Allover", slug: "classic-chantilly-allover",
    category: "Chantilly Lace", image: laceChantilly, images: [laceChantilly],
    composition: "100% Nylon", width: "150 cm", colors: ["Black", "Ivory", "Nude", "White"],
    applications: ["Evening Dress", "Bridal & Wedding", "Lingerie"], moq: "500 yards", leadTime: "20–25 days",
    customizable: false, description: "Timeless Chantilly lace with fine floral details and scalloped edges. A staple for haute couture eveningwear and bridal collections.",
    featured: true, premium: true, createdAt: "2025-01-10",
  },
  {
    id: "5", name: "Stretch Floral Elastic", slug: "stretch-floral-elastic",
    category: "Elastic Lace", image: laceElastic, images: [laceElastic],
    composition: "85% Nylon, 15% Spandex", width: "90 cm", colors: ["Blush", "White", "Black", "Rose"],
    applications: ["Lingerie", "Accessories"], moq: "500 yards", leadTime: "10–12 days",
    customizable: true, description: "A soft-hand stretch lace with delicate floral pattern, engineered for comfort in intimate apparel and stretch garments.",
    featured: false, premium: false, createdAt: "2025-02-05",
  },
  {
    id: "6", name: "Heritage Embroidered Border", slug: "heritage-embroidered-border",
    category: "Embroidered Lace", image: laceEmbroidered, images: [laceEmbroidered],
    composition: "70% Cotton, 30% Nylon", width: "25 cm", colors: ["White", "Ivory", "Gold"],
    applications: ["Bridal & Wedding", "Accessories"], moq: "1000 yards", leadTime: "12–15 days",
    customizable: true, description: "A heritage-inspired embroidered border lace with intricate scrollwork, perfect for trim, veils, and decorative accents.",
    featured: false, premium: false, createdAt: "2025-01-25",
  },
  {
    id: "7", name: "Modern Cord Allover", slug: "modern-cord-allover",
    category: "Cord Lace", image: laceCord, images: [laceCord],
    composition: "100% Polyester", width: "130 cm", colors: ["White", "Champagne", "Grey"],
    applications: ["Fashion Apparel", "Evening Dress"], moq: "300 yards", leadTime: "15–18 days",
    customizable: true, description: "Contemporary allover cord lace with a modern abstract pattern, ideal for avant-garde fashion and structured silhouettes.",
    featured: false, premium: true, createdAt: "2025-02-10",
  },
  {
    id: "8", name: "Scallop Edge Elastic Trim", slug: "scallop-edge-elastic-trim",
    category: "Elastic Lace", image: laceElastic, images: [laceElastic],
    composition: "90% Nylon, 10% Spandex", width: "15 cm", colors: ["White", "Black", "Nude", "Blush"],
    applications: ["Lingerie", "Fashion Apparel"], moq: "2000 yards", leadTime: "8–10 days",
    customizable: false, description: "A functional elastic trim with elegant scalloped edges, designed for underwear, bralettes, and activewear accents.",
    featured: false, premium: false, createdAt: "2025-02-12",
  },
  {
    id: "9", name: "Royal Guipure Motif", slug: "royal-guipure-motif",
    category: "Guipure Lace", image: laceGuipure, images: [laceGuipure],
    composition: "100% Cotton", width: "100 cm", colors: ["Ivory", "White"],
    applications: ["Bridal & Wedding"], moq: "200 yards", leadTime: "20–25 days",
    customizable: true, description: "A grand-scale guipure motif lace with regal floral patterns, designed for statement bridal gowns and luxury fashion.",
    featured: true, premium: true, createdAt: "2025-01-18",
  },
  {
    id: "10", name: "Sheer Chantilly Border", slug: "sheer-chantilly-border",
    category: "Chantilly Lace", image: laceChantilly, images: [laceChantilly],
    composition: "100% Nylon", width: "30 cm", colors: ["Black", "White", "Ivory"],
    applications: ["Evening Dress", "Lingerie", "Accessories"], moq: "800 yards", leadTime: "15–18 days",
    customizable: false, description: "A refined Chantilly border lace with gossamer sheerness and delicate eyelash edges, perfect for hems and overlays.",
    featured: false, premium: false, createdAt: "2025-02-08",
  },
  {
    id: "11", name: "Bespoke Design Panel", slug: "bespoke-design-panel",
    category: "Custom Lace", image: laceCustom, images: [laceCustom],
    composition: "Custom blend", width: "Custom", colors: ["Any color available"],
    applications: ["Bridal & Wedding", "Evening Dress", "Fashion Apparel", "Lingerie", "Accessories"],
    moq: "Negotiable", leadTime: "25–35 days",
    customizable: true, description: "Fully bespoke lace designed from your sketches or inspiration. Our design team works with you to create one-of-a-kind patterns.",
    featured: true, premium: true, createdAt: "2025-01-05",
  },
  {
    id: "12", name: "Couture Embroidered Allover", slug: "couture-embroidered-allover",
    category: "Embroidered Lace", image: laceEmbroidered, images: [laceEmbroidered],
    composition: "50% Silk, 50% Nylon", width: "140 cm", colors: ["Ivory", "Champagne", "Blush", "Peach"],
    applications: ["Bridal & Wedding", "Evening Dress"], moq: "200 yards", leadTime: "20–25 days",
    customizable: true, description: "A premium silk-blend embroidered lace with couture-level detail and luminous finish, for the most discerning designers.",
    featured: true, premium: true, createdAt: "2025-01-08",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: LaceCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByApplication(application: Application): Product[] {
  return products.filter((p) => p.applications.includes(application));
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
