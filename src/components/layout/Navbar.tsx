import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.products"), to: "/products" },
    { label: t("nav.applications"), to: "/applications" },
    { label: t("nav.customService"), to: "/custom-service" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.blog"), to: "/blog" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-primary/90 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:py-5">
        <Link to="/" className={`font-serif text-xl font-semibold tracking-wide transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
          Cardzglobal Limited
        </Link>

        {/* Desktop – centered nav links */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                location.pathname === l.to ? "text-accent" : scrolled ? "text-foreground/70" : "text-primary-foreground/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            to="/quote"
            className="rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("nav.getQuote")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button onClick={() => setOpen(!open)} className={`transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="container mx-auto flex flex-col gap-1 px-6 py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`py-3 text-sm font-medium tracking-wide border-b border-border/50 ${
                    location.pathname === l.to ? "text-accent" : "text-foreground/70"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/quote"
                className="mt-3 text-center rounded-sm bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground"
              >
                {t("nav.getQuote")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
