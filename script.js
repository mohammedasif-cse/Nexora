/**
 * OPPORTUNITY HUB - JAVASCRIPT
 * Fetches, parses, filters, and renders college internships and hackathons.
 * Built with plain modern JavaScript (ES6+), zero external dependencies.
 */

// ============================================================================
// 1. CONFIGURATION & STATE
// ============================================================================

// Primary Live Google Sheet CSV URL
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYWrWzQxAAXrnYBABDVC9srR2y8MNByCqxpNyRRsP15p618oQixc10768rGvsWyY18DAcLKVD_dPcz/pub?output=csv';

// Secondary fallback endpoints
const FALLBACK_ENDPOINTS = [
  '/api/live-data',
  './data.csv'
];

// Embedded snapshot of opportunities to guarantee 0ms instant display
// and 100% reliability even if browser CORS or network restrictions occur
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

// Application state
const state = {
  allOpportunities: [],       // Parsed and unexpired items
  filteredOpportunities: [],  // Opportunities matching current search & filters
  filters: {
    search: '',
    type: 'all',              // 'all', 'internship', or 'hackathon'
    eligibility: 'all',       // 'all', '1st year', or '2nd year'
    mode: 'all'               // 'all', 'online', or 'offline'
  }
};

// Month name map for date parsing
const MONTH_NAMES = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11
};

// ============================================================================
// 2. DOM ELEMENT REFERENCES
// ============================================================================
const dom = {
  cardsContainer: document.getElementById('cards-container'),
  loadingState: document.getElementById('loading-state'),
  errorState: document.getElementById('error-state'),
  emptyState: document.getElementById('empty-state'),
  errorMessage: document.getElementById('error-message'),
  retryBtn: document.getElementById('retry-btn'),
  searchInput: document.getElementById('search-input'),
  searchClearBtn: document.getElementById('search-clear-btn'),
  resultsCount: document.getElementById('results-count'),
  resetFiltersBtn: document.getElementById('reset-filters-btn'),
  clearFiltersBtn: document.getElementById('clear-filters-btn'),
  lastUpdatedDate: document.getElementById('last-updated-date')
};

// ============================================================================
// 3. INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateFooterDate();

  // 1. Immediately render bundled data for instant 0ms visual feedback
  loadFromCSVString(EMBEDDED_CSV);

  // 2. Concurrently attempt live sync to get any newer rows from Google Sheets
  syncLiveData();
});

// Set current formatted date in the footer
function updateFooterDate() {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const todayStr = new Date().toLocaleDateString('en-IN', options);
  if (dom.lastUpdatedDate) {
    dom.lastUpdatedDate.textContent = todayStr;
  }
}

// ============================================================================
// 4. DATA PARSING & LIVE SYNC
// ============================================================================

/**
 * Loads and renders opportunities directly from a CSV string.
 */
function loadFromCSVString(csvText) {
  try {
    const rows = parseCSV(csvText);
    if (rows && rows.length > 1) {
      processSheetData(rows);
      applyFilters();
    }
  } catch (err) {
    console.error('Error parsing CSV string:', err);
  }
}

/**
 * Background live sync from Google Sheets or proxy endpoints.
 */
async function syncLiveData() {
  let liveCSV = null;

  // Attempt direct Google Sheet fetch first
  try {
    const response = await fetch(CSV_URL, { cache: 'no-store' });
    if (response.ok) {
      liveCSV = await response.text();
    }
  } catch (err) {
    // Expected when browser CORS or ad-blocker restricts cross-origin Google redirect
    console.log('Direct Google Sheet fetch redirected, trying proxy/fallback endpoints...');
  }

  // Attempt proxy or local endpoint if direct fetch failed
  if (!liveCSV || liveCSV.trim().length === 0) {
    for (const endpoint of FALLBACK_ENDPOINTS) {
      try {
        const response = await fetch(endpoint, { cache: 'no-store' });
        if (response.ok) {
          liveCSV = await response.text();
          break;
        }
      } catch (err) {
        // Fallback endpoint unreachable
      }
    }
  }

  // If live data was retrieved, update the state cleanly
  if (liveCSV && liveCSV.trim().length > 0) {
    loadFromCSVString(liveCSV);
  }
}

/**
 * Robust CSV parser that handles quotes, escaped quotes (""), commas, and newlines.
 * Conforms to standard CSV RFC 4180 rules.
 */
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
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
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

/**
 * Converts raw parsed CSV matrix into structured objects.
 * Skips items missing Title or Link, calculates deadline days left,
 * filters out passed deadlines, and sorts by nearest deadline first.
 */
function processSheetData(rows) {
  const dataRows = rows.slice(1);
  const opportunities = [];

  for (const row of dataRows) {
    if (!row || row.length < 2) continue;

    const title = (row[0] || '').trim();
    const type = (row[1] || '').trim();
    const organizer = (row[2] || '').trim();
    const eligibility = (row[3] || '').trim();
    const mode = (row[4] || '').trim();
    const deadlineRaw = (row[5] || '').trim();
    const link = (row[6] || '').trim();

    // REQUIREMENT: If a row is missing a Title or Link, skip it.
    if (!title || !link) {
      continue;
    }

    // Parse deadline text to determine days remaining
    const deadlineInfo = parseDeadline(deadlineRaw);

    // REQUIREMENT 5: Hide opportunities whose deadline has passed
    if (deadlineInfo.daysLeft !== null && deadlineInfo.daysLeft < 0) {
      continue;
    }

    opportunities.push({
      title,
      type,
      organizer: organizer || 'Organizer not specified',
      eligibility: eligibility || 'Open to all',
      mode: mode || 'Not specified',
      deadlineRaw,
      deadlineText: deadlineInfo.displayDate,
      daysLeft: deadlineInfo.daysLeft,
      isClosingSoon: deadlineInfo.isClosingSoon,
      link
    });
  }

  // REQUIREMENT 5: Sort by nearest deadline first.
  opportunities.sort((a, b) => {
    const aVal = a.daysLeft !== null ? a.daysLeft : 9999;
    const bVal = b.daysLeft !== null ? b.daysLeft : 9999;
    return aVal - bVal;
  });

  state.allOpportunities = opportunities;
}

/**
 * Parses deadline strings into days remaining.
 * Handles:
 * - "22 Nov 2026 (listed)"
 * - "3 Dec 2026"
 * - "28–29 Nov 2026"
 * - "Starts 15 Jan 2027; verify application close"
 * - "Check listing (13 days left when indexed)"
 * - "Open/live – verify deadline on page"
 */
function parseDeadline(rawText) {
  if (!rawText) {
    return {
      daysLeft: null,
      displayDate: 'Check listing',
      isClosingSoon: false
    };
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 1. Look for explicit Date patterns like "29 Nov 2026", "28–29 Nov 2026", "15 Jan 2027"
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

      return {
        daysLeft,
        displayDate: `${day} ${dateMatch[3]} ${year}`,
        // REQUIREMENT 5: Show "Closing soon" in red when 3 days or fewer remain
        isClosingSoon: daysLeft >= 0 && daysLeft <= 3
      };
    }
  }

  // 2. Look for relative patterns like "13 days left when indexed"
  const daysLeftMatch = rawText.match(/(\d+)\s+days?\s+left/i);
  if (daysLeftMatch) {
    const days = parseInt(daysLeftMatch[1], 10);
    return {
      daysLeft: days,
      displayDate: `${days} days left`,
      isClosingSoon: days >= 0 && days <= 3
    };
  }

  // 3. Fallback for open or unparseable dates (e.g. "Open/live", "Check listing")
  return {
    daysLeft: null,
    displayDate: rawText.length > 28 ? rawText.substring(0, 28) + '...' : rawText,
    isClosingSoon: false
  };
}

// ============================================================================
// 5. FILTERING & SEARCH LOGIC
// ============================================================================

/**
 * Filters the list based on search text and selected filter chips.
 */
function applyFilters() {
  const { search, type, eligibility, mode } = state.filters;
  const searchLower = search.trim().toLowerCase();

  state.filteredOpportunities = state.allOpportunities.filter(item => {
    // 1. Search Query Match (Title or Organizer)
    if (searchLower) {
      const matchTitle = item.title.toLowerCase().includes(searchLower);
      const matchOrganizer = item.organizer.toLowerCase().includes(searchLower);
      if (!matchTitle && !matchOrganizer) {
        return false;
      }
    }

    // 2. Type Filter (All / Internship / Hackathon)
    if (type !== 'all') {
      const itemType = item.type.toLowerCase();
      if (type === 'internship' && !itemType.includes('intern')) {
        return false;
      }
      if (type === 'hackathon' && !itemType.includes('hack')) {
        return false;
      }
    }

    // 3. Eligibility Filter (All / 1st year / 2nd year)
    if (eligibility !== 'all') {
      const itemElig = item.eligibility.toLowerCase();
      const isOpenToBoth = itemElig.includes('both') || itemElig.includes('all') || itemElig.includes('not specified') || itemElig.includes('college');
      
      if (eligibility === '1st year') {
        const matches1st = itemElig.includes('1st') || itemElig.includes('first') || isOpenToBoth;
        if (!matches1st) return false;
      } else if (eligibility === '2nd year') {
        const matches2nd = itemElig.includes('2nd') || itemElig.includes('second') || isOpenToBoth;
        if (!matches2nd) return false;
      }
    }

    // 4. Mode Filter (All / Online / Offline)
    if (mode !== 'all') {
      const itemMode = item.mode.toLowerCase();
      const isOnline = itemMode.includes('remote') || itemMode.includes('online') || itemMode.includes('virtual');
      
      if (mode === 'online' && !isOnline) {
        return false;
      }
      if (mode === 'offline' && isOnline) {
        return false;
      }
    }

    return true;
  });

  renderCards();
  updateResultsMeta();
}

/**
 * Updates the results counter text and controls the visibility of reset buttons.
 */
function updateResultsMeta() {
  const total = state.allOpportunities.length;
  const count = state.filteredOpportunities.length;
  const hasActiveFilters = 
    state.filters.search !== '' ||
    state.filters.type !== 'all' ||
    state.filters.eligibility !== 'all' ||
    state.filters.mode !== 'all';

  if (dom.resultsCount) {
    if (count === total) {
      dom.resultsCount.textContent = `Showing all ${total} active opportunities`;
    } else {
      dom.resultsCount.textContent = `Showing ${count} of ${total} opportunities`;
    }
  }

  if (dom.resetFiltersBtn) {
    dom.resetFiltersBtn.hidden = !hasActiveFilters;
  }
}

// ============================================================================
// 6. CARD RENDERING
// ============================================================================

/**
 * Renders the opportunity cards into the DOM grid.
 */
function renderCards() {
  const container = dom.cardsContainer;
  const items = state.filteredOpportunities;

  container.innerHTML = '';

  if (items.length === 0) {
    showState('empty');
    return;
  }

  showState('content');

  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';

    const isHackathon = item.type.toLowerCase().includes('hack');
    const typeBadgeClass = isHackathon ? 'badge-hackathon' : 'badge-internship';
    const typeBadgeLabel = isHackathon ? 'Hackathon' : 'Internship';

    let deadlineBadgeHtml = '';
    let deadlineValueText = item.deadlineText;

    if (item.isClosingSoon) {
      // REQUIREMENT 5: Show "Closing soon" in red when 3 days or fewer remain
      const daysText = item.daysLeft === 0 
        ? 'Closing Today!' 
        : item.daysLeft === 1 
          ? '1 day left' 
          : `${item.daysLeft} days left`;

      deadlineBadgeHtml = `
        <span class="badge badge-closing-soon" title="Deadline in 3 days or fewer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Closing soon: ${daysText}
        </span>
      `;
    } else if (item.daysLeft !== null && item.daysLeft < 900) {
      deadlineBadgeHtml = `
        <span class="badge badge-deadline">
          ${item.daysLeft} days left
        </span>
      `;
    } else {
      deadlineBadgeHtml = `
        <span class="badge badge-deadline">
          Check listing
        </span>
      `;
    }

    const displayMode = item.mode.length > 25 ? item.mode.substring(0, 25) + '...' : item.mode;
    const displayEligibility = item.eligibility.length > 30 ? item.eligibility.substring(0, 30) + '...' : item.eligibility;

    card.innerHTML = `
      <div class="card-header">
        <span class="badge ${typeBadgeClass}">${escapeHTML(typeBadgeLabel)}</span>
        ${deadlineBadgeHtml}
      </div>

      <div class="card-body">
        <h2 class="card-title">${escapeHTML(item.title)}</h2>
        
        <p class="card-organizer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>${escapeHTML(item.organizer)}</span>
        </p>

        <div class="card-meta-list">
          <span class="meta-pill" title="Mode of work / attendance">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            ${escapeHTML(displayMode)}
          </span>

          <span class="meta-pill" title="Target eligibility">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            ${escapeHTML(displayEligibility)}
          </span>
        </div>
      </div>

      <div class="card-footer">
        <div class="deadline-text-wrapper">
          <span class="deadline-label">Deadline:</span>
          <span class="deadline-val ${item.isClosingSoon ? 'urgent' : ''}">${escapeHTML(deadlineValueText)}</span>
        </div>

        <a href="${escapeHTML(item.link)}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="btn btn-primary btn-apply">
          <span>Apply Now</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    `;

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

// ============================================================================
// 7. EVENT LISTENERS
// ============================================================================
function setupEventListeners() {
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      if (dom.searchClearBtn) {
        dom.searchClearBtn.hidden = !e.target.value;
      }
      applyFilters();
    });
  }

  if (dom.searchClearBtn) {
    dom.searchClearBtn.addEventListener('click', () => {
      dom.searchInput.value = '';
      state.filters.search = '';
      dom.searchClearBtn.hidden = true;
      dom.searchInput.focus();
      applyFilters();
    });
  }

  document.querySelectorAll('.filter-chips').forEach(container => {
    container.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;

      const filterType = chip.dataset.filter;
      const filterValue = chip.dataset.value;

      if (!filterType || !filterValue) return;

      container.querySelectorAll('.chip').forEach(btn => btn.classList.remove('active'));
      chip.classList.add('active');

      state.filters[filterType] = filterValue;
      applyFilters();
    });
  });

  if (dom.resetFiltersBtn) {
    dom.resetFiltersBtn.addEventListener('click', resetAllFilters);
  }
  if (dom.clearFiltersBtn) {
    dom.clearFiltersBtn.addEventListener('click', resetAllFilters);
  }

  if (dom.retryBtn) {
    dom.retryBtn.addEventListener('click', syncLiveData);
  }
}

function resetAllFilters() {
  state.filters.search = '';
  state.filters.type = 'all';
  state.filters.eligibility = 'all';
  state.filters.mode = 'all';

  if (dom.searchInput) {
    dom.searchInput.value = '';
  }
  if (dom.searchClearBtn) {
    dom.searchClearBtn.hidden = true;
  }

  document.querySelectorAll('.filter-chips').forEach(group => {
    group.querySelectorAll('.chip').forEach(chip => {
      if (chip.dataset.value === 'all') {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  });

  applyFilters();
}

// ============================================================================
// 8. HELPER FUNCTIONS
// ============================================================================
function showState(view) {
  if (dom.loadingState) dom.loadingState.hidden = view !== 'loading';
  if (dom.errorState) dom.errorState.hidden = view !== 'error';
  if (dom.emptyState) dom.emptyState.hidden = view !== 'empty';
  if (dom.cardsContainer) dom.cardsContainer.hidden = view !== 'content';
}

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
