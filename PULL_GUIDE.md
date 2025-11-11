# 🔄 Repository Pull Guide

## Quick Pull Commands

### Update Your Current Branch
```bash
git pull origin $(git branch --show-current)
```

### Update Main Branch (if available)
```bash
git checkout main
git pull origin main
```

### Fetch All Changes Without Merging
```bash
git fetch --all
```

### Check Status Before Pulling
```bash
git status
```

## Common Pull Scenarios

### Scenario 1: Update Your Feature Branch
```bash
# Check current status
git status

# Pull latest changes
git pull origin your-branch-name
```

### Scenario 2: Sync with Main Branch
```bash
# Fetch all updates
git fetch origin

# Merge main into your branch
git merge origin/main
```

### Scenario 3: Pull with Conflicts
```bash
# If you have local changes, stash them first
git stash

# Pull the changes
git pull

# Reapply your changes
git stash pop
```

## Troubleshooting

### Error: "Your local changes would be overwritten"
```bash
# Option 1: Stash your changes
git stash
git pull
git stash pop

# Option 2: Commit your changes first
git add .
git commit -m "Save local changes"
git pull
```

### Error: "Divergent branches"
```bash
# Option 1: Rebase (recommended for feature branches)
git pull --rebase

# Option 2: Merge (default)
git pull --no-rebase
```

## Best Practices

1. **Always check status first**: `git status`
2. **Commit or stash local changes** before pulling
3. **Pull frequently** to avoid large merge conflicts
4. **Use fetch + merge** for more control over the process
5. **Keep your branch up to date** with the base branch

## Automation Scripts

### Auto-pull Script (pull-repo.sh)
```bash
#!/bin/bash
echo "🔄 Pulling latest changes..."
BRANCH=$(git branch --show-current)
git fetch origin
git pull origin $BRANCH
echo "✅ Repository updated on branch: $BRANCH"
```

Make it executable:
```bash
chmod +x pull-repo.sh
./pull-repo.sh
```

## Current Status

To check if your repository needs pulling:
```bash
git fetch origin
git status
```

This will show:
- "Your branch is up to date" - No pull needed
- "Your branch is behind" - You need to pull
- "Your branch has diverged" - You need to merge or rebase
