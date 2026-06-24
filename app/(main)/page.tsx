import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Hammer, PenTool, RefreshCcw, Award, MapPin, CheckCircle, Star } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}#business`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  image: `${siteConfig.url}/icon.png`,
  logo: `${siteConfig.url}/icon.png`,
  priceRange: "$$",
  foundingDate: siteConfig.founded,
  founder: { "@type": "Person", name: siteConfig.owner },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    postalCode: siteConfig.address.postalCode,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    addressCountry: siteConfig.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  areaServed: siteConfig.areaServed.map(name => ({ "@type": "Place", name })),
  knowsAbout: [
    "Hřbitovní architektura", "Urnové hroby", "Jednohroby", "Dvojhroby",
    "Pomníky", "Litinové kříže", "Kamenné kříže", "Gravírování do kamene",
    "Renovace pomníků", "Kuchyňské desky", "Kamenné obklady", "Schody",
    "Parapety", "Žula", "Mramor",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kamenické služby",
    itemListElement: [
      "Urnové hroby", "Jednohroby", "Dvojhroby", "Památníky",
      "Litinové a kamenné kříže", "Gravírování", "Renovace písma",
      "Kuchyňské desky", "Kamenné obklady", "Parapety a schody",
    ].map(name => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, provider: { "@id": `${siteConfig.url}#business` } },
    })),
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: "customer service",
    availableLanguage: ["Czech"],
  },
  sameAs: siteConfig.sameAs,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.rating.value,
    reviewCount: siteConfig.rating.count,
    bestRating: 5,
    worstRating: 1,
  },
  review: siteConfig.reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    ...(r.body ? { reviewBody: r.body } : {}),
  })),
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        {/* Placeholder for Hero Image - using a div overlay for now, or use a solid luxury color */}
        <div className="absolute inset-0 bg-[url('/dvojhroby/IMG_5032.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6 text-center z-10 space-y-6">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up">
            Dáváme kamenu tvář <br className="hidden md:block"/>již 80 let.
          </h1>
          <p className="font-body text-xl md:text-2xl text-stone-200 max-w-2xl mx-auto">
            Tradiční kamenictví s důrazem na detail. Kvalita, která přetrvá generace.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sluzby">
              <Button size="lg" className="rounded-none bg-accent text-white hover:bg-accent/90 w-full sm:w-auto">
                Naše služby
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button variant="outline" size="lg" className="rounded-none border-white text-black hover:bg-white hover:text-black hover:border-white w-full sm:w-auto">
                Kontaktovat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Teaser Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Naše specializace</h2>
            <div className="h-1 w-20 bg-accent mx-auto" />
            <p className="text-stone-600 max-w-2xl mx-auto font-body">
              Od hřbitovní architektury přes kuchyňské desky až po renovace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Hroby */}
            <Link href="/sluzby" className="group relative overflow-hidden h-96 block border border-stone-100 shadow-sm hover:shadow-xl transition-shadow">
              {/* Placeholder Image */}
              <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-500 bg-[url('/jednohroby/IMG_4663.jpeg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="mb-2 text-accent">
                  <Hammer size={32} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">Hřbitovní architektura</h3>
                <p className="text-stone-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Kompletní realizace hrobů, pomníků a uren.
                </p>
                <div className="flex items-center text-accent font-medium">
                  Více <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Card 2: Interiér */}
            <Link href="/sluzby" className="group relative overflow-hidden h-96 block border border-stone-100 shadow-sm hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-500 bg-[url('/kuchynske-desky/kuchyn.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="mb-2 text-accent">
                  <PenTool size={32} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">Interiér & Exteriér</h3>
                <p className="text-stone-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Kuchyňské desky, schody, parapety a krby.
                </p>
                <div className="flex items-center text-accent font-medium">
                  Více <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Card 3: Renovace */}
            <Link href="/sluzby" className="group relative overflow-hidden h-96 block border border-stone-100 shadow-sm hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-500 bg-[url('/renovation.png')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="mb-2 text-accent">
                  <RefreshCcw size={32} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">Renovace</h3>
                <p className="text-stone-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Opravy písma, čištění kamene a broušení.
                </p>
                <div className="flex items-center text-accent font-medium">
                  Více <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="font-heading text-3xl font-bold mb-4">Osobní konzultace</h2>
            <p className="text-stone-300 font-body text-lg">
              Pomůžeme vám s výběrem materiálu i technickým řešením. 
              Zarezervujte si čas, který vám vyhovuje, v naší dílně nebo kanceláři.
            </p>
          </div>
          <Link href="/konzultace" className="shrink-0">
            <Button size="lg" className="rounded-none bg-accent text-white hover:bg-accent/90">
              Domluvit schůzku
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-heading text-3xl font-bold mb-6 text-foreground">Proč si vybrat nás?</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-accent border border-stone-100">
                <Award size={32} />
              </div>
              <h3 className="font-bold text-xl">Let tradice</h3>
              <p className="text-stone-600">Zkušenosti předávané z generace na generaci.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-accent border border-stone-100">
                <MapPin size={32} />
              </div>
              <h3 className="font-bold text-xl">Lokální firma</h3>
              <p className="text-stone-600">Působíme v Táboře a okolí. Osobní přístup.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-accent border border-stone-100">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-bold text-xl">Kvalita</h3>
              <p className="text-stone-600">Používáme jen prověřené materiály té nejvyšší kvality.</p>
            </div>
          </div>

          <div className="mt-16 p-8 bg-white border border-stone-200 max-w-3xl mx-auto shadow-sm">
            <p className="font-heading text-xl md:text-2xl italic text-stone-700 mb-4">
              "Ke každé zakázce přistupuji s maximální pečlivostí pro maximální spokojenost našich zákazníků."
            </p>
            <p className="font-bold text-accent">— Radek Hňup</p>
          </div>
        </div>
      </section>

      {/* Reference / Google recenze */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Reference zákazníků</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={22} className="text-accent fill-accent" />
                ))}
              </div>
              <span className="font-body text-stone-600">
                {siteConfig.rating.value.toLocaleString("cs-CZ")} z 5 · {siteConfig.rating.count} hodnocení na Googlu
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {siteConfig.reviews.map((review) => (
              <div key={review.author} className="p-6 bg-stone-50 border border-stone-200 rounded-sm flex flex-col gap-3">
                <div className="flex" aria-label={`Hodnocení ${review.rating} z 5`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                {review.body && (
                  <p className="font-body text-stone-700 leading-relaxed italic">„{review.body}"</p>
                )}
                <p className="font-body font-bold text-foreground mt-auto">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
