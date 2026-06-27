# Úprava meta title domovské stránky

## Problem Statement

Domovská stránka má aktuálně title složený z názvu firmy a obecné taglinky („Tradiční řemeslo s 80letou tradicí"), který nevyjmenovává konkrétní výrobky (pomníky, kuchyňské desky). Pro vyhledávače i uživatele ve výsledcích vyhledávání tím chybí klíčová slova popisující sortiment, což snižuje relevanci a prokliky na hlavní landing page.

## Key Hypothesis

We believe **úprava meta title domovské stránky na popisnější variantu s výrobky** will **zlepšit relevanci a CTR ve výsledcích vyhledávání** for **lidi hledající kamenické výrobky v okolí Tábora**.
We'll know we're right when **`<title>` domovské stránky odpovídá přesně schválenému textu a Google/AI vyhledávače jej takto indexují** (bez nechtěné přípony z title.template).

## Users

**Primary User**: Potenciální zákazník v Táboře a okolí, který v Googlu/AI vyhledávači hledá pomník, náhrobek nebo kuchyňskou desku a rozhoduje se podle titulku ve výsledcích.

**Job to Be Done**: When **vidím web Kamenictví Tábor ve výsledcích vyhledávání**, I want to **z titulku hned poznat, že dělají pomníky, kuchyňské desky a další kamenické výrobky**, so I can **kliknout na ten správný odkaz a oslovit firmu**.

**Non-Users**: Tato změna se netýká podstránek (Kontakt, Služby, Vzorník, Realizace, Konzultace) — jejich title zůstává beze změny.

## Solution

Změníme `metadata.title` v `app/(main)/page.tsx` (domovská stránka) na schválený literální řetězec. Protože root layout (`app/layout.tsx`) definuje `title.template = "%s | Kamenictví Tábor"`, který se v Next.js App Routeru aplikuje na string-title v podřazených segmentech, musí se použít forma **`title: { absolute: "..." }`**. Tím se template potlačí a `<title>` bude přesně schválený text bez přípony. OpenGraph/Twitter titulky (`app/layout.tsx`) i JSON-LD `name` (`siteConfig.name`) zůstávají beze změny.

**Schválený text title:**
> `Kamenictví Kámen Tábor Hňupovi - Pomníky, kuchyňské desky a jiné kamenické výrobky`

### MVP Scope

| Priority | Capability | Rationale |
|----------|------------|-----------|
| Must | Změna `metadata.title` na domovské stránce na `{ absolute: "<schválený text>" }` | Jádro požadavku — přesný title bez přípony |
| Must | Zachovat spojovník `-` přesně dle zadání | Explicitní rozhodnutí uživatele |
| Must | Ponechat OG/Twitter titulky i JSON-LD `name` beze změny | Rozsah omezen jen na `<title>`; LocalBusiness `name` má zůstat reálný název firmy |
| Should | Ověřit ve vyrenderovaném HTML, že `<title>` neobsahuje příponu „ \| Kamenictví Tábor" | Pojistka proti title.template |
| Won't | Změna title.template ani názvu firmy v `site-config.ts` | Mimo rozsah — ovlivnilo by celý web |
| Won't | Úprava titlů podstránek | Uživatel zvolil pouze domovskou stránku |

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Přesnost `<title>` domovské stránky | 100% shoda se schváleným textem | View-source / DevTools na `/` po nasazení |
| Žádná nechtěná přípona z template | 0 výskytů „ \| Kamenictví Tábor" navíc | Kontrola vyrenderovaného `<head>` |
| Indexace nového titulku | Title aktualizován ve výsledcích | Google Search Console / fulltext po recrawl |

## Open Questions

- [ ] Délka title je ~84 znaků — Google ve výsledcích zobrazí cca prvních 55–60 znaků, takže „a jiné kamenické výrobky" se může oříznout. Akceptovat, nebo zkrátit?
- [ ] Má se stejný (popisnější) title promítnout i do `<h1>` nebo viditelného obsahu? (Aktuálně mimo rozsah.)
- [ ] Zvážit do budoucna sjednocení názvu „Kamenictví **Kámen** Tábor Hňupovi" vs. stávající `siteConfig.name = "Kamenictví Tábor — Hňupovi"` (konzistence napříč webem) — nyní mimo rozsah.

## Implementation Phases

| # | Phase | Description | Status | Depends |
|---|-------|-------------|--------|---------|
| 1 | Implementace | Úprava `metadata.title` v `app/(main)/page.tsx` na `{ absolute: "<schválený text>" }` | pending | - |
| 2 | Ověření | `npm run build` + kontrola vyrenderovaného `<title>` na `/` (bez přípony) | pending | 1 |

---

*Generated: 2026-06-27*
*Status: DRAFT - needs validation*
