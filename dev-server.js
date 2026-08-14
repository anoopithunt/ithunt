/**
 * IT HUNT - Zero-Dependency Local Dev Server with Hot .env Reloading
 * Automatically parses .env, serves static files, and live-reloads on changes!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const ENV_FILE = path.join(ROOT_DIR, '.env');

// Parse .env file into key-value object
function parseEnv() {
  const env = {};
  if (fs.existsSync(ENV_FILE)) {
    try {
      const content = fs.readFileSync(ENV_FILE, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.substring(0, eqIdx).trim();
          let val = trimmed.substring(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          env[key] = val;
        }
      }
    } catch (err) {
      console.error('⚠️ Error reading .env file:', err.message);
    }
  }
  return env;
}

let currentEnv = parseEnv();
const PORT = parseInt(currentEnv.PORT, 10) || 5500;
const HOST = currentEnv.HOST || 'localhost';

// SSE Clients for Live Reload
const reloadClients = new Set();

function broadcastReload() {
  currentEnv = parseEnv();
  console.log('🔄 Change detected! Broadcasting live reload to clients...');
  for (const client of reloadClients) {
    try {
      client.write(`data: reload\n\n`);
    } catch (e) {
      reloadClients.delete(client);
    }
  }
}

// Watch directory for changes (.env, .html, .js, .css)
let debounceTimer = null;
fs.watch(ROOT_DIR, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  if (filename.startsWith('.git') || filename.includes('node_modules') || filename.includes('.DS_Store')) return;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    broadcastReload();
  }, 200);
});

// MIME Types Map
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // CORS Headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. Live Reload SSE Endpoint
  if (pathname === '/live-reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('data: connected\n\n');
    reloadClients.add(res);
    req.on('close', () => reloadClients.delete(res));
    return;
  }

  // 2. Dynamic /env.js Endpoint (serves current .env variables directly)
  if (pathname === '/env.js') {
    currentEnv = parseEnv();
    const jsContent = `window.ENV_CONFIG = ${JSON.stringify(currentEnv, null, 2)};\n`;
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(jsContent);
    return;
  }

  // 3. Dynamic /api/config Endpoint (JSON)
  if (pathname === '/api/config') {
    currentEnv = parseEnv();
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache'
    });
    res.end(JSON.stringify(currentEnv));
    return;
  }

  // 4. Static Files Handler
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, pathname);

  // Security Check: prevent directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`<h1>404 Not Found</h1><p>The requested file <code>${pathname}</code> does not exist.</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // If serving HTML, inject live reload script automatically
    if (ext === '.html' && currentEnv.ENABLE_LIVE_RELOAD !== 'false') {
      fs.readFile(filePath, 'utf8', (readErr, htmlContent) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
          return;
        }

        const liveReloadScript = `
<!-- Auto Live Reload from server.js -->
<script>
  (function() {
    if (window.EventSource) {
      const source = new EventSource('/live-reload');
      source.onmessage = function(e) {
        if (e.data === 'reload') {
          console.log('[LiveReload] .env or project changes detected, refreshing...');
          window.location.reload();
        }
      };
    }
  })();
</script>
`;
        const modifiedHtml = htmlContent.replace('</body>', `${liveReloadScript}\n</body>`);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
        res.end(modifiedHtml);
      });
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext.match(/\.(css|js)$/) ? 'no-cache, no-store, must-revalidate' : 'public, max-age=3600'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

let activePort = PORT;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    activePort++;
    console.log(`⚠️ Port ${activePort - 1} is in use. Automatically falling back to http://${HOST}:${activePort}...`);
    setTimeout(() => {
      server.listen(activePort, HOST);
    }, 100);
  } else {
    console.error('❌ Server error:', err.message);
  }
});

server.listen(activePort, HOST, () => {
  console.log('================================================================');
  console.log(`🚀 IT HUNT Local Dev Server Running at: http://${HOST}:${activePort}`);
  console.log(`⚡ Loaded Environment: ${ENV_FILE}`);
  console.log(`🔄 Live Hot-Reloading: ENABLED (Any change in .env or code auto-refreshes!)`);
  console.log('================================================================');
});
