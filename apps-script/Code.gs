/**
 * AIRA contact-form endpoint.
 *
 * Deploy this Apps Script as a "Web app" (Deploy ▸ New deployment ▸
 * type: Web app ▸ Execute as: Me ▸ Who has access: Anyone). Then paste
 * the resulting /exec URL into contact/index.html → APPS_SCRIPT_URL.
 *
 * On each POST, it appends a row to the active sheet. If the sheet is
 * empty, a header row is added automatically.
 */

const SHEET_NAME = 'Submissions';

const COLUMNS = [
  'submittedAt',
  'firstName',
  'lastName',
  'email',
  'company',
  'phone',
  'message',
  'userAgent',
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Seed header row on first write.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
      sheet.setFrozenRows(1);
    }

    const row = COLUMNS.map(function (key) {
      return body[key] != null ? String(body[key]) : '';
    });
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: allows you to open the /exec URL in a browser to sanity-check
// that the script is live.
function doGet() {
  return ContentService
    .createTextOutput('AIRA contact endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
