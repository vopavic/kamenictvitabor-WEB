import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Rezervace konzultace — osobní schůzka",
  description:
    "Domluvte si osobní konzultaci v dílně Kamenictví Tábor (Hňupovi). Probereme váš záměr, vybereme materiál a připravíme kalkulaci.",
  alternates: { canonical: "/konzultace" },
  openGraph: {
    title: "Rezervace konzultace | Kamenictví Tábor",
    description: "Domluvte si termín osobního setkání v dílně.",
    url: "/konzultace",
  },
}

export default function KonzultacePage() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col items-center">
      {/* Navigation */}
      <div className="w-full max-w-5xl mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-accent transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zpět na web
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl flex-1 flex flex-col">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Rezervace konzultace</h1>
          <p className="font-body text-stone-600 mt-2">Vyberte si termín pro osobní setkání.</p>
        </div>

        {/* Calendar Container */}
        <div className="flex-1 bg-stone-50 border border-stone-200 rounded-lg overflow-hidden shadow-inner min-h-[600px] relative">
          <iframe 
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2b8C_Y_y9z_p_p_p_p_p_p_p?gv=true" 
            style={{ border: 0 }} 
            width="100%" 
            height="100%" 
            frameBorder="0"
          ></iframe>
          {/* Note: The above URL is a placeholder. User should provide their actual Google Calendar appointment schedule URL. */}
        </div>
        
        <div className="mt-8 text-center text-stone-500 text-sm">
          <p>Potřebujete jiný termín? Zavolejte nám na <a href="tel:+420606807389" className="font-bold hover:text-accent text-foreground transition-colors">+420 606 807 389</a></p>
        </div>
      </div>
    </div>
  )
}
