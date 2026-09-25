/**
 * IT HUNT - Enterprise Security & Input Validation Suite
 * Provides comprehensive client-side security protections:
 * 1. Strict Input Sanitization & Anti-XSS Guards
 * 2. Rate Limiting & Brute-Force Authentication Defense
 * 3. Session Inactivity Auto-Logout Monitor
 * 4. Safe External Link / Tabnabbing Protection
 * 5. Phone & Email Security Format Validators
 */

// ============================================================================
// 1. INPUT SANITIZATION & ANTI-XSS GUARDS
// ============================================================================

/**
 * Escapes HTML special characters to prevent Cross-Site Scripting (XSS).
 * @param {string} str 
 * @returns {string} Sanitized string
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips script tags, javascript: protocols, inline event handlers,
 * and dangerous HTML tags from user-provided input strings.
 * @param {string} input 
 * @returns {string} Sanitized plain text
 */
export function sanitizeInput(input) {
  if (input === null || input === undefined) return '';
  let str = String(input).trim();

  // Strip null bytes and control characters (except newline and tab)
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Strip dangerous javascript: pseudo-protocols
  str = str.replace(/javascript\s*:/gi, '');
  str = str.replace(/data\s*:\s*text\/html/gi, '');
  str = str.replace(/vbscript\s*:/gi, '');

  // Strip <script> tags and their contents
  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Strip inline event attributes (e.g. onload=, onerror=, onclick=)
  str = str.replace(/\s*on\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // Strip HTML tags altogether for plain form inputs (names, remarks, feedback)
  str = str.replace(/<\/?[^>]+(>|$)/g, '');

  return str.trim();
}

/**
 * Validates strictly formatted email addresses.
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  // RFC 5322 standard compliant regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates standard 10-digit Indian mobile numbers or standard international format.
 * @param {string} phone 
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
  // Validates Indian 10-digit mobile number or numbers starting with country code 91
  return /^(?:91)?[6-9]\d{9}$/.test(cleanPhone);
}

/**
 * Sanitizes uploaded file names to prevent directory traversal and executable execution.
 * @param {string} filename 
 * @returns {string} Safe filename
 */
export function sanitizeFilename(filename) {
  if (!filename || typeof filename !== 'string') return 'document';
  // Remove directory traversal sequences
  let safe = filename.replace(/(\.\.[\/\\]|[<>:"/\\|?*\x00-\x1F])/g, '');
  // Block dangerous extensions
  const dangerousExts = /\.(exe|sh|bat|cmd|msi|vbs|js|php|phtml|cgi|py|jar)$/i;
  if (dangerousExts.test(safe)) {
    safe = safe.replace(dangerousExts, '.txt');
  }
  return safe.slice(0, 100);
}

// ============================================================================
// 2. BRUTE FORCE PROTECTION & LOGIN RATE LIMITING
// ============================================================================

const RATE_LIMIT_STORAGE_KEY = 'ithunt_sec_rate_limit';
const MAX_ATTEMPTS_BEFORE_LOCKOUT = 5;
const INITIAL_LOCKOUT_SECONDS = 60;

/**
 * Retrieves the current rate limit record from sessionStorage.
 * @returns {{ attempts: number, lockUntil: number }}
 */
function getRateLimitRecord() {
  try {
    if (typeof window === 'undefined') return { attempts: 0, lockUntil: 0 };
    const raw = sessionStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    if (!raw) return { attempts: 0, lockUntil: 0 };
    return JSON.parse(raw);
  } catch {
    return { attempts: 0, lockUntil: 0 };
  }
}

/**
 * Saves rate limit state.
 * @param {{ attempts: number, lockUntil: number }} record 
 */
function saveRateLimitRecord(record) {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(record));
    }
  } catch {}
}

/**
 * Checks if authentication is currently locked out due to repeated failed attempts.
 * @returns {{ isLocked: boolean, remainingSeconds: number }}
 */
export function checkLoginRateLimit() {
  const record = getRateLimitRecord();
  const now = Date.now();
  if (record.lockUntil && record.lockUntil > now) {
    const remainingSeconds = Math.ceil((record.lockUntil - now) / 1000);
    return { isLocked: true, remainingSeconds };
  }
  // Cooldown expired
  if (record.lockUntil && record.lockUntil <= now) {
    saveRateLimitRecord({ attempts: 0, lockUntil: 0 });
  }
  return { isLocked: false, remainingSeconds: 0 };
}

/**
 * Records an authentication attempt. If failed repeatedly, activates lockout.
 * @param {boolean} success 
 * @returns {{ isLocked: boolean, remainingSeconds: number, attemptsLeft: number }}
 */
export function recordLoginAttempt(success) {
  if (success) {
    // Reset rate limiting on successful login
    saveRateLimitRecord({ attempts: 0, lockUntil: 0 });
    return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_ATTEMPTS_BEFORE_LOCKOUT };
  }

  const record = getRateLimitRecord();
  const now = Date.now();

  record.attempts = (record.attempts || 0) + 1;

  if (record.attempts >= MAX_ATTEMPTS_BEFORE_LOCKOUT) {
    // Calculate exponential backoff duration
    const multiplier = Math.min(record.attempts - MAX_ATTEMPTS_BEFORE_LOCKOUT + 1, 5);
    const lockoutMs = INITIAL_LOCKOUT_SECONDS * 1000 * multiplier;
    record.lockUntil = now + lockoutMs;
    saveRateLimitRecord(record);
    return { 
      isLocked: true, 
      remainingSeconds: Math.ceil(lockoutMs / 1000), 
      attemptsLeft: 0 
    };
  }

  saveRateLimitRecord(record);
  return { 
    isLocked: false, 
    remainingSeconds: 0, 
    attemptsLeft: MAX_ATTEMPTS_BEFORE_LOCKOUT - record.attempts 
  };
}

/**
 * Explicitly clears rate limit (e.g., when SuperAdmin resets security).
 */
export function resetLoginRateLimit() {
  try {
    sessionStorage.removeItem(RATE_LIMIT_STORAGE_KEY);
  } catch {}
}

// ============================================================================
// 3. SESSION INACTIVITY AUTO-LOGOUT MONITOR
// ============================================================================

let inactivityTimer = null;
let onTimeoutCallback = null;
const DEFAULT_INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes of complete inactivity

function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  if (typeof onTimeoutCallback === 'function') {
    inactivityTimer = setTimeout(() => {
      onTimeoutCallback();
    }, DEFAULT_INACTIVITY_LIMIT_MS);
  }
}

/**
 * Starts monitoring user activity. Calls callback if inactive for 30 minutes.
 * @param {Function} onTimeout 
 */
export function initSessionInactivityMonitor(onTimeout) {
  if (typeof window === 'undefined') return;
  onTimeoutCallback = onTimeout;

  const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
  events.forEach((evt) => {
    window.addEventListener(evt, resetInactivityTimer, { passive: true });
  });

  resetInactivityTimer();
}

/**
 * Stops session inactivity monitoring.
 */
export function stopSessionInactivityMonitor() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = null;
  onTimeoutCallback = null;
}

// ============================================================================
// 4. SAFE EXTERNAL LINK & TABNABBING GUARD
// ============================================================================

/**
 * Opens an external URL safely preventing window.opener hijacking (tabnabbing).
 * @param {string} url 
 */
export function safeOpenUrl(url) {
  if (!url || typeof window === 'undefined') return;
  // Ensure protocol is safe
  if (!/^https?:\/\//i.test(url) && !url.startsWith('mailto:') && !url.startsWith('tel:') && !url.startsWith('whatsapp:')) {
    console.warn('[Security Guard] Blocked potentially unsafe protocol link:', url);
    return;
  }
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
}
