import Image from "next/image"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

const stones = [
  {
    category: "Žula",
    name: "Premium Black",
    description: "Luxusní černá žula s hlubokým leskem.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/g002premiumblack.jpg",
  },
  {
    category: "Žula",
    name: "Nero Zimbabwe",
    description: "Tradiční černá žula, velmi oblíbená pro pomníky.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/g003oknerozimbabwe.jpg",
  },
  {
    category: "Žula",
    name: "Star Galaxy",
    description: "Černá žula se zlatými 'hvězdami'. Exkluzivní vzhled.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/g112stargalaxy.jpg",
  },
  {
    category: "Žula",
    name: "Viscount White",
    description: "Elegantní bílo-šedá kresba s vlnitým vzorem.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/g130viscountwhite.jpg",
  },
  {
    category: "Žula",
    name: "Orion",
    description: "Modravá žula s jedinečnou strukturou.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/orion.jpg",
  },
  {
    category: "Žula",
    name: "Multicolor Red",
    description: "Červeno-černá žula s výraznou kresbou.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/multicolorred.png",
  },
  {
    category: "Mramor",
    name: "Bianco Carrara",
    description: "Klasický italský bílý mramor s šedým žilkováním.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/m0202biancocarrara.jpg",
  },
  {
    category: "Žula",
    name: "Impala Dark",
    description: "Tmavě šedá žula, standard pro hřbitovní architekturu.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/g115neroafricaimpaladark.jpg",
  },
  {
    category: "Žula",
    name: "Tarn",
    description: "Světle šedá žula s hrubší strukturou.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/g140tarn.jpg",
  },
   {
    category: "Žula",
    name: "Olive Green",
    description: "Olivově zelená žula, netradiční a zajímavá.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/olivegrean.jpg",
  },
  {
    category: "Žula",
    name: "Vanga Red",
    description: "Sytě červená žula.",
    image: "https://www.kamentabor.cz/data/gallery/vzornik/img/vangared.jpg",
  },
]

export default function VzornikPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-stone-100 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Vzorník Kamenů</h1>
          <p className="font-body text-xl text-stone-600">Vyberte si ten pravý materiál pro váš projekt.</p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-stone-600 font-body leading-relaxed">
              Kámen je přírodní materiál a každý kus je originál. Zde uvádíme pouze výběr nejoblíbenějších materiálů.
              V naší dílně máme k dispozici desítky dalších vzorků žul, mramorů i pískovců z celého světa.
            </p>
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-sm">
              <p className="font-bold text-accent font-heading">
                Doporučujeme materiály vybírat osobně – barva a struktura se mohou ve skutečnosti lišit od fotografií.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stones.map((stone, index) => (
              <div key={index} className="group border border-stone-200 bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                   <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${stone.image})` }}
                   />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent border border-accent/20 px-2 py-1 rounded-full">
                      {stone.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {stone.name}
                  </h3>
                  <p className="text-stone-600 font-body text-sm line-clamp-3">
                    {stone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-heading text-3xl font-bold mb-6">Nevybrali jste si?</h2>
          <p className="text-stone-300 max-w-2xl mx-auto mb-8 font-body">
            Máme přístup k tisícům druhů kamene z celého světa. Zastavte se u nás na kávu a společně najdeme to pravé.
          </p>
          <Link href="/kontakt">
            <Button size="lg" className="bg-accent text-white hover:bg-accent/90 rounded-none px-8">
              Domluvit schůzku
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
