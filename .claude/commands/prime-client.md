---
description: Prime agent with client/frontend codebase understanding
---

# Prime Client: Load Frontend Context

## Objective

Build comprehensive understanding of the client codebase by analyzing structure and key files.

## Process

### Step 1: Analyze the Codebase

1. Study the app routes (`src/app/`) — pages, layouts, loading/error boundaries
2. Study the feature components (`src/features/*/components/`)
3. Study the shared UI primitives (`src/components/ui/`)
4. Check `package.json` for frontend dependencies

## Output

Produce a scannable summary of what you learned:

- **Purpose**: What the UI does
- **Tech Stack**: Next.js App Router, shadcn/ui, Tailwind 4
- **Components**: Key components and their responsibilities
- **Data Flow**: Server Components fetch data directly; Client Components use Server Actions for mutations
- **Patterns**: Server vs Client component split, how forms use Server Actions with `useActionState`

Use bullet points. Keep it concise.
