/**
 * NEXORA - JAVASCRIPT
 * Matching & Recommendation Engine, Hash Router, and Database Sync
 * Vanilla JavaScript (ES6+), Zero external dependencies.
 */

// ============================================================================
// 1. DATA SOURCE & ENDPOINTS
// ============================================================================
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYWrWzQxAAXrnYBABDVC9srR2y8MNByCqxpNyRRsP15p618oQixc10768rGvsWyY18DAcLKVD_dPcz/pub?output=csv';
const FALLBACK_ENDPOINTS = ['/api/live-data', './data.csv'];

// Embedded opportunities snapshot to ensure 0ms load and complete offline reliability
const EMBEDDED_CSV = `Title,Type (Internship/Hackathon),Organizer,Eligibility (1st/2nd year),Mode,Deadline,Link
Full Stack Developer Internship – Cognirex Solutions,Internship,Cognirex Solutions,Not specified,Remote,22 Nov 2026 (listed),https://unstop.com/internships/full-stack-developer-internship-cognirex-solutions-1810078
IT / Computer Science Intern – Tophawks Marketing Solutions,Internship,Tophawks Marketing Solutions,Not specified,Remote,3 Dec 2026,https://unstop.com/internships/it-intern-computer-science-internship-tophawks-marketing-solutions-1819993
Software Engineer Internship – Softius Internet Services,Internship,Softius Internet Services,Not specified,Remote,Check listing (13 days left when indexed),https://unstop.com/internship/software-development-internship
Full Stack Developer Internship – BTOW Pvt. Ltd.,Internship,BTOW Pvt. Ltd.,Not specified,Remote,Check listing (11 days left when indexed),https://unstop.com/internship/software-development-internship
Python Developer Internship – Kisan Udyog,Internship,Kisan Udyog,Not specified,Remote,Check listing (12 days left when indexed),https://unstop.com/internship/software-development-internship
Software Development Internship – ePool Solutions LLP,Internship,ePool Solutions LLP,Not specified,Remote / Part-time,Check listing (8 days left when indexed),https://unstop.com/internship/software-development-internship
MERN Stack Developer Internship – Code-A-Nova,Internship,Code-A-Nova,Not specified,Remote,Check listing (7 days left when indexed),https://unstop.com/internship/software-development-internship
Frontend Application Developer Internship – Accesco Living,Internship,Accesco Living,Not specified,Remote,Check listing (5 days left when indexed),https://unstop.com/internship/software-development-internship
Software Development Internship – ATS Services Pvt Ltd,Internship,ATS Services Pvt Ltd,Not specified,Remote,Check listing (5 days left when indexed),https://unstop.com/internship/software-development-internship
AI Engineering & Open-Source Development Internship – Alphashots.AI,Internship,Alphashots.AI,Not specified,Remote / Part-time,Check listing (17 days left when indexed),https://unstop.com/internship/software-development-internship
Python & Applied AI Internship – boastitup,Internship,boastitup,Not specified,Remote,Check listing (deadline shown as near when indexed),https://unstop.com/internship/software-development-internship
Python Development Internship – IntelleQAcademy,Internship,IntelleQAcademy,Not specified,Remote,Check listing (18 days left when indexed),https://unstop.com/internship/software-development-internship
Python Developer Internship – Vortizo AI,Internship,Vortizo AI,Not specified,Remote,Check listing (8 days left when indexed),https://unstop.com/internship/software-development-internship
Python Internship – Zenotalent,Internship,Zenotalent,Not specified,Remote,Check listing (8 days left when indexed),https://unstop.com/internship/software-development-internship
Software Engineer Internship – Plasma Tech,Internship,Plasma Tech,Not specified,Remote,Check listing (8 days left when indexed),https://unstop.com/internship/software-development-internship
Java Development Internship – IntelleQAcademy,Internship,IntelleQAcademy,Not specified,Remote,Check listing (23 days left when indexed),https://unstop.com/internship/software-development-internship
Software Development Engineer Internship – Confluent Solutions,Internship,Confluent Solutions,Not specified,Remote,Check listing (15 days left when indexed),https://unstop.com/internship/software-development-internship
Web Development Internship – Cornixe Edutech Pvt. Ltd.,Internship,Cornixe Edutech Pvt. Ltd.,Not specified,Remote / Part-time,Check listing (deadline shown as near when indexed),https://unstop.com/internship/software-development-internship
AI Developer Internship – Codeatrix,Internship,Codeatrix,Not specified,Remote / Part-time,Check listing (13 days left when indexed),https://unstop.com/internship/part-time-internship
AI/ML Internship (Remote) – 404Minds Technologies,Internship,404Minds Technologies,Not specified,Remote / Part-time,Check listing (13 days left when indexed),https://unstop.com/internship/part-time-internship
CODEFESTTHON 2026,Hackathon,SuVa Developers,Both,Online,Registration closes 20 Nov 2026 (check if still open),https://codefestthon.devfolio.co/
DevNexus 2.0,Hackathon,GCELT Event Management Group,Both,Offline – Kolkata,28–29 Nov 2026 (application status check),https://devnexus2.devfolio.co/
Code N Mod,Hackathon,Devfolio-listed organizers (see event page),Both,Offline,Starts 23 Nov 2026; check application close,https://devfolio.co/hackathons?time_frame=application_open
Founders' House Kolkata,Hackathon,Founders' House,Both,Online,Open/live – verify deadline on page,https://devfolio.co/hackathons?time_frame=application_open
MakerSpark,Hackathon,MakerSpark organizers,Both,Offline,Starts 9 Dec 2026; verify application close,https://devfolio.co/hackathons?time_frame=application_open
Clash of Commits,Hackathon,Clash of Commits organizers,Both,Offline,Starts 4 Dec 2026; verify application close,https://devfolio.co/hackathons?time_frame=application_open
Health Hackathon 3.0,Hackathon,Health Hackathon organizers,Both,Offline,Starts 28 Jan 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
Hack For Tomorrow 2026,Hackathon,Hack For Tomorrow organizers,Both,Offline,Starts 2 Jan 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
ETHChiangmai & Longevity Hackathon 2026,Hackathon,ETHChiangmai organizers,Both,Offline,Starts 26 Dec 2026; verify eligibility/deadline,https://devfolio.co/hackathons?time_frame=application_open
hackodisha-6.0,Hackathon,HackOdisha organizers,Both,Online,Starts 11 Dec 2026; verify application close,https://devfolio.co/hackathons?time_frame=application_open
haxfinity,Hackathon,haxfinity organizers,Both,Offline,Starts 3 Jan 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
Hack Nexus 2027,Hackathon,Hack Nexus organizers,Both,Offline,Starts 30 Jan 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
Hacksprint 3.0,Hackathon,Hacksprint organizers,Both,Online,Starts 5 Feb 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
Innerve 11.0,Hackathon,Innerve organizers,Both,Offline,Starts 29 Jan 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
HACK WITH GDG S4,Hackathon,GDG organizers,Both,Offline,Starts 22 Jan 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
Techacks 5.0,Hackathon,Techacks organizers,Both,Offline,Starts 15 Jan 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
GOA BUILDATHON 27,Hackathon,Goa Buildathon organizers,Both,Offline,Starts 16 Jan 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
HACK 6.0,Hackathon,HACK 6.0 organizers,Both,Offline,Starts 22 Jan 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
doubleSlash 5.0,Hackathon,doubleSlash organizers,Both,Offline,Starts 27 Feb 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
Diversion 2k27,Hackathon,Diversion organizers,Both,Offline,Starts 6 Mar 2027; verify application close,https://devfolio.co/hackathons?time_frame=application_open
Internshala Student Partner Program 2026,Internship,Internshala,1st year / 2nd year (college students; verify age/criteria),Online,30 Nov 2026,https://internshala.com/competitions/internshala-student-partner-program/`;

// ============================================================================
// 2. STATE & USER PROFILE
// ============================================================================
const $ = s => document.querySelector(s);

// Opportunity Dataset
let D = [];
let CATS = ["All", "Internships", "Hackathons"];
let cat = "All";

// Learning suggestions for missing skills
const SUG = {
  SQL: "learn basic SQL queries with a free beginner tutorial",
  APIs: "build a mini project that calls a public REST API",
  Python: "complete a Python basics refresher project",
  React: "create a single-page React app with state",
  "Full Stack": "connect a simple frontend to a backend database",
  MERN: "practice CRUD operations with MongoDB and Express",
  "AI/ML": "run a starter notebook on Google Colab or Kaggle"
};

// User Profile (P)
let P = {
  name: "Alex",
  college: "National Institute of Technology",
  dept: "Computer Science & Engineering",
  yr: "1",
  loc: "Bangalore",
  lv: "1",
  bd: "0",
  skills: "Python, C++, HTML, CSS, JavaScript",
  certs: "Python Basics (Coursera)",
  proj: "Personal Portfolio, Weather App",
  hack: "College Mini Hackathon 2026",
  intern: "",
  interest: "Web Development, AI/ML, Open Source"
};

// Saved Opportunities & Status map (S): { [id]: "Saved" | "Applied" | "Shortlisted" | "Selected" }
let S = {};

// Load saved profile & status from localStorage immediately
try {
  const localP = localStorage.getItem("nxP");
  if (localP) P = Object.assign(P, JSON.parse(localP));
  const localS = localStorage.getItem("nxS");
  if (localS) S = JSON.parse(localS);
} catch (e) {
  console.warn("Could not read local storage:", e);
}

// Persist profile & saved map to both database (/api) and localStorage
let saveTimeout = null;
const store = () => {
  try {
    localStorage.setItem("nxP", JSON.stringify(P));
    localStorage.setItem("nxS", JSON.stringify(S));
  } catch (e) {}

  // Sync to backend database (/api/profile & /api/saved)
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(P)
      });
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(S)
      });
      showSaveToast();
    } catch (e) {
      // Backend api offline / static host; localStorage has already saved it
    }
  }, 400);
};

function showSaveToast() {
  const toast = document.getElementById('profile-toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }
}

// Fetch database records from backend server if running
async function initDbSync() {
  try {
    const resP = await fetch('/api/profile');
    if (resP.ok) {
      const dbP = await resP.json();
      if (dbP && dbP.name) {
        P = Object.assign(P, dbP);
        localStorage.setItem("nxP", JSON.stringify(P));
      }
    }
    const resS = await fetch('/api/saved');
    if (resS.ok) {
      const dbS = await resS.json();
      if (dbS && typeof dbS === 'object') {
        S = Object.assign(S, dbS);
        localStorage.setItem("nxS", JSON.stringify(S));
      }
    }
  } catch (e) {
    // Normal when running statically without Node backend
  }
}

// User skills as clean string array
const skills = () => P.skills.split(",").map(s => s.trim()).filter(Boolean);

// Profile completion percentage
function pct() {
  const f = [P.name, P.college, P.dept, P.loc, P.skills, P.certs, P.proj, P.interest];
  return Math.round(f.filter(x => x && x.trim()).length / f.length * 100);
}

// ============================================================================
// 3. RECOMMENDATION & SCORING ENGINE
// ============================================================================
function score(d) {
  const miss = [];
  const userSkills = skills().map(s => s.toLowerCase());
  let ok = true;

  // Budget eligibility
  if (d.fee > +P.bd) {
    ok = false;
  }

  // Academic year eligibility
  if (+P.yr < d.yr) {
    ok = false;
  }

  // Level fit
  if (d.lv > +P.lv) {
    miss.push("needs " + ["", "beginner", "intermediate", "advanced"][d.lv] + "-level programming");
  }

  // Skill requirement fit
  d.req.forEach(r => {
    if (!userSkills.includes(r.toLowerCase())) {
      miss.push("add " + r + ": " + (SUG[r] || `learn fundamental ${r}`));
    }
  });

  // Calculate recommendation score
  let s = 100 - miss.length * 20 - (d.fee / 40) - (d.km / 5) + (d.on ? 4 : 0);

  // Match badge assignment:
  // Excellent Match (Cyan), Good Match (Blue), Beginner Friendly (Lavender), Skill Development (White)
  let b = !miss.length && d.fee === 0 && d.lv <= +P.lv
    ? ["Excellent Match", "ex"]
    : !miss.length
      ? ["Good Match", ""]
      : d.lv === 1
        ? ["Beginner Friendly", "bf"]
        : ["Skill Development Opportunity", "sd"];

  return { miss, ok, s, b };
}

// Opportunity Card Generator
function card(d, r, extra = "") {
  const sv = S[d.id];
  const isClosingSoon = d.daysLeft !== null && d.daysLeft <= 3 && d.daysLeft >= 0;

  return `
    <article class="card">
      <div class="top">
        <span class="badge ${r.b[1]}">${r.b[0]}</span>
        <div class="card-actions">
          ${isClosingSoon ? `<span class="badge urgent">Closing soon</span>` : ''}
          <button class="save ${sv ? "s" : ""}" data-id="${d.id}" aria-pressed="${!!sv}" title="Save to My Applications">
            ${sv ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <h4>${escapeHTML(d.t)}</h4>
      
      <div class="m">
        ${escapeHTML(d.o)} · ${escapeHTML(d.c)} · ${d.on ? "Online / Remote" : `Offline (${d.km} km)`} · ${d.fee ? "₹" + d.fee : "Free"}
      </div>

      <div class="m" style="margin-top: 4px">
        Deadline: ${escapeHTML(d.dl)} ${d.daysLeft !== null && d.daysLeft < 900 ? `· <b>${d.daysLeft === 0 ? "Today!" : `${d.daysLeft}d left`}</b>` : ""} 
        · Year ${d.yr}+ · ${d.lv === 1 ? "Beginner" : "Intermediate"}
        ${d.sk.length ? ` · Skills: ${escapeHTML(d.sk.join(", "))}` : ""}
      </div>

      <p class="why"><b>Why:</b> Recommended because ${escapeHTML(d.why)}.</p>

      ${r.miss.length 
        ? `<p class="gap"><b>To improve your fit:</b> ${escapeHTML(r.miss.join("; "))}.</p>` 
        : `<p class="gap">You meet every listed requirement.</p>`
      }

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; gap: 8px;">
        <a href="${escapeHTML(d.link)}" target="_blank" rel="noopener noreferrer" class="btn apply-btn">
          <span>Apply Now</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>

      ${extra}
    </article>
  `;
}

// ============================================================================
// 4. DATA PROCESSING & CSV PARSER
// ============================================================================

const MONTH_NAMES = {
  jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2,
  apr: 3, april: 3, may: 4, jun: 5, june: 5, jul: 6, july: 6,
  aug: 7, august: 7, sep: 8, sept: 8, september: 8, oct: 9, october: 9,
  nov: 10, november: 10, dec: 11, december: 11
};

function parseDeadline(rawText) {
  if (!rawText) return { daysLeft: null, displayDate: 'Check listing' };

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const dateMatch = rawText.match(/(?:(\d{1,2})[\s–-]+)?(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/);
  if (dateMatch) {
    const day = parseInt(dateMatch[2], 10);
    const monthStr = dateMatch[3].toLowerCase();
    const year = parseInt(dateMatch[4], 10);

    if (MONTH_NAMES[monthStr] !== undefined) {
      const monthIdx = MONTH_NAMES[monthStr];
      const targetDate = new Date(year, monthIdx, day, 23, 59, 59);
      const diffMs = targetDate - todayStart;
      const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return { daysLeft, displayDate: `${day} ${dateMatch[3]} ${year}` };
    }
  }

  const daysLeftMatch = rawText.match(/(\d+)\s+days?\s+left/i);
  if (daysLeftMatch) {
    const days = parseInt(daysLeftMatch[1], 10);
    return { daysLeft: days, displayDate: `${days} days left` };
  }

  return { daysLeft: null, displayDate: rawText.length > 28 ? rawText.substring(0, 28) + '...' : rawText };
}

function parseCSV(text) {
  const lines = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(cell.trim());
      if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
        lines.push(row);
      }
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    lines.push(row);
  }

  return lines;
}

// Convert CSV into Opportunity Objects with recommendation metadata
function processOpportunities(rows) {
  const dataRows = rows.slice(1);
  const items = [];

  dataRows.forEach((row, idx) => {
    if (!row || row.length < 2) return;

    const title = (row[0] || '').trim();
    const type = (row[1] || '').trim();
    const organizer = (row[2] || '').trim();
    const eligibility = (row[3] || '').trim();
    const mode = (row[4] || '').trim();
    const deadlineRaw = (row[5] || '').trim();
    const link = (row[6] || '').trim();

    if (!title || !link) return;

    const deadlineInfo = parseDeadline(deadlineRaw);

    // Filter out expired opportunities
    if (deadlineInfo.daysLeft !== null && deadlineInfo.daysLeft < 0) {
      return;
    }

    const isOnline = mode.toLowerCase().includes('remote') || mode.toLowerCase().includes('online');
    const isHackathon = type.toLowerCase().includes('hack');
    const category = isHackathon ? 'Hackathons' : 'Internships';

    // Skill extraction from Title
    const titleLower = title.toLowerCase();
    const sk = [];
    const req = [];

    if (titleLower.includes('python')) { sk.push('Python'); }
    if (titleLower.includes('full stack')) { sk.push('Full Stack'); sk.push('JavaScript'); req.push('Full Stack'); }
    if (titleLower.includes('mern')) { sk.push('MERN'); sk.push('React'); req.push('MERN'); }
    if (titleLower.includes('frontend')) { sk.push('Frontend'); sk.push('CSS'); }
    if (titleLower.includes('ai') || titleLower.includes('ml')) { sk.push('AI/ML'); req.push('AI/ML'); }
    if (titleLower.includes('java')) { sk.push('Java'); req.push('Java'); }
    if (titleLower.includes('web')) { sk.push('Web Development'); }
    if (sk.length === 0) { sk.push('Programming'); }

    // Academic Year requirement: Year 1 vs Year 2
    const eligLower = eligibility.toLowerCase();
    let yr = 1;
    if (eligLower.includes('2nd year only') || eligLower.includes('2nd year (only)')) {
      yr = 2;
    }

    // Level
    const lv = (req.length > 0 || titleLower.includes('engineer') || titleLower.includes('full stack')) ? 2 : 1;

    // Personalized 'why' reason
    let why = '';
    if (isHackathon) {
      why = isOnline 
        ? "it is an open online hackathon welcoming both first and second years" 
        : `it is an active in-person hackathon hosted by ${organizer}`;
    } else {
      why = isOnline 
        ? `it is a remote internship opportunity in ${sk[0] || 'software development'}`
        : `it offers hands-on practical experience at ${organizer}`;
    }

    items.push({
      id: idx + 1,
      t: title,
      c: category,
      o: organizer || 'Verified Organizer',
      link: link,
      fee: 0,
      yr: yr,
      lv: lv,
      on: isOnline,
      km: isOnline ? 0 : 15,
      sk: sk,
      req: req,
      dl: deadlineInfo.displayDate,
      daysLeft: deadlineInfo.daysLeft,
      why: why
    });
  });

  D = items;
  CATS = ["All", ...new Set(D.map(d => d.c))];

  // Update hero stats
  const heroCount = document.getElementById('hero-count');
  if (heroCount) {
    heroCount.textContent = `${D.length}+`;
  }
}

// Fetch live sheet data with fallbacks
async function loadOpportunitiesData() {
  let csvText = null;

  // 1. Live Google Sheets fetch
  try {
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    if (res.ok) csvText = await res.text();
  } catch (e) {}

  // 2. Server proxy / local fallback
  if (!csvText || csvText.trim().length === 0) {
    for (const ep of FALLBACK_ENDPOINTS) {
      try {
        const res = await fetch(ep, { cache: 'no-store' });
        if (res.ok) {
          csvText = await res.text();
          break;
        }
      } catch (e) {}
    }
  }

  // 3. Embedded fallback snapshot
  if (!csvText || csvText.trim().length === 0) {
    csvText = EMBEDDED_CSV;
  }

  try {
    const rows = parseCSV(csvText);
    if (rows && rows.length > 1) {
      processOpportunities(rows);
    }
  } catch (err) {
    console.error("Error loading opportunities:", err);
  }
}

// ============================================================================
// 5. VIEW CONTROLLERS (EXPLORE, DASHBOARD, PROFILE, SAVED)
// ============================================================================

// --- PAGE: EXPLORE ---
function explore() {
  const catsContainer = $("#cats");
  if (catsContainer) {
    catsContainer.innerHTML = CATS.map(c => 
      `<button class="chip" aria-pressed="${c === cat}" data-cat="${c}">${c}</button>`
    ).join("");
  }

  const q = ($("#q")?.value || "").toLowerCase();
  const fee = +($("#fee")?.value || 99999);
  const dist = +($("#dist")?.value || 9999);
  const md = $("#mode")?.value || "";

  const out = D.map(d => ({ d, r: score(d) }))
    .filter(({ d, r }) => 
      r.ok && 
      (cat === "All" || d.c === cat) && 
      d.fee <= fee && 
      (d.on || d.km <= dist) && 
      (md === "" || (md === "on") === d.on) && 
      (d.t + d.o + d.sk.join("")).toLowerCase().includes(q)
    )
    .sort((a, b) => b.r.s - a.r.s);

  const resContainer = $("#res");
  if (resContainer) {
    resContainer.innerHTML = out.length
      ? out.map(({ d, r }) => card(d, r)).join("")
      : `<div class="card" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
           <h4>No matching opportunities found</h4>
           <p class="m" style="margin-top: 6px;">Try adjusting your search query, selecting "All", or expanding your filters in My Profile.</p>
         </div>`;
  }
}

// --- PAGE: DASHBOARD ---
function dash() {
  const welEl = $("#wel");
  if (welEl) {
    welEl.innerHTML = `Welcome back, <em>${escapeHTML(P.name || "student")}.</em>`;
  }

  const ranked = D.map(d => ({ d, r: score(d) })).filter(x => x.r.ok).sort((a, b) => b.r.s - a.r.s);
  const sv = D.filter(d => S[d.id]);
  const up = [...D].sort((a, b) => (a.daysLeft ?? 999) - (b.daysLeft ?? 999)).slice(0, 4);

  const dgrid = $("#dgrid");
  if (dgrid) {
    dgrid.innerHTML = `
      <!-- 1. Profile Completion Ring Gauge -->
      <div class="panel" style="display:flex;gap:20px;align-items:center">
        <div class="ring" style="--p:${pct()}">
          <b>${pct()}%</b>
        </div>
        <div>
          <h3 style="margin:0 0 4px;font-size:18px;">Profile completion</h3>
          <p class="m" style="margin:0 0 10px">Add certifications and projects for sharper matches.</p>
          <a class="btn" href="#profile" style="font-size:13px;padding:8px 18px;">Update profile</a>
        </div>
      </div>

      <!-- 2. Upcoming Deadlines -->
      <div class="panel">
        <h3 style="margin:0 0 8px;font-size:18px;">Upcoming deadlines</h3>
        ${up.map(d => `
          <div class="li">
            <span style="font-weight:500">${escapeHTML(d.t)}</span>
            <span class="m" style="color:var(--cyan);font-weight:600">
              ${d.daysLeft !== null && d.daysLeft < 900 ? `${d.daysLeft} days` : d.dl}
            </span>
          </div>
        `).join("")}
      </div>

      <!-- 3. Recommended For You -->
      <div class="panel">
        <h3 style="margin:0 0 8px;font-size:18px;">Recommended for you</h3>
        ${ranked.slice(0, 4).map(({ d, r }) => `
          <div class="li">
            <span style="font-weight:500">${escapeHTML(d.t)}</span>
            <span class="badge ${r.b[1]}" style="margin:0">${r.b[0]}</span>
          </div>
        `).join("")}
      </div>

      <!-- 4. Skills and Certifications -->
      <div class="panel">
        <h3 style="margin:0 0 8px;font-size:18px;">Skills and certifications</h3>
        <div class="chips" style="margin-bottom:8px">
          ${skills().map(s => `<span class="chip">${escapeHTML(s)}</span>`).join("") || '<span class="m">Add skills in My Profile.</span>'}
        </div>
        <p class="m">${escapeHTML(P.certs || "No certifications added yet.")}</p>
      </div>

      <!-- 5. Application Tracking -->
      <div class="panel">
        <h3 style="margin:0 0 8px;font-size:18px;">Application tracking</h3>
        ${sv.length ? sv.map(d => `
          <div class="li">
            <span style="font-weight:500">${escapeHTML(d.t)}</span>
            <span class="badge sd" style="margin:0">${escapeHTML(S[d.id])}</span>
          </div>
        `).join("") : '<p class="m">Nothing saved yet. <a href="#explore" style="color:var(--cyan)">Explore opportunities</a></p>'}
      </div>

      <!-- 6. Participation History -->
      <div class="panel">
        <h3 style="margin:0 0 8px;font-size:18px;">Participation history</h3>
        <p class="m">${escapeHTML(P.hack || "No hackathons added yet. Your first one will appear here.")}</p>
        <p class="m" style="margin-top:6px">${escapeHTML(P.intern || "")}</p>
      </div>
    `;
  }
}

// --- PAGE: PROFILE ---
const FIELDS = [
  ["name", "Full name"],
  ["college", "College name"],
  ["dept", "Degree and department"],
  ["loc", "Location"],
  ["skills", "Skills and languages (comma separated)"],
  ["certs", "Certifications"],
  ["proj", "Projects completed"],
  ["hack", "Hackathons participated in"],
  ["intern", "Previous internships"],
  ["interest", "Areas of interest"]
];

function profile() {
  const pf = $("#pf");
  if (pf) {
    pf.innerHTML = FIELDS.map(([k, l]) => `
      <div>
        <label for="p_${k}">${l}</label>
        <input id="p_${k}" data-k="${k}" value="${escapeHTML(P[k] || "")}">
      </div>
    `).join("") + `
      <div>
        <label for="p_yr">Academic year</label>
        <select id="p_yr" data-k="yr">
          ${[1, 2, 3, 4].map(n => `<option value="${n}" ${P.yr == n ? "selected" : ""}>Year ${n}</option>`).join("")}
        </select>
      </div>
      <div>
        <label for="p_lv">Programming level</label>
        <select id="p_lv" data-k="lv">
          ${["Beginner", "Intermediate", "Advanced"].map((n, i) => `<option value="${i + 1}" ${P.lv == i + 1 ? "selected" : ""}>${n}</option>`).join("")}
        </select>
      </div>
      <div>
        <label for="p_bd">Available budget</label>
        <select id="p_bd" data-k="bd">
          <option value="0" ${P.bd == 0 ? "selected" : ""}>Free only</option>
          <option value="500" ${P.bd == 500 ? "selected" : ""}>Up to ₹500</option>
          <option value="1000" ${P.bd == 1000 ? "selected" : ""}>Up to ₹1,000</option>
        </select>
      </div>
    `;
  }
}

// --- PAGE: SAVED ---
function saved() {
  const l = D.filter(d => S[d.id]);
  const svContainer = $("#sv");
  if (svContainer) {
    svContainer.innerHTML = l.length
      ? l.map(d => card(d, score(d), `
          <div style="margin-top: 14px; border-top: 1px solid var(--line); padding-top: 10px;">
            <label for="s${d.id}" style="margin: 0 0 6px;">Application status</label>
            <select id="s${d.id}" data-st="${d.id}">
              ${["Saved", "Applied", "Shortlisted", "Selected"].map(s => 
                `<option ${S[d.id] == s ? "selected" : ""}>${s}</option>`
              ).join("")}
            </select>
          </div>
        `)).join("")
      : `<div class="card" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
           <h4>Nothing saved yet</h4>
           <p class="m" style="margin-top: 6px;">
             When you find an interesting internship or hackathon, click <b>Save</b> to track your application here.
           </p>
           <a href="#explore" class="btn" style="margin-top: 16px; font-size: 13px;">Find opportunities</a>
         </div>`;
  }
}

// ============================================================================
// 6. ROUTER & EVENT HANDLERS
// ============================================================================
const ROUTES = {
  home() {
    const heroCount = document.getElementById('hero-count');
    if (heroCount && D.length > 0) {
      heroCount.textContent = `${D.length}+`;
    }
  },
  explore,
  dashboard: dash,
  profile,
  saved
};

function route() {
  const hash = location.hash.slice(1);
  const p = ROUTES[hash] ? hash : "home";

  // Toggle .on class on pages
  document.querySelectorAll(".pg").forEach(s => s.classList.toggle("on", s.id === p));

  // Toggle .on class on desktop nav and mobile bottom tab bar
  document.querySelectorAll("nav a[href^='#'], .tabs a").forEach(a => 
    a.classList.toggle("on", a.getAttribute("href") === "#" + p)
  );

  ROUTES[p]();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);

document.addEventListener("click", e => {
  const t = e.target.closest("button, a");
  if (!t) return;

  // Category chip filter
  if (t.dataset.cat) {
    cat = t.dataset.cat;
    explore();
  }

  // Save / Unsave button
  if (t.classList.contains("save")) {
    const id = t.dataset.id;
    if (S[id]) {
      delete S[id];
    } else {
      S[id] = "Saved";
    }
    store();
    const currentHash = location.hash.slice(1);
    if (currentHash === "saved") {
      saved();
    } else {
      explore();
    }
  }
});

document.addEventListener("input", e => {
  const k = e.target.dataset.k;
  if (k) {
    P[k] = e.target.value;
    store();
  }
  if (["q"].includes(e.target.id)) {
    explore();
  }
});

document.addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.k) {
    P[t.dataset.k] = t.value;
    store();
  }
  if (t.dataset.st) {
    S[t.dataset.st] = t.value;
    store();
  }
  if (["fee", "dist", "mode"].includes(t.id)) {
    explore();
  }
});

// HTML escaping utility
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================================================
// 7. INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", async () => {
  // Sync database with backend if available
  await initDbSync();

  // Load and parse live opportunities
  await loadOpportunitiesData();

  // Route to current or default page
  route();
});
