import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Applications", to: "/applications" },
  { label: "Custom Service", to: "/custom-service" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:py-5">
        <Link to="/" className="font-serif text-2xl font-semibold tracking-wide text-foreground">
          Lace Atelier
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                location.pathname === l.to ? "text-accent" : "text-foreground/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/quote"
            className="ml-2 rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground" aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
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
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
