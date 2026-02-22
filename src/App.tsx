import { motion } from "motion/react";
import {
  ShoppingBag,
  Calendar,
  Menu,
  X,
  ArrowRight,
  Play,
  Grape,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const translations = {
  DE: {
    nav: {
      collection: "Kollektion",
      experience: "Gästehaus",
      manifesto: "Philosophie",
      shop: "Shop"
    },
    hero: {
      subtitle: "Familienweingut Engelmann-Schlepper",
      titleTop: "Rheingauer Gastlichkeit in",
      titleBottom: "Reinform.",
      cta: "Tasting buchen"
    },
    trust: {
      bio: "BIOLAND ZERTIFIZIERT",
      award: "NABU FÖRDERPREIS",
      hotel: "4-STERNE DTV GÄSTEHAUS"
    },
    features: {
      f1_title: "Gastlichkeit",
      f1_sub: "Erlebnis",
      f1_cards: ["DTV Gästehaus", "Inmitten der Reben", "Familie Bohnacker-Schlepper"],
      f2_title: "Ökologie",
      f2_log: "100% Umstellung auf ökologischen Weinbau. Die erste Voll-Bio Ernte steht an.",
      f3_title: "Vitiforst",
      f3_sub: "Wein-Wälder Projekt",
      f3_counter: "Bäume seit 2024 im Weinberg",
      f3_desc1: "Angefangen mit der Birnensorte 'Gute",
      f3_desc2: "Luise'. Gemeinsam pflanzen für die Zukunft.",
      f3_cta: "Patenschaft starten"
    },
    philosophy: {
      pre: "Unsere Philosophie",
      top: "Nachhaltiges Handeln ist uns ein Herzensanliegen.",
      bottom1: "Wir haben die Erde nicht von unseren Eltern geerbt, ",
      bottom2: "sondern von unseren Kindern geliehen."
    },
    protocol: [
      {
        step: "01",
        title: "Bioland Zertifizierung",
        desc: "Ein voller Übergang zum ökologischen Weinbau. Komplett im Einklang mit Flora und Fauna des Rheingaus.",
        img: "https://images.pexels.com/photos/31561190/pexels-photo-31561190.jpeg?auto=compress&cs=tinysrgb&w=2560",
      },
      {
        step: "02",
        title: "Pionierarbeit ViTiForst",
        desc: "2021 pflanzten Opa Friedel und Johannes unsere erste 'Gute Luise'. Heute setzen wir hunderte Bäume direkt ins Rebenmeer.",
        img: "https://images.pexels.com/photos/6265917/pexels-photo-6265917.jpeg?auto=compress&cs=tinysrgb&w=2560",
      },
      {
        step: "03",
        title: "Martinsthaler Steillagen",
        desc: "Die Seele unserer Böden am Schlangengraben und der Wildsau übersetzt ins Glas. Kristallklar, tiefgründig und typisch Rheingau.",
        img: "https://images.pexels.com/photos/18561571/pexels-photo-18561571.jpeg?auto=compress&cs=tinysrgb&w=2560",
      },
    ],
    collection: {
      title: "Das Portfolio",
      sub: "Bio-Zertifiziert 2023",
      c1_top: "Kennenlernen",
      c1_title: "6er Probierpaket",
      c1_desc: "\"Neue Entdeckungen\". 6 ausgesuchte Weine inkl. Trauben-Secco.",
      c1_price: "49,00€",
      c2_top: "Innovation",
      c2_title: "Cabernet Blanc",
      c2_desc: "PiWi Rebsorte. Komplex, strukturstark und nachhaltig kultiviert.",
      c2_price: "18,50€",
      c3_top: "Elegance",
      c3_title: "Spätburgunder",
      c3_desc: "Sanft strukturiert, elegant gereift. Im Holzfass ausgebaut.",
      c3_price: "24,00€",
      cta: "IN DEN WARENKORB"
    },
    footer: {
      brand: "Engelmann-Schlepper",
      desc: "Pure Rheingauer Gastlichkeit. Nachhaltiger Bioweinbau und zertifiziertes 4-Sterne Gästehaus in Martinsthal.",
      navTitle: "Navigation",
      nav1: "Gästehaus & Buchen",
      nav2: "Wein-Wälder Projekt",
      nav3: "Online-Shop",
      contactTitle: "Kontakt",
      contact1: "Hauptstraße 55",
      contact2: "65344 Eltville - Martinsthal",
      contact3: "06123 - 71412",
      bio: "ÖKO-KONTROLLSTELLE: DE-ÖKO-006 / BIOLAND",
      imprint: "Impressum",
      privacy: "Datenschutz"
    }
  },
  EN: {
    nav: {
      collection: "Collection",
      experience: "Guesthouse",
      manifesto: "Philosophy",
      shop: "Store"
    },
    hero: {
      subtitle: "Family Estate Engelmann-Schlepper",
      titleTop: "Rheingau Hospitality is the",
      titleBottom: "Pure Nature.",
      cta: "Book Tasting"
    },
    trust: {
      bio: "BIOLAND CERTIFIED",
      award: "NABU INNOVATION AWARD",
      hotel: "4-STAR GUESTHOUSE"
    },
    features: {
      f1_title: "Hospitality",
      f1_sub: "Experience",
      f1_cards: ["DTV Guesthouse", "Amidst the Vines", "Family Bohnacker-Schlepper"],
      f2_title: "Ecology",
      f2_log: "100% conversion to organic viticulture. The first fully organic harvest is approaching.",
      f3_title: "Vitiforestry",
      f3_sub: "Wine-Forest Project",
      f3_counter: "Trees in vineyards since 2024",
      f3_desc1: "Started with the pear variety 'Gute",
      f3_desc2: "Luise'. Planting together for the future.",
      f3_cta: "Start Sponsorship"
    },
    philosophy: {
      pre: "Our Philosophy",
      top: "Sustainable action is a matter close to our hearts.",
      bottom1: "We do not inherit the earth from our ancestors, ",
      bottom2: "we borrow it from our children."
    },
    protocol: [
      {
        step: "01",
        title: "Bioland Certification",
        desc: "A full transition to organic viticulture. Completely in harmony with the flora and fauna of the Rheingau.",
        img: "https://images.pexels.com/photos/31561190/pexels-photo-31561190.jpeg?auto=compress&cs=tinysrgb&w=2560",
      },
      {
        step: "02",
        title: "Pioneering ViTiForst",
        desc: "In 2021 Grandpa Friedel and Johannes planted our first 'Gute Luise' tree. Today we plant hundreds of trees directly into the sea of vines.",
        img: "https://images.pexels.com/photos/6265917/pexels-photo-6265917.jpeg?auto=compress&cs=tinysrgb&w=2560",
      },
      {
        step: "03",
        title: "Martinsthal Steep Slopes",
        desc: "The soul of our soils at Schlangengraben and Wildsau translated into the glass. Crystal clear, profound and typical Rheingau.",
        img: "https://images.pexels.com/photos/18561571/pexels-photo-18561571.jpeg?auto=compress&cs=tinysrgb&w=2560",
      },
    ],
    collection: {
      title: "The Portfolio",
      sub: "Organic Certified 2023",
      c1_top: "Discover",
      c1_title: "6-Bottle Tasting Box",
      c1_desc: "\"New Discoveries\". 6 selected wines including Grape Secco.",
      c1_price: "49.00€",
      c2_top: "Innovation",
      c2_title: "Cabernet Blanc",
      c2_desc: "PiWi Grape. Complex, strong structure and sustainably cultivated.",
      c2_price: "18.50€",
      c3_top: "Elegance",
      c3_title: "Pinot Noir",
      c3_desc: "Softly structured, elegantly matured. Aged in wooden barrels.",
      c3_price: "24.00€",
      cta: "ADD TO CART"
    },
    footer: {
      brand: "Engelmann-Schlepper",
      desc: "Pure Rheingau hospitality. Sustainable organic viticulture and certified 4-star guesthouse in Martinsthal.",
      navTitle: "Navigation",
      nav1: "Guesthouse & Booking",
      nav2: "Wine-Forest Project",
      nav3: "Online Store",
      contactTitle: "Contact",
      contact1: "Hauptstraße 55",
      contact2: "65344 Eltville - Martinsthal",
      contact3: "06123 - 71412",
      bio: "ECO-CONTROL BODY: DE-ÖKO-006 / BIOLAND",
      imprint: "Imprint",
      privacy: "Privacy Policy"
    }
  }
};

// Simple unmounted accessible counter component to simulate a live counter
function CountUpTarget({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2500; // 2.5s counting

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const reqId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqId);
  }, [target]);

  return <>{count}</>;
}

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"DE" | "EN">("DE");
  const t = translations[lang];

  // Ref for all animations
  const appRef = useRef(null);
  const protocolRef = useRef(null);

  // Telemetry Typewriter State
  const [telemetryText, setTelemetryText] = useState("");
  const fullText = t.features.f2_log;

  // Diagnostic Shuffler State
  const [shufflerCards, setShufflerCards] = useState(t.features.f1_cards);

  // Update shuffler cards when language changes
  useEffect(() => {
    setShufflerCards(t.features.f1_cards);
  }, [lang, t.features.f1_cards]);

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
        stagger: 0.1,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.2,
      });

      // Philosophy Parallax & Reveal
      const philBg = document.querySelector("#philosophy-bg");
      if (philBg) {
        gsap.to(philBg, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: "#philosophie",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray(".philosophy-reveal").forEach((elem: any) => {
        gsap.from(elem, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
          },
        });
      });

      // Protocol Sticky Stacking Interaction
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
            opacity: 0.4,
            filter: "blur(20px)",
            ease: "power2.inOut",
          });
        }
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  // Typewriter Effect
  useEffect(() => {
    setTelemetryText("");
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTelemetryText((prev) => fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [fullText]);

  // Shuffler Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShufflerCards((prev) => {
        const newArr = [...prev];
        const last = newArr.pop();
        if (last) newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={appRef}
      className="min-h-screen relative overflow-x-hidden bg-bg-cream text-charcoal noise-bg"
    >
      {/* SVG Noise Filter */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05] z-50 mix-blend-overlay"
        style={{ filter: "url(#noiseFilter)" }}
      ></div>

      {/* Navigation - The Floating Island */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-500 rounded-full px-8 py-4 ${isScrolled ? "bg-bg-cream/70 backdrop-blur-xl border border-charcoal/10 shadow-lg w-[95%] max-w-5xl" : "w-[95%] max-w-5xl bg-transparent"}`}
      >
        <div className="flex justify-between items-center w-full">
          <div className="hidden gap-8 items-center md:flex">
            <a
              href="#kollektion"
              className={`text-xs font-data uppercase tracking-widest hover:text-accent-clay transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}
            >
              {t.nav.collection}
            </a>
            <a
              href="#features"
              className={`text-xs font-data uppercase tracking-widest hover:text-accent-clay transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}
            >
              {t.nav.experience}
            </a>
            <div
             className={`w-px h-4 mx-2 ${isScrolled ? "bg-charcoal/20" : "bg-white/20"}`}></div>
            <div className={`flex items-center gap-2 text-xs font-data uppercase tracking-widest ${isScrolled ? "text-charcoal" : "text-white"}`}>
              <button 
                 onClick={() => setLang("DE")}
                 className={`${lang === "DE" ? "text-accent-clay font-bold" : "opacity-50 hover:opacity-100 hover:text-accent-clay transition-colors"}`}
              >
                  DE
              </button>
              <span className="opacity-30">/</span>
              <button 
                 onClick={() => setLang("EN")}
                 className={`${lang === "EN" ? "text-accent-clay font-bold" : "opacity-50 hover:opacity-100 hover:text-accent-clay transition-colors"}`}
              >
                  EN
              </button>
            </div>
          </div>

          <div
            className={`text-lg font-heading tracking-tight font-bold transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}
          >
            ENGELMANN<span className="opacity-50">-SCHLEPPER</span>
          </div>

          <div className="hidden gap-8 items-center md:flex">
            <a
              href="#philosophie"
              className={`text-xs font-data uppercase tracking-widest hover:text-accent-clay transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}
            >
              {t.nav.manifesto}
            </a>
            <button
              className={`magnetic-btn bg-accent-clay text-bg-cream px-6 py-2 rounded-full text-xs font-data uppercase tracking-widest overflow-hidden relative group`}
            >
              <span className="relative z-10 w-full rounded-full transition-transform">
                {t.nav.shop}
              </span>
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
          <button
            className="absolute top-8 right-8"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
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
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-dvh w-full overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&w=3840"
          alt="Dark Moody Wine Background"
          className="absolute inset-0 w-full h-full object-cover origin-center animate-hero-zoom"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-moss to-transparent/30"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:pb-32 lg:pl-32">
          <div className="max-w-4xl text-left">
            <p className="hero-elem opacity-0 translate-y-10 text-xs font-data uppercase tracking-[0.3em] text-accent-clay mb-6">
              {t.hero.subtitle}
            </p>
            <h1 className="hero-elem opacity-0 translate-y-10 text-2xl md:text-3xl lg:text-4xl leading-[0.9] text-bg-cream font-heading tracking-tight mb-2 uppercase">
              {t.hero.titleTop}
            </h1>
            <h1 className="hero-elem opacity-0 translate-y-10 text-7xl md:text-9xl lg:text-[14rem] text-bg-cream font-drama italic mb-12 -ml-2">
              {t.hero.titleBottom}
            </h1>

            <div className="hero-elem opacity-0 translate-y-10 flex flex-col sm:flex-row gap-6 items-start">
              <button className="magnetic-btn bg-accent-clay text-bg-cream px-8 py-4 rounded-4xl text-sm font-data uppercase tracking-widest flex items-center gap-3 w-full sm:w-auto justify-center hover:bg-white hover:text-primary-moss transition-colors">
                {t.hero.cta} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof Bar */}
      <div className="w-full bg-white border-b border-charcoal/5 py-8 relative z-20">
        <div className="max-w-7xl mx-auto flex justify-center gap-6 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 font-data text-[10px] md:text-xs uppercase tracking-[0.3em] flex-wrap px-6 text-center">
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-primary-moss"></span> {t.trust.bio}
          </div>
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-accent-clay"></span> {t.trust.award}
          </div>
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-charcoal"></span> {t.trust.hotel}
          </div>
        </div>
      </div>

      {/* Features - Interactive Functional Artifacts */}
      <section
        id="features"
        className="py-32 px-6 md:px-16 w-full max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Diagnostic Shuffler */}
          <div className="bg-bg-cream shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-12 h-[28rem] relative overflow-hidden flex flex-col justify-end border border-charcoal/5 group transition-shadow duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
            {/* Subtle Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-60"></div>
            
            <div className="absolute top-12 left-12 z-10">
              <h3 className="font-heading font-bold text-2xl mb-3 text-primary-moss">
                {t.features.f1_title}
              </h3>
              <p className="text-[10px] text-charcoal/50 font-data uppercase tracking-[0.2em]">
                {t.features.f1_sub}
              </p>
            </div>

            <div className="relative h-48 w-full mt-auto perspective-1000 z-10">
              {shufflerCards.map((text, i) => (
                <div
                  key={text}
                  className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm p-6 rounded-[1.5rem] shadow-sm border border-charcoal/5 transition-all duration-700 ease-out"
                  style={{
                    transform: `translateY(-${i * 18}px) scale(${1 - i * 0.04})`,
                    zIndex: 10 - i,
                    opacity: 1 - i * 0.15,
                  }}
                >
                  <p className="font-data text-sm flex items-center justify-between text-charcoal/80">
                    {text} <ArrowRight size={14} className="text-accent-clay opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Typewriter -> Organic Journal */}
          <div className="bg-primary-moss text-bg-cream shadow-[0_8px_30px_rgb(46,64,54,0.2)] rounded-[2.5rem] p-12 h-[28rem] border border-white/5 flex flex-col relative overflow-hidden group">
            {/* Organic Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
            <div className="absolute -right-16 -bottom-16 opacity-[0.04] text-white">
               <Grape size={350} strokeWidth={1} />
            </div>
            
            <div className="flex justify-between items-start mb-12 relative z-10">
              <h3 className="font-heading font-bold text-2xl text-white">{t.features.f2_title}</h3>
              <div className="flex items-center gap-2 opacity-50 bg-black/20 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-clay animate-pulse"></span>
                <span className="text-[9px] uppercase font-data tracking-widest text-white">
                  {t.features.f2_title} - Log
                </span>
              </div>
            </div>
            
            <div className="font-data text-base md:text-lg leading-relaxed mt-auto h-40 text-bg-cream/90 relative z-10 flex items-end">
              <p className="max-w-[90%]">
                {telemetryText}
                <span className="inline-block w-2.5 h-5 bg-bg-cream/50 ml-1.5 align-middle animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* Cursor Protocol Scheduler & Tree Counter */}
          <div className="bg-bg-cream shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-12 h-[28rem] border border-charcoal/5 flex flex-col justify-between overflow-hidden relative group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-shadow duration-500">
            {/* Subtle Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/50 via-transparent to-transparent opacity-60"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="font-heading font-bold text-2xl text-primary-moss mb-3">
                {t.features.f3_title}
              </h3>
              <p className="text-[10px] text-charcoal/50 font-data uppercase tracking-[0.2em] mb-8">
                {t.features.f3_sub}
              </p>
            </div>

            {/* Tree Target Counter */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
              <div className="flex justify-center items-center w-full mb-6 relative">
                 <div className="absolute inset-0 flex items-center justify-center opacity-5">
                   <svg width="150" height="150" viewBox="0 0 100 100" className="animate-[spin_40s_linear_infinite]">
                     <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4"/>
                   </svg>
                 </div>
                <div className="flex items-baseline gap-1">
                  <motion.span
                    className="font-heading text-[5rem] md:text-[6rem] text-accent-clay tracking-tighter leading-none"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    viewport={{ once: true }}
                  >
                    <CountUpTarget target={130} />
                  </motion.span>
                  <span className="font-heading text-4xl text-accent-clay opacity-80">
                    +
                  </span>
                </div>
              </div>
              
              <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-white w-full">
                <p className="text-charcoal/70 text-xs text-center font-light leading-relaxed">
                  {t.features.f3_desc1} <br/>{t.features.f3_desc2}
                </p>
              </div>
            </div>

            <button className="w-full mt-6 bg-white border border-charcoal/10 rounded-full py-4 text-[10px] font-data font-bold uppercase tracking-[0.2em] text-charcoal/80 group-hover:bg-primary-moss group-hover:text-white group-hover:border-primary-moss transition-all duration-300 relative overflow-hidden z-10">
              <span className="relative z-10">{t.features.f3_cta}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        id="philosophie"
        className="relative py-32 md:py-64 bg-charcoal text-bg-cream overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20 transition-transform duration-500 will-change-transform"
          id="philosophy-bg"
        >
          <img
            src="https://images.pexels.com/photos/298694/pexels-photo-298694.jpeg?auto=compress&cs=tinysrgb&w=3840"
            alt="Organic Texture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl">
            <p className="font-data text-xs uppercase tracking-[0.4em] text-accent-clay mb-12 philosophy-reveal">
              {t.philosophy.pre}
            </p>
            <h2 className="text-4xl md:text-5xl font-heading tracking-tight mb-8 philosophy-reveal leading-[1.1]">
              {t.philosophy.top}
            </h2>
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-drama italic text-accent-clay philosophy-reveal leading-[0.8]">
              {t.philosophy.bottom1} <br />
              <span className="text-bg-cream opacity-50">{t.philosophy.bottom2}</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Protcol - Sticky Stacking Archive */}
      <section ref={protocolRef} className="relative w-full bg-bg-cream">
        {t.protocol.map((item, index) => (
          <div
            key={index}
            className="protocol-card sticky top-0 h-screen w-full flex items-center justify-center p-6 origin-top bg-bg-cream border-t border-charcoal/5"
          >
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center px-6">
              <div className="order-2 md:order-1 relative">
                {/* Protocol Decorations */}
                <div className="absolute -top-20 -right-10 opacity-30 select-none pointer-events-none">
                  {index === 0 && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <svg
                        width="240"
                        height="240"
                        viewBox="0 0 100 100"
                        className="text-accent-clay"
                      >
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          fill="none"
                          strokeDasharray="4 8"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        {/* Sun/Organic Rays */}
                        {[...Array(12)].map((_, i) => (
                           <path
                             key={i}
                             d={`M 50 ${10} L 50 ${15}`}
                             stroke="currentColor"
                             strokeWidth="1"
                             strokeLinecap="round"
                             transform={`rotate(${i * 30} 50 50)`}
                           />
                        ))}
                      </svg>
                    </motion.div>
                  )}
                  {index === 1 && (
                    <div className="w-[240px] h-[240px] flex items-center justify-center">
                       <svg width="200" height="200" viewBox="0 0 100 100" className="text-accent-clay">
                         {/* Grape/PiWi structure */}
                         <motion.path
                           d="M20,20 Q40,10 60,30 T80,60"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="1"
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                         />
                         <motion.circle cx="30" cy="30" r="8" fill="currentColor" opacity="0.6" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}/>
                         <motion.circle cx="50" cy="40" r="10" fill="currentColor" opacity="0.8" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}/>
                         <motion.circle cx="45" cy="60" r="9" fill="currentColor" opacity="0.7" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}/>
                         <motion.circle cx="70" cy="50" r="7" fill="currentColor" opacity="0.5" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.1 }}/>
                       </svg>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="w-[240px] h-[140px] flex items-center justify-center">
                      <svg
                        width="240"
                        height="100"
                        viewBox="0 0 240 100"
                        className="text-accent-clay opacity-60"
                      >
                        {/* Topographical Steillage Wave */}
                        <motion.path
                          d="M0 60 Q 40 40, 80 80 T 160 30 T 240 70"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.path
                          d="M0 80 Q 50 60, 90 90 T 170 50 T 240 90"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          opacity="0.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="relative z-10">
                  <span className="font-data text-[10px] text-accent-clay mb-6 block tracking-[0.4em] uppercase">
                    {item.step} / WEINBAU PHILOSOPHIE
                  </span>
                  <h3 className="text-5xl md:text-7xl font-heading tracking-tight mb-8 leading-[1.05] text-primary-moss">
                    {item.title}
                  </h3>
                  <p className="text-xl text-charcoal/80 font-light leading-relaxed max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 h-[50vh] md:h-[80vh] w-full rounded-[4rem] overflow-hidden shadow-2xl">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pricing / Collection Grid */}
      <section id="kollektion" className="py-40 bg-bg-cream px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-heading tracking-tight text-primary-moss mb-4">
              {t.collection.title}
            </h2>
            <p className="font-data text-accent-clay uppercase tracking-widest text-sm">
              {t.collection.sub}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="rounded-[3rem] border border-charcoal/10 p-10 flex flex-col bg-white">
              <p className="font-data text-xs text-charcoal/50 uppercase tracking-widest mb-8">
                {t.collection.c1_top}
              </p>
              <h3 className="font-heading text-3xl mb-4">{t.collection.c1_title}</h3>
              <p className="text-charcoal/70 mb-12">
                {t.collection.c1_desc}
              </p>
              <div className="mt-auto">
                <p className="font-data text-2xl mb-6">{t.collection.c1_price}</p>
                <button className="magnetic-btn w-full py-4 rounded-full border border-primary-moss text-primary-moss font-data uppercase text-xs tracking-widest hover:bg-primary-moss hover:text-white transition-colors">
                  {t.collection.cta}
                </button>
              </div>
            </div>

            {/* Card 2 POP */}
            <div className="rounded-[3rem] bg-primary-moss p-10 flex flex-col text-white transform md:-translate-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10">
                <Grape size={200} />
              </div>
              <p className="font-data text-xs text-accent-clay uppercase tracking-widest mb-8">
                {t.collection.c2_top}
              </p>
              <h3 className="font-heading text-4xl mb-4">{t.collection.c2_title}</h3>
              <p className="text-white/70 mb-12 max-w-[80%] relative z-10">
                {t.collection.c2_desc}
              </p>
              <div className="mt-auto relative z-10">
                <p className="font-data text-3xl mb-6 text-accent-clay">
                  {t.collection.c2_price}
                </p>
                <button className="magnetic-btn w-full py-4 rounded-full bg-accent-clay text-bg-cream font-data uppercase text-xs tracking-widest hover:bg-white hover:text-primary-moss transition-colors">
                  {t.collection.cta}
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-[3rem] border border-charcoal/10 p-10 flex flex-col bg-white">
              <p className="font-data text-xs text-charcoal/50 uppercase tracking-widest mb-8">
                {t.collection.c3_top}
              </p>
              <h3 className="font-heading text-3xl mb-4">{t.collection.c3_title}</h3>
              <p className="text-charcoal/70 mb-12">
                {t.collection.c3_desc}
              </p>
              <div className="mt-auto">
                <p className="font-data text-2xl mb-6">{t.collection.c3_price}</p>
                <button className="magnetic-btn w-full py-4 rounded-full border border-primary-moss text-primary-moss font-data uppercase text-xs tracking-widest hover:bg-primary-moss hover:text-white transition-colors">
                  {t.collection.cta}
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
                  <a href="#" className="hover:text-white transition-colors">{t.footer.nav3}</a>
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

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary-moss animate-pulse"></span>
              <span className="font-data text-[10px] uppercase tracking-widest text-bg-cream/50">
                {t.footer.bio}
              </span>
            </div>
            <div className="flex gap-6 font-data text-[10px] uppercase tracking-widest text-bg-cream/50">
              <a href="#" className="hover:text-white">{t.footer.imprint}</a>
              <a href="#" className="hover:text-white">{t.footer.privacy}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
