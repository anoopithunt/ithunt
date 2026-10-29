import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret || Buffer.byteLength(secret) < 32) {
    const error = new Error('JWT_SECRET must be configured with at least 32 bytes of cryptographically random data.');
    error.code = 'JWT_SECRET_CONFIGURATION';
    throw error;
  }
  return secret;
}

/**
 * Generate JWT token for user
 */
export function generateToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Middleware: Verify JWT Authentication
 */
export function verifyToken(req, res, next) {
  let secret;
  try {
    secret = getJwtSecret();
  } catch (error) {
    console.error('[Security] JWT configuration error:', error.message);
    return res.status(503).json({
      success: false,
      message: 'Authentication is temporarily unavailable. Please contact the administrator.'
    });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.'
    });
  }
}

/**
 * Middleware: Require Administrator privileges
 */
export function requireAdmin(req, res, next) {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Administrator privileges required.'
    });
  }
  next();
}

/**
 * Middleware: Optional Authentication (attaches user if valid token exists)
 */
export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, getJwtSecret());
    } catch (_) {}
  }
  next();
}
