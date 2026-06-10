---
description: Learn how to build new API endpoints end-to-end
---

# Prime Endpoint: How to Build New Endpoints

## Objective

Understand the full endpoint pattern from database to UI so you can build new endpoints correctly.

## Process

### Step 1: Analyze the Codebase

Study these files in order (this is the full data flow for a feature):

1. **Models**: `src/features/<feature>/models.ts` — TypeScript types inferred from schema
2. **Schemas**: `src/features/<feature>/schemas.ts` — Zod validation for inputs
3. **Repository**: `src/features/<feature>/repository.ts` — Drizzle queries (no business logic here)
4. **Service**: `src/features/<feature>/service.ts` — business logic, calls repository, throws typed errors
5. **Errors**: `src/features/<feature>/errors.ts` — custom error classes with HTTP status codes
6. **Actions**: `src/features/<feature>/actions.ts` — Server Actions called by Client Components
7. **Components**: `src/features/<feature>/components/` — forms use `useActionState` to call Server Actions

## Output

Produce a scannable summary of what you learned:

- **Type Flow**: Models inferred from Drizzle schema → used in service → passed to components
- **Validation**: Zod schemas in `schemas.ts` validated in service layer (not middleware)
- **Service Pattern**: Service calls repository, catches DB errors, throws domain errors
- **Server Action Pattern**: Action validates, calls service, catches domain errors, returns state object
- **Component Pattern**: Client Components use `useActionState(action, initialState)` for mutations; Server Components fetch directly from service for reads

Use bullet points. Keep it concise.
