import { useState, useMemo } from "react";
import { ArrowRight, Grape, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language, translations } from "../data/translations";
import { products, shopCategories } from "../data/products";

interface ShopProps {
  lang: Language;
}

export function Shop({ lang }: ShopProps) {
  const t = translations[lang];
  const [activeCategoryId, setActiveCategoryId] = useState<string | "all">("all");

  const filteredProducts = useMemo(() => {
    if (activeCategoryId === "all") return products;
    return products.filter((p) => p.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  return (
    <div className="min-h-screen bg-bg-cream pt-32 pb-24 px-6 md:px-16 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20">
          <p className="font-data text-xs uppercase tracking-[0.4em] text-accent-clay mb-4">
            {t.shop.sub}
          </p>
          <h1 className="font-heading text-6xl md:text-8xl text-charcoal tracking-tight mb-8">
            {t.shop.title}
          </h1>
          <div className="w-24 h-px bg-charcoal/20"></div>
        </div>

        {/* Categories (Horizontal Scroll on Mobile) */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-16 pb-4">
          <button
            onClick={() => setActiveCategoryId("all")}
            className={`whitespace-nowrap rounded-full px-6 py-3 font-data text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
              activeCategoryId === "all"
                ? "bg-primary-moss text-white border border-primary-moss shadow-md"
                : "bg-white text-charcoal/60 border border-charcoal/10 hover:border-charcoal/30 hover:text-charcoal"
            }`}
          >
            {t.shop.filterAll}
          </button>
          {shopCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`whitespace-nowrap rounded-full px-6 py-3 font-data text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                activeCategoryId === cat.id
                  ? "bg-primary-moss text-white border border-primary-moss shadow-md"
                  : "bg-white text-charcoal/60 border border-charcoal/10 hover:border-charcoal/30 hover:text-charcoal"
              }`}
            >
              {cat.name[lang]}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-charcoal/5 hover:border-charcoal/10 p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 will-change-transform"
              >
                {/* Product Image Container */}
                <div className="aspect-4/5 bg-bg-cream rounded-3xl mb-8 relative overflow-hidden flex items-center justify-center border border-charcoal/5 group-hover:border-charcoal/10 transition-colors">
                  {product.image ? (
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-5">
                        <img 
                          src="https://images.pexels.com/photos/298694/pexels-photo-298694.jpeg?auto=compress&cs=tinysrgb&w=800"
                          alt="Texture"
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>
                      <div className="text-primary-moss/20 group-hover:text-primary-moss/40 transition-colors duration-500 transform group-hover:scale-110">
                        <Grape size={80} strokeWidth={1} />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col grow">
                  <p className="font-data text-[9px] uppercase tracking-[0.2em] text-accent-clay mb-3 line-clamp-1">
                    {shopCategories.find(c => c.id === product.categoryId)?.name[lang]}
                  </p>
                  <h3 className="font-heading text-xl text-charcoal leading-snug mb-2 line-clamp-2">
                    {product.name[lang]}
                  </h3>
                  
                  <div className="mt-auto pt-6">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-primary-moss/5 border border-primary-moss/10 rounded-full py-4 text-[10px] font-data font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 text-primary-moss group-hover:bg-primary-moss group-hover:text-white group-hover:border-primary-moss transition-all duration-300"
                    >
                      <ShoppingCart size={14} />
                      <span className="pl-[0.1em]">{t.shop.addToCart}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
