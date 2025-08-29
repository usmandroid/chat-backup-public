# Syncing Private and Public Repos for ChatGPT Backup

This guide explains how to publish your code from a private repo to a public repo using a squashed release branch, and how to keep both in sync for future releases.

---

## First-Time Public Release

1. **Delete any old release branch (if exists):**
   ```sh
   git push origin --delete release/0.0.1  # Remove remote branch if needed
   git branch -D release/0.0.1              # Remove local branch if needed
   ```

````

2. **Create a new release branch from your main dev branch (e.g., chrome):**
   ```sh
git checkout chrome
git checkout -b release/0.0.1
````

3. **Squash all changes since master into one commit:**
   ```sh
   git reset --soft $(git merge-base chrome master)
   git commit -am "Version 0.0.1 chat-backup release."
   ```

````

4. **Create the public repo (if not already):**
   ```sh
gh repo create chat-backup-public --public --source=. --remote=upstream --push
````

5. **Push the release branch to the public repo:**
   ```sh
   git push upstream release/0.0.1
   ```

````

6. **Create a GitHub release:**
   ```sh
gh release create v0.0.1 --title "Version 0.0.1 chat-backup release." --notes "Initial public release of ChatGPT Backup extension." --target release/0.0.1 --repo usmandroid/chat-backup-public
````

---

## Updating Release Branch and Public Repo After Changes

If you have made new changes on your `chrome` branch and want to update both your private and public release branches, follow these steps:

1. **Delete the old release branch (locally and remotely):**

   ```sh
   git checkout chrome
   git push origin --delete release/0.0.X      # Replace X with the previous version
   git push upstream --delete release/0.0.X    # Remove from public repo as well
   git branch -D release/0.0.X
   ```

2. **Create a new release branch from chrome:**

   ```sh
   git checkout chrome
   git checkout -b release/0.0.Y               # Replace Y with the new version
   ```

3. **Squash all changes since master into one commit:**

   ```sh
   git reset --soft $(git merge-base chrome master)
   git commit -am "Version 0.0.Y chat-backup release."
   ```

4. **Push the new release branch to both repos:**

   ```sh
   git push origin release/0.0.Y
   git push upstream release/0.0.Y
   ```

5. **Create a new release on the public repo:**
   ```sh
   gh release create v0.0.Y --title "Version 0.0.Y chat-backup release." --notes "Release notes for v0.0.Y" --target release/0.0.Y --repo usmandroid/chat-backup-public
   ```

**Summary:**

- Always delete the old release branch from both `origin` (private) and `upstream` (public).
- Create a new release branch from `chrome`, squash, and push to both remotes.
- Tag and create a release on the public repo.

This keeps your private and public repos in sync with a clean, squashed release history.

---

## Subsequent Releases (e.g., 0.0.2, 0.0.3, ...)

1. **Update your private repo as usual (on chrome branch).**
2. **Delete old release branch (if exists):**
   ```sh
   git push origin --delete release/0.0.X  # Replace X with previous version
   git branch -D release/0.0.X
   ```

````
3. **Create new release branch:**
   ```sh
git checkout chrome
git checkout -b release/0.0.Y           # Replace Y with new version
````

4. **Squash all changes since master into one commit:**
   ```sh
   git reset --soft $(git merge-base chrome master)
   git commit -am "Version 0.0.Y chat-backup release."
   ```

````
5. **Push to public repo:**
   ```sh
git push upstream release/0.0.Y
````

6. **Create new GitHub release:**
   ```sh
   gh release create v0.0.Y --title "Version 0.0.Y chat-backup release." --notes "Release notes for v0.0.Y" --target release/0.0.Y --repo usmandroid/chat-backup-public
   ```

```

---

## Notes
- Always update the version in `manifest.json` and `VERSION` file before making a new release.
- The public repo will only have squashed release commits, not your full private history.
- You can use the same process for hotfixes or minor/major releases.
- Replace `usmandroid/chat-backup-public` with your actual public repo path if different.

---

This ensures your private and public repos stay in sync, with clean release history for open source users.
```
