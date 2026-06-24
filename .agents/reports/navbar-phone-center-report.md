# Implementation Report

**Plan**: `.agents/plans/completed/navbar-phone-center.prd.md`
**Branch**: `feature/navbar-phone-center`
**Status**: COMPLETE

## Summary

Redesign navbaru: odstraněna redundantní položka „Domů" (logo vlevo nadále odkazuje na `/`), telefonní číslo je nyní výrazné červené CTA (#ca2020) na konci menu vpravo, vždy s plným číslem +420 606 807 389 (zrušena zkrácená varianta „Zavolat"). Číslo se nově čte z `lib/site-config.ts` místo trojího hardcodu.

## Tasks Completed

| # | Task | File | Status |
|---|------|------|--------|
| 1 | Odstranit „Domů" z `navLinks` (desktop + drawer) | `components/Navbar.tsx` | ✅ |
| 2 | Telefon jako červený pill (#ca2020) na konci menu, vždy plné číslo | `components/Navbar.tsx` | ✅ |
| 3 | Číslo + tel: odkaz ze `siteConfig.phone` / `phoneFormatted` | `components/Navbar.tsx` | ✅ |
| 4 | Breakpoint desktop menu posunut md → lg (plné číslo se na 768 px nevejde) | `components/Navbar.tsx` | ✅ |

## Validation Results

| Check | Result |
|-------|--------|
| `next build` (vč. TypeScript) | ✅ |
| `eslint components/Navbar.tsx` | ✅ (0 chyb) |
| `npm run lint` (celý projekt) | ⚠️ 5 pre-existujících chyb v jiných souborech (o-nas, page.tsx, realizace, ServiceCard) — mimo rozsah, beze změny |
| Tests | — (projekt nemá testovací framework; ověřeno E2E v prohlížeči) |

## E2E Verification (agent-browser, dev server :3199)

| Check | Result |
|-------|--------|
| 1440 px: logo vlevo, 6 položek, červený pill s plným číslem vpravo, bez zalomení | ✅ screenshot |
| 1024 px: totéž, vejde se bez přetečení | ✅ screenshot |
| 768 px: logo + červený pill + hamburger | ✅ screenshot |
| 390 px: logo + hamburger; drawer = 6 položek (bez „Domů") + červené tel. tlačítko | ✅ screenshot + proklik |
| Všech 7 rout vrací 200 | ✅ curl |

## Files Changed

| File | Action | Lines |
|------|--------|-------|
| `components/Navbar.tsx` | UPDATE | +18/-11 (přepis navigační logiky) |

## Deviations from Plan

1. **Umístění telefonu**: původní PRD měl telefon uprostřed menu (3+3); uživatel během implementace rozhodl o přesunu na konec menu vpravo. PRD aktualizováno.
2. **Breakpoint md → lg**: desktop menu se zobrazuje od 1024 px místo 768 px — 6 uppercase položek + plné číslo se na 768 px nevejde a zkrácení čísla bylo zakázáno. V pásmu 640–1024 px se zobrazuje logo + červený pill + hamburger.
3. **Barva pillu**: červená #ca2020 jen pro telefonní CTA (arbitrary Tailwind hodnota, konstanta `PHONE_RED`); globální `--accent` (#c5a059) záměrně nezměněn, aby se nepřebarvil zbytek webu.

## Tests Written

Projekt nemá testovací infrastrukturu (žádný test runner v package.json). Náhradou provedena E2E verifikace v reálném prohlížeči (viz výše).
