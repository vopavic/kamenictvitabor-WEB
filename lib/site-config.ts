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
} as const
