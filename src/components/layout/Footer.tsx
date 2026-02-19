import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Lace Atelier</h3>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              Premium lace manufacturer crafting exquisite textiles for the world's finest fashion houses since 2005.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-primary-foreground/50">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Products", to: "/products" },
                { label: "Applications", to: "/applications" },
                { label: "Custom Service", to: "/custom-service" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-primary-foreground/50">Products</h4>
            <div className="flex flex-col gap-2.5">
              {["Embroidered Lace", "Cord Lace", "Guipure Lace", "Chantilly Lace", "Elastic Lace", "Custom Lace"].map((c) => (
                <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-primary-foreground/50">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="mailto:info@laceatelier.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail size={14} /> info@laceatelier.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone size={14} /> +1 (234) 567-890
              </a>
              <span className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" /> 123 Textile Avenue, Fashion District
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">© 2025 Lace Atelier. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-primary-foreground/40">
            <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
