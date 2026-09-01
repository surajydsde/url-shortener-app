# Git Branching Strategy

This project follows **Git Flow** branching model for organized development and releases.

## 📋 Branch Types

### 1. **main** (Production)
- **Purpose**: Production-ready code only
- **Protection**: Requires pull request reviews
- **Deployments**: Auto-deploys to Render.com (production)
- **Who can merge**: Only via PRs after review
- **Naming**: N/A (fixed name)

**Rules:**
- Only merge from `release/` or `hotfix/` branches
- Tag all releases with version numbers (v1.0.0, v1.1.0, etc.)
- No direct commits allowed

### 2. **develop** (Integration)
- **Purpose**: Integration branch for features
- **Base for**: All feature branches
- **Deployments**: Auto-deploys to staging environment (if available)
- **Naming**: N/A (fixed name)

**Rules:**
- Feature branches merge here first via PRs
- Code review required before merging
- Must be stable and working code

### 3. **feature/** (Feature Development)
- **Purpose**: Develop new features
- **Naming Convention**: `feature/short-description`
- **Examples**:
  - `feature/user-authentication`
  - `feature/analytics-dashboard`
  - `feature/api-rate-limiting`
  - `feature/ui-improvements`

**Rules:**
- Branch from: `develop`
- Merge back to: `develop` via PR with code review
- Naming: Use kebab-case, short and descriptive
- Delete after merge
- Max lifetime: 2 weeks
- Keep updated with develop

**Workflow:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
# ... make changes ...
git push origin feature/my-feature
# Create PR on GitHub
```

### 4. **bugfix/** (Bug Fixes - Minor)
- **Purpose**: Fix bugs in development/feature branches
- **Naming Convention**: `bugfix/issue-description`
- **Examples**:
  - `bugfix/fix-typo-in-readme`
  - `bugfix/url-validation-error`
  - `bugfix/styling-issue-on-mobile`

**Rules:**
- Branch from: `develop`
- Merge back to: `develop` via PR
- For production bugs → use `hotfix/` instead
- Similar workflow to feature branches

### 5. **hotfix/** (Critical Production Fixes)
- **Purpose**: Fix critical bugs in production
- **Naming Convention**: `hotfix/issue-description`
- **Examples**:
  - `hotfix/database-crash`
  - `hotfix/security-vulnerability`
  - `hotfix/payment-processing-error`

**Rules:**
- Branch from: `main` (production code)
- Merge back to: Both `main` AND `develop`
- Requires immediate review
- Should be deployed immediately after merge
- Create release tag after merge to main

**Workflow:**
```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue
# ... fix the issue ...
git push origin hotfix/critical-issue
# Create PR to main (with urgent flag)
# After merge to main, create PR to develop too
```

### 6. **release/** (Release Preparation)
- **Purpose**: Prepare production releases
- **Naming Convention**: `release/v1.x.0`
- **Examples**:
  - `release/v1.0.0`
  - `release/v1.1.0`
  - `release/v2.0.0`

**Rules:**
- Branch from: `develop` when ready for release
- Merge back to: `main` (only)
- Only bug fixes and version bumps allowed
- Create release tag on main
- Merge tag back to develop

**Workflow:**
```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0
# ... bump version in package.json ...
# ... fix any last-minute bugs ...
git push origin release/v1.0.0
# Create PR to main for review
# After approval, merge and tag
git tag v1.0.0
git push origin v1.0.0
```

---

## 📝 Pull Request Workflow

### Before Creating a PR:
1. Make sure your branch is up to date:
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

2. Test your changes locally
3. Ensure no merge conflicts
4. Check that your code follows project standards

### Creating a PR:
1. Push your branch to GitHub
2. Create PR with clear title and description
3. Reference related issues: `Closes #123`
4. Request reviewers

### PR Title Format:
```
[TYPE] Brief description (Closes #123)
```

**Types:**
- `[FEATURE]` - New feature
- `[FIX]` - Bug fix
- `[DOCS]` - Documentation only
- `[REFACTOR]` - Code refactoring
- `[STYLE]` - Styling only
- `[TEST]` - Test additions/updates
- `[PERF]` - Performance improvements

**Examples:**
- `[FEATURE] Add user authentication (Closes #45)`
- `[FIX] Fix URL validation bug (Closes #67)`
- `[DOCS] Update README deployment section`

---

## 🔄 Branch Protection Rules

**For `main` branch:**
- ✅ Require pull request reviews (2 reviewers)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Dismiss stale reviews when new commits are pushed
- ✅ Restrict who can push: Project maintainers only

**For `develop` branch:**
- ✅ Require pull request reviews (1 reviewer)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date

---

## 📊 Common Workflows

### Starting a New Feature:
```bash
# Update develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/my-awesome-feature

# Make your changes
# ... edit files ...

# Commit with clear messages
git add .
git commit -m "[FEATURE] Add awesome feature - brief description"

# Push to GitHub
git push -u origin feature/my-awesome-feature

# Create PR on GitHub
```

### Fixing a Production Bug (Hotfix):
```bash
# Create from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# Fix the bug
# ... edit files ...

git add .
git commit -m "[FIX] Fix critical bug in production (Closes #999)"
git push -u origin hotfix/critical-bug

# Create PR to main (URGENT)
# After merge, merge main back to develop
```

### Releasing a New Version:
```bash
# Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.1.0

# Bump version in package.json
# Update CHANGELOG.md
git add package.json CHANGELOG.md
git commit -m "Bump version to v1.1.0"

# Push and create PR
git push -u origin release/v1.1.0

# After merge to main, create tag
git tag v1.1.0
git push origin v1.1.0

# Merge main back to develop
```

---

## 📌 Version Tagging

Use **Semantic Versioning**: `v{MAJOR}.{MINOR}.{PATCH}`

**Examples:**
- `v1.0.0` - Initial release
- `v1.1.0` - New features, backward compatible
- `v1.1.1` - Bug fix, backward compatible
- `v2.0.0` - Breaking changes

**Create tag:**
```bash
git tag v1.1.0
git push origin v1.1.0
```

---

## 🎯 Best Practices

### ✅ DO:
- ✅ Create branches for all work (no direct commits to main/develop)
- ✅ Use clear, descriptive branch names
- ✅ Write meaningful commit messages
- ✅ Keep branches focused on single feature/fix
- ✅ Request code reviews before merging
- ✅ Delete branches after merge
- ✅ Keep develop and main updated
- ✅ Tag releases

### ❌ DON'T:
- ❌ Commit directly to main or develop
- ❌ Use vague branch names like "fix" or "update"
- ❌ Merge without PR review
- ❌ Leave old branches cluttering the repo
- ❌ Ignore merge conflicts
- ❌ Force push to shared branches

---

## 📞 Questions?

For detailed Git Flow information: https://nvie.com/posts/a-successful-git-branching-model/

---

**Last Updated**: 2026-09-02  
**Strategy**: Git Flow  
**Status**: Active
