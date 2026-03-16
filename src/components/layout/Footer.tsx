import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

<<<<<<< HEAD
const WHATSAPP_NUMBER = "+8801884900000";
const PHONE_NUMBER = "+8801884900000";
const EMAIL = "lace@cardzglobal.com";
=======
const WHATSAPP_NUMBER = "01892749000";
const PHONE_NUMBER = "+01892749000";
const EMAIL = "beautyatlantic6@gmail.com";
>>>>>>> 0cc98b7bc19fdca39c2f2657fe895585dca77115

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
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
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
<<<<<<< HEAD
                <MapPin size={14} className="mt-0.5 shrink-0" /> Sector-7, Uttara,Dhaka-Bangladesh. 
=======
                <MapPin size={14} className="mt-0.5 shrink-0" /> 123 Textile Avenue, Fashion District
>>>>>>> 0cc98b7bc19fdca39c2f2657fe895585dca77115
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
