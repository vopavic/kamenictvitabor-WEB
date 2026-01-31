import { ServiceCard } from "@/components/ui/ServiceCard"
import { Hammer, PenTool, Layers, Box, DraftingCompass, Brush } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-stone-100 py-20">
        <div className="container px-4 md:px-6">
           <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Naše Služby</h1>
            <p className="font-body text-xl text-stone-600">
              Kompletní kamenické práce od návrhu po realizaci.
            </p>
          </div>
        </div>
      </section>

      {/* Section A: Hřbitovní architektura */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-12 border-b border-stone-200 pb-4">
            <h2 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
              <Hammer className="text-accent" /> Hřbitovní architektura
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Urnové hroby"
              description="Elegantní řešení pro uložení uren. Nabízíme široký výběr materiálů a designů."
              href="/kontakt"
              icon={<Box size={24} />}
            />
            <ServiceCard 
              title="Jednohroby a dvojhroby"
              description="Tradiční i moderní pomníky z žuly a mramoru. Kompletní realizace včetně základů."
              href="/kontakt"
              icon={<Layers size={24} />}
            />
             <ServiceCard 
              title="Renovace písma"
              description="Obnova zašlého zlacení a stříbření. Sekání nových nápisů přímo na hřbitově."
              href="/kontakt"
              icon={<Brush size={24} />}
            />
          </div>
        </div>
      </section>

      {/* Section B: Interiér & Exteriér */}
      <section className="py-20 bg-stone-50">
        <div className="container px-4 md:px-6">
          <div className="mb-12 border-b border-stone-200 pb-4">
            <h2 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
              <PenTool className="text-accent" /> Interiér & Exteriér
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Kuchyňské desky"
              description="Luxusní žulové a mramorové desky na míru. Odolnost, která vydrží věky."
              href="/kontakt"
              icon={<DraftingCompass size={24} />}
            />
            <ServiceCard 
              title="Kamenné obklady"
              description="Obklady krbů, stěn a fasád. Přírodní kámen dodá prostoru jedinečný vzhled."
              href="/kontakt"
              icon={<Layers size={24} />}
            />
             <ServiceCard 
              title="Parapety a schody"
              description="Venkovní i vnitřní parapety a schodiště přesně na míru vašemu domu."
              href="/kontakt"
              icon={<DraftingCompass size={24} />}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
