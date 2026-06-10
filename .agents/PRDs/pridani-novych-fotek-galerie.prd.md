# Přidání nových fotek do galerie realizací

## Problem Statement

Majitel webu kamenictvitabor.cz má 11 nových fotografií dokončených realizací (jednohroby, dvojhroby, urnové hroby), které zatím nejsou na webu. Galerie `/realizace` tak nezobrazuje aktuální práci firmy, což snižuje její přesvědčivost pro potenciální zákazníky.

## Key Hypothesis

We believe přidání čerstvých fotografií realizací will udržet galerii aktuální a důvěryhodnou for návštěvníky webu zvažující objednávku kamenických prací.
We'll know we're right when všech 11 fotek se zobrazuje ve správných kategoriích galerie, načítá se rychle a build projde bez chyb.

## Users

**Primary User**: Návštěvník webu (potenciální zákazník kamenictví) prohlížející si reference v galerii `/realizace`.

**Job to Be Done**: When zvažuji objednávku náhrobku, I want to vidět aktuální dokončené realizace, so I can posoudit kvalitu a styl práce kamenictví.

**Non-Users**: Toto není redesign galerie ani CMS pro správu fotek — jde o jednorázové doplnění obsahu.

## Solution

Zkopírovat 11 zdrojových fotografií z `~/Downloads` do odpovídajících složek v `public/`, před nasazením je zoptimalizovat pro web (převzorkování na ~1600 px šířky, komprese JPEG — cíl 200–500 kB na fotku), přejmenovat na konzistentní webová jména (bez mezer a UUID) a zaregistrovat je v poli galerie v `app/(main)/realizace/page.tsx` **na začátek příslušné kategorie** (nejnovější první).

### Zdrojové soubory

| Kategorie | Zdroj | Cíl | Počet |
|-----------|-------|-----|-------|
| Jednohroby | `~/Downloads/Jednohroby/` (1234.jpeg, IMG_3330.jpeg, IMG_3722.jpeg, IMG_4511.jpeg, e7ce7aa3-….JPG) | `public/jednohroby/` | 5 |
| Dvojhroby | `~/Downloads/Dvojhroby/` (IMG_6217.jpeg, IMG_6220.jpeg, IMG_6223.jpeg, IMG_6297.jpeg) | `public/dvojhroby/` | 4 |
| Urnové hroby | `~/Downloads/urnak.jpeg`, `~/Downloads/urnak2.jpeg` | `public/urnaky/` | 2 |

### MVP Scope

| Priority | Capability | Rationale |
|----------|------------|-----------|
| Must | Optimalizace fotek (resize ~1600 px, komprese, oprava EXIF orientace) | Originály mají 3,6–6,2 MB — nepřijatelné pro načítání galerie (potvrzeno uživatelem) |
| Must | Kopie do `public/{jednohroby,dvojhroby,urnaky}` s konzistentními názvy | Fotky musí být dostupné jako statické assety Next.js |
| Must | Registrace v gallery datech v `app/(main)/realizace/page.tsx` na začátek kategorií | Galerie je řízena hardcodovaným polem; bez záznamu se fotky nezobrazí |
| Must | Unikátní `id` navazující na existující číslování (1xxx jednohroby, 2xxx dvojhroby, 3xxx urnáky) | Duplicitní ID by rozbilo React keys / lightbox |
| Should | Vizuální kontrola galerie po změně (dev server) | Ověření orientace a zobrazení fotek |
| Won't | Změna designu/chování galerie, automatizace správy fotek, úprava sitemap | Mimo rozsah — jde o doplnění obsahu |

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Nové fotky viditelné v galerii | 11/11 ve správné kategorii, na začátku | Vizuální kontrola `/realizace` |
| Velikost fotek | ≤ ~500 kB / fotka | `ls -la` po optimalizaci |
| Build | Bez chyb | `next build` / lint |

## Open Questions

- [ ] Žádné — rozsah potvrzen uživatelem (optimalizovat: ano; pořadí: na začátek kategorie).

## Implementation Phases

| # | Phase | Description | Status | Depends |
|---|-------|-------------|--------|---------|
| 1 | Optimalizace fotek | Resize + komprese 11 fotek (sips/ImageMagick), oprava EXIF orientace, konzistentní názvy | pending | - |
| 2 | Kopie do public/ | Umístit optimalizované fotky do `public/jednohroby`, `public/dvojhroby`, `public/urnaky` | pending | 1 |
| 3 | Registrace v galerii | Přidat 11 záznamů na začátek kategorií v `app/(main)/realizace/page.tsx` s unikátními ID | pending | 2 |
| 4 | Validace | Lint/build + vizuální kontrola galerie v dev serveru | pending | 3 |

---

*Generated: 2026-06-10*
*Status: DRAFT — scope potvrzen uživatelem, připraveno k implementaci*
