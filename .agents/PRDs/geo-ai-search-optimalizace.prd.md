# GEO — optimalizace pro AI vyhledávače (a doplnění strukturovaných dat)

## Problem Statement

Web kamentabor.cz už má solidní SEO/GEO základ (sitemap, robots s AI boty, llms.txt, JSON-LD `LocalBusiness` na homepage a `ContactPage` na /kontakt). Chybí ale prvky, které mají na viditelnost v AI vyhledávačích (ChatGPT, Perplexity, Google AI Overviews, Claude) největší vliv: **FAQ s `FAQPage` schématem**, **strukturovaná data na zbývajících stránkách**, **`sameAs` odkazy na firemní profily** a **hodnocení (`AggregateRating`)**. Bez nich AI nástroje hůř extrahují konkrétní odpovědi o firmě a méně jí důvěřují.

## Key Hypothesis

Věříme, že doplnění FAQ schématu, strukturovaných dat na všech stránkách a důvěryhodnostních signálů (sameAs, recenze) zvýší pravděpodobnost, že AI vyhledávače budou Kamenictví Tábor citovat a správně popisovat.
Ověříme validací schématu (Google Rich Results Test / schema.org validator bez chyb), zeleným buildem a kontrolou, že `/sitemap.xml`, `/robots.txt`, `/llms.txt` a JSON-LD na každé stránce odpovídají realitě.

## Users

**Primary User**: AI vyhledávací nástroj / LLM agent, který indexuje a cituje web při dotazech typu „kamenictví Tábor", „kdo udělá pomník v okolí Soběslavi", „cena urnového hrobu". Sekundárně tradiční vyhledávače (Google, Seznam) a jejich AI přehledy.

**Job to Be Done**: Když AI nástroj odpovídá na dotaz o kamenických službách v regionu Tábor, chce strojově čitelná, důvěryhodná a úplná fakta o firmě, aby ji mohl přesně citovat a doporučit.

**Non-Users**: Není to vizuální redesign ani změna obsahu pro lidské návštěvníky (kromě nové, lidsky čitelné FAQ sekce).

## Solution

Stavíme na existující infrastruktuře. Veškerá fakta plynou z `lib/site-config.ts` (jediný zdroj pravdy), který rozšíříme o `sameAs`, `rating` a `faq`. Strukturovaná data se renderují jako `application/ld+json` skripty per stránka; FAQ dostane i lidsky čitelnou sekci.

### Co už existuje (NEDĚLAT znovu)

`app/sitemap.ts` (→ `/sitemap.xml`), `app/robots.ts`, `public/llms.txt`, metadata+OG v `app/layout.tsx`, `LocalBusiness` JSON-LD na `/`, `ContactPage` JSON-LD na `/kontakt`.

### MVP Scope

| Priority | Capability | Rationale |
|----------|------------|-----------|
| Must | **FAQ sekce + `FAQPage` JSON-LD** (~6–8 Q&A na míru, navrhne Claude) — lidsky čitelná sekce na `/sluzby` (nebo `/`) + schema | Nejvyšší GEO přínos; AI z toho čerpá přímé odpovědi |
| Must | **`sameAs` v `LocalBusiness`** — Google Business Profile, Seznam Firmy.cz, Facebook/Instagram | Důvěryhodnostní propojení entit; vyžaduje URL od uživatele |
| Must | **`AggregateRating`** v `LocalBusiness` — `ratingValue` + `reviewCount` z Google recenzí | Silný GEO/rich-result signál; **musí být pravdivé** — čeká na čísla od uživatele |
| Must | **Per-page JSON-LD na zbývajících stránkách** | Jen `/` a `/kontakt` je dnes mají |
| Must | — `/sluzby`: `Service`/`OfferCatalog` + `BreadcrumbList` | Hlavní konverzní stránka |
| Must | — `/realizace`: `CollectionPage` + `ImageGallery`/`ItemList` kategorií + `BreadcrumbList` | Galerie = klíčový obsah |
| Must | — `/o-nas`: `AboutPage` napojená na `#business` + `BreadcrumbList` | Příběh firmy pro AI |
| Should | — `/vzornik`: `CollectionPage` / seznam materiálů + `BreadcrumbList` | Materiály jako fakta |
| Should | — `/konzultace`: `ContactPage`/`ReserveAction` + `BreadcrumbList` | Doplnění |
| Should | **Doplnit metadata + canonical** na stránkách, kde chybí (o-nas, vzornik, konzultace, realizace) | Konzistence, canonical pro AI |
| Should | **Rozšířit `llms.txt`** o odkaz na FAQ a recenze | Udržet llms.txt aktuální |
| Should | **Reálná OG sdílecí grafika 1200×630** místo `icon.png` | Lepší náhled při sdílení (lze odložit) |
| Won't | Vymýšlení recenzí, URL profilů nebo přesných GPS | Pravdivost — pouze reálná data od uživatele |
| Won't | Image sitemap pro jednotlivé fotky, vícejazyčnost | Mimo rozsah teď |
| Won't | Změna designu stránek (mimo přidání FAQ sekce) | Není cílem |

### Technický přístup

- `lib/site-config.ts`: přidat `sameAs: string[]`, `rating?: { value: number; count: number }`, `faq: { q: string; a: string }[]`.
- Strukturovaná data podmíněně: `AggregateRating` se vykreslí **jen** když `rating` existuje (žádné fabrikované hodnoty, žádné prázdné/neplatné schema).
- `sameAs` se vykreslí z neprázdného pole; dokud uživatel nedodá URL, zůstane prázdné (validní).
- Sdílená pomůcka pro `BreadcrumbList` (DRY napříč stránkami).
- FAQ jako React sekce + odpovídající `FAQPage` JSON-LD ze stejného `faq` pole (jeden zdroj pravdy).

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Validní strukturovaná data | 0 chyb | schema.org validator / Google Rich Results Test pro každou stránku |
| Pokrytí JSON-LD | 7/7 stránek má relevantní schema | Manuální kontrola `view-source` |
| FAQPage rich result | FAQ rozpoznáno | Rich Results Test na stránce s FAQ |
| Pravdivost faktů | 100 % (rating, sameAs, adresa) odpovídá realitě | Kontrola s uživatelem |
| Build | Bez chyb | `npm run build` |

## Open Questions / Potřebné vstupy od uživatele

- [ ] **URL profilů pro `sameAs`**: přesná adresa (1) Google Business Profile, (2) Seznam Firmy.cz, (3) Facebook a/nebo Instagram.
- [ ] **Google recenze**: aktuální `ratingValue` (např. 4,9) a `reviewCount` (počet hodnocení) — musí odpovídat realitě.
- [ ] **FAQ**: schválení/úprava ~6–8 návrhů otázek a odpovědí (připraví Claude).
- [ ] **Umístění FAQ**: sekce na `/sluzby`, nebo na homepage? (Návrh: `/sluzby`.)
- [ ] (Volitelně) **Přesné GPS dílny** — dnes přibližný střed obce (TODO v configu).
- [ ] (Volitelně) Dodat OG grafiku 1200×630, nebo nechat `icon.png`.

## Implementation Phases

| # | Phase | Description | Status | Depends |
|---|-------|-------------|--------|---------|
| 1 | Rozšíření site-config | Přidat `sameAs`, `rating?`, `faq` (jeden zdroj pravdy); naplnit FAQ návrhy | pending | - |
| 2 | FAQ sekce + FAQPage schema | Lidsky čitelná sekce + JSON-LD ze stejného `faq` pole | pending | 1 |
| 3 | sameAs + AggregateRating | Doplnit do `LocalBusiness` (podmíněně, jen reálná data) | pending | 1 |
| 4 | Per-page JSON-LD + BreadcrumbList | `/sluzby`, `/realizace`, `/o-nas`, `/vzornik`, `/konzultace` + sdílený breadcrumb helper | pending | 1 |
| 5 | Metadata + canonical doplnění | Tam, kde chybí | pending | - |
| 6 | llms.txt aktualizace | Odkaz na FAQ/recenze | pending | 2,3 |
| 7 | Validace | Rich Results Test, schema validator, `npm run build` | pending | 2,3,4,5,6 |

---

*Generated: 2026-06-23*
*Status: DRAFT — připraveno k implementaci; fáze 2/4/5 nezávislé na vstupech, fáze 3 čeká na URL profilů a čísla recenzí*
