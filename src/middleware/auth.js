import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/helpers.js';
import db from '../config/db.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 'Access token missing or invalid', 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return errorResponse(res, 'Invalid or expired access token', 401);
  }

  const user = db.findById('users', decoded.id);
  if (!user) {
    return errorResponse(res, 'User associated with token no longer exists', 401);
  }

  req.user = user;
  next();
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Unauthenticated request', 401);
    }
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Forbidden: Access requires one of the following roles: [${roles.join(', ')}]`,
        403
      );
    }
    next();
  };
}
