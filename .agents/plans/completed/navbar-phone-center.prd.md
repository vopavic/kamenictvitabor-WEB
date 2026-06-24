# Navbar — odstranění „Domů" a telefon jako červené CTA na konci menu

> **Revize při implementaci (2026-06-10):** Uživatel změnil umístění telefonu — místo doprostřed menu jde **na konec menu vpravo**. Dále rozhodnuto: telefon vždy plné číslo (žádné zkrácení na „Zavolat"), pill v červené **#ca2020** (globální accent zůstává bronzový).

## Problem Statement

Návštěvník webu kamentabor.cz vidí v navigaci 7 položek, z nichž „Domů" je redundantní — kliknutí na logo plní stejnou funkci a je to zavedená webová konvence. Telefonní číslo (primární konverzní akce pro kamenictví, kde zákazníci typicky volají) je dnes zastrčené úplně vpravo a na středních šířkách obrazovky se zkracuje na „Zavolat". Zbytečná položka ředí navigaci a telefon nemá vizuální prioritu, jakou si jako hlavní CTA zaslouží.

## Key Hypothesis

Věříme, že odstranění redundantní položky „Domů" a umístění telefonního čísla doprostřed menu (3 položky · telefon · 3 položky) zviditelní primární CTA a zpřehlední navigaci pro návštěvníky webu.
Ověříme vizuální kontrolou na všech breakpointech — telefon je opticky dominantní prvek navigace a všechny stránky zůstávají dostupné.

## Users

**Primary User**: Návštěvník webu (typicky pozůstalý nebo zákazník poptávající kuchyňskou desku/schody), často starší demografická skupina, která preferuje telefonický kontakt před formulářem.

**Job to Be Done**: Když si prohlížím web kamenictví a rozhodnu se firmu kontaktovat, chci okamžitě vidět telefonní číslo, abych mohl/a rovnou zavolat bez hledání kontaktní stránky.

**Non-Users**: Nejde o změnu pro správce webu ani o změnu obsahu stránek — čistě prezentační úprava navigace.

## Solution

Úprava komponenty `components/Navbar.tsx`. Z pole `navLinks` se odstraní položka „Domů" (logo vlevo zůstává a nadále odkazuje na `/`). Desktopová navigace se přeskládá na symetrický vzor kolem telefonu: **O nás · Naše služby · Vzorník · [📞 +420 606 807 389] · Realizace · Kontakt · Konzultace**. Telefon si zachová současný styl accent pill tlačítka (barevný zaoblený pill s ikonou sluchátka), pouze se přesune z pravého okraje doprostřed menu. Mobilní chování zůstává beze změny logiky — hamburger drawer jen přestane zobrazovat „Domů" (6 položek + telefonní tlačítko dole).

### Schválený layout (desktop) — finální verze

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]      O NÁS  NAŠE SLUŽBY  VZORNÍK  REALIZACE  KONTAKT  KONZULTACE  (📞 +420 606 807 389) │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

### MVP Scope

| Priority | Capability | Rationale |
|----------|------------|-----------|
| Must | Odstranit „Domů" z `navLinks` (desktop i mobilní drawer) | Redundantní s logem; jádro požadavku |
| Must | Desktop: telefon (accent pill) uprostřed menu mezi 3+3 položkami | Schválený layout — telefon jako vizuální střed navigace |
| Must | Odstranit současný telefon z pravé strany navbaru | Telefon nesmí být duplicitně; pravá strana drží jen hamburger (mobil) |
| Must | Telefon čte číslo z `lib/site-config.ts` (`phone` / `phoneFormatted`) | Číslo je dnes v Navbaru hardcoded 2×; jediný zdroj pravdy už existuje |
| Should | Responzivní degradace pillu na středních šířkách (md–lg) | 6 položek + plné číslo se nemusí vejdout; zachovat variantu „Zavolat" nebo jen ikonu |
| Should | Aktivní stav (accent barva) položek zachován po přeskládání | Stávající UX vzor, nesmí se rozbít |
| Won't | Změna mobilního drawer layoutu (kromě odebrání „Domů") | Uživatel explicitně potvrdil „beze změny logiky" |
| Won't | Centrování loga či jiný redesign navbaru | Zvažováno, uživatel zvolil variantu logo vlevo |
| Won't | Změny obsahu stránek, footeru, SEO metadat | Mimo rozsah požadavku |

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Navigace bez „Domů", logo → `/` funkční | 100 % stránek | Manuální proklik všech 7 rout |
| Telefon (červený pill, plné číslo) na konci menu na desktopu (≥ lg) | Bez přetečení/zalomení | Vizuální kontrola / screenshot na 1024, 1280, 1440 |
| Žádná regrese mobilního menu | Drawer: 6 položek + tel. tlačítko | Manuální test na < md šířce |
| Build a lint bez chyb | `next build` + `eslint` zelené | CI / lokální spuštění |

## Open Questions

- [x] Zkrácení čísla na „Zavolat" — **rozhodnuto: nikdy nezkracovat, vždy plné číslo**. Desktop menu se proto zobrazuje až od `lg` (1024 px); pod ním hamburger + telefonní pill.
- [x] Barva pillu — **rozhodnuto: červená #ca2020** (globální accent #c5a059 beze změny).

## Implementation Phases

| # | Phase | Description | Status | Depends |
|---|-------|-------------|--------|---------|
| 1 | Úprava Navbar.tsx | Odebrat „Domů", rozdělit `navLinks` 3+3, vložit telefon (pill, ze site-config) doprostřed desktop nav, odebrat pravý telefon | pending | - |
| 2 | Responzivní doladění | Ověřit breakpointy md/lg/xl, doladit gapy a zkrácenou variantu pillu | pending | 1 |
| 3 | Validace | Proklik všech stránek, mobilní drawer, `next build` + lint | pending | 2 |

---

*Generated: 2026-06-10*
*Status: DRAFT - needs validation*
