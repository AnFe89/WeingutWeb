export interface LocalizedString {
  DE: string;
  EN: string;
}

export interface Product {
  id: string;
  name: LocalizedString;
  categoryId: string;
  price?: string;
  image?: string;
  link: string;
}

export const shopCategories: { id: string; name: LocalizedString }[] = [
  { id: "c1", name: { DE: "Riesling trocken & weiße Exoten", EN: "Dry Riesling & White Exotics" } },
  { id: "c2", name: { DE: "Riesling Classic & halbtrocken", EN: "Classic & Semi-Dry Riesling" } },
  { id: "c3", name: { DE: "Riesling restsüß", EN: "Sweet Riesling" } },
  { id: "c4", name: { DE: "Rosé & Blanc de Noir", EN: "Rosé & Blanc de Noir" } },
  { id: "c5", name: { DE: "Rotweine", EN: "Red Wines" } },
  { id: "c6", name: { DE: "Sekt, Secco, Saft & alkoholfrei", EN: "Sparkling, Juice & Non-Alcoholic" } },
  { id: "c7", name: { DE: "Probierpakete", EN: "Tasting Packages" } },
  { id: "c8", name: { DE: "Geschenk-Kartons", EN: "Gift Boxes" } },
  { id: "c9", name: { DE: "Baum-Patenschaften", EN: "Tree Sponsorships" } }
];

export const products: Product[] = [
  {
    id: "p1",
    name: { DE: "2023 Spätburgunder Rosé trocken 0,75L.", EN: "2023 Pinot Noir Rosé Dry 0.75L." },
    categoryId: "c4",
    link: "https://www.engelmann-schlepper.de/ros-and-blanc-de-noir/2023-sptburgunder-ros-trocken-075-l",
    image: "/images/rose_bottle.png"
  },
  {
    id: "p2",
    name: { DE: "2022 Riesling Sekt brut 0,75L.", EN: "2022 Riesling Sparkling Brut 0.75L." },
    categoryId: "c6",
    link: "https://www.engelmann-schlepper.de/sekt-secco-saft-and-alkoholfrei/2022-riesling-sekt-brut-075-l",
    image: "/images/riesling_bottle.png"
  },
  {
    id: "p3",
    name: { DE: "2023 Mythos/Blau Rotwein trocken 0,75L.", EN: "2023 Mythos/Blue Red Wine Dry 0.75L." },
    categoryId: "c5",
    link: "https://www.engelmann-schlepper.de/rotweine/2023-mythos-blau-rotwein-trocken-075-l",
    image: "/images/red_bottle.png"
  },
  {
    id: "p4",
    name: { DE: "6er \"Neue Entdeckungen\"", EN: "6-pack \"New Discoveries\"" },
    categoryId: "c7",
    link: "https://www.engelmann-schlepper.de/probierpakete/6er-neue-entdeckungen",
    image: "/images/riesling_bottle.png"
  },
  {
    id: "p5",
    name: { DE: "6er \"Conny's Favorites\"", EN: "6-pack \"Conny's Favorites\"" },
    categoryId: "c7",
    link: "https://www.engelmann-schlepper.de/probierpakete/6er-connys-favorites",
    image: "/images/riesling_bottle.png"
  },
  {
    id: "p6",
    name: { DE: "2024 Riesling Kabinett trocken 0,75L.", EN: "2024 Riesling Kabinett Dry 0.75L." },
    categoryId: "c1",
    link: "https://www.engelmann-schlepper.de/riesling-trocken-and-weie-exoten/2024-riesling-kabinett-trocken-075-l",
    image: "/images/riesling_bottle.png"
  },
  {
    id: "p7",
    name: { DE: "2024 Riesling CLASSIC 0,75L.", EN: "2024 Riesling CLASSIC 0.75L." },
    categoryId: "c2",
    link: "https://www.engelmann-schlepper.de/riesling-classic-and-halbtrocken/2024-riesling-classic-075-l",
    image: "/images/riesling_bottle.png"
  },
  {
    id: "p8",
    name: { DE: "2024 Riesling >Steillage< trocken 0,75L.", EN: "2024 Riesling >Steep Slope< Dry 0.75L." },
    categoryId: "c1",
    link: "https://www.engelmann-schlepper.de/riesling-trocken-and-weie-exoten/2024-riesling-steillage-trocken-075-l",
    image: "/images/riesling_bottle.png"
  },
  {
    id: "p9",
    name: { DE: "2023 Riesling >S< trocken 0,75L.", EN: "2023 Riesling >S< Dry 0.75L." },
    categoryId: "c1",
    link: "https://www.engelmann-schlepper.de/riesling-trocken-and-weie-exoten/2023-riesling-s-trocken-075-l",
    image: "/images/riesling_bottle.png"
  },
  {
    id: "p10",
    name: { DE: "2023 Rosa Chardonnay >Steillage< trocken 0,75L.", EN: "2023 Pink Chardonnay >Steep Slope< Dry 0.75L." },
    categoryId: "c1",
    link: "https://www.engelmann-schlepper.de/riesling-trocken-and-weie-exoten/2023-rosa-chardonnay-steillage-trocken-075-l",
    image: "/images/riesling_bottle.png"
  },
  {
    id: "p11",
    name: { DE: "2024 \"Elinor's VIRGIN Wildsau\" 0,75L.", EN: "2024 \"Elinor's VIRGIN Wildsau\" 0.75L." },
    categoryId: "c6",
    link: "https://www.engelmann-schlepper.de/sekt-secco-saft-and-alkoholfrei/2024-elinors-virgin-wildsau-075-l",
    image: "/images/rose_bottle.png"
  },
  {
    id: "p12",
    name: { DE: "2024 Riesling TRAUBENSAFT 0,75L.", EN: "2024 Riesling GRAPE JUICE 0.75L." },
    categoryId: "c6",
    link: "https://www.engelmann-schlepper.de/sekt-secco-saft-and-alkoholfrei/2024-riesling-traubensaft-075-l",
    image: "/images/riesling_bottle.png"
  }
];
