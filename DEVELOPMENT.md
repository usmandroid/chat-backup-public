# Development Guide for ChatGPT Backup Extension

This guide explains how to set up your development environment, run linting, formatting, and check for errors in the codebase.

---

## 1. Prerequisites

- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [VS Code](https://code.visualstudio.com/) (optional, for best experience)

---

## 2. Install Dependencies

Run the following command in the project root:

```sh
npm install
```

This will install all required development tools (ESLint, Prettier, jsonlint).

---

## 3. Linting JavaScript

To check for code style and errors in JavaScript files:

```sh
npm run lint
```

- Uses ESLint to check `.js` files for issues.
- Warnings and errors will be shown in the terminal.

---

## 4. Formatting Code

To automatically format your code (JavaScript, JSON, etc.):

```sh
npm run format
```

- Uses Prettier to format all supported files in the project.

---

## 5. Linting JSON

To check for errors in JSON files:

```sh
npm run lint:json
```

- Uses jsonlint to validate all `.json` files.

---

## 6. Fixing Issues

- ESLint and Prettier can often auto-fix issues. To auto-fix JavaScript files:

```sh
npx eslint . --ext .js,.jsx,.ts,.tsx --fix
```

- For Prettier, just run the format command above.

---

## 7. Running Tests

_No automated tests are currently set up._

If you add tests in the future, document how to run them here.

---

## 8. VS Code Extensions & Settings

For the best development experience, install these VS Code extensions:

- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier - Code formatter** (`esbenp.prettier-vscode`)

You can install them from the Extensions sidebar or run:

```sh
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

### Recommended VS Code User Settings

Add the following to your VS Code `settings.json` (open Command Palette → Preferences: Open Settings (JSON)):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript"],
  "eslint.alwaysShowStatus": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

These settings will:

- Format code on save using Prettier
- Show ESLint errors and warnings in real time
- Keep files clean and consistent

---

Keep dependencies up to date with `npm update`.
Always run lint and format before committing or publishing changes.

---

---

## 9. CI/CD Automation (GitHub Actions)

This project uses GitHub Actions to automate linting, formatting, and source release packaging.

### How it works

- On every push of a tag like `v0.0.1`, `v0.1.0`, etc., the workflow will:
  - Install dependencies
  - Lint JavaScript and JSON
  - Check formatting
  - Build a release ZIP
  - Attach the ZIP to the GitHub Release

### How to trigger a release

1. Make sure your code is ready and committed.
2. Tag your release (e.g., for version 0.0.1):
   ```sh
   git tag v0.0.1
   git push origin v0.0.1
   ```
3. GitHub Actions will run automatically. Check the Actions tab for progress.
4. The release ZIP will be attached to the release on GitHub.

---

For more details, see the scripts in `package.json`.
