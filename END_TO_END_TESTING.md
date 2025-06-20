# DocuMatic: End-to-End Testing Guide

This document outlines the complete process for testing the automated documentation and release pipeline, from making a code change to verifying the final outcome on GitHub.

---

### Part 1: The Developer's Role (Manual Steps)

This phase simulates the work a developer does to introduce a new feature or fix.

1.  **Make Code Changes**:
    *   Modify the application source code to add a new feature or fix a bug (e.g., editing files in the `/public` directory).
    *   Update or add new Playwright tests in the `/tests` directory to cover the new code. Ensure you add `await page.screenshot()` calls for any new UI states you want to capture for the documentation.
    *   Update the documentation generation script at `scripts/generate-docs.js` to include details about the new feature and reference any new screenshots.

2.  **Run Locally (Optional but Recommended)**:
    *   **Start the application**: Run `npm start` in your terminal.
    *   **Verify visually**: Open `http://localhost:3000` in your browser to ensure the new feature looks and works correctly.

3.  **Test Locally (Optional but Recommended)**:
    *   **Run the test suite**: Run `npm test` in your terminal to execute the Playwright tests. This confirms that your changes have not broken existing functionality and that your new tests pass.

4.  **Commit and Push the Changes**:
    *   This is the key step that triggers the automation.
    *   **Stage your files**: `git add .`
    *   **Commit with a conventional message**: Use a specific prefix.
        *   For a new feature: `git commit -m "feat: Describe your new feature"`
        *   For a bug fix: `git commit -m "fix: Describe your bug fix"`
        *   For other chores: `git commit -m "chore: Describe the change"`
    *   **Push to the main branch**: `git push origin main`

---

### Part 2: The Automation Pipeline (Automatic Steps)

Once the developer pushes the code, the GitHub Actions pipeline takes over completely. The following steps run automatically on GitHub's servers without any user input.

1.  **Workflow Trigger**: The push to the `main` branch automatically starts the "DocuMatic CI" workflow.
2.  **Environment Setup**: A clean virtual machine is prepared, the project code is checked out, Node.js is installed, and all project dependencies are installed via `npm install`.
3.  **Testing & Screenshot Generation**: The pipeline runs `npm test`. All Playwright tests are executed, verifying the application's functionality and generating the screenshots you defined.
4.  **Documentation Generation**: The pipeline runs `npm run docs`. The `scripts/generate-docs.js` script creates a new version-specific documentation folder (e.g., `/docs/v1.1.0/`) containing an updated `user-guide.md` and copies the relevant screenshots into it.
5.  **Documentation Commit**: The workflow commits the newly generated `docs` folder back to your repository.
6.  **Release Publication**: The final step runs `semantic-release`. It analyzes your commit message (`feat:` or `fix:`), calculates the new version number, updates `package.json`, generates a `CHANGELOG.md`, and publishes a new official Release on GitHub.

---

### Part 3: Verifying the Outcome (Manual Check)

After the workflow shows a green checkmark in the "Actions" tab on GitHub, you can verify its success.

1.  **Check the Releases**:
    *   On your main repository page on GitHub, look at the **Releases** section on the right-hand sidebar.
    *   Click on the link (e.g., "2 tags"). You should see a new version tag (e.g., `v1.1.0`) listed with release notes taken from your `CHANGELOG.md`.

2.  **Check the Documentation**:
    *   Browse the code in your repository.
    *   Navigate into the `/docs` folder. You should find a new subfolder named after the new version (e.g., `/docs/v1.1.0/`).
    *   Inside, open the `user-guide.md` and confirm that it includes the description of the new feature and that the new screenshots are also present.

3.  **Check the Changelog**:
    *   In the root of your repository, open the `CHANGELOG.md` file. Verify that it has a new section for the latest version with a link to your feature commit. 