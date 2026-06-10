---
description: Prime agent with server/backend codebase understanding
---

# Prime Server: Load Backend Context

## Objective

Build comprehensive understanding of the server codebase by analyzing structure and key files.

## Process

### Step 1: Analyze the Codebase

1. Study the vertical feature slices in `src/features/` — models, schemas, repository, service, actions
2. Study the database setup (`src/core/database/`) — schema, client, migrations
3. Study the shared utilities (`src/shared/`)
4. Check `package.json` for backend dependencies (Drizzle, better-sqlite3, Zod, Pino)

## Output

Produce a scannable summary of what you learned:

- **Purpose**: What the data layer does
- **Tech Stack**: Next.js Server Actions, Drizzle ORM, SQLite (better-sqlite3), Zod, Pino
- **Data Model**: Core tables and their relationships
- **Patterns**: Vertical slice (models → schemas → repository → service → actions), error classes with HTTP status codes
- **Server Actions**: How mutations flow from UI → action → service → repository

Use bullet points. Keep it concise.
