---
description: Learn how to build components in this codebase
---

# Prime Components: How to Build Components

## Objective

Understand the component patterns used in this codebase so you can build new components correctly.

## Process

### Step 1: Analyze the Codebase

1. Study the UI primitives in `src/components/ui/` (shadcn/ui components)
2. Study `src/lib/utils.ts` for the `cn()` utility
3. Study feature components as examples:
   - `src/features/*/components/` — Client Components using Server Actions with `useActionState`
   - `src/components/theme-toggle.tsx` — minimal Client Component example

## Output

Produce a scannable summary of what you learned:

- **UI Library**: Available shadcn/ui components and how they're composed
- **Styling**: How Tailwind 4 and `cn()` are used for conditional classes
- **Props Pattern**: How props interfaces are defined (inline types vs exported interfaces)
- **Server vs Client**: Which components are Server Components (default) vs Client Components (`"use client"`)
- **Forms**: How Server Actions + `useActionState` + `useFormStatus` work together for form state

Use bullet points. Keep it concise.
