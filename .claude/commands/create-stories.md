---
description: Generate user stories from a PRD
argument-hint: <path-to-prd>
---

# Create Stories from PRD

Generate structured user stories from a Product Requirements Document.

**Input**: $ARGUMENTS

---

## Phase 1: LOAD

Read the PRD file provided as input. If no path given, look for:
1. `.agents/PRDs/*.prd.md` files
2. `PRD.md` at project root
3. Ask the user which PRD to use

Extract:
- User stories already defined in the PRD
- Acceptance criteria from success criteria and requirements
- Implementation phases and their deliverables
- Technical constraints and dependencies

---

## Phase 2: ANALYZE

### Break Down into Stories

For each feature or requirement in the PRD:

1. **Create a user story** in the format:
   ```
   As a [user type], I want to [action], so that [benefit]
   ```

2. **Define acceptance criteria** (3-5 per story):
   ```
   Given [context], when [action], then [expected result]
   ```

3. **Estimate complexity**: Small / Medium / Large
   - Small: Single file change, clear implementation
   - Medium: Multiple files, some design decisions
   - Large: Cross-cutting concerns, architecture changes

4. **Identify dependencies** between stories

### Story Categories

Group stories by type:
- **Feature**: New functionality
- **Enhancement**: Improvement to existing functionality
- **Bug**: Fix for known issues
- **Technical**: Infrastructure, refactoring, tooling
- **Spike**: Research or investigation needed

---

## Phase 3: STRUCTURE

### For Each Story, Create

```markdown
## [STORY-ID] Story Title

**Type**: Feature | Enhancement | Technical | Spike
**Priority**: High | Medium | Low
**Complexity**: Small | Medium | Large
**Phase**: (from PRD implementation phases)

### Description
As a [user type], I want to [action], so that [benefit].

### Acceptance Criteria
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

### Technical Notes
- Key implementation details
- Files likely to be modified
- Patterns to follow (reference CLAUDE.md or project conventions)

### Dependencies
- Blocked by: [other story IDs]
- Blocks: [other story IDs]
```

### Ordering

Order stories by:
1. Phase (from PRD implementation phases)
2. Dependencies (blocked stories come after their blockers)
3. Priority (High first within each phase)

---

## Phase 4: VALIDATE

Before output, verify:
- [ ] Every PRD requirement maps to at least one story
- [ ] No story is too large (break down if > 1 day of work)
- [ ] Acceptance criteria are testable and specific
- [ ] Dependencies form a valid DAG (no circular dependencies)
- [ ] Stories cover the full SDLC: types, validation, services, routes, UI, tests
- [ ] Each story can be independently reviewed and merged

---

## Phase 5: OUTPUT

Create the directory if it doesn't exist: `mkdir -p .agents/stories`

Save the stories to `.agents/stories/` directory as a markdown file.

---

## Tips

- Keep stories small enough to complete in 1-2 days
- Acceptance criteria should be verifiable without asking the author
- Technical stories need acceptance criteria too (build passes, tests pass, etc.)
- Include a "definition of done" story if the team doesn't have one
- Reference the PRD section for each story so reviewers can trace back
