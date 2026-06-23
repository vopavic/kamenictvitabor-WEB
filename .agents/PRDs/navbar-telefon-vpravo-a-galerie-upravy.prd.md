# Navbar — telefon vpravo + dávkové úpravy galerie

## Problem Statement

Majitel webu kamentabor.cz má čtyři dílčí požadavky na úpravu prezentace: (1) telefonní pill je na desktopu uprostřed menu, vlastník ho chce vpravo; (2) hero fotka homepage i náhled karty „Dvojhroby" mají ukazovat reprezentativní realizaci (Rodina Rybova); (3) jedna fotka je špatně zařazená v kategorii Dvojhroby místo Renovace; (4) dvě fotky téže realizace (Rodina Šťastných) v Urnových hrobech mají být odstraněny. Bez úprav web nezobrazuje obsah tak, jak vlastník zamýšlí.

## Key Hypothesis

Věříme, že přesun telefonu vpravo a úprava obsahu galerie zpřesní prezentaci a zařazení realizací pro návštěvníky webu.
Ověříme vizuální kontrolou (telefon vpravo na desktopu, správné hero/náhledy, správné kategorie) a zeleným `next build` + lint.

## Users

**Primary User**: Návštěvník webu (potenciální zákazník kamenictví) prohlížející si homepage, služby a galerii realizací.

**Job to Be Done**: Když si prohlížím web kamenictví, chci vidět reprezentativní a správně zařazené realizace a snadno najít telefon, abych mohl posoudit kvalitu práce a kontaktovat firmu.

**Non-Users**: Není to redesign navbaru ani galerie — jde o dílčí prezentační a obsahové úpravy.

## Solution

Čtyři nezávislé úpravy ve třech souborech a smazání dvou statických assetů.

### Mapování požadavků na kód (ověřeno vizuálně)

| # | Požadavek | Soubor | Konkrétně |
|---|-----------|--------|-----------|
| 1 | Telefon na desktopu vpravo (dnes uprostřed) | `components/Navbar.tsx` | Sloučit `leftLinks` + `rightLinks` do jednoho seznamu; telefonní pill přesunout za poslední odkaz (Konzultace), tj. úplně vpravo |
| 2 | Hero homepage = foto #61 Dvojhrob (Rodina Rybova) | `app/(main)/page.tsx:81` | `/dvojhroby/IMG_5268.jpeg` → `/dvojhroby/IMG_5032.jpeg` |
| 2 | Náhled karty „Dvojhroby" = foto #61 | `app/(main)/sluzby/page.tsx:60` | `imageSrc="/dvojhroby/IMG_5345.jpeg"` → `"/dvojhroby/IMG_5032.jpeg"` |
| 3 | Foto #66 Dvojhrob → Renovace | `app/(main)/realizace/page.tsx:219` | Záznam `id 2068` (`/dvojhroby/dvojhrob3.jpg`) přesunout do bloku Renovace, `category: "Renovace"`, `title: "Renovace"`; cesta k souboru zůstává `/dvojhroby/dvojhrob3.jpg` |
| 4 | Odstranit #74 a #75 z Urnových hrobů | `app/(main)/realizace/page.tsx:306–307` | Smazat záznamy `id 3074` (`IMG_5364.jpeg`) a `id 3075` (`IMG_5367.jpeg`) + smazat fyzické soubory `public/urnaky/IMG_5364.jpeg`, `public/urnaky/IMG_5367.jpeg` |

> Pozn. k číslování: `#číslo` v galerii je **pořadové v rámci kategorie**, počítané podle pořadí v poli `projects` (`realizace/page.tsx`). Není to `id`. Proto:
> - Přesun #66 mimo Dvojhroby posune dosavadní Dvojhrob #67+ o jedna níž.
> - Smazání #74/#75 posune dosavadní Urnové hroby #76+ o dvě níž.
> To je očekávané chování pozičního číslování, ne chyba.

### MVP Scope

| Priority | Capability | Rationale |
|----------|------------|-----------|
| Must | Telefonní pill na desktopu vpravo za posledním odkazem | Jádro požadavku 1; zachovat stávající styl pillu (červený, ikona) a mobilní chování beze změny |
| Must | Hero `page.tsx` → `/dvojhroby/IMG_5032.jpeg` | Požadavek 2 — Rodina Rybova jako reprezentativní hero |
| Must | Náhled karty Dvojhroby → `/dvojhroby/IMG_5032.jpeg` | Požadavek 2 — sjednocení s hero |
| Must | Záznam #66 (id 2068) přeřadit do Renovace | Požadavek 3 — oprava kategorie |
| Must | Odstranit záznamy #74 a #75 z galerie + smazat soubory | Požadavek 4 |
| Should | Vizuální kontrola na dev serveru (navbar md/lg/xl, hero, karty, kategorie) | Ověření bez regrese |
| Won't | Přejmenování/přesun fyzického souboru `dvojhrob3.jpg` do `public/renovace/` | Zbytečné riziko; kategorii řídí pole, ne složka |
| Won't | Změna mobilního drawer, loga, ostatních karet/kategorií | Mimo rozsah |

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Telefon vpravo na desktopu (≥ lg) | Pill za posledním odkazem | Vizuální kontrola / screenshot |
| Hero + náhled Dvojhroby = Rodina Rybova | Obě místa `IMG_5032.jpeg` | Vizuální kontrola `/` a `/sluzby` |
| #66 v Renovaci, ne v Dvojhrobech | 1 záznam přesunut | Filtr kategorií na `/realizace` |
| #74, #75 odstraněny | 0 výskytů, soubory smazány | `/realizace?cat=Urnové hroby` + `git status` |
| Build a lint | Bez chyb | `npm run build` + lint |

## Open Questions

- [ ] U přesunu #66 do Renovace — ponechat soubor ve složce `/dvojhroby/` (doporučeno, bez rizika), nebo fyzicky přesunout do `/renovace/`? Default: ponechat.
- [ ] Hero `IMG_5032.jpeg` je na výšku (portrait, EXIF rotace) — ověřit, že v hero (bg-cover) i v náhledu karty vypadá dobře; případně zvolit jiný řez. Rozhodne vizuální kontrola.

## Implementation Phases

| # | Phase | Description | Status | Depends |
|---|-------|-------------|--------|---------|
| 1 | Navbar — telefon vpravo | Sloučit odkazy, přesunout pill vpravo, zachovat mobilní chování | pending | - |
| 2 | Hero + karta Dvojhroby | Záměna obrázku na `IMG_5032.jpeg` v `page.tsx` a `sluzby/page.tsx` | pending | - |
| 3 | Galerie — recategorize #66 | Přesun záznamu id 2068 do bloku Renovace | pending | - |
| 4 | Galerie — smazat #74/#75 | Odebrat záznamy id 3074/3075 + smazat 2 soubory | pending | - |
| 5 | Validace | `next build` + lint + vizuální kontrola dev serveru | pending | 1,2,3,4 |

---

*Generated: 2026-06-23*
*Status: DRAFT — scope a fotky ověřeny vizuálně, připraveno k implementaci*
