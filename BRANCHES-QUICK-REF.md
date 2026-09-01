# 🌳 Quick Git Branch Reference

## Current Branch Structure

```
main (Production) ← Tag releases (v1.0.0, v1.1.0, etc.)
  ↑
  └─ Pull Requests from release/ & hotfix/
  
develop (Integration) ← All features merged here first
  ↑
  ├─ feature/my-feature
  ├─ feature/another-feature
  ├─ bugfix/fix-something
  └─ hotfix/critical-bug (merges to both main & develop)
```

---

## 🚀 Quick Commands

### Create a Feature Branch:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature-name
```

### Push & Create PR:
```bash
git push -u origin feature/my-feature-name
# Then create PR on GitHub: develop ← feature/my-feature-name
```

### Fix a Critical Production Bug:
```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue
# Fix the bug...
git push -u origin hotfix/critical-issue
# Create TWO PRs: main ← hotfix/ AND develop ← hotfix/
```

### Release a New Version:
```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.1.0
# Update version in package.json
# Commit changes
git push -u origin release/v1.1.0
# Create PR: main ← release/v1.1.0
# After merge, create tag: git tag v1.1.0 && git push origin v1.1.0
```

---

## 📋 Branch Naming Convention

| Type | Pattern | Examples |
|------|---------|----------|
| Feature | `feature/description` | `feature/user-auth`, `feature/api-improvements` |
| Bug Fix | `bugfix/description` | `bugfix/login-error`, `bugfix/typo-in-readme` |
| Hotfix | `hotfix/description` | `hotfix/security-patch`, `hotfix/db-connection-issue` |
| Release | `release/vX.Y.Z` | `release/v1.0.0`, `release/v1.1.0` |

✅ **Use kebab-case** (lowercase-with-hyphens)  
✅ **Be descriptive** (not just "update" or "fix")  
✅ **Delete branch after merge**

---

## 📍 Where Each Branch Deploys

| Branch | Deployment | Environment | Auto-Deploy |
|--------|-----------|-------------|------------|
| `main` | url-shortener-app-4gtd.onrender.com | Production | ✅ Yes (Render) |
| `develop` | Manual setup | Staging | ❌ No (can configure) |
| `feature/*` | N/A | Local/PR Preview | ❌ No |
| `hotfix/*` | N/A | Local/PR Preview | ❌ No |
| `release/*` | N/A | Local/PR Preview | ❌ No |

---

## ✅ Checklist Before Creating PR

- [ ] Branch created from correct base (develop or main)
- [ ] All changes committed with clear messages
- [ ] Branch is up to date: `git rebase origin/develop`
- [ ] No merge conflicts
- [ ] Code reviewed locally
- [ ] PR title follows format: `[TYPE] Description (Closes #123)`
- [ ] PR description explains changes

---

## 🔍 Useful Git Commands

### Check current branch:
```bash
git branch
```

### List all branches (local & remote):
```bash
git branch -a
```

### Delete branch locally:
```bash
git branch -d feature/old-feature
```

### Delete branch on GitHub:
```bash
git push origin --delete feature/old-feature
```

### Sync with develop:
```bash
git fetch origin
git rebase origin/develop
```

### View commit history:
```bash
git log --oneline --graph --all
```

---

## 📚 Full Documentation

See **BRANCHING.md** for complete details on:
- Detailed branch purposes
- Full workflow examples
- Best practices
- PR workflow
- Version tagging

See **GITHUB-SETUP.md** for:
- Branch protection setup
- GitHub Actions workflows
- CI/CD configuration

---

**Status**: ✅ Git Flow Strategy Active  
**Last Updated**: 2026-09-02
