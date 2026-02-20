import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const WHATSAPP_NUMBER = "447700900123"; // Replace with real number
const PHONE_NUMBER = "+447700900123";
const EMAIL = "info@cardzglobal.com";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Cardzglobal Limited</h3>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              {t("footer.desc")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-primary-foreground/50">{t("footer.quickLinks")}</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: t("nav.products"), to: "/products" },
                { label: t("nav.applications"), to: "/applications" },
                { label: t("nav.customService"), to: "/custom-service" },
                { label: t("nav.about"), to: "/about" },
                { label: t("nav.contact"), to: "/contact" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-primary-foreground/50">{t("footer.products")}</h4>
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
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-primary-foreground/50">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Mail size={14} /> {EMAIL}
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Phone size={14} /> {PHONE_NUMBER}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <span className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" /> 123 Textile Avenue, Fashion District
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">© {year} Cardzglobal Limited. {t("footer.rights")}</p>
          <div className="flex gap-6 text-xs text-primary-foreground/40">
            <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">{t("footer.privacy")}</span>
            <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">{t("footer.terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
