# Deploy Static Web Apps (HTML/CSS/JS) to InfinityFree Using GitHub Actions and FTP

This guide walks you through preparing and automatically deploying a static web application (HTML, CSS, JavaScript, and assets) or a project subfolder to **InfinityFree** hosting using **GitHub Actions** and **FTP**.

---

## Prerequisites

* Git installed locally
* Visual Studio Code or any code editor
* A GitHub account and repository
* An active InfinityFree account with an active domain
* InfinityFree FTP credentials (found in your InfinityFree client area)

---

## 1. Project Structure

Your project can be in the repository root or in a specific subfolder (e.g., `landingpage/` or `dist/`):

```text
my-project/
├── .github/
│   └── workflows/
│       └── infinity-free.yml
├── landingpage/         <-- (or root files)
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

> [!WARNING]
> **Avoid Laravel `.htaccess` Rewrite Rules:**  
> Do **not** use `RewriteRule ^(.*)$ public/$1 [L]` from Laravel guides. Since static projects have no `public/` directory, this will cause **HTTP 500 Internal Server Error** or **HTTP 404** on InfinityFree. For standard static sites, no `.htaccess` is needed unless you specifically need custom caching or clean URLs.

---

## 2. Understand InfinityFree Directory Paths

InfinityFree organizes domains into specific FTP directories:

| Domain Type | FTP Target Path (`server-dir`) |
| :--- | :--- |
| **Main Domain** (root) | `/htdocs/` |
| **Main Domain** (subfolder / page) | `/htdocs/doc/` *(or `/htdocs/yourfolder/`)* |
| **Addon Domain** (root) | `/yourdomain.com/htdocs/` |
| **Addon Domain** (subfolder) | `/yourdomain.com/htdocs/doc/` |

> [!IMPORTANT]
> Always end your `server-dir` path with a **trailing slash** (e.g., `/htdocs/doc/`). Without the trailing slash, the FTP action may fail or treat the directory as a file name.

---

## 3. Configure GitHub Secrets

FTP credentials should never be committed into your Git repository. Store them securely as GitHub Secrets:

1. Open your repository on GitHub.
2. Go to **Settings** → **Secrets and variables** → **Actions**.
3. Under **Repository secrets** (do not use Environments), click **New repository secret**.
4. Add the following two secrets:

| Secret Name | Value |
| :--- | :--- |
| `FTP_USERNAME` | Your InfinityFree FTP username (e.g., `if0_12345678` or `epiz_12345678`) |
| `FTP_PASSWORD` | Your InfinityFree vPanel / account password |

*Your FTP server host for InfinityFree is always `ftpupload.net`.*

---

## 4. Create the GitHub Actions Workflow

Create the workflow directory and file inside your repository:

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/infinity-free.yml` with the following content:

```yaml
name: Deploy to InfinityFree

on:
  workflow_dispatch: # Allows manual trigger from GitHub Actions tab
  push:
    branches:
      - main           # Triggers automatically on push to main branch

jobs:
  deploy:
    name: Deploy via FTP
    runs-on: ubuntu-latest

    steps:
      # Step 1: Clone the repository code
      - name: Checkout repository
        uses: actions/checkout@v4

      # Step 2: Sync files via FTP
      - name: Deploy to InfinityFree via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ftpupload.net
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          # Path to the local folder you want to deploy:
          # Use ./ for the entire repo, or ./landingpage/ for a specific folder
          local-dir: ./landingpage/
          # Destination directory on InfinityFree (must end with /)
          server-dir: /htdocs/doc/
          timeout: 86400000
          log-level: standard
```

### Key Configuration Options:
* **`local-dir`**: Specify `./landingpage/` (or `./dist/`) so that **only** the production web files are uploaded. This prevents uploading large archives, `.git` metadata, raw docs, or unnecessary files.
* **`server-dir`**: The destination folder on InfinityFree. If the destination subfolder (e.g. `doc/`) doesn't exist yet, create it via InfinityFree File Manager.

---

## 5. Commit and Deploy

1. Stage and commit your files:
   ```bash
   git add .github/workflows/infinity-free.yml
   git commit -m "Configure InfinityFree FTP deployment workflow"
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

3. Monitor the deployment:
   * Go to the **Actions** tab in your GitHub repository.
   * Click on the running workflow (**Deploy via FTP**).
   * Once it displays a green checkmark, your site is deployed.

4. Visit your site:
   ```text
   http://yourdomain.com/doc/
   ```

---

## Troubleshooting & Notes

* **Node.js 20 Deprecation Warning:**  
  If GitHub Actions outputs a warning regarding Node.js 20 running on Node.js 24, it is safe to ignore. It does not affect deployment.
* **Sync State File:**  
  The action creates a file named `.ftp-deploy-sync-state.json` inside your server folder to keep track of uploaded file hashes. Do not delete this file on the server, as it ensures future pushes only upload modified files rather than re-uploading everything.
* **Browser Caching:**  
  If you push changes and don't immediately see them in your browser, press `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac) to bypass local browser cache.
* **File Size Limits:**  
  InfinityFree has a file size limit of 10 MB per individual file on free accounts. Keep your assets optimized.

---

## Deployment Checklist

| Step | Action | Status |
| :--- | :--- | :---: |
| 1 | Static files organized (`index.html`, `style.css`, `script.js`) | ✅ |
| 2 | No Laravel-specific `.htaccess` rewrite in static folder | ✅ |
| 3 | FTP secrets (`FTP_USERNAME`, `FTP_PASSWORD`) added to GitHub Secrets | ✅ |
| 4 | `.github/workflows/infinity-free.yml` configured with correct `local-dir` and `server-dir` | ✅ |
| 5 | Target folder exists in InfinityFree File Manager | ✅ |
| 6 | Code pushed to `main` branch and verified via GitHub Actions | ✅ |


### In short explanation 
Repository Secrets (Not "Environments"):

In GitHub, add them under Settings → Secrets and variables → Actions → Repository secrets (click New repository secret).
(Do not create an "Environment" like production or staging unless your workflow explicitly specifies environment: in the YAML).

Folder name is workflows (one word, no space):

Make sure it's .github/workflows/infinity-free.yml.

Line 24 (local-dir):

Point to whatever local folder you want to deploy (e.g. ./landingpage/ or ./dist/ or ./).

Line 25 (server-dir):

Point to your destination on InfinityFree (e.g. /htdocs/ for root or /htdocs/doc/ for a subfolder), always ending with a trailing slash /.