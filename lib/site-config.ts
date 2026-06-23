export const siteConfig = {
  url: "https://www.kamentabor.cz",
  name: "Kamenictví Tábor — Hňupovi",
  shortName: "Kamenictví Tábor",
  tagline: "Tradiční řemeslo s 80letou tradicí",
  description:
    "Rodinné kamenictví s 80letou tradicí v Táboře a okolí. Hroby, pomníky, urnové hroby, kuchyňské desky, schody, parapety, renovace písma a gravírování.",
  locale: "cs_CZ",
  owner: "Radek Hňup",
  founded: "1945",
  phone: "+420606807389",
  phoneFormatted: "+420 606 807 389",
  email: "kamenictvitabor@gmail.com",
  address: {
    streetAddress: "Vesce 44",
    postalCode: "392 01",
    addressLocality: "Vesce u Soběslavi",
    addressRegion: "Jihočeský kraj",
    addressCountry: "CZ",
  },
  // TODO: přesné GPS souřadnice dílny — současné jsou přibližné centrum obce
  geo: { latitude: 49.2603, longitude: 14.7228 },
  areaServed: ["Tábor", "Soběslav", "Veselí nad Lužnicí", "Jihočeský kraj", "Česká republika"],

  // Ověřené firemní profily (Google × 2 zápisy, Firmy.cz) — vše stejná firma (shodný telefon).
  // TODO: doplnit Facebook/Instagram URL, až budou k dispozici.
  sameAs: [
    "https://share.google/eTrekULzYe2QPT29A", // Google – Kamenictví Kámen Tábor
    "https://share.google/kqlod5RQy6lrnYrC1", // Google – K. H. ZAP Tábor
    "https://www.firmy.cz/detail/324368-kamenictvi-k-h-zap-tabor.html", // Seznam Firmy.cz
  ],

  // Hodnocení z Google recenzí. POZOR: musí odpovídat realitě.
  // Aktuálně 6 zobrazených recenzí na hlavním Google zápisu, všechny 5★.
  // TODO: ověřit/aktualizovat počet, který Google zobrazuje jako souhrn.
  rating: { value: 5, count: 6 },

  // Reálné Google recenze (zobrazené i ve viditelné sekci „Reference" — kvůli korektnosti schématu).
  reviews: [
    { author: "Pavel Mareš", rating: 5, body: "Obrátili jsme se na pana Hňupa o dodání zakrytí rodinného hrobu." },
    { author: "Ester Rosíková", rating: 5, body: "Seriózní a vstřícné jednání, provedení dle domluvy." },
    { author: "Michaela Křížová", rating: 5, body: "Doporučuji, krásná práce." },
    { author: "Pavel Fara", rating: 5, body: "" },
    { author: "Tomáš Němec", rating: 5, body: "" },
    { author: "Radek Hnup", rating: 5, body: "" },
  ],

  // FAQ — zdroj pro lidsky čitelnou sekci i FAQPage schema (jeden zdroj pravdy).
  faq: [
    {
      q: "Kde Kamenictví Tábor (Hňupovi) sídlí a kde působí?",
      a: "Dílna sídlí ve Vesci u Soběslavi (Vesce 44, 392 01), okres Tábor. Působíme v Táboře, Soběslavi, Veselí nad Lužnicí a v celém Jihočeském kraji, po dohodě i v dalších regionech.",
    },
    {
      q: "Jaké kamenické služby nabízíte?",
      a: "Hřbitovní architekturu (urnové hroby, jednohroby, dvojhroby, památníky, litinové a kamenné kříže), gravírování a renovace písma, a dále kuchyňské desky, kamenné obklady, parapety a schody z žuly a mramoru.",
    },
    {
      q: "Z jakých materiálů náhrobky a desky vyrábíte?",
      a: "Pracujeme s žulou (Premium Black, Nero Zimbabwe, Star Galaxy, Viscount White a desítkami dalších) a mramorem (např. Bianco Carrara). Vzorky kamenů z českých i světových lomů si můžete prohlédnout osobně v dílně.",
    },
    {
      q: "Jak probíhá objednávka a realizace?",
      a: "Ve čtyřech krocích: nezávazná konzultace a kalkulace, přesné zaměření na místě, výroba v naší dílně a odborná montáž hotového díla.",
    },
    {
      q: "Kolik stojí pomník nebo náhrobek?",
      a: "Cena závisí na typu, rozměrech a zvoleném kameni. Připravíme vám nezávaznou kalkulaci na míru — ozvěte se na +420 606 807 389 nebo si domluvte konzultaci.",
    },
    {
      q: "Provádíte i renovace a opravy starších hrobů?",
      a: "Ano. Obnovujeme zašlé zlacení a stříbření písma, sekáme nové nápisy na stávající pomníky, čistíme a brousíme kámen a renovujeme starší hroby.",
    },
    {
      q: "Gravírujete nápisy i přímo na hřbitově?",
      a: "Ano. Písmo, ornamenty i portréty gravírujeme do kamene a doplnění nápisů zvládneme i přímo na místě na hřbitově.",
    },
    {
      q: "Jak dlouho kamenictví funguje?",
      a: "Jsme rodinné kamenictví s 80letou tradicí (od roku 1945). Kamenickým mistrem a majitelem je Radek Hňup.",
    },
  ],
} as const
