# Contact form → Google Sheets

The contact form on `/contact/` posts JSON to a Google Apps Script Web App,
which appends each submission as a row in a Google Sheet.

## One-time setup (~5 min)

1. **Create the sheet.** Go to <https://sheets.new> and name it something
   like *AIRA Contact Submissions*.
2. **Open the script editor.** In that sheet: **Extensions ▸ Apps Script**.
3. **Paste the code.** Delete the stub `Code.gs` contents, paste the
   contents of [`Code.gs`](./Code.gs) in this folder, and **save** (⌘S).
4. **Deploy as a Web app.**
   - Click **Deploy ▸ New deployment**.
   - Gear icon ▸ **Web app**.
   - *Description:* anything (e.g. `aira-contact`).
   - *Execute as:* **Me**.
   - *Who has access:* **Anyone** (required so the static site can POST
     without auth).
   - Click **Deploy**. Approve the OAuth consent when prompted.
5. **Copy the Web app URL.** It will look like
   `https://script.google.com/macros/s/AKfyc.../exec`.
6. **Wire it into the site.** Open `contact/index.html`, find the line:

   ```js
   const APPS_SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```

   Replace the placeholder with the URL from step 5, commit, and push.

## How to check submissions

Just open the sheet — every form submission is appended as a new row on
the **Submissions** tab, with columns:

| submittedAt | firstName | lastName | email | company | phone | message | userAgent |
|---|---|---|---|---|---|---|---|

Tip: in Google Sheets, **File ▸ Notification settings** can email you
whenever a row is added.

## Updating the script later

If you change `Code.gs`, you must **Deploy ▸ Manage deployments ▸ pencil
icon ▸ Version: New version ▸ Deploy** again, otherwise the Web app keeps
serving the previous code. The URL stays the same.

## Why `mode: 'no-cors'`?

Apps Script Web apps don't return CORS headers, so the browser would
block a standard `fetch` response. Posting with `mode: 'no-cors'` and a
`text/plain` content type lets the request through without a preflight.
The trade-off is that the browser can't read the response — we treat any
non-throw as success. If you need strict error handling, switch to a
service like [Sheety](https://sheety.co) or a tiny Cloudflare Worker
that proxies to the sheet with proper CORS.
