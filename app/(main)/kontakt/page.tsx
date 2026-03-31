import { Phone, MapPin, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <section className="bg-stone-100 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Kontakt</h1>
          <p className="font-body text-xl text-stone-600">Jsme tu pro vás. Ozvěte se nám.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column: Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">Kamenictví Kámen Tábor</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full text-accent">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="font-body text-sm text-stone-500 mb-1">Radek Hňup</p>
                      <a href="tel:+420606807389" className="text-xl md:text-2xl font-bold text-foreground hover:text-accent transition-colors">
                        +420 606 807 389
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full text-accent">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="font-body text-sm text-stone-500 mb-1">Email</p>
                      <a href="mailto:kamenictvitabor@gmail.com" className="text-lg text-foreground hover:text-accent transition-colors">
                        kamenictvitabor@gmail.com
                      </a>
                    </div>
                  </div>

                   <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full text-accent">
                      <MapPin size={24} />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-bold text-foreground">Dílna:</p>
                        <p className="text-stone-600">Vesce 44, 392 01, Vesce u Soběslavi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               <div className="p-6 bg-stone-50 border border-stone-200 rounded-sm">
                  <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-accent"/> Otevírací doba
                  </h3>
                  <p className="text-stone-600 mb-2">Dle telefonické domluvy.</p>
                  <p className="text-sm text-stone-500">
                    Vážíme si vašeho času, proto se prosím před návštěvou dílny nebo kanceláře vždy objednejte telefonicky.
                  </p>
               </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white p-8 border border-stone-200 shadow-sm rounded-sm">
              <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">Napište nám</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Jméno</label>
                    <input 
                      id="name" 
                      type="text" 
                      className="flex h-12 w-full rounded-md border border-stone-300 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent transition-shadow"
                      placeholder="Jan Novák"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">Telefon</label>
                    <input 
                      id="phone" 
                      type="tel" 
                      className="flex h-12 w-full rounded-md border border-stone-300 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent transition-shadow"
                      placeholder="+420 777 000 000"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    className="flex h-12 w-full rounded-md border border-stone-300 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent transition-shadow"
                    placeholder="jan.novak@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Zpráva</label>
                  <textarea 
                    id="message" 
                    className="flex w-full rounded-md border border-stone-300 bg-background px-3 py-2 text-sm min-h-[150px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent transition-shadow resize-y"
                    placeholder="Dobrý den, měl bych zájem o..."
                  />
                </div>

                <Button className="w-full text-lg h-12 mt-4" size="lg">
                  Odeslat zprávu
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="h-[400px] w-full bg-stone-200 grayscale hover:grayscale-0 transition-[filter] duration-500">
        <iframe 
          src="https://maps.google.com/maps?q=Vesce%2044,%20392%2001,%20Vesce%20u%20Sob%C4%9Bslavi&t=&z=13&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Mapa"
        />
        {/* Note: I used a placeholder coordinates/embed because I don't have the exact embed code for the address. 
            The address is Vesce 44, 392 01, Vesce u Soběslavi. 
            I should probably update the map to be generic or ask user for API key, but generic embed by address works if I construct URL.
            Since I cannot reliably generate a valid signed embed from scratch without API key or searching, I used a placeholder structure.
            I'll advise user to check the map.
        */}
      </section>
    </div>
  )
}
