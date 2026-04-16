# AIRA website (getaira.ai)

Static replica of [getaira.ai](https://www.getaira.ai), hosted on GitHub
Pages. Plain HTML + Tailwind (via CDN) + one small stylesheet. No build
step.

## Structure

```
.
├── index.html                 # Home
├── contact/index.html         # Contact form (posts to Google Apps Script)
├── api-docs/index.html        # API reference
├── styles.css                 # Brand colors + custom component styles
├── apps-script/
│   ├── Code.gs                # Backend for contact form → Google Sheet
│   └── README.md              # One-time setup instructions
├── CNAME                      # Tells GitHub Pages our custom domain
├── .nojekyll                  # Skips Jekyll on GitHub Pages
├── AIRA-logo.png, visa-logo.png, mastercard-logo.png
├── favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png
```

## Local preview

Any static server works. Simplest:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing

Pages are plain HTML — edit with any editor. Tailwind utility classes
are resolved at runtime by `https://cdn.tailwindcss.com`. Brand colors
and a few custom helpers live in `styles.css`.

## Deploying

Already wired to GitHub Pages — pushing to `main` auto-publishes. To
change the primary domain, edit `CNAME` and update DNS to match.

## Contact form

Submissions go to a Google Sheet via Apps Script. See
[`apps-script/README.md`](./apps-script/README.md) for the one-time
deploy steps and how to paste the Web App URL into `contact/index.html`.

## DNS (one-time)

Current setup points `www.getaira.ai` at GitHub Pages. At your DNS
provider (e.g. where the domain is registered) set:

| Type | Host | Value |
|---|---|---|
| CNAME | `www` | `nicolasdinh.github.io` |
| A     | `@`   | `185.199.108.153` |
| A     | `@`   | `185.199.109.153` |
| A     | `@`   | `185.199.110.153` |
| A     | `@`   | `185.199.111.153` |

Then in the GitHub repo: **Settings ▸ Pages** — make sure the source is
`main` branch / root, custom domain is `www.getaira.ai`, and
**Enforce HTTPS** is ticked once the certificate has provisioned (a few
minutes after DNS propagates).
