
# Publishing ChatGPT Backup Extension on the Chrome Web Store

This guide will help you package, prepare, and publish your ChatGPT Backup extension to the Chrome Web Store so anyone can easily download and install it.

---

## 1. Prerequisites

- **Google Account:** You need a Google account to access the Chrome Web Store Developer Dashboard.
- **Extension Files:** Ensure your extension is complete, tested, and all files (including `manifest.json`, icons, scripts, etc.) are present in a single folder.
- **Manifest Version:** Your `manifest.json` should use `"manifest_version": 3`.

---

## 2. Packaging Your Extension

1. **Remove Unnecessary Files:**
	Delete any files not required for the extension (e.g., test files, local configs).

2. **Check Manifest:**
	Ensure `manifest.json` is valid and includes all required fields (name, version, description, permissions, icons, etc.).

3. **Create a ZIP Archive:**
	- Select all extension files and folders (not the parent folder itself).
	- Right-click and choose "Compress" or use the terminal:
	  ```sh
	  cd /path/to/extension-folder
	  zip -r chatgpt-backup.zip .
	  ```

---

## 3. Create a Developer Account

1. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
2. Sign in with your Google account.
3. Accept the Developer Agreement.
4. Pay the one-time registration fee (currently $5 USD, subject to change).

---

## 4. Publishing Your Extension

1. In the Developer Dashboard, click **Add New Item**.
2. Upload your ZIP file.
3. Fill in the required details:
	- **Extension Name**
	- **Description** (short and detailed)
	- **Screenshots** (at least one, ideally showing the extension in use)
	- **Promotional Images** (optional, but recommended)
	- **Category** (e.g., Productivity)
	- **Website/Support URL** (optional)
	- **Privacy Policy** (required if your extension handles user data)

4. Set the visibility (Public, Unlisted, or Private).
5. Complete the compliance and privacy questionnaires.
6. Save and review your submission.
7. Click **Publish to Chrome Web Store**.

---

## 5. After Publishing

- Google will review your extension. This can take from a few hours to several days.
- You will receive an email once your extension is approved or if any changes are required.
- Once approved, your extension will be available at a public URL for anyone to download and install.

---

## Notes & Tips

- **Versioning:** Increment the version in `manifest.json` for each update.
- **Testing:** Test your extension thoroughly in Chrome before publishing.
- **Privacy:** If your extension collects or transmits user data, provide a clear privacy policy.
- **Support:** Add a support email or website for user questions.
- **Updates:** You can update your extension at any time by uploading a new ZIP and submitting a new version.

---

For more details, see the [official Chrome Web Store documentation](https://developer.chrome.com/docs/webstore/publish/).
