# Nirupam Demo Site

Lightweight demo site for personal projects. Contains a root homepage and a small blog page.

Pages
- `index.html` — root homepage
- `nirupam-/index.html` — blog landing page

Quick start (Windows PowerShell)
```powershell
cd "C:\Users\ASUS\Downloads\demo"
Start-Process index.html
```

What I changed
- Cleaned up duplicated/concatenated HTML in both pages and fixed encoding artifacts.
- Fixed syntax errors in `style/main.css` and added small layout + responsive improvements.

If you'd like additional styling, fonts, or deployment to GitHub Pages, tell me which you'd prefer and I'll set it up.

Deployment
--
This repository now includes a GitHub Actions workflow that deploys the repository root to GitHub Pages on push to `main`.

 The contact form posts to Formspree; replace `your-form-id` in `index.html` with your real Formspree ID or another endpoint. If not replaced, the form will use a mailto fallback that opens the user's email client.

Accessibility & icons
--
- Added inline SVG icons for LinkedIn and GitHub with accessible labels and keyboard focus styles.
- Added semantic roles, aria-labels, and a screen-reader-only helper class to improve accessibility.

Serverless function (optional)
--
- A sample Netlify function is included at `netlify/functions/contact.js`. It logs POSTed contact data and returns a JSON success response. To use it:
	1. Deploy the site on Netlify and enable Functions.
	2. Move or adapt the handler to accept Form POSTs and integrate with an email provider.

Analytics
--
- To add analytics, replace the analytics placeholder in `index.html` with Plausible, Google Analytics, or your preferred provider's snippet. Keep privacy laws in mind (GDPR).
