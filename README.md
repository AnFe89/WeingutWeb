# Weingut Engelmann | Website

Website des Weingut Engelmann -- Biodynamischer Weinbau im Rheingau.

## Tech Stack

- **React 19** + TypeScript
- **Vite 6** (Dev Server & Build)
- **Tailwind CSS 4**
- **GSAP** (Scroll-Animationen & Parallax)
- **Motion** (Framer Motion Animationen)
- **React Router** (SPA Routing)
- **Lucide React** (Icons)

## Seiten

| Route | Beschreibung |
|-------|-------------|
| `/` | Startseite (Hero, Features, Philosophie, Protokoll, Kollektion) |
| `/shop` | Shop-Seite |

## Lokal starten

**Voraussetzung:** Node.js

```bash
npm install
npm run dev
```

Die App startet auf `http://localhost:3000`.

## Build

```bash
npm run build
npm run preview
```

## Projektstruktur

```
src/
  components/   Navbar, Footer
  pages/        Home, Shop
  data/         Produktdaten, Übersetzungen (DE/EN)
  index.css     Theme, Animationen, globale Styles
  App.tsx       Router & Layout
```
