export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">O nás</h1>
            <p className="font-body text-xl text-stone-600">
              Už 80 let dáváme kamenu tvář a duši. Jsme rodinná firma, která staví na tradici, kvalitě a lidském přístupu.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold text-foreground">Historie a současnost</h2>
              <div className="w-20 h-1 bg-accent" />
              <p className="font-body text-stone-600 leading-relaxed">
                Kamenictví Kámen Tábor bylo založeno s vizí poskytovat prvotřídní kamenické služby, které přetrvají věky.
                S úctou k řemeslu našich předků a s využitím moderních technologií zpracováváme přírodní kámen do podoby,
                která zkrášluje domovy i místa posledního odpočinku.
              </p>
              <p className="font-body text-stone-600 leading-relaxed">
                Zakládáme si na tom, že každý kus kamene, který opustí naši dílnu, prošel rukama zkušených mistrů.
                Nejsme jen přeprodejci – jsme tvůrci. Od prvního návrhu až po finální montáž dohlížíme na každý detail.
              </p>
              <p className="font-heading font-bold text-lg text-foreground mt-4">
                "Kámen je věčný, stejně jako vzpomínky, které do něj vkládáme."
              </p>
            </div>
            <div className="relative h-[500px] w-full bg-stone-200 rounded-sm overflow-hidden shadow-lg">
               {/* Placeholder for About Image */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502054942078-d0df57da580a?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Jak pracujeme</h2>
            <p className="text-stone-400 font-body">Od vaší představy k hotovému dílu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Konzultace", desc: "Probereme vaše představy, poradíme s výběrem materiálu a připravíme nezávaznou kalkulaci." },
              { number: "02", title: "Zaměření", desc: "Přímo na místě vše přesně zaměříme, aby výsledek perfektně seděl." },
              { number: "03", title: "Výroba", desc: "V naší dílně kámen nařežeme, opracujeme a vyleštíme do finální podoby." },
              { number: "04", title: "Montáž", desc: "Hotové dílo přivezeme a odborně nainstalujeme s důrazem na čistotu a přesnost." }
            ].map((step) => (
              <div key={step.number} className="relative p-6 border border-stone-700 bg-stone-800/50 hover:bg-stone-800 transition-colors group">
                <div className="text-5xl font-heading font-bold text-accent/20 mb-4 group-hover:text-accent/40 transition-colors">
                  {step.number}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-stone-400 font-body text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-bold">Tradice</h3>
              <p className="text-stone-600 font-body">Ctíme staré kamenické postupy, které zaručují dlouhověkost.</p>
            </div>
             <div className="space-y-4">
              <h3 className="font-heading text-2xl font-bold">Spolehlivost</h3>
              <p className="text-stone-600 font-body">Co slíbíme, to dodržíme. Termíny i ceny jsou pro nás závazné.</p>
            </div>
             <div className="space-y-4">
              <h3 className="font-heading text-2xl font-bold">Kvalitní materiály</h3>
              <p className="text-stone-600 font-body">Vybíráme jen ten nejlepší kámen z celého světa i z českých lomů.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
