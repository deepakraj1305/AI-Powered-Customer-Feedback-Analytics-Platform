# FeedbackFusion AI — Voice of Customer Analyzer

FeedbackFusion AI is a frontend dashboard for analyzing customer feedback,
sentiment, themes, trends, and voice-of-customer insights.

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- React 18 (UMD browser build)
- Tailwind CSS (CDN)
- Recharts 2.12.7
- Lucide Icons
- Google Fonts:
  - Space Grotesk
  - DM Sans
  - JetBrains Mono
  - Playfair Display

### Browser APIs
- `localStorage` — persistent client-side dashboard state
- `FileReader` — local file import

## Important

This repository is based on the supplied source code. It is a **frontend-only
application**.

There is currently:
- No backend server
- No REST/GraphQL API
- No database
- No authentication service
- No external AI API call

The dashboard uses sample/local data in the browser.

## Project Structure

```text
feedbackfusion-ai/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
├── api/
│   └── README.md
└── README.md
```

## How to Run

Because this project uses browser CDN scripts, you can open `index.html`
directly in a browser.

For a local development server:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## GitHub Pages

1. Create a GitHub repository.
2. Upload all files and folders.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

## Suggested Project Title

**FeedbackFusion AI: Intelligent Voice of Customer Analytics Dashboard**
