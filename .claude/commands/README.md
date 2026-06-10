# Commands

Commands jsou vlastní slash příkazy (`/nazev`) pro Claude Code. Každý command je Markdown soubor, který obsahuje instrukce — prompt — jež Claude dostane při zavolání daného příkazu. Slouží k opakovaně spouštěným úlohám jako je code review, generování PRD, spuštění validace nebo implementace podle plánu.

Commands se ukládají do složky `.claude/commands/` a jsou dostupné přes `/nazev` přímo v Claude Code.

## Šablona pro vytvoření commandu

Vzor struktury promptu pro nový command najdeš v:

```
.claude/requests/coding-prompt-template.md
```

Obecný vzor pro psaní promptů (struktura Context → Process → Output) najdeš v:

```
.claude/commands/commands-prompt-template.md
```

## Kompletní vývojové workflow

Commandy nejsou izolované zkratky — fungují jako propojený systém, kde výstup jednoho commandu se stává vstupem dalšího.

### Mentální model: INPUT → PROCESS → OUTPUT

Každý command sleduje tento vzor:

1. **INPUT** — jaký kontext agent potřebuje?
2. **PROCESS** — jaké kroky má agent provést?
3. **OUTPUT** — v jakém formátu má být výsledek?

I když commandy tuto strukturu explicitně nelabelují, vždy ji dodržují. Je to klíčový princip: **výstup jednoho commandu je navržen jako vstup jiného**. `/plan` generuje dokument optimalizovaný pro konzumaci commandem `/implement`. `/prime` načítá kontext, který využívají všechny následující commandy v sezení.

---

### Proč jsou základní commandy právě tyto 4

Mapují se na přirozený tok vývoje softwaru:

1. **Pochopení** codebase (`/prime`)
2. **Plánování** co postavit (`/plan`)
3. **Implementace** plánu (`/implement`)
4. **Uložení** práce (`/create-commit`)

Každá feature, oprava nebo vylepšení sleduje tento vzor. Kodifikováním těchto fází jako znovupoužitelných commandů vzniká systematický, opakovatelný vývojový workflow.

---

### Vzory jednotlivých commandů

#### `/prime` — vzor načítání kontextu

**Účel**: Vybudovat komplexní porozumění codebase

**Co produkuje**: Stav agenta načtený s kontextem projektu

**Konzument**: TY (pro ověření porozumění) a AGENT (pro informování dalších akcí)

**Kdy použít**:
- Na začátku nové sezení
- Před většími změnami
- Když agent potřebuje osvěžit kontext projektu

**Klíčové vlastnosti**:
- Používá bash execution (`!`) pro získání info o projektu
- Čte dokumentaci a klíčové soubory
- Produkuje human-readable souhrn optimalizovaný pro rychlé skenování

---

#### `/plan` — vzor vytváření dokumentu

**Účel**: Zkoumat codebase a vytvořit detailní implementační plán

**Co produkuje**: Markdown dokument s postupnými úkoly uložený do `.agents/plans/`

**Konzument**: JINÝ AGENT (command `/implement`) a TY (pro review a úpravy)

**Kdy použít**:
- Před implementací nových features
- Pro komplexní změny vyžadující výzkum
- Když potřebuješ reviewovatelný plán
- Pro oddělení přemýšlení od dělání

**Klíčové vlastnosti**:
- Výstup je formátován pro konzumaci agentem — explicitní cesty k souborům, přesné validační příkazy, žádná nejednoznačnost
- Plán lze revidovat a upřesnit před spuštěním
- Zachycuje vzory z existujícího kódu jako reference pro implementaci

---

#### `/implement` — vzor implementace

**Účel**: Implementovat features podle detailních plánů

**Co produkuje**: Implementaci kódu, testy a výsledky validace

**Konzument**: TY (implementovaná feature) a GIT (přes commit)

**Kdy použít**:
- Po vytvoření plánu s `/plan`
- Když máš jasnou specifikaci k implementaci
- Pro systematickou implementaci features se validačními smyčkami

**Klíčové vlastnosti**:
- Čte plan soubor z `.agents/plans/`
- Spouští každý úkol v pořadí s validací po každém kroku
- Pokud validace selže, opravuje problém před pokračováním — nikdy neakumuluje rozbité staty
- Produkuje report o implementaci

---

#### `/create-commit` — vzor automatizace akce

**Účel**: Vytvořit dobře formátované git commity

**Co produkuje**: Git commit s konvenčním formátem zprávy

**Konzument**: GIT (verzovací systém) a TÝM (přes git historii)

**Kdy použít**:
- Po dokončení implementace
- Pro udržení čisté commit historie
- Pro konzistentní formát commit zpráv

**Klíčové vlastnosti**:
- Automaticky spouští `git status` a `git diff HEAD` pro získání kontextu
- Analyzuje změny pro určení typu commitu
- Vytváří konvenční commit zprávu

---

### Kompletní vývojový cyklus

```
1. /prime
   ↓
   Pochopí: Strukturu projektu, konvence, aktuální stav

2. /plan "authentication system"
   ↓
   Prozkoumá: Existující vzory v codebase
   Produkuje: .agents/plans/authentication-system.plan.md

3. /implement .agents/plans/authentication-system.plan.md
   ↓
   Implementuje: Čte plán, píše kód, vytváří testy, validuje
   Produkuje: Funkční implementace, procházející testy

4. /create-commit
   ↓
   Commituje: Vytváří konvenční commit zprávu
   Produkuje: Uložený git commit
```

---

### Proč tento design funguje

#### Oddělení zodpovědností

**Plánování vs. Exekuce**: Výzkum a implementace jsou různé mentální režimy. Plánování vyžaduje exploraci a přemýšlení. Exekuce vyžaduje soustředění a preciznost.

**Kontext vs. Akce**: Porozumění (`/prime`) je odděleno od budování (`/implement`). Čistý kontext umožňuje čistší implementaci.

#### Komunikace agent-agent

**`/plan` → `/implement` řetěz**: Command `/plan` ví, že jeho výstup bude konzumován commandem `/implement`. Optimalizuje proto výstup pro:
- Explicitní cesty k souborům
- Přesné validační příkazy
- Žádnou nejednoznačnost
- Kompletní specifikace

**`/prime` → vše**: Command `/prime` načítá kontext, který prospívá všem následujícím commandům v sezení.

#### Flexibilita workflow

Commandy fungují i samostatně:
- Lze použít `/prime` bez plánování
- Lze commitovat bez předchozí implementace přes `/implement`
- Lze plánovat více features před implementací jakékoliv z nich
- Lze spustit stejný plán vícekrát (pokud něco selže)

Workflow se přizpůsobuje složitosti úkolu — malá změna nepotřebuje formální plán.

---

### Přehled vzorů commandů

| Command | Vzor | Produkuje | Konzument | Kdy použít |
|---------|------|-----------|-----------|------------|
| `/prime` | Načítání kontextu | Porozumění projektu | Agent + ty | Každá sezení |
| `/plan` | Vytvoření dokumentu | Plan dokument | `/implement` + ty | Na feature |
| `/implement` | Implementace | Kód + testy | Git + ty | Na plan |
| `/create-commit` | Automatizace akce | Git commit | Git + tým | Po změnách |

## GitHub CLI

Některé commandy (např. `/review`) pracují s GitHub repozitářem a vyžadují GitHub CLI (`gh`). Bez něj nefungují operace jako vytváření PR nebo načítání issues.

### Instalace

**macOS:**
```bash
brew install gh
```

**Windows:**
```bash
winget install --id GitHub.cli
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt install gh
```

### Přihlášení

```bash
gh auth login
```

Při přihlašování zvol:
- `GitHub.com`
- `HTTPS` nebo `SSH` (dle preferencí)
- Autentizaci přes browser (nejjednodušší)

### Ověření

```bash
gh auth status
```

Měl bys vidět: `✓ Logged in to github.com as [tvé-jméno]`

### Otestování v repozitáři

```bash
gh issue list
```

Pokud se zobrazí issues z GitHub repozitáře, je vše v pořádku a commandy pracující s GitHubem jsou připraveny k použití.

**Důležité:** Commandy předpokládají, že pracuješ v lokálním git repozitáři s GitHub remote origin.

---

## References

Pokud command vyžaduje širší specifický kontext (průvodce, standardy, dokumentaci), vyplatí se tento kontext vyčlenit do samostatného souboru ve složce `.claude/commands/references/` a načítat ho přímo z commandu pomocí `@` prefixu:

```markdown
@.claude/commands/references/nazev-pruvodce.md
```

Příklad: `.claude/commands/references/adding-tools-guide.md` obsahuje průvodce pro psaní agent tool docstringů a je načítán commandem, který vytváří nové tooly.
