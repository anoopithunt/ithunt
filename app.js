import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
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
  '.ttf': 'font/ttf',
  '.vue': 'application/javascript; charset=UTF-8'
};

function getEnvConfig() {
  const env = {
    PORT: process.env.PORT || "5500",
    HOST: process.env.HOST || "localhost",
    NODE_ENV: process.env.NODE_ENV || "production",
    APP_NAME: process.env.APP_NAME || "IT HUNT",
    APP_NAME_HIGHLIGHT: process.env.APP_NAME_HIGHLIGHT || "HUNT",
    APP_TAGLINE: process.env.APP_TAGLINE || "Software Solutions & Tech Academy",
    APP_TITLE: process.env.APP_TITLE || "IT HUNT | Software Solutions & Tech Academy",
    APP_ESTABLISHED_YEAR: process.env.APP_ESTABLISHED_YEAR || "2012",
    APP_LOGO_IMAGE: process.env.APP_LOGO_IMAGE || "/img/logo_ithunt.png",
    CONTACT_PHONE: process.env.CONTACT_PHONE || "+91 9795771806",
    CONTACT_RAW_PHONE: process.env.CONTACT_RAW_PHONE || "+919795771806",
    CONTACT_EMAIL: process.env.CONTACT_EMAIL || "softtechithunt@gmail.com",
    CONTACT_LOCATION: process.env.CONTACT_LOCATION || "📍 Dahiyawa Holagarh(Near Mela Ground in Front of Kali Maa Mandir), Prayagraj (Allahabad), UP",
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || "919795771806",
    DIRECTOR_NAME: process.env.DIRECTOR_NAME || "Mr. Lakshman Singh Chauhan",
    DIRECTOR_TITLE: process.env.DIRECTOR_TITLE || "Director & Founder, IT HUNT | MCA (Computer Science)",
    DIRECTOR_IMAGE: process.env.DIRECTOR_IMAGE || "/img/ithunt.jpg",
    API_BASE_URL: process.env.API_BASE_URL || "http://localhost:5500/api",
    ADMISSION_API_ENDPOINT: process.env.ADMISSION_API_ENDPOINT || "http://localhost:5500/api/admission",
    JOB_APPLICATION_API_ENDPOINT: process.env.JOB_APPLICATION_API_ENDPOINT || "http://localhost:5500/api/careers/apply",
    REVIEWS_API_ENDPOINT: process.env.REVIEWS_API_ENDPOINT || "http://localhost:5500/api/reviews",
    DEFAULT_THEME: process.env.DEFAULT_THEME || "dark",
    ENABLE_LIVE_RELOAD: process.env.ENABLE_LIVE_RELOAD || "false",
    ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS || "false",
    ENABLE_ADMISSION_PORTAL: process.env.ENABLE_ADMISSION_PORTAL || "true",
    ENABLE_CAREERS_PORTAL: process.env.ENABLE_CAREERS_PORTAL || "true"
  };

  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
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
    } catch (e) {}
  }

  return env;
}

export function requestHandler(req, res) {
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

  // Dynamic /env.js
  if (pathname === '/env.js') {
    const config = getEnvConfig();
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(`window.ENV_CONFIG = ${JSON.stringify(config, null, 2)};\n`);
    return;
  }

  // Dynamic /api/config
  if (pathname === '/api/config') {
    const config = getEnvConfig();
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(JSON.stringify(config));
    return;
  }

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const relPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const distDir = path.join(__dirname, 'dist');
  const searchDirs = fs.existsSync(distDir)
    ? [distDir, path.join(__dirname, 'public'), __dirname]
    : [__dirname, path.join(__dirname, 'public')];

  let foundFilePath = null;
  for (const dir of searchDirs) {
    if (!dir || !fs.existsSync(dir)) continue;
    const candidate = path.resolve(dir, relPath);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      foundFilePath = candidate;
      break;
    }
  }

  if (foundFilePath) {
    const ext = path.extname(foundFilePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext.match(/\.(css|js|mjs)$/) ? 'no-cache, no-store, must-revalidate' : 'public, max-age=86400'
    });
    fs.createReadStream(foundFilePath).pipe(res);
    return;
  }

  // SPA fallback only for HTML / document navigation, NOT for JS/CSS assets
  const ext = path.extname(pathname).toLowerCase();
  if (!ext || ext === '.html') {
    for (const dir of searchDirs) {
      if (!dir || !fs.existsSync(dir)) continue;
      const indexCandidate = path.resolve(dir, 'index.html');
      if (fs.existsSync(indexCandidate) && fs.statSync(indexCandidate).isFile()) {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
        fs.createReadStream(indexCandidate).pipe(res);
        return;
      }
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
  res.end(`404 Not Found: ${pathname}`);
}

const server = http.createServer(requestHandler);

export default requestHandler;
export { server };

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectRun) {
  const config = getEnvConfig();
  const PORT = parseInt(config.PORT, 10) || 5500;
  const HOST = config.HOST || 'localhost';
  server.listen(PORT, HOST, () => {
    console.log(`🚀 IT HUNT Server running at http://${HOST}:${PORT}`);
  });
}
