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

import { Language, translations } from "../data/translations";

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

export function Home({ lang }: { lang: Language }) {
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



  // GSAP Animations Lifecycle
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".hero-elem", {
        y: 40,
        opacity: 0,
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
      const cards = gsap.utils.toArray<HTMLElement>(".protocol-card");
      cards.forEach((card, i) => {
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
    <div ref={appRef}>
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
            <p className="hero-elem text-xs font-data uppercase tracking-[0.3em] text-accent-clay mb-6">
              {t.hero.subtitle}
            </p>
            <h1 className="hero-elem text-2xl md:text-3xl lg:text-4xl leading-[0.9] text-bg-cream font-heading tracking-tight mb-2 uppercase">
              {t.hero.titleTop}
            </h1>
            <h1 className="hero-elem text-7xl md:text-9xl lg:text-[14rem] text-bg-cream font-drama italic mb-12 -ml-2">
              {t.hero.titleBottom}
            </h1>

            <div className="hero-elem flex flex-col sm:flex-row gap-6 items-start">
              <button className="magnetic-btn bg-accent-clay text-bg-cream px-8 py-4 rounded-4xl text-sm font-data flex items-center justify-center gap-3 w-full sm:w-auto hover:bg-white hover:text-primary-moss transition-colors">
                <span className="uppercase tracking-widest pl-[0.1em]">{t.hero.cta}</span> <ArrowRight size={16} />
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
          {/* Diagnostic Shuffler - Winzer in 7 Tagen */}
          <div className="bg-bg-cream shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-12 h-112 relative overflow-hidden flex flex-col justify-end border border-charcoal/5 group transition-shadow duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
            {/* Subtle Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-60"></div>
            
            <div className="absolute top-12 left-12 z-10">
              <h3 className="font-heading font-bold text-2xl mb-3 text-primary-moss">
                {t.features.f1_title}
              </h3>
              <p className="text-[10px] text-charcoal/50 font-data uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
                {t.features.f1_sub}
              </p>
            </div>

            <div className="relative h-48 w-full mt-auto perspective-1000 z-10">
              {shufflerCards.map((text, i) => (
                <div
                  key={text}
                  className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-charcoal/5 transition-all duration-700 ease-out"
                  style={{
                    transform: `translateY(-${i * 18}px) scale(${1 - i * 0.04})`,
                    zIndex: 10 - i,
                    opacity: 1 - i * 0.15,
                  }}
                >
                  <p className="font-data text-xs md:text-sm flex items-center justify-between text-charcoal/80 leading-snug">
                    <span className="max-w-[85%]">{text}</span>
                    <ArrowRight size={14} className="text-accent-clay opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shrink-0" />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Typewriter -> Organic Journal */}
          <div className="bg-primary-moss text-bg-cream shadow-[0_8px_30px_rgb(46,64,54,0.2)] rounded-[2.5rem] p-12 h-112 border border-white/5 flex flex-col relative overflow-hidden group">
            {/* Organic Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
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
          <div className="bg-bg-cream shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-12 h-112 border border-charcoal/5 flex flex-col justify-between overflow-hidden relative group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-shadow duration-500">
            {/* Subtle Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-white/50 via-transparent to-transparent opacity-60"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="font-heading font-bold text-2xl text-primary-moss mb-3">
                {t.features.f3_title}
              </h3>
              <p className="text-[10px] text-charcoal/50 font-data uppercase tracking-[0.2em] mb-8">
                {t.features.f3_sub}
              </p>
            </div>

            {/* Tree Target Counter */}
            <div className="relative z-10 flex flex-col items-center justify-center grow">
              <div className="flex justify-center items-center w-full mb-6 relative">
                 <div className="absolute inset-0 flex items-center justify-center opacity-5">
                   <svg width="150" height="150" viewBox="0 0 100 100" className="animate-[spin_40s_linear_infinite]">
                     <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4"/>
                   </svg>
                 </div>
                <div className="flex items-baseline gap-1">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-block text-6xl text-charcoal tabular-nums tracking-tighter"
                  >
                    <CountUpTarget target={130} />
                  </motion.span>
                </div>
              </div>
              
              <div className="w-full text-center mt-2">
                 <p className="font-data text-xs md:text-sm uppercase tracking-widest text-charcoal/60 mb-1">{t.features.f3_counter}</p>
                 <p className="font-data text-[10px] uppercase text-charcoal/40 tracking-wider">{t.features.f3_counter_sub}</p>
              </div>
            </div>

            {/* Description and CTA */}
            <div className="relative z-10 mt-6 text-center">
              <p className="font-data text-[11px] text-charcoal/60 tracking-wider uppercase mb-6 leading-relaxed">
                {t.features.f3_desc1} <br/> {t.features.f3_desc2}
              </p>
              
              <a href="#kollektion" className="inline-flex items-center justify-center gap-3 w-full bg-accent-clay/10 text-accent-clay hover:bg-accent-clay hover:text-white transition-colors duration-300 py-4 px-6 rounded-full font-data text-[10px] font-bold uppercase tracking-[0.2em]">
                 <span className="pl-[0.2em]">{t.features.f3_cta}</span> <ArrowRight size={14} />
              </a>
            </div>
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
                    {item.step} / {t.protocol_tag}
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
                <button className="magnetic-btn w-full py-4 rounded-full border border-primary-moss text-primary-moss font-data flex flex-row items-center justify-center hover:bg-primary-moss hover:text-white transition-colors">
                  <span className="uppercase text-xs tracking-widest pl-[0.1em]">{t.collection.cta}</span>
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
                <button className="magnetic-btn w-full py-4 rounded-full bg-accent-clay text-bg-cream font-data flex flex-row items-center justify-center hover:bg-white hover:text-primary-moss transition-colors">
                  <span className="uppercase text-xs tracking-widest pl-[0.1em]">{t.collection.cta}</span>
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
                <button className="magnetic-btn w-full py-4 rounded-full border border-primary-moss text-primary-moss font-data flex flex-row items-center justify-center hover:bg-primary-moss hover:text-white transition-colors">
                  <span className="uppercase text-xs tracking-widest pl-[0.1em]">{t.collection.cta}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
