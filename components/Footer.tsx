import Link from "next/link"
import { Phone, MapPin, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-100 border-t border-stone-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand & Address */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-foreground">Kamenictví Kámen Tábor</h3>
            <p className="text-stone-600 max-w-xs font-body">
              Tradiční kamenictví s 80letou tradicí. Kvalitní materiály a poctivé řemeslo v Táboře a okolí.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-3 text-stone-600">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div className="font-body">
                  <p className="font-semibold text-foreground">Dílna:</p>
                  <p>Vesce 44, 392 01, Vesce u Soběslavi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-foreground">Rychlé odkazy</h3>
            <nav className="flex flex-col gap-2 font-body">
              <Link href="/" className="text-stone-600 hover:text-accent transition-colors w-fit">Domů</Link>
              <Link href="/o-nas" className="text-stone-600 hover:text-accent transition-colors w-fit">O nás</Link>
              <Link href="/sluzby" className="text-stone-600 hover:text-accent transition-colors w-fit">Naše služby</Link>
              <Link href="/vzornik" className="text-stone-600 hover:text-accent transition-colors w-fit">Vzorník</Link>
              <Link href="/realizace" className="text-stone-600 hover:text-accent transition-colors w-fit">Realizace</Link>
              <Link href="/kontakt" className="text-stone-600 hover:text-accent transition-colors w-fit">Kontakt</Link>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-foreground">Kontaktujte nás</h3>
            <div className="space-y-3 font-body">
              <div className="block">
                <p className="text-sm text-stone-500 mb-1">Telefon (Radek Hňup)</p>
                <a href="tel:+420606807389" className="flex items-center gap-2 text-xl font-bold text-accent hover:text-accent/80 transition-colors">
                  <Phone className="w-5 h-5" />
                  +420 606 807 389
                </a>
              </div>
              <div className="block">
                <p className="text-sm text-stone-500 mb-1">Email</p>
                <a href="mailto:kamenictvitabor@gmail.com" className="flex items-center gap-2 text-stone-600 hover:text-accent transition-colors">
                  <Mail className="w-5 h-5" />
                  kamenictvitabor@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500 font-body">
          <p>© {currentYear} Kamenictví Kámen Tábor. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}
