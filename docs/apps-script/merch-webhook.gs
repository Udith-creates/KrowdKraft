/**
 * Google Apps Script: Merch webhook receiver (ready-to-deploy)
 *
 * Behavior:
 * - Accepts POSTed JSON (body) with { email, timestamp, source, tag }
 * - Optionally validates a secret if DEPLOY_SECRET is set (see below)
 * - Appends a row to the first sheet of the spreadsheet identified by SHEET_ID
 * - Returns JSON { success: true, row: <lastRow> } on success
 *
 * Deployment notes:
 * - Deploy as Web App: Extensions → Apps Script → Deploy → New deployment → Web app
 * - Execute as: Me
 * - Who has access: Anyone (or Anyone, even anonymous) OR require a secret via query/header
 *
 * How to use a secret (optional):
 * - Set DEPLOY_SECRET to a non-empty string in this script (or update the deployed code)
 * - The sender must include the secret either as a query parameter `?secret=...` or a header
 *   `x-webhook-secret: ...` (case-insensitive)
 */

function doPost(e) {
  try {
    // Optional: put a secret here and redeploy. If empty, no secret is required.
    var DEPLOY_SECRET = ''

    // Parse incoming JSON body
    var data = {}
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents)
      } catch (parseErr) {
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'Invalid JSON in request body' }))
          .setMimeType(ContentService.MimeType.JSON)
      }
    }

    // Secret validation (if DEPLOY_SECRET is set)
    if (DEPLOY_SECRET) {
      var provided = ''
      // query param
      if (e && e.parameter && e.parameter.secret) provided = e.parameter.secret
      // headers (Apps Script provides e.headers but casing may vary)
      if (!provided && e && e.headers) {
        for (var k in e.headers) {
          if (k.toLowerCase() === 'x-webhook-secret') {
            provided = e.headers[k]
            break
          }
        }
      }
      if (provided !== DEPLOY_SECRET) {
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'Unauthorized' }))
          .setMimeType(ContentService.MimeType.JSON)
      }
    }

    var email = data.email || ''
    var timestamp = data.timestamp || new Date().toISOString()
    var source = data.source || ''
    var tag = data.tag || ''

  // Your Google Sheet ID (from URL)
  var SHEET_ID = ''

    var ss = SpreadsheetApp.openById(SHEET_ID)
    var sheet = ss.getSheets()[0]

    // Append a row: Email | Timestamp | Source | Tag
    sheet.appendRow([email, timestamp, source, tag])

    // getLastRow gives the row index we just appended to
    var lastRow = sheet.getLastRow()

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

/**
 * Handle GET requests so visiting the Web App URL in a browser does not
 * produce "function not found: doGet". Returns a small JSON help message
 * explaining how to POST to the endpoint.
 */
function doGet(e) {
  var help = {
    success: false,
    error: 'GET not supported for writing. This endpoint accepts POST requests with JSON body { email, source, tag, timestamp }',
    examples: {
      powershell: "Invoke-RestMethod -Method Post -Uri '<WEB_APP_URL>' -ContentType 'application/json' -Body '{\"email\":\"you@example.com\"}'",
      curl: "curl -X POST -H 'Content-Type: application/json' -d '{\"email\":\"you@example.com\"}' '<WEB_APP_URL>'"
    },
    note: 'If you want to test via browser, use a REST client or the examples above. Redeploy script after any code changes.'
  }

  return ContentService
    .createTextOutput(JSON.stringify(help))
    .setMimeType(ContentService.MimeType.JSON)
}

