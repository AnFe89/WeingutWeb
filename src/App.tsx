import { motion } from "motion/react";
import { ShoppingBag, Calendar, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-8 items-center hidden md:flex">
            <a href="#weine" className={`text-xs uppercase tracking-widest hover:text-gold transition-colors ${isScrolled ? "text-wine-dark" : "text-white"}`}>Kollektion</a>
            <a href="#tastings" className={`text-xs uppercase tracking-widest hover:text-gold transition-colors ${isScrolled ? "text-wine-dark" : "text-white"}`}>Weinproben</a>
          </div>

          <div className={`text-2xl font-serif tracking-tighter transition-colors ${isScrolled ? "text-wine-dark" : "text-white"}`}>
            WEINGUT <span className="italic">RHEINGOLD</span>
          </div>

          <div className="flex gap-8 items-center hidden md:flex">
            <a href="#philosophie" className={`text-xs uppercase tracking-widest hover:text-gold transition-colors ${isScrolled ? "text-wine-dark" : "text-white"}`}>Philosophie</a>
            <div className="flex items-center gap-4">
              <button className={`p-2 transition-colors ${isScrolled ? "text-wine-dark" : "text-white"}`}>
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={isScrolled ? "text-wine-dark" : "text-white"} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-[60] bg-wine-dark text-white p-8 flex flex-col items-center justify-center gap-8"
        >
          <button className="absolute top-8 right-8" onClick={() => setMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          <a href="#weine" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif">Kollektion</a>
          <a href="#tastings" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif">Weinproben</a>
          <a href="#philosophie" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif">Philosophie</a>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=2000" 
          alt="Herbstliche Weinberge im Nebel" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 hero-gradient flex flex-col items-center justify-center text-white text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] mb-6 block opacity-80">Seit 1894 im Rheingau</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8 leading-none">
              Die Kunst des <br />
              <span className="italic-serif">Wahren Weins</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
              <a href="#weine" className="px-10 py-4 bg-white text-wine-dark text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-300">Kollektion Entdecken</a>
              <a href="#tastings" className="px-10 py-4 border border-white/30 backdrop-blur-sm text-white text-xs uppercase tracking-widest hover:bg-white hover:text-wine-dark transition-all duration-300">Tasting Buchen</a>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-[10px] uppercase tracking-[0.3em] animate-bounce">
          Scrollen
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophie" className="py-32 px-6 bg-paper">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl mb-12 leading-tight">
              Wir glauben an <span className="italic-serif text-gold">bewussten Genuss</span> und den Luxus eines Lebens, das im Einklang mit der Natur steht.
            </h2>
            <p className="text-lg text-wine-dark/70 leading-relaxed max-w-2xl mx-auto font-light">
              Unsere Weine werden nicht einfach hergestellt – sie werden kultiviert. In den steilen Hängen des Rheingaus, geprägt von Schiefer und Leidenschaft, entstehen Tropfen von unvergleichlicher Reinheit. Jede Flasche ist ein Versprechen: Frei von Zusätzen, voller Charakter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wine Collection (The "3-Click" Sales Instrument) */}
      <section id="weine" className="py-24 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold mb-2 block">Unsere Auswahl</span>
              <h2 className="text-5xl">Aktuelle Kollektion</h2>
            </div>
            <a href="#" className="text-xs uppercase tracking-widest border-b border-wine-dark pb-1 hover:text-gold hover:border-gold transition-all">Alle Weine ansehen</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Riesling Alte Reben 2022", price: "24,00 €", type: "Trocken", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600" },
              { name: "Spätburgunder Reserve 2020", price: "38,00 €", type: "Barrique", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600" },
              { name: "Rheingold Cuvée Prestige", price: "45,00 €", type: "Schaumwein", img: "https://images.unsplash.com/photo-1553361371-9bb22f932cbe?auto=format&fit=crop&q=80&w=600" }
            ].map((wine, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-paper mb-6">
                  <img 
                    src={wine.img} 
                    alt={wine.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-wine-dark px-8 py-3 text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-colors">In den Warenkorb</button>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-widest text-wine-dark/50 mb-1 block">{wine.type}</span>
                  <h3 className="text-2xl mb-2">{wine.name}</h3>
                  <p className="text-gold font-light">{wine.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tasting Booking Section */}
      <section id="tastings" className="py-32 bg-wine-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
           <img src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=1000" alt="Wine Cellar" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Erlebnisse</span>
              <h2 className="text-5xl md:text-6xl mb-8 leading-tight">
                Unvergessliche <br />
                <span className="italic-serif">Weinmomente</span>
              </h2>
              <p className="text-lg text-white/70 mb-12 font-light leading-relaxed">
                Tauchen Sie ein in die Welt von Rheingold. Wir laden Sie ein zu einer exklusiven Reise durch unsere Keller und Weinberge. Buchen Sie Ihr persönliches Tasting in nur drei Klicks.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Klassik Tasting", desc: "5 Weine, Rheingauer Spezialitäten", price: "29 € p.P." },
                  { title: "Keller-Geheimnisse", desc: "Exklusive Fassproben & Raritäten", price: "59 € p.P." },
                  { title: "Weinberg-Picknick", desc: "Geführte Wanderung mit Kulinarik", price: "45 € p.P." }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-6 border border-white/10 hover:border-gold/50 transition-all group cursor-pointer">
                    <div>
                      <h4 className="text-xl mb-1">{item.title}</h4>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gold mb-2">{item.price}</p>
                      <button className="text-[10px] uppercase tracking-widest border-b border-white/30 group-hover:border-gold transition-all">Jetzt Buchen</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&q=80&w=800" 
                  alt="Wine Tasting" 
                  className="rounded-sm shadow-2xl"
                />
                <div className="absolute -bottom-10 -left-10 bg-gold p-12 text-wine-dark">
                  <p className="text-4xl font-serif mb-2 italic">Exzellenz</p>
                  <p className="text-xs uppercase tracking-widest opacity-80">Bestätigt durch Kenner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Brand Trust */}
      <section className="py-32 bg-paper">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-4xl text-gold mb-8 block">“</span>
          <h3 className="text-3xl md:text-4xl font-serif italic leading-relaxed mb-12">
            Ich bin seit Jahren Kunde bei Rheingold und war immer beeindruckt von der Qualität und Vielfalt der Weine. Das Team ist fachkundig und hilft mir immer, die perfekte Flasche für jeden Anlass zu finden.
          </h3>
          <div className="uppercase tracking-[0.2em] text-xs">
            <p className="font-bold">Johannes Schmidt</p>
            <p className="text-wine-dark/50">Treuer Genießer</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-wine-dark text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <div className="text-2xl font-serif mb-8">
                WEINGUT <br /> <span className="italic text-gold">RHEINGOLD</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Traditionelle Handwerkskunst trifft auf moderne Vision. Seit über einem Jahrhundert im Rheingau zu Hause.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gold mb-8">Besuchen Sie uns</h4>
              <p className="text-sm text-white/70 leading-loose">
                Rheinstraße 42<br />
                65343 Eltville am Rhein<br />
                Deutschland
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-gold mb-8">Quick Links</h4>
              <ul className="text-sm text-white/70 space-y-4">
                <li><a href="#" className="hover:text-gold transition-colors">Kollektion</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Weinproben</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Unsere Geschichte</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Kontakt</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-gold mb-8">Newsletter</h4>
              <p className="text-sm text-white/50 mb-6">Erhalten Sie Zugang zu exklusiven Allokationen.</p>
              <div className="flex border-b border-white/20 pb-2">
                <input type="email" placeholder="E-Mail Adresse" className="bg-transparent border-none outline-none text-sm w-full" />
                <button className="text-gold hover:text-white transition-colors">Senden</button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[10px] uppercase tracking-widest text-white/30">
            <p>© 2026 Weingut Rheingold. Alle Rechte vorbehalten.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Impressum</a>
              <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-white transition-colors">AGB</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
