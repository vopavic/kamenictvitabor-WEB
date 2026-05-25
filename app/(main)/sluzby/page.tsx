import type { Metadata } from "next"
import { ServiceCard } from "@/components/ui/ServiceCard"
import { Hammer, PenTool, Layers, Box, DraftingCompass, Brush, Award, Cross, Type } from "lucide-react"

export const metadata: Metadata = {
  title: "Naše služby — hroby, pomníky, kuchyňské desky, gravírování",
  description:
    "Kompletní kamenické práce v Táboře a okolí — urnové hroby, jednohroby, dvojhroby, památníky, litinové a kamenné kříže, gravírování, renovace písma, kuchyňské desky, kamenné obklady, schody a parapety.",
  alternates: { canonical: "/sluzby" },
  openGraph: {
    title: "Naše služby | Kamenictví Tábor",
    description: "Hřbitovní architektura, kuchyňské desky, schody, parapety, obklady, renovace a gravírování.",
    url: "/sluzby",
  },
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-4 md:px-6">
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
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 border-b border-stone-200 pb-4">
            <h2 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
              <Hammer className="text-accent" /> Hřbitovní architektura
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Urnové hroby"
              description="Elegantní řešení pro uložení uren. Nabízíme široký výběr materiálů a designů."
              href="/realizace?cat=Urnov%C3%A9%20hroby"
              icon={<Box size={24} />}
              imageSrc="/urnaky/IMG_5248.jpeg"
            />
            <ServiceCard
              title="Jednohroby"
              description="Tradiční i moderní jednohroby z žuly a mramoru. Kompletní realizace včetně základů."
              href="/realizace?cat=Jednohroby"
              icon={<Layers size={24} />}
              imageSrc="/jednohroby/IMG_4663.jpeg"
            />
            <ServiceCard
              title="Dvojhroby"
              description="Dvojhroby z žuly a mramoru pro důstojné společné místo posledního odpočinku."
              href="/realizace?cat=Dvojhroby"
              icon={<Layers size={24} />}
              imageSrc="/dvojhroby/IMG_5345.jpeg"
            />
            <ServiceCard
              title="Památníky"
              description="Pomníky a památníky na míru — od klasických forem po moderní design."
              href="/realizace?cat=Pam%C3%A1tn%C3%ADky"
              icon={<Award size={24} />}
              imageSrc="/pamatniky/pomnik.jpg"
            />
            <ServiceCard
              title="Litinové a kamenné kříže"
              description="Tradiční litinové a kamenné kříže pro hroby a pomníky. Opravy i nové realizace."
              href="/realizace?cat=Litinov%C3%A9%20a%20kamenn%C3%A9%20k%C5%99%C3%AD%C5%BEe"
              icon={<Cross size={24} />}
              imageSrc="/litenne-krize/20200903-190605.jpg"
            />
            <ServiceCard
              title="Gravírování"
              description="Precizní gravírování písma, ornamentů a portrétů do kamene přímo na hřbitově."
              href="/realizace?cat=Grav%C3%ADrov%C3%A1n%C3%AD"
              icon={<Type size={24} />}
              imageSrc="/glavirovani/490853260-1184844670319047-6096504186626387201-n.jpg"
            />
            <ServiceCard
              title="Renovace písma"
              description="Obnova zašlého zlacení a stříbření. Sekání nových nápisů přímo na hřbitově."
              href="/realizace?cat=Renovace"
              icon={<Brush size={24} />}
              imageSrc="/renovation.png"
            />
          </div>
        </div>
      </section>

      {/* Section B: Interiér & Exteriér */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 border-b border-stone-200 pb-4">
            <h2 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
              <PenTool className="text-accent" /> Interiér & Exteriér
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Kuchyňské desky"
              description="Luxusní žulové a mramorové desky na míru. Odolnost, která vydrží věky."
              href="/realizace?cat=Kuchy%C5%88sk%C3%A9%20desky"
              icon={<DraftingCompass size={24} />}
              imageSrc="/kuchynske-desky/kuchyn.jpg"
            />
            <ServiceCard
              title="Kamenné obklady"
              description="Obklady krbů, stěn a fasád. Přírodní kámen dodá prostoru jedinečný vzhled."
              href="/kontakt"
              icon={<Layers size={24} />}
              imageSrc="/obklady/Screenshot 2026-02-21 153719.png"
            />
            <ServiceCard
              title="Parapety a schody"
              description="Venkovní i vnitřní parapety a schodiště přesně na míru vašemu domu."
              href="/realizace?cat=Schody%20a%20parapety"
              icon={<DraftingCompass size={24} />}
              imageSrc="/schody-parapety/fotografie0731.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
