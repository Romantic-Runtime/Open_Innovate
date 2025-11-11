#!/bin/bash

# Repository Pull Script
# This script helps pull the latest changes from the remote repository

set -e

echo "🔄 Repository Pull Script"
echo "========================="
echo ""

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"
echo ""

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "⚠️  Warning: You have uncommitted changes"
    echo "   Options:"
    echo "   1. Stash changes and pull"
    echo "   2. Commit changes and pull"
    echo "   3. Abort"
    read -p "   Choose (1/2/3): " choice
    
    case $choice in
        1)
            echo "💾 Stashing changes..."
            git stash
            STASHED=true
            ;;
        2)
            echo "💾 Committing changes..."
            git add .
            read -p "   Enter commit message: " commit_msg
            git commit -m "$commit_msg"
            ;;
        3)
            echo "❌ Pull aborted"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Aborting."
            exit 1
            ;;
    esac
    echo ""
fi

# Fetch latest changes
echo "📥 Fetching latest changes..."
git fetch origin
echo ""

# Check if branch exists on remote
if ! git ls-remote --heads origin "$CURRENT_BRANCH" | grep -q "$CURRENT_BRANCH"; then
    echo "⚠️  Warning: Branch '$CURRENT_BRANCH' does not exist on remote"
    echo "   Skipping pull..."
else
    # Check if we're behind
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "")
    
    if [ -z "$REMOTE" ]; then
        echo "⚠️  No upstream branch set for '$CURRENT_BRANCH'"
        echo "   Setting upstream to origin/$CURRENT_BRANCH..."
        git branch --set-upstream-to=origin/$CURRENT_BRANCH $CURRENT_BRANCH
    fi
    
    BASE=$(git merge-base @ @{u} 2>/dev/null || echo "")
    
    if [ "$LOCAL" = "$REMOTE" ]; then
        echo "✅ Already up to date with origin/$CURRENT_BRANCH"
    elif [ "$LOCAL" = "$BASE" ]; then
        echo "⬇️  Pulling changes from origin/$CURRENT_BRANCH..."
        git pull origin "$CURRENT_BRANCH"
        echo "✅ Successfully pulled changes"
    elif [ "$REMOTE" = "$BASE" ]; then
        echo "⬆️  Your branch is ahead of origin/$CURRENT_BRANCH"
        echo "   No need to pull, but you may want to push"
    else
        echo "🔀 Branches have diverged"
        echo "   Merging changes from origin/$CURRENT_BRANCH..."
        git pull origin "$CURRENT_BRANCH"
        echo "✅ Successfully merged changes"
    fi
fi

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
    echo ""
    echo "♻️  Restoring stashed changes..."
    git stash pop
fi

echo ""
echo "✅ Repository pull complete!"
echo ""
echo "Current status:"
git status --short --branch
