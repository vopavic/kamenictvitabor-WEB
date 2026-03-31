import Link from "next/link"
import Image from "next/image" // We might not have images yet, but good to import.
import { Button } from "@/components/ui/Button"
import { ArrowRight, Hammer, PenTool, RefreshCcw, Award, MapPin, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        {/* Placeholder for Hero Image - using a div overlay for now, or use a solid luxury color */}
        <div className="absolute inset-0 bg-[url('https://www.kamentabor.cz/data/files/20201128_133233-1.jpg')] bg-cover bg-center">
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
    </div>
  )
}
