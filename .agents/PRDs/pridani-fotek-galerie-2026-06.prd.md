# Přidání nových fotek do galerie realizací (dávka 2026-06)

## Problem Statement

Majitel webu kamentabor.cz má **29 nových fotografií** dokončených realizací (8 jednohrobů, 6 dvojhrobů, 15 urnových hrobů), které zatím nejsou na webu. Galerie `/realizace` tak nezobrazuje nejaktuálnější práci firmy, což snižuje její přesvědčivost pro potenciální zákazníky. Originály jsou navíc 4,8–6 MB, takže je nelze nasadit bez optimalizace.

## Key Hypothesis

We believe přidání čerstvých, zoptimalizovaných fotografií realizací will udržet galerii aktuální a důvěryhodnou for návštěvníky webu zvažující objednávku kamenických prací.
We'll know we're right when všech 29 fotek se zobrazuje ve správných kategoriích galerie, načítá se rychle (≤ ~500 kB/fotka) a build projde bez chyb.

## Users

**Primary User**: Návštěvník webu (potenciální zákazník kamenictví) prohlížející si reference v galerii `/realizace`.

**Job to Be Done**: When zvažuji objednávku náhrobku, I want to vidět aktuální dokončené realizace, so I can posoudit kvalitu a styl práce kamenictví.

**Non-Users**: Toto není redesign galerie ani CMS pro správu fotek — jde o jednorázové doplnění obsahu (opakování dávky z 2026-06-10).

## Solution

Zkopírovat 29 zdrojových fotografií z `~/Downloads/{urnaky,dvojhroby,jednohroby}` do odpovídajících složek v `public/`, před nasazením je zoptimalizovat pro web (převzorkování na ~1600 px šířky, JPEG komprese — cíl ≤ 500 kB, oprava EXIF orientace), přejmenovat na konzistentní webová jména pokračující v sérii 2026, a zaregistrovat je v poli `projects` v `app/(main)/realizace/page.tsx` **na začátek příslušné kategorie** (nejnovější první). Postup je shodný s dříve schválenou a dokončenou dávkou (viz `.agents/plans/completed/pridani-novych-fotek-galerie.prd.md`).

### Zdrojové soubory

| Kategorie | Zdroj | Cíl | Počet | Nové ID (od) | Nové názvy (od) |
|-----------|-------|-----|-------|--------------|-----------------|
| Jednohroby | `~/Downloads/jednohroby/` | `public/jednohroby/` | 8 | 1105 | `jednohrob-2026-06.jpg` |
| Dvojhroby | `~/Downloads/dvojhroby/` | `public/dvojhroby/` | 6 | 2104 | `dvojhrob-2026-05.jpg` |
| Urnové hroby | `~/Downloads/urnaky/` | `public/urnaky/` | 15 | 3102 | `urnak-2026-03.jpg` |

### MVP Scope

| Priority | Capability | Rationale |
|----------|------------|-----------|
| Must | Optimalizace fotek (resize ~1600 px, komprese ≤ 500 kB, oprava EXIF orientace) | Originály mají 4,8–6 MB — nepřijatelné pro načítání galerie |
| Must | Kopie do `public/{jednohroby,dvojhroby,urnaky}` s konzistentními názvy (série 2026) | Fotky musí být dostupné jako statické assety Next.js, bez mezer/UUID |
| Must | Registrace v poli `projects` v `app/(main)/realizace/page.tsx` na začátek kategorií | Galerie je řízena hardcodovaným polem; bez záznamu se fotky nezobrazí |
| Must | Unikátní `id` navazující na číslování (jednohroby od 1105, dvojhroby od 2104, urnáky od 3102) | Duplicitní ID by rozbilo React keys / lightbox |
| Should | Vizuální kontrola galerie po změně (dev server) | Ověření orientace a zobrazení fotek |
| Won't | Změna designu/chování galerie, automatizace správy fotek, úprava sitemap | Mimo rozsah — jde o doplnění obsahu |

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Nové fotky viditelné v galerii | 29/29 ve správné kategorii, na začátku | Vizuální kontrola `/realizace` |
| Velikost fotek | ≤ ~500 kB / fotka | `ls -la` po optimalizaci |
| Build | Bez chyb | `next build` / lint |

## Open Questions

- [x] Optimalizovat? — **ano**, resize ~1600 px / JPEG ≤ 500 kB / oprava EXIF (potvrzeno uživatelem).
- [x] Pořadí? — **na začátek kategorie**, nejnovější první (potvrzeno uživatelem).
- [x] Názvy? — **pokračovat v sérii 2026** (potvrzeno uživatelem).

## Implementation Phases

| # | Phase | Description | Status | Depends |
|---|-------|-------------|--------|---------|
| 1 | Optimalizace fotek | Resize + komprese 29 fotek (sips/ImageMagick), oprava EXIF orientace, konzistentní názvy série 2026 | pending | - |
| 2 | Kopie do public/ | Umístit optimalizované fotky do `public/jednohroby`, `public/dvojhroby`, `public/urnaky` | pending | 1 |
| 3 | Registrace v galerii | Přidat 29 záznamů na začátek kategorií v `app/(main)/realizace/page.tsx` s unikátními ID | pending | 2 |
| 4 | Validace | Lint/build + vizuální kontrola galerie v dev serveru | pending | 3 |

---

*Generated: 2026-06-24*
*Status: DRAFT — scope potvrzen uživatelem, připraveno k implementaci*
