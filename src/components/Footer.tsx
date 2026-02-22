import { translations, Language } from "../data/translations";

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="bg-charcoal text-bg-cream rounded-t-[4rem] px-8 pt-24 pb-12 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              {t.footer.brand}
            </h2>
            <p className="text-bg-cream/50 max-w-md font-light">
              {t.footer.desc}
            </p>
          </div>

          <div>
            <p className="font-data text-accent-clay uppercase text-xs tracking-widest mb-6">
              {t.footer.navTitle}
            </p>
            <ul className="space-y-4 font-light text-bg-cream/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">{t.footer.nav1}</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">{t.footer.nav2}</a>
              </li>
              <li>
                <a href="/shop" className="hover:text-white transition-colors">{t.footer.nav3}</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-data text-accent-clay uppercase text-xs tracking-widest mb-6">
              {t.footer.contactTitle}
            </p>
            <ul className="space-y-4 font-light text-bg-cream/70">
              <li>{t.footer.contact1}</li>
              <li>{t.footer.contact2}</li>
              <li>{t.footer.contact3}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3 bg-white/5 py-2 px-4 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-data text-[10px] tracking-widest text-white/50 uppercase">
              {t.footer.bio}
            </span>
          </div>

          <div className="flex gap-6 font-data text-xs text-bg-cream/50 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">{t.footer.imprint}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
          </div>
        </div>
      </div>

      {/* Footer SVG organic noise decoration via CSS pseudo-element is applied globally */}
    </footer>
  );
}
