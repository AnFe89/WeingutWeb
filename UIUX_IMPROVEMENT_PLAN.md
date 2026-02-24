# UI/UX Pro Max — Implementierungsplan

> **Ziel:** Alle kritischen und mittleren UI/UX-Verbesserungen aus dem Pro Max Audit umsetzen.
> **Projekt:** `d:\Apps\Website\WeingutWeb` (Vite + React + TypeScript + Tailwind CSS v4)
> **Kontext:** Weingut-Website (Brewery/Winery Kategorie). 2 Seiten: Home (`/`) und Shop (`/shop`).

---

## Dateistruktur (relevant)

```
WeingutWeb/
├── index.html              ← SEO-Fix
├── src/
│   ├── index.css           ← Globale Styles, Theme, Animationen
│   ├── App.tsx             ← Router, Layout-Wrapper
│   ├── main.tsx            ← Entry Point
│   ├── components/
│   │   ├── Navbar.tsx      ← Floating Nav Island
│   │   └── Footer.tsx      ← Footer
│   ├── pages/
│   │   ├── Home.tsx        ← Hauptseite (Hero, Features, Philosophy, Protocol, Collection)
│   │   └── Shop.tsx        ← Shop-Seite
│   └── data/
│       ├── translations.ts ← DE/EN Übersetzungen
│       └── products.ts     ← Produktdaten
```

---

## Phase 1 — Kritische Fixes (SEO + Accessibility)

### 1.1 SEO in `index.html`

**Datei:** `index.html`

Ersetze den kompletten `<head>` Block:

```html
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weingut Engelmann | Bio-Weine aus dem Rheingau</title>
    <meta name="description" content="Weingut Engelmann — Biodynamischer Weinbau im Rheingau. Entdecken Sie unsere PiWi-Rebsorten, nachhaltige Philosophie und handverlesene Kollektion." />
    <meta property="og:title" content="Weingut Engelmann | Bio-Weine aus dem Rheingau" />
    <meta property="og:description" content="Biodynamischer Weinbau im Rheingau. Nachhaltige PiWi-Weine mit Charakter." />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="de_DE" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
```

Erstelle außerdem `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="14" fill="#2e4036"/>
  <text x="16" y="21" text-anchor="middle" fill="#f2f0e9" font-family="serif" font-size="16" font-weight="bold">E</text>
</svg>
```

---

### 1.2 Accessibility: `prefers-reduced-motion`

**Datei:** `src/index.css`

Füge am Ende der Datei hinzu:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .animate-hero-zoom {
    animation: none !important;
  }
}
```

---

### 1.3 Accessibility: `aria-labels` auf Icon-Buttons

**Datei:** `src/components/Navbar.tsx`

Der Mobile Menu Button (ca. Zeile 131-138) bekommt ein `aria-label`:

```tsx
<button
  className={`transition-colors ${
    isScrolled || isShop ? "text-charcoal" : "text-white"
  }`}
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
  aria-expanded={mobileMenuOpen}
>
  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
```

Der Language-Switcher Button (ca. Zeile 123-130) bekommt ebenfalls ein `aria-label`:

```tsx
<button
  onClick={() => setLang(lang === "DE" ? "EN" : "DE")}
  className={`font-data text-xs transition-colors ${
    isScrolled || isShop ? "text-charcoal" : "text-white"
  }`}
  aria-label={`Sprache wechseln zu ${lang === "DE" ? "Englisch" : "Deutsch"}`}
>
  {lang === "DE" ? "EN" : "DE"}
</button>
```

Das Mobile Menu Overlay (ca. Zeile 144-187) bekommt `role` und `aria`:

```tsx
{mobileMenuOpen && (
  <div
    className="fixed inset-0 z-40 bg-primary-moss text-bg-cream pt-32 px-8 flex flex-col gap-8"
    role="dialog"
    aria-modal="true"
    aria-label="Hauptmenü"
  >
```

---

### 1.4 Accessibility: Heading Hierarchy fix

**Datei:** `src/pages/Home.tsx`

Im Hero (ca. Zeile 177-182) gibt es zwei `<h1>`. Ändere die zweite zu einem `<span>`:

```tsx
<h1 className="hero-elem text-2xl md:text-3xl lg:text-4xl leading-[0.9] text-bg-cream font-heading tracking-tight mb-2 uppercase">
  {t.hero.titleTop}
  <span className="hero-elem block text-7xl md:text-9xl lg:text-[14rem] text-bg-cream font-drama italic mb-12 -ml-2">
    {t.hero.titleBottom}
  </span>
</h1>
```

> **Hinweis:** Den `mb-12` vom `<span>` und `mb-2` vom `<h1>` ggf. anpassen, damit das Spacing identisch bleibt.

---

### 1.5 Accessibility: Focus States

**Datei:** `src/index.css`

Füge im `@layer base` Block hinzu:

```css
@layer base {
  a, button {
    @apply transition-all duration-300;
  }

  *:focus-visible {
    outline: 2px solid var(--color-accent-clay);
    outline-offset: 3px;
    border-radius: 4px;
  }
}
```

---

## Phase 2 — Navigation & Interaction

### 2.1 Smooth Scroll + Scroll Padding

**Datei:** `src/index.css`

Füge im `@layer base` Block hinzu:

```css
@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
  }
}
```

---

### 2.2 Active Nav State mit Intersection Observer

**Datei:** `src/components/Navbar.tsx`

1. Importiere `useRef` zusätzlich und füge State hinzu:

```tsx
const [activeSection, setActiveSection] = useState<string>("");
```

2. Füge einen `useEffect` mit IntersectionObserver hinzu (nach dem Scroll-Handler useEffect):

```tsx
useEffect(() => {
  if (isShop) return;

  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}, [isShop]);
```

3. Ändere die Nav-Links, um den aktiven State anzuzeigen. Ersetze die Klassen-Logik der Anchor-Links (ca. Zeile 62-91), Beispiel für den ersten Link:

```tsx
<a
  href="#kollektion"
  className={`transition-all duration-300 ${
    isScrolled
      ? activeSection === "kollektion"
        ? "text-accent-clay font-bold"
        : "text-charcoal/60 hover:text-charcoal hover:-translate-y-px"
      : activeSection === "kollektion"
        ? "text-white font-bold"
        : "text-white/70 hover:text-white hover:-translate-y-px"
  }`}
>
  {t.nav.collection}
</a>
```

Wende das gleiche Muster für `#features` und `#philosophie` an.

---

### 2.3 Mobile Menu Animation

**Datei:** `src/components/Navbar.tsx`

Ersetze das Mobile Menu Overlay (Zeile 144-187) mit einer animierten Version. Statt bedingtem Rendering nutze Klassen-basierte Visibility:

```tsx
<div
  className={`fixed inset-0 z-40 bg-primary-moss text-bg-cream pt-32 px-8 flex flex-col gap-8 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
    mobileMenuOpen
      ? "opacity-100 translate-y-0 pointer-events-auto"
      : "opacity-0 -translate-y-4 pointer-events-none"
  }`}
  role="dialog"
  aria-modal="true"
  aria-label="Hauptmenü"
>
  {/* ... bestehende Links bleiben gleich ... */}
</div>
```

> **Wichtig:** Entferne den `{mobileMenuOpen && (` Conditional Wrapper, damit das Element immer im DOM ist und die CSS-Transition funktioniert.

---

### 2.4 Button Active States

**Datei:** `src/index.css`

Erweitere die `.magnetic-btn` Klasse:

```css
.magnetic-btn:active {
  transform: scale(0.97);
}
```

---

## Phase 3 — Performance

### 3.1 Lazy Loading für Bilder

**Datei:** `src/pages/Home.tsx`

Alle `<img>` Tags die **nicht** im Hero sind, bekommen `loading="lazy"`:

1. Philosophy Background (Zeile 338-342):
```tsx
<img
  src="https://images.pexels.com/photos/298694/pexels-photo-298694.jpeg?auto=compress&cs=tinysrgb&w=3840"
  alt="Weinberge im Rheingau bei Sonnenaufgang"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

2. Protocol Section Bilder (Zeile 478-482):
```tsx
<img
  src={item.img}
  alt={item.title}
  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
  loading="lazy"
/>
```

3. Hero-Bild **nicht** lazy laden (es ist above-the-fold), aber `fetchpriority="high"` hinzufügen:
```tsx
<img
  src="https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&w=3840"
  alt="Weinfässer im Keller des Weingut Engelmann"
  className="absolute inset-0 w-full h-full object-cover origin-center animate-hero-zoom"
  fetchPriority="high"
/>
```

---

### 3.2 Bessere Alt-Texte

Ändere alle `alt`-Attribute zu beschreibenden Texten:

| Bild | Alt (aktuell) | Alt (neu) |
|---|---|---|
| Hero | `Dark Moody Wine Background` | `Weinfässer im Keller des Weingut Engelmann` |
| Philosophy | `Organic Texture` | `Weinberge im Rheingau bei Sonnenaufgang` |

---

### 3.3 CSS Duplikat entfernen

**Datei:** `src/index.css`

Entferne den duplizierten Block (Zeile 35-37):
```css
/* ENTFERNEN - ist doppelt: */
.magnetic-btn:hover {
  transform: scale(1.03);
}
```

---

## Phase 4 — Branchenfit-Verbesserung (Optional)

### 4.1 Craft Gold Akzentfarbe

**Datei:** `src/index.css`

Erweitere das `@theme` mit einer Gold-Farbe:

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Plus Jakarta Sans", "Outfit", sans-serif;
  --font-drama: "Cormorant Garamond", serif;
  --font-data: "IBM Plex Mono", monospace;

  --color-primary-moss: #2e4036;
  --color-accent-clay: #cc5833;
  --color-accent-gold: #ca8a04;
  --color-bg-cream: #f2f0e9;
  --color-charcoal: #1a1a1a;
}
```

Das Gold kann dann für Premium-Elemente genutzt werden (z.B. Auszeichnungen im Trust-Bar, Preis-Highlights).

---

## Checkliste

- [ ] Phase 1.1 — SEO in index.html (Title, Meta, lang, Favicon)
- [ ] Phase 1.2 — prefers-reduced-motion in index.css
- [ ] Phase 1.3 — aria-labels auf Navbar-Buttons
- [ ] Phase 1.4 — Heading Hierarchy (eine h1 statt zwei)
- [ ] Phase 1.5 — Focus States in index.css
- [ ] Phase 2.1 — Smooth Scroll + Scroll Padding
- [ ] Phase 2.2 — Active Nav State (Intersection Observer)
- [ ] Phase 2.3 — Mobile Menu Animation
- [ ] Phase 2.4 — Button Active States
- [ ] Phase 3.1 — Lazy Loading für Bilder
- [ ] Phase 3.2 — Bessere Alt-Texte
- [ ] Phase 3.3 — CSS Duplikat entfernen
- [ ] Phase 4.1 — Craft Gold Akzentfarbe (optional)

---

## Verifikation

Nach Umsetzung aller Phasen:

1. `npm run dev` starten und im Browser öffnen
2. Prüfen:
   - Title Tab zeigt "Weingut Engelmann | Bio-Weine aus dem Rheingau"
   - Smooth Scroll funktioniert bei Klick auf Nav-Links
   - Nav-Links highlighten beim Scrollen
   - Mobile Menu animiert rein/raus
   - Tab-Navigation zeigt sichtbare Focus-Ringe
   - Keyboard: Tab durch alle interaktiven Elemente möglich
3. Browser DevTools → Lighthouse Accessibility Audit laufen lassen
4. `npm run build` — sicherstellen, dass Build fehlerfrei durchläuft
