import { motion } from "motion/react";
import { ShoppingBag, Calendar, Menu, X, ArrowRight, Play, Grape } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Ref for all animations
  const appRef = useRef(null);
  
  // Telemetry Typewriter State
  const [telemetryText, setTelemetryText] = useState("");
  const fullText = "Zertifizierter Bioland-Weinbau im Einklang mit der Natur. Ökologische Innovation.";
  
  // Diagnostic Shuffler State
  const [shufflerCards, setShufflerCards] = useState([
    "4-Sterne Gästehaus",
    "Inmitten der Reben",
    "Auszeit im Rheingau"
  ]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations Lifecycle
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.to(".hero-elem", {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
      });

      // Philosophy Reveal
      gsap.from(".phil-text", {
        scrollTrigger: {
          trigger: "#philosophie",
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });

      // Protocol Sticky Stacking
      const cards = gsap.utils.toArray(".protocol-card");
      cards.forEach((card: any, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(20px)",
          });
        }
      });

    }, appRef);

    return () => ctx.revert();
  }, []);

  // Typewriter Effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTelemetryText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  // Shuffler Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShufflerCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        if(last) newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={appRef} className="min-h-screen relative overflow-x-hidden bg-bg-cream text-charcoal noise-bg">
      {/* SVG Noise Filter */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        </filter>
      </svg>
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-50 mix-blend-overlay" style={{ filter: "url(#noiseFilter)" }}></div>

      {/* Navigation - The Floating Island */}
      <nav className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-500 rounded-full px-8 py-4 ${isScrolled ? "bg-bg-cream/70 backdrop-blur-xl border border-charcoal/10 shadow-lg w-[95%] max-w-5xl" : "w-[95%] max-w-5xl bg-transparent"}`}>
        <div className="flex justify-between items-center w-full">
          <div className="hidden gap-8 items-center md:flex">
            <a href="#kollektion" className={`text-xs font-data uppercase tracking-widest hover:text-accent-clay transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}>Kollektion</a>
            <a href="#features" className={`text-xs font-data uppercase tracking-widest hover:text-accent-clay transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}>Erlebnis</a>
          </div>

          <div className={`text-lg font-heading tracking-tight font-bold transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}>
            ENGELMANN<span className="opacity-50">-SCHLEPPER</span>
          </div>

          <div className="hidden gap-8 items-center md:flex">
            <a href="#philosophie" className={`text-xs font-data uppercase tracking-widest hover:text-accent-clay transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}>Manifest</a>
            <button className={`magnetic-btn bg-accent-clay text-bg-cream px-6 py-2 rounded-full text-xs font-data uppercase tracking-widest overflow-hidden relative group`}>
              <span className="relative z-10 w-full rounded-full transition-transform">Shop</span>
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={isScrolled ? "text-charcoal" : "text-white"} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-60 bg-primary-moss text-bg-cream p-8 flex flex-col items-center justify-center gap-8">
          <button className="absolute top-8 right-8" onClick={() => setMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          <a href="#kollektion" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading">Kollektion</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading">Erlebnis</a>
          <a href="#philosophie" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-heading">Manifesto</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-dvh w-full overflow-hidden">
        <img 
          src="/images/hero_vineyard_1771712360567.png" 
          alt="Dark organic vineyard textures" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-moss to-transparent/30"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:pb-32 lg:pl-32">
          <div className="max-w-4xl text-left">
            <p className="hero-elem opacity-0 translate-y-10 text-xs font-data uppercase tracking-[0.3em] text-accent-clay mb-6">Bioland Weingut & Gästehaus</p>
            <h1 className="hero-elem opacity-0 translate-y-10 text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] text-bg-cream font-heading tracking-tight mb-2">
              Rheingauer Gastlichkeit is the
            </h1>
            <h1 className="hero-elem opacity-0 translate-y-10 text-6xl md:text-8xl lg:text-[8rem] text-bg-cream font-drama italic mb-12 ml-4">
              Pure Nature.
            </h1>
            
            <div className="hero-elem opacity-0 translate-y-10 flex flex-col sm:flex-row gap-6 items-start">
              <button className="magnetic-btn bg-accent-clay text-bg-cream px-8 py-4 rounded-4xl text-sm font-data uppercase tracking-widest flex items-center gap-3 w-full sm:w-auto justify-center hover:bg-white hover:text-primary-moss transition-colors">
                Tasting buchen <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Interactive Functional Artifacts */}
      <section id="features" className="py-32 px-6 md:px-16 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Diagnostic Shuffler */}
          <div className="bg-bg-cream shadow-2xl rounded-[3rem] p-10 h-96 relative overflow-hidden border border-charcoal/5 flex flex-col justify-end">
            <div className="absolute top-10 left-10">
              <h3 className="font-heading font-bold text-lg mb-2 text-primary-moss">Gastlichkeit</h3>
              <p className="text-xs text-charcoal/60 font-data uppercase">Erlebnis</p>
            </div>
            
            <div className="relative h-40 w-full mt-12 perspective-1000">
              {shufflerCards.map((text, i) => (
                <div 
                  key={text}
                  className="absolute inset-x-0 bottom-0 bg-white p-6 rounded-2xl shadow-lg border border-charcoal/5 transition-all duration-700 ease-in-out"
                  style={{
                    transform: `translateY(-${i * 15}px) scale(${1 - i * 0.05})`,
                    zIndex: 10 - i,
                    opacity: 1 - i * 0.2
                  }}
                >
                  <p className="font-data text-sm flex items-center justify-between">
                    {text} <ArrowRight size={14} className="text-accent-clay" />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Typewriter */}
          <div className="bg-charcoal text-bg-cream shadow-2xl rounded-[3rem] p-10 h-96 border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-heading font-bold text-lg">Ökologie</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-clay animate-pulse"></span>
                <span className="text-[10px] uppercase font-data text-accent-clay">Live Feed</span>
              </div>
            </div>
            <div className="font-data text-sm leading-relaxed mt-auto h-32 text-bg-cream/80">
              <p>{telemetryText}<span className="inline-block w-2 h-4 bg-accent-clay animate-pulse ml-1 align-middle"></span></p>
            </div>
          </div>

          {/* Cursor Protocol Scheduler */}
          <div className="bg-bg-cream shadow-2xl rounded-[3rem] p-10 h-96 border border-charcoal/5 flex flex-col justify-between overflow-hidden relative group">
            <div>
              <h3 className="font-heading font-bold text-lg text-primary-moss mb-2">Innovation</h3>
              <p className="text-xs text-charcoal/60 font-data uppercase">Wein-Wälder Projekt</p>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mt-8">
              {['S','M','T','W','T','F','S'].map((day, i) => (
                <div key={i} className={`h-8 rounded-full border border-charcoal/10 flex items-center justify-center text-[10px] font-data ${i === 3 ? 'bg-primary-moss text-white border-transparent' : ''}`}>
                  {day}
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 bg-black/5 rounded-full py-4 text-xs font-data font-bold uppercase tracking-widest group-hover:bg-primary-moss group-hover:text-white transition-colors duration-500">
              Patenschaft starten
            </button>
          </div>

        </div>
      </section>

      {/* Philosophy - The Manifesto */}
      <section id="philosophie" className="relative py-40 bg-charcoal text-bg-cream overflow-hidden px-8">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/moss_texture_1771712384013.png" alt="Moss texture" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col gap-12 text-center md:text-left">
          <p className="phil-text text-xl md:text-3xl font-heading font-light text-bg-cream/50 tracking-tight">
            Gängiger Weinbau fokussiert sich auf: Maximalen Ertrag und konventionelle Mittel.
          </p>
          <p className="phil-text text-5xl md:text-7xl lg:text-8xl font-drama italic leading-[1.1]">
            Wir fokussieren uns auf: <span className="text-accent-clay block mt-2">Naturkreisläufe.</span>
          </p>
        </div>
      </section>

      {/* Protcol - Sticky Stacking Archive */}
      <section className="relative w-full bg-bg-cream">
        {[
          {
            step: "01",
            title: "Bioland Zertifizierung",
            desc: "Ein voller Übergang zum ökologischen Weinbau. Komplett im Einklang mit Flora und Fauna des Rheingaus.",
            img: "/images/protocol_bioland_1771712399480.png"
          },
          {
            step: "02",
            title: "Cabernet Blanc & PiWis",
            desc: "Pionierarbeit mit pilzwiderstandsfähigen Rebsorten, um den Pflanzenschutz auf ein absolutes Minimum zu reduzieren.",
            img: "/images/protocol_innovation_1771712427057.png"
          },
          {
            step: "03",
            title: "Riesling Tradition",
            desc: "Die Seele unserer Böden übersetzt ins Glas. Kristallklar, tiefgründig und geprägt von den Steillagen Martinsthals.",
            img: "/images/protocol_steillage_1771712442166.png"
          }
        ].map((item, index) => (
          <div key={index} className="protocol-card sticky top-0 h-screen w-full flex items-center justify-center p-6 origin-top bg-bg-cream border-t border-charcoal/5">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <span className="font-data text-accent-clay text-sm mb-6 block">STEP {item.step}</span>
                <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-primary-moss">{item.title}</h2>
                <p className="text-xl text-charcoal/70 font-light max-w-lg">{item.desc}</p>
              </div>
              <div className="order-1 md:order-2 h-[40vh] md:h-[70vh] w-full rounded-[3rem] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pricing / Collection Grid */}
      <section id="kollektion" className="py-40 bg-bg-cream px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-heading tracking-tight text-primary-moss mb-4">Das Portfolio</h2>
            <p className="font-data text-accent-clay uppercase tracking-widest text-sm">Bio-Zertifiziert 2023</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="rounded-[3rem] border border-charcoal/10 p-10 flex flex-col bg-white">
              <p className="font-data text-xs text-charcoal/50 uppercase tracking-widest mb-8">Klassiker</p>
              <h3 className="font-heading text-3xl mb-4">Riesling Gutswein</h3>
              <p className="text-charcoal/70 mb-12">Typischer Rheingau Charakter. Mineralisch, frisch, trocken.</p>
              <div className="mt-auto">
                <p className="font-data text-2xl mb-6">12,50€</p>
                <button className="magnetic-btn w-full py-4 rounded-full border border-primary-moss text-primary-moss font-data uppercase text-xs tracking-widest hover:bg-primary-moss hover:text-white transition-colors">
                  IN DEN WARENKORB
                </button>
              </div>
            </div>

            {/* Card 2 POP */}
            <div className="rounded-[3rem] bg-primary-moss p-10 flex flex-col text-white transform md:-translate-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10">
                <Grape size={200} />
              </div>
              <p className="font-data text-xs text-accent-clay uppercase tracking-widest mb-8">Innovation</p>
              <h3 className="font-heading text-4xl mb-4">Cabernet Blanc</h3>
              <p className="text-white/70 mb-12 max-w-[80%] relative z-10">PiWi Rebsorte. Komplex, strukturstark und nachhaltig kultiviert.</p>
              <div className="mt-auto relative z-10">
                <p className="font-data text-3xl mb-6 text-accent-clay">18,50€</p>
                <button className="magnetic-btn w-full py-4 rounded-full bg-accent-clay text-bg-cream font-data uppercase text-xs tracking-widest hover:bg-white hover:text-primary-moss transition-colors">
                  IN DEN WARENKORB
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-[3rem] border border-charcoal/10 p-10 flex flex-col bg-white">
              <p className="font-data text-xs text-charcoal/50 uppercase tracking-widest mb-8">Elegance</p>
              <h3 className="font-heading text-3xl mb-4">Spätburgunder</h3>
              <p className="text-charcoal/70 mb-12">Sanft strukturiert, elegant gereift. Im Holzfass ausgebaut.</p>
              <div className="mt-auto">
                <p className="font-data text-2xl mb-6">24,00€</p>
                <button className="magnetic-btn w-full py-4 rounded-full border border-primary-moss text-primary-moss font-data uppercase text-xs tracking-widest hover:bg-primary-moss hover:text-white transition-colors">
                  IN DEN WARENKORB
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-bg-cream rounded-t-[4rem] px-8 pt-24 pb-12 mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <h2 className="font-heading text-4xl md:text-5xl mb-6">Engelmann-Schlepper</h2>
              <p className="text-bg-cream/50 max-w-md font-light">Pure Rheingauer Gastlichkeit. Nachhaltiger Bioweinbau und zertifiziertes 4-Sterne Gästehaus in Martinsthal.</p>
            </div>
            
            <div>
              <p className="font-data text-accent-clay uppercase text-xs tracking-widest mb-6">Navigation</p>
              <ul className="space-y-4 font-light text-bg-cream/70">
                <li><a href="#" className="hover:text-white transition-colors">Gästehaus & Buchen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wein-Wälder Projekt</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Online-Shop</a></li>
              </ul>
            </div>

            <div>
              <p className="font-data text-accent-clay uppercase text-xs tracking-widest mb-6">Kontakt</p>
              <ul className="space-y-4 font-light text-bg-cream/70">
                <li>Hauptstraße 55</li>
                <li>65344 Eltville - Martinsthal</li>
                <li>info@engelmann-schlepper.de</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-data text-[10px] uppercase tracking-widest text-bg-cream/50">System Operational - Shop Online</span>
            </div>
            <div className="flex gap-6 font-data text-[10px] uppercase tracking-widest text-bg-cream/50">
              <a href="#" className="hover:text-white">Impressum</a>
              <a href="#" className="hover:text-white">Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
