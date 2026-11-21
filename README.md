# Opportunity Hub 🎓🚀

A simple, fast, mobile-friendly web portal listing curated internships and hackathons for 1st and 2nd year college students across India.

Built with **vanilla HTML, CSS, and JavaScript only** — no complex frameworks, no backend server, no user login, and 100% free hosting.

---

## 🌟 Key Features

- **Live Google Sheets Integration**: Directly fetches up-to-date opportunities from a published Google Sheet CSV.
- **Smart Deadline Sorting & Expiration**: Automatically calculates the days remaining, sorts by nearest deadline first, and hides expired listings.
- **Urgency Alerts**: Highlights listings closing in 3 days or fewer with a prominent red **"Closing soon"** badge.
- **Instant Search**: Real-time filtering by role, title, company, or organizer as you type.
- **Filter Chips**: Easy single-tap filters for **Type** (Internship / Hackathon), **Eligibility** (1st year / 2nd year), and **Mode** (Online / Offline).
- **Mobile-First Responsive Layout**:
  - 1 column on mobile phones
  - 2 columns on tablets
  - 3 columns on desktops
- **Modern Design**: Clean white background, indigo accent theme, rounded cards, and soft subtle shadows.
- **Community Submission**: Integrated button to submit new opportunities directly via Google Forms.

---

## 📁 Project Structure

```text
├── index.html        # Main semantic markup and UI skeleton
├── style.css         # Modern, mobile-first styling with CSS variables
├── script.js         # CSV fetcher, parser, filters, and dynamic DOM renderer
└── README.md         # Documentation & deployment guide
```

---

## 💻 How to Run Locally

Because Opportunity Hub is built with pure static files, you can run it locally with zero build steps or package installations.

### Option 1: Direct File Open (Easiest)
Simply double-click `index.html` or drag and drop it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Python (Recommended)
If you have Python installed, open your terminal / command prompt in this folder and run:

```bash
# Python 3
python -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3: Using Node.js (npx serve)
If you have Node.js installed, run:

```bash
npx serve .
```

### Option 4: VS Code "Live Server"
If you use Visual Studio Code, install the **Live Server** extension, right-click `index.html`, and choose **"Open with Live Server"**.

---

## 🔄 How to Change the Google Sheet CSV Link

To connect your own Google Sheet or update the data source:

1. Create a Google Sheet with the following column headers in Row 1:
   ```text
   Title, Type, Organizer, Eligibility, Mode, Deadline, Link
   ```
2. In Google Sheets, go to **File > Share > Publish to web**.
3. Under the **Link** tab:
   - Select the sheet tab you want to publish (or Entire Document).
   - Change the format dropdown from "Web page" to **Comma-separated values (.csv)**.
   - Click **Publish** and copy the generated URL.
4. Open [script.js](file:///c:/Users/ADMIN/OneDrive/Desktop/Nexora/script.js#L11) and update the `CSV_URL` constant near the top:
   ```javascript
   // Replace this URL with your published Google Sheet CSV link
   const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv';
   ```
5. Save the file and refresh your browser.

---

## 🚀 How to Deploy Free (Vercel & Netlify)

Opportunity Hub is a static website and can be hosted for **free** with global CDN distribution and automatic SSL on Vercel or Netlify.

### Deploying to Netlify (Drag & Drop in 30 Seconds)

1. Sign up for a free account at [netlify.com](https://www.netlify.com).
2. Go to the **Sites** tab and locate the **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"** section.
3. Drag the entire project folder containing `index.html`, `style.css`, and `script.js` directly into the browser box.
4. Netlify will deploy your site instantly and provide you with a live `https://<your-site-name>.netlify.app` URL.
5. (Optional) In Site Settings, you can customize the domain name for free.

### Deploying to Vercel (Via GitHub or CLI)

#### Method A: Via Vercel Web Dashboard (Recommended)
1. Push this project folder to a repository on [GitHub](https://github.com).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **"Add New Project"** and import your GitHub repository.
4. Under "Framework Preset", leave it as **"Other"**.
5. Click **"Deploy"**. Your site will be live within seconds on a `.vercel.app` URL.

#### Method B: Via Vercel CLI
1. In your terminal, run:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Follow the interactive prompts (select defaults for static site).
3. Run `vercel --prod` to deploy to production.

---

## 📄 License & Attribution

- Built for Indian college students seeking 1st & 2nd year internships and hackathons.
- Form submissions link to the designated Google Form: [Submit an Opportunity](https://forms.gle/xDg2VaokH87qJ9sW9).
- Disclaimer: Always verify official dates, rules, and eligibility directly on the official host page before applying.
