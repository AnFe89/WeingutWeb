import { useState, useEffect } from "react";
import { ShoppingBag, Calendar, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { translations, Language } from "../data/translations";

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

export function Navbar({ lang, setLang }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isShop = location.pathname === "/shop";
  
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navigation Island */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] w-[95%] md:w-auto ${
          isScrolled || isShop
            ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgb(0,0,0,0.08)] rounded-full py-4 px-8 border border-white/40"
            : "py-6 px-4"
        }`}
      >
        <div className="flex items-center justify-between md:justify-center gap-16">
          <Link
            to="/"
            className={`font-heading text-2xl tracking-tight transition-colors duration-300 ${
              isScrolled || isShop ? "text-charcoal" : "text-white"
            }`}
          >
            ENGELMANN.
          </Link>

          <div className="hidden md:flex items-center gap-8 font-data text-[10px] uppercase tracking-[0.2em]">
            {isShop ? (
              <Link
                to="/"
                className={`transition-all duration-300 ${
                  isScrolled || isShop
                    ? "text-charcoal/60 hover:text-charcoal hover:-translate-y-px"
                    : "text-white/70 hover:text-white hover:-translate-y-px"
                }`}
              >
                Gästehaus & Weingut
              </Link>
            ) : (
              <>
                <a
                  href="#kollektion"
                  className={`transition-all duration-300 ${
                    isScrolled
                      ? "text-charcoal/60 hover:text-charcoal hover:-translate-y-px"
                      : "text-white/70 hover:text-white hover:-translate-y-px"
                  }`}
                >
                  {t.nav.collection}
                </a>
                <a
                  href="#features"
                  className={`transition-all duration-300 ${
                    isScrolled
                      ? "text-charcoal/60 hover:text-charcoal hover:-translate-y-px"
                      : "text-white/70 hover:text-white hover:-translate-y-px"
                  }`}
                >
                  {t.nav.experience}
                </a>
                <a
                  href="#philosophie"
                  className={`transition-all duration-300 ${
                    isScrolled
                      ? "text-charcoal/60 hover:text-charcoal hover:-translate-y-px"
                      : "text-white/70 hover:text-white hover:-translate-y-px"
                  }`}
                >
                  {t.nav.manifesto}
                </a>
              </>
            )}
            
            <Link
              to="/shop"
              className={`transition-all duration-300 font-bold ${
                isScrolled || isShop
                  ? "text-accent-clay hover:text-charcoal hover:-translate-y-px"
                  : "text-white hover:text-accent-clay hover:-translate-y-px"
              }`}
            >
              {t.nav.shop}
            </Link>

            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setLang("DE")}
                className={`transition-colors py-1 px-2 rounded-md ${lang === "DE" ? (isScrolled || isShop ? "bg-charcoal/5 font-bold text-charcoal" : "bg-white/10 font-bold text-white") : (isScrolled || isShop ? "text-charcoal/40 hover:text-charcoal" : "text-white/50 hover:text-white")}`}
              >
                DE
              </button>
              <button
                onClick={() => setLang("EN")}
                className={`transition-colors py-1 px-2 rounded-md ${lang === "EN" ? (isScrolled || isShop ? "bg-charcoal/5 font-bold text-charcoal" : "bg-white/10 font-bold text-white") : (isScrolled || isShop ? "text-charcoal/40 hover:text-charcoal" : "text-white/50 hover:text-white")}`}
              >
                EN
              </button>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setLang(lang === "DE" ? "EN" : "DE")}
              className={`font-data text-xs transition-colors ${
                isScrolled || isShop ? "text-charcoal" : "text-white"
              }`}
            >
              {lang === "DE" ? "EN" : "DE"}
            </button>
            <button
              className={`transition-colors ${
                isScrolled || isShop ? "text-charcoal" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary-moss text-bg-cream pt-32 px-8 flex flex-col gap-8">
          {isShop ? (
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-heading"
            >
              Home
            </Link>
          ) : (
            <>
              <a
                href="#kollektion"
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-heading"
              >
                {t.nav.collection}
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-heading"
              >
                {t.nav.experience}
              </a>
              <a
                href="#philosophie"
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-heading"
              >
                {t.nav.manifesto}
              </a>
            </>
          )}
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-heading text-accent-clay"
          >
            {t.nav.shop}
          </Link>
        </div>
      )}
    </>
  );
}
