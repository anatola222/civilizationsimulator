# Postcard from the Future — Setup Guide

Two services to connect. Takes about 20 minutes total. You'll do this once.

---

## PART 1 — EmailJS (sends the postcard email to students)

### Step 1 — Create your free account
Go to https://www.emailjs.com and sign up. Free tier = 200 emails/month.

### Step 2 — Add an email service
1. In the EmailJS dashboard, click **Email Services** → **Add New Service**
2. Choose **Gmail** (or whichever you use)
3. Connect your `anatola@r3imagine.io` account
4. Click **Create Service**
5. Copy the **Service ID** — you'll need it in a moment

### Step 3 — Create the email template
1. Click **Email Templates** → **Create New Template**
2. Set the fields exactly like this:

**To:** `{{to_email}}`
**From name:** `R3imagine Story Lab`
**Reply to:** `anatola@r3imagine.io`
**Subject:** `Your postcard from the future — {{world_name}}`

**Body (paste this HTML):**
```html
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: #f5f0e8; padding: 40px 32px; border-radius: 16px;">

  <p style="font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,240,232,0.4); margin-bottom: 32px;">
    R3IMAGINE STORY LAB · FUTURE CIVILIZATION ARCHIVE
  </p>

  <h1 style="font-size: 2.2rem; font-weight: 300; color: #f5f0e8; margin-bottom: 8px;">
    {{world_name}}
  </h1>

  <p style="font-size: 1rem; color: rgba(245,240,232,0.55); font-style: italic; margin-bottom: 32px;">
    "{{world_tagline}}"
  </p>

  <!-- Postcard message -->
  <div style="background: linear-gradient(140deg, #f8f3e8, #ede7d6); border-radius: 16px; padding: 28px 32px; margin-bottom: 32px;">
    <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #8a7e6e; margin-bottom: 16px;">
      POSTCARD FROM THE FUTURE · {{world_name}}, 2200
    </p>
    <p style="font-family: 'Georgia', serif; font-size: 1.4rem; color: #2e2a22; line-height: 1.7; font-style: italic;">
      {{postcard_message}}
    </p>
    <p style="font-size: 0.9rem; color: #8a7e6e; margin-top: 20px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 12px;">
      Written from {{world_name}}, sent to 2026.
    </p>
  </div>

  <!-- R3imagine invite -->
  <div style="border: 1px solid rgba(93,202,165,0.3); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
    <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(93,202,165,0.7); margin-bottom: 12px;">
      JOIN THE JOURNEY
    </p>
    <p style="font-size: 1rem; color: rgba(245,240,232,0.7); line-height: 1.7;">
      You're now part of the R3imagine archive of future worlds. We welcome
      innovators, dreamers, and future-builders who believe the world can be
      reimagined from the ground up.
    </p>
    <p style="margin-top: 16px;">
      <a href="https://r3imagine.io" style="color: #5DCAA5; text-decoration: none; font-size: 1rem;">
        → Follow the journey at r3imagine.io
      </a>
    </p>
    <p style="color: rgba(245,240,232,0.4); font-size: 0.85rem; margin-top: 8px;">
      @r3imagine
    </p>
  </div>

  <p style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,240,232,0.2); text-align: center;">
    R3IMAGINE × NEW YORK HALL OF SCIENCE
  </p>

</div>
```

3. Click **Save**
4. Copy the **Template ID**

### Step 4 — Get your Public Key
1. Click your account name (top right) → **Account**
2. Under **API Keys**, copy your **Public Key**

---

## PART 2 — Google Apps Script (logs to spreadsheet + emails you)

### Step 1 — Create a new Google Sheet
1. Go to https://sheets.google.com
2. Create a new spreadsheet, name it **Postcards from the Future**
3. In row 1, add these headers in columns A–E:
   `Timestamp | World Name | World Tagline | Message | Email`

### Step 2 — Open the Script Editor
1. In your spreadsheet, click **Extensions** → **Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.world_name || "",
      data.world_tagline || "",
      data.message || "",
      data.email || "",
    ]);

    // Email notification to you
    MailApp.sendEmail({
      to: "anatola@anatolaaraba.com",
      subject: "New postcard from the future! — " + (data.world_name || "Unknown world"),
      body:
        "A new postcard just arrived!\n\n" +
        "World: " + data.world_name + "\n" +
        "Email: " + data.email + "\n\n" +
        "Message:\n" + data.message + "\n\n" +
        "— R3imagine Future Archive",
    });

    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (the floppy disk icon)

### Step 3 — Deploy as a web app
1. Click **Deploy** → **New deployment**
2. Click the gear icon next to "Select type" → choose **Web app**
3. Set:
   - **Description:** Postcard logger
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Copy the **Web app URL** — it looks like `https://script.google.com/macros/s/LONG_ID/exec`

---

## PART 3 — Connect everything

Create a file called `.env` in the civilizationsim-main folder (same level as package.json) and paste:

```
VITE_EMAILJS_SERVICE_ID=paste_your_service_id
VITE_EMAILJS_TEMPLATE_ID=paste_your_template_id
VITE_EMAILJS_PUBLIC_KEY=paste_your_public_key
VITE_APPS_SCRIPT_URL=paste_your_apps_script_url
```

Then restart the dev server:
```
npm run dev
```

That's it — postcards are live! Every submission now:
1. Emails the student their postcard
2. Emails you a notification
3. Logs a row in your Google Sheet
