# Branch Protection & CI/CD Workflow Setup

## 📋 GitHub Actions Setup

This document explains how to set up automated workflows for this project.

### Prerequisites:
1. GitHub repository with GitHub Actions enabled (default for public repos)
2. Branch protection rules configured in repository settings

---

## 🔐 Setting Up Branch Protection Rules

### For `main` branch:

1. Go to **Settings** → **Branches**
2. Click **Add rule** under "Branch protection rules"
3. Pattern: `main`
4. Enable:
   - ✅ **Require pull request reviews before merging**
     - Number of approvals: 2
   - ✅ **Require status checks to pass**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Restrict who can push to matching branches**
     - Allow only administrators/maintainers
   - ✅ **Dismiss stale pull request approvals when new commits are pushed**

### For `develop` branch:

1. Pattern: `develop`
2. Enable:
   - ✅ **Require pull request reviews before merging**
     - Number of approvals: 1
   - ✅ **Require status checks to pass**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Dismiss stale pull request approvals when new commits are pushed**

---

## 🚀 Automated Deployments

### Current Setup:
- **main branch** → Deploys to Production (Render.com - url-shortener-app-4gtd.onrender.com)
- **develop branch** → Can be configured for staging

### Manual Deployment Steps:

**For Production (main):**
1. Merge to main via PR
2. Render auto-detects and deploys
3. Monitor deployment on Render dashboard

**For Staging (develop):**
1. Currently manual - can be set up with separate Render instance
2. Create a new web service on Render from develop branch

---

## ✅ Suggested GitHub Actions Workflows

### Example: Test & Lint on PR

Create `.github/workflows/test.yml`:

```yaml
name: Test & Lint

on:
  pull_request:
    branches: [ main, develop ]
  push:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build React app
        run: npm run build
      
      - name: Run linter
        run: npm run lint
```

### Example: Version Bump on Release

Create `.github/workflows/release.yml`:

```yaml
name: Create Release

on:
  push:
    branches: [ main ]
    paths:
      - 'package.json'

jobs:
  release:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.event.head_commit.message }}
          release_name: Release ${{ github.event.head_commit.message }}
```

---

## 📊 Repository Settings Checklist

- [ ] Branch protection enabled for `main`
- [ ] Branch protection enabled for `develop`
- [ ] Require PRs for all merges
- [ ] Require status checks to pass
- [ ] Require code reviews (2 for main, 1 for develop)
- [ ] Auto-delete head branches enabled
- [ ] Require branches to be up to date

---

## 🔗 Related Documentation

- **BRANCHING.md** - Detailed branching strategy
- **README.md** - Project overview
- **DEPLOYMENT.md** - Deployment instructions

---

**Last Updated**: 2026-09-02
