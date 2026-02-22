import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Language } from "./data/translations";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";

export default function App() {
  const [lang, setLang] = useState<Language>("DE");

  return (
    <BrowserRouter>
      <div className="min-h-screen relative overflow-x-hidden bg-bg-cream text-charcoal noise-bg flex flex-col">
        {/* Global SVG Noise Filter */}
        <svg className="hidden">
          <filter id="globalNoiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </svg>
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
          style={{ filter: "url(#globalNoiseFilter)" }}
        ></div>

        <Navbar lang={lang} setLang={setLang} />
        
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/shop" element={<Shop lang={lang} />} />
          </Routes>
        </main>

        <Footer lang={lang} />
      </div>
    </BrowserRouter>
  );
}
