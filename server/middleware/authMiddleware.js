import { verifyJwtToken } from '../services/authService.js';

/**
 * Protected Route Authorization Middleware (authenticateJWT)
 * Extracts Bearer token from Authorization: Bearer <token> header,
 * cryptographically verifies token signature, and attaches req.user.
 */
export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header. Expected Bearer <token>'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedUser = verifyJwtToken(token);
    req.user = decodedUser;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: err.message || 'Invalid or expired authorization claims'
    });
  }
}

/**
 * Role-Based Access Control Middleware (requireRole)
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized', message: 'User context missing' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Role '${req.user.role}' is not authorized to access this resource`
      });
    }

    next();
  };
}
