# Implementation Plan: [Feature Name]

## Feature Description

[1-2 sentence summary of what this feature adds to the system.]

**Problem Statement:**
[Describe the current limitation or pain point. What can't users do right now? Why does that matter?]

- [Specific missing capability 1]
- [Specific missing capability 2]
- [Specific missing capability 3]

[Explain how this limitation impacts the user's workflow.]

## User Story

**As an** [type of user]
**I want** [capability]
**So that** [business value / outcome]

**Acceptance Scenarios:**

1. **[Scenario Name]**
   - User: "[Example user request]"
   - Agent/System: [Expected behavior]

2. **[Scenario Name]**
   - User: "[Example user request]"
   - Agent/System: [Expected behavior]

3. **[Scenario Name]**
   - User: "[Example user request]"
   - Agent/System: [Expected behavior]

## Solution and Approach

### Selected Approach: **[Approach Name]**

**Why this approach:**

1. **[Reason 1]**
   - [Supporting detail]
   - [Supporting detail]

2. **[Reason 2]**
   - [Supporting detail]
   - [Supporting detail]

3. **[Reason 3]**
   - [Supporting detail]

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **[Decision 1]** | [Choice] | [Why] |
| **[Decision 2]** | [Choice] | [Why] |
| **[Decision 3]** | [Choice] | [Why] |
| **[Decision 4]** | [Choice] | [Why] |

## Relevant Codebase Files

**The coding agent MUST read these files to understand patterns:**

### Core Architecture & Patterns
- `[path/to/file]` - **CRITICAL**: [What to learn from it]
- `[path/to/file]` - [What to learn from it]
- `[path/to/file]` - [What to learn from it]

### Existing Implementations (Follow These Patterns)
- `[path/to/file]` - [What pattern it demonstrates]
- `[path/to/file]` - [What pattern it demonstrates]
- `[path/to/file]` - **CRITICAL**: [What pattern it demonstrates]

### Shared Utilities
- `[path/to/file]` - **CRITICAL**: [What it provides]
- `[path/to/file]` - [What it provides]
- `[path/to/file]` - [What it provides]

### Test Patterns
- `[path/to/test]` - [What test pattern it shows]
- `[path/to/test]` - [What test pattern it shows]
- `[path/to/test]` - **CRITICAL**: [What test pattern it shows]
- `[path/to/conftest]` - [What fixtures are available]

## Implementation Plan

### Foundational Work

1. **[Foundation Task 1]**
   - [Detail]
   - [Detail]

2. **[Foundation Task 2]**
   - [Detail]
   - [Detail]

### Core Implementation

1. **Schemas (`[path/to/schemas.py]`)**
   ```python
   # Key types and models to define
   class [OperationEnum](str, Enum):
       OPERATION_A = "operation_a"
       OPERATION_B = "operation_b"

   class [RequestModel](BaseModel):
       path: str
       operation: [OperationEnum]
       # operation-specific fields...
       dry_run: bool = False

   class [ResponseModel](BaseModel):
       success: bool
       message: str
       metadata: dict[str, Any] = Field(default_factory=dict)
   ```

2. **Service Layer (`[path/to/service.py]`)**
   - `[main_service_function]()` - Main entry point
   - `_[operation_a]()` - [What it does]
   - `_[operation_b]()` - [What it does]
   - [Security/validation approach]
   - [I/O approach]
   - [Logging approach]

3. **Tool/Handler Registration (`[path/to/tool.py]`)**
   - [Decorator/registration pattern]
   - [Function signature]
   - **CRITICAL**: [Docstring / documentation format requirement]
   - [Parameter description approach]
   - [Error handling approach]

### Integration Work

1. **Configuration Updates (`[path/to/config.py]`)**
   ```python
   # Add to Settings class
   enable_[feature]: bool = True
   [config_param]: [type] = [default]
   ```

2. **Registration (`[path/to/main_entry.py]`)**
   ```python
   if settings.enable_[feature]:
       from [module] import register_[feature]
       register_[feature](...)
   ```

3. **Environment Variables (`.env.example`)**
   ```bash
   ENABLE_[FEATURE]=true
   [CONFIG_PARAM]=[default_value]
   ```

4. **Dependencies (`pyproject.toml` / `package.json`)**
   ```toml
   dependencies = [
       "[new-dependency]>=x.y",
   ]
   ```

## Step-by-Step Task List

### Phase 1: Foundational Setup

- [ ] [Dependency or prerequisite task]
- [ ] [Security or validation helper task]
  - [Specific requirement]
  - [Specific requirement]
- [ ] Add unit tests for [new helper] in `[test file path]`

### Phase 2: Core Schema Definition

- [ ] Create `[module path]/__init__.py`
- [ ] Create `[module path]/schemas.py`
  - Define [Enum] with all operations
  - Define [RequestModel] with validators
  - Define [ResponseModel]
  - Add `@model_validator` for operation-specific requirements
- [ ] Create `tests/[module path]/__init__.py`
- [ ] Create `tests/[module path]/test_schemas.py`

### Phase 3: Service Layer Implementation

- [ ] Create `[module path]/service.py`
- [ ] Implement `[main_service]()` - entry point with security validation
- [ ] Implement `_[operation_a]()` operation
  - [Key detail]
  - [Key detail]
- [ ] Implement `_[operation_b]()` operation
  - [Key detail]
  - [Key detail]
- [ ] Implement `_[helper]()` helper
  - [Key detail]
  - [Key detail]
- [ ] Add comprehensive structured logging to all functions

### Phase 4: Tool/Handler Registration

- [ ] Create `[module path]/tool.py`
- [ ] Implement `register_[feature](...)` function
- [ ] Define handler function with all parameters
- [ ] **CRITICAL**: Write comprehensive docstring following project format
  - One-line summary
  - "Use this when you need to:" (5+ specific scenarios)
  - "Do NOT use this for:" (3+ redirect scenarios)
  - Args section with parameter guidance
  - Returns section
  - Performance Notes section
  - Examples section (5+ realistic examples)
- [ ] Implement parameter parsing and validation
- [ ] Add error handling with helpful messages
- [ ] Add structured logging for execution

### Phase 5: Configuration & Integration

- [ ] Update `[config file]`
  - Add `enable_[feature]` setting
  - Add other config params
- [ ] Update `[registration file]`
  - Import and conditionally register new feature
- [ ] Update system prompt / documentation strings
- [ ] Update `.env.example` with new variables

### Phase 6: Comprehensive Testing

#### Unit Tests

- [ ] Create `tests/[module path]/test_service.py`
  - Test `_[operation_a]()` operation
    - Success: [happy path]
    - Error: [error case]
    - Edge: [edge case]
  - Test `_[operation_b]()` operation
    - Success: [happy path]
    - Error: [error case]
  - Test security validation
    - [Security scenario 1]
    - [Security scenario 2]
  - Test dry_run mode for all operations

- [ ] Create `tests/[module path]/test_tool.py`
  - Test parameter validation
  - Test response formatting
  - Test error messages

#### Integration Tests

- [ ] Create `tests/integration/test_[feature].py`
  - Test complete workflow: [operation A] → [operation B] → [operation C]
  - Test [specific integration scenario]
  - Test cross-component workflow

#### Security Tests

- [ ] Add security tests to `tests/shared/test_[security_module].py`
  - [Security test 1]
  - [Security test 2]

### Phase 7: Documentation

- [ ] Update `README.md`
  - Add feature to Core Tools/Features section
  - Add usage examples
- [ ] Add inline code documentation
  - Comprehensive docstrings for all functions
  - Type hints for all parameters and returns

### Phase 8: Validation & Quality Checks

- [ ] Run linting: `[lint command]`
- [ ] Fix linting issues: `[lint fix command]`
- [ ] Run type checking: `[type check command]`
- [ ] Fix type errors
- [ ] Run all tests: `[test command]`
- [ ] Verify test coverage for new module
- [ ] Test E2E manually (see Validation section)

## Testing Strategy

### Unit Tests (`tests/[module path]/`)

**Scope:** Test individual functions in isolation with mock/tmp environment

**Coverage Requirements:**
- All operations
- All parameters and edge cases
- Security validation
- Error handling

**Test Fixtures:**
```python
@pytest.fixture
def [fixture_name]([deps]):
    """[Description]."""
    # setup
    yield [resource]
    # teardown (if needed)

@pytest.fixture
def [fixture_with_state]([base_fixture]):
    """[Description]."""
    # create structure
    return [resource]
```

**Test Categories:**
1. **Happy Path Tests** - Normal operations succeed
2. **Error Path Tests** - Invalid inputs rejected with clear errors
3. **Edge Case Tests** - Boundary conditions
4. **Security Tests** - Malicious inputs blocked
5. **Idempotency Tests** - Repeated operations are safe

### Integration Tests (`tests/integration/`)

**Scope:** Test multiple components working together

**Key Scenarios:**
1. **Full Lifecycle Workflow** - [operation A] → [operation B] → [operation C]
2. **[Specific Integration Scenario]** - [Description]
3. **Cross-Tool/Component Integration** - [Description]

### End-to-End Tests (Manual Validation)

**Scope:** Test through the actual interface (API, CLI, etc.)

**Test Scenarios:**

1. **[Scenario Name]**
   ```bash
   [command to invoke]
   # Expected: [what should happen]
   # Verify: [how to confirm]
   ```

2. **[Scenario Name]**
   ```bash
   [command to invoke]
   # Expected: [what should happen]
   # Verify: [how to confirm]
   ```

## Edge Cases for Testing

### Security Edge Cases
- [ ] **[Attack Type]**: `[example input]` - Should be blocked by `[defense mechanism]`
- [ ] **[Attack Type]**: `[example input]` - Should be blocked
- [ ] **[Edge Case]**: [description] - Should [expected behavior]

### Input Edge Cases
- [ ] **[Edge Case]**: [description] - Should [expected behavior]
- [ ] **[Edge Case]**: [description] - Should [expected behavior]
- [ ] **[Edge Case]**: [description] - Should [expected behavior]

### Operation Edge Cases
- [ ] **[Operation]**: [scenario] - Should [expected behavior]
- [ ] **[Operation]**: [scenario] - Should [expected behavior]
- [ ] **[Operation]**: [scenario] - Should [expected behavior]

### Concurrency / Performance Edge Cases
- [ ] **[Scenario]**: [description] - [expected behavior]
- [ ] **[Scenario]**: [description] - [expected behavior]

## Acceptance Criteria

### Functional Requirements
- [ ] **[Operation A] works**
  - [Specific requirement]
  - [Specific requirement]
  - [Specific requirement]

- [ ] **[Operation B] works**
  - [Specific requirement]
  - [Specific requirement]

### Non-Functional Requirements
- [ ] **Security enforced**
  - [Security requirement 1]
  - [Security requirement 2]

- [ ] **Type safety maintained**
  - All functions have complete type annotations
  - [Type checker] passes with strict configuration
  - No untyped values without justification

- [ ] **Logging comprehensive**
  - Structured logging for all operations
  - Duration tracking for performance monitoring
  - Errors logged with context

- [ ] **[Performance requirement]**
  - [Specific metric]
  - [Specific limit]

- [ ] **Usability**
  - [Documentation requirement]
  - Error messages are actionable
  - Examples use realistic inputs

### Quality Requirements
- [ ] **Tests pass**
  - All unit tests pass
  - All integration tests pass
  - Test coverage > [X]% for new module

- [ ] **Linting passes**
  - `[lint command]` passes with no errors
  - `[type check command]` passes with no errors

- [ ] **Documentation complete**
  - README.md updated
  - `.env.example` updated
  - All public functions have docstrings

## Validation

### Pre-Deployment Validation Commands

**1. Dependency Installation**
```bash
[install command]
[verify command]
```

**2. Linting & Type Checking**
```bash
[lint command]
[lint fix command]
[type check command]
```

**3. Unit Tests**
```bash
[run all unit tests]
[run module-specific tests]
[run with coverage]
```

**4. Integration Tests**
```bash
[run integration tests]
[run specific integration test file]
```

**5. Full Test Suite**
```bash
[run all tests]
[run with coverage report]
```

### End-to-End Validation

**Start/Setup:**
```bash
[start server / setup command]
```

**E2E Test 1: [Scenario]**
```bash
[command]
# Expected: [description]
# Verify: [verification step]
```

**E2E Test 2: [Scenario]**
```bash
[command]
# Expected: [description]
# Verify: [verification step]
```

**E2E Test 3: Security - [Attack Name]**
```bash
[command with malicious input]
# Expected: error returned, operation blocked
# Verify: [verify no side effects occurred]
```

### Regression Testing

**Verify Existing Features Still Work:**
```bash
[test existing feature 1]
# Expected: [behavior]

[test existing feature 2]
# Expected: [behavior]
```

### Success Criteria Checklist

```bash
# 1. Dependencies installed
[verify dependency command]

# 2. Linting passes
[lint command]
[type check command]

# 3. All tests pass
[test command]

# 4. New module has tests
[verify test files exist]

# 5. Configuration updated
[verify config changes]

# 6. Registration present
[verify registration]

# 7. Documentation updated
[verify docs]

# 8. Server/app starts without errors
[start and health check command]

# 9. E2E tests pass (manual verification)
[manual test checklist]

# 10. No regressions
[regression test commands]
```

**If all checkmarks pass, feature is complete and ready for deployment.**
