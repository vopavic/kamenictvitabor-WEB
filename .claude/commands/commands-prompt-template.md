# Command Prompt Template

General pattern for writing Claude Code slash command prompts.

Uses the **Context → Process → Output (CPO)** structure.

---

## Pattern

```markdown
## Context (INPUT)

Describe the situation in which the command is used:

- Technology / stack (e.g. Python 3.12, FastAPI, Pydantic)
- Type of file or code being analyzed
- Any constraints or assumptions

## Process (PROCESS)

What Claude should do — ordered steps or areas of analysis:

1. Area 1 (e.g. type safety)
2. Area 2 (e.g. data validation)
3. Area 3 (e.g. testing gaps)
4. Area 4 (e.g. architectural patterns)

## Output Format (OUTPUT)

How Claude should structure the response:

For each issue found:

- **File:Line**: Specific location
- **Issue**: What's wrong
- **Suggestion**: Concrete fix with code example
- **Priority**: Critical / High / Medium / Low
```

---

## Tips for writing commands

- **Context** — tells Claude *what* it's analyzing (input, context, stack)
- **Process** — tells Claude *how* to proceed (steps, areas, heuristics)
- **Output** — tells Claude *how to format* the response (structure, granularity)
- Be specific in the Output section — the more precise the format, the more actionable the result
- Add output examples if the format is non-trivial

---

## Example (code review)

```markdown
## Context (INPUT)

You are reviewing code for a FastAPI application using:

- Python 3.12 with strict type hints
- Pydantic for validation
- pytest for testing

## Process (PROCESS)

Analyze the code for:

1. Type safety issues (missing hints, incorrect types)
2. Pydantic validation errors (missing validators)
3. Testing gaps (uncovered edge cases)
4. FastAPI patterns (proper dependency injection, route structure)

## Output Format (OUTPUT)

For each issue found:

- **File:Line**: Specific location
- **Issue**: What's wrong
- **Suggestion**: Concrete fix with code example
- **Priority**: Critical/High/Medium/Low
```
