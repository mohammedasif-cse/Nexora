// Nexora - Local Development Server with Database API & Google Sheet Proxy
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYWrWzQxAAXrnYBABDVC9srR2y8MNByCqxpNyRRsP15p618oQixc10768rGvsWyY18DAcLKVD_dPcz/pub?output=csv';
const DB_FILE = path.join(__dirname, 'db.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

// Ensure db.json exists
function getDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading db.json:', e);
  }
  return {
    profile: {
      name: 'Alex',
      college: '',
      dept: 'Computer Science',
      yr: '1',
      loc: 'Bangalore',
      lv: '1',
      bd: '0',
      skills: 'Python, C++, HTML, CSS',
      certs: '',
      proj: '',
      hack: '',
      intern: '',
      interest: 'Web Development, Open Source'
    },
    saved: {}
  };
}

function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing to db.json:', e);
  }
}

// Helper to fetch live from Google Sheets following redirects
function fetchLiveSheet(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));

    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchLiveSheet(res.headers.location, redirectCount + 1));
      }
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`HTTP status ${res.statusCode}`));
      }
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => resolve(body));
    });

    req.on('error', reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Parse request JSON body helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS & No-Cache headers so the browser always sees fresh code
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = req.url.split('?')[0];

  // API Endpoints for Profile & Saved database
  if (reqPath === '/api/profile') {
    const db = getDb();
    if (req.method === 'POST') {
      try {
        const payload = await parseBody(req);
        db.profile = Object.assign(db.profile || {}, payload);
        saveDb(db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, profile: db.profile }));
        return;
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db.profile || {}));
      return;
    }
  }

  if (reqPath === '/api/saved') {
    const db = getDb();
    if (req.method === 'POST') {
      try {
        const payload = await parseBody(req);
        db.saved = payload;
        saveDb(db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, saved: db.saved }));
        return;
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db.saved || {}));
      return;
    }
  }

  // Live proxy endpoint: fetches live sheet without browser CORS restrictions
  if (reqPath === '/api/live-data') {
    try {
      const csvData = await fetchLiveSheet(CSV_URL);
      res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8' });
      res.end(csvData);
      return;
    } catch (err) {
      console.warn('Live fetch failed, serving local fallback data.csv:', err.message);
      reqPath = '/data.csv';
    }
  }

  if (reqPath === '/') reqPath = '/index.html';

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Nexora running at http://localhost:${PORT}`);
});
