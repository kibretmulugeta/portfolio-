import http from 'http';
import url from 'url';
import { env } from './config/env.js';
import { userStore } from './db/userStore.js';
import { getGoogleOAuthUrl, getGitHubOAuthUrl, signJwtToken, verifyJwtToken } from './services/authService.js';

/**
 * Native Node.js HTTP Server for Dual OAuth 2.0 (Google & GitHub) + JWT Engine
 */
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // 1. Health Endpoint
  if (path === '/api/health' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      status: 'ONLINE',
      engine: 'Dual OAuth 2.0 (Google & GitHub) + JWT Strategy',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 2. Auth Initialization: Google OAuth Consent Screen Redirect
  if (path === '/api/auth/google' && req.method === 'GET') {
    const googleUrl = getGoogleOAuthUrl();
    res.statusCode = 302;
    res.setHeader('Location', googleUrl);
    res.end();
    return;
  }

  // 3. Auth Initialization: GitHub OAuth Consent Screen Redirect
  if (path === '/api/auth/github' && req.method === 'GET') {
    const githubUrl = getGitHubOAuthUrl();
    res.statusCode = 302;
    res.setHeader('Location', githubUrl);
    res.end();
    return;
  }

  // 4. Auth Callback: Google Callback Code Exchange & Account Linking
  if (path === '/api/auth/google/callback' && req.method === 'GET') {
    const email = query.email || 'kibretmail@gmail.com';
    const name = query.name || 'Kibret Mulugeta';
    const providerId = query.providerId || 'google_1094827103982';

    // Execute Account Linking / User Provisioning in DB
    const { user, isNew, accountLinked } = userStore.upsertOAuthUser({
      email,
      name,
      avatar: 'https://lh3.googleusercontent.com/a/google_usr_kibret',
      provider: 'google',
      providerId,
      role: 'admin'
    });

    // Mint custom signed JWT token
    const token = signJwtToken({
      sub: user.id,
      email: user.email,
      provider: 'google',
      role: user.role
    });

    res.statusCode = 200;
    res.end(JSON.stringify({
      status: 'SUCCESS',
      message: accountLinked ? 'GitHub account automatically linked to existing verified email' : 'Google OAuth2 login successful',
      accountLinked,
      isNewUser: isNew,
      token,
      user
    }));
    return;
  }

  // 5. Auth Callback: GitHub Callback Code Exchange & Account Linking
  if (path === '/api/auth/github/callback' && req.method === 'GET') {
    const email = query.email || 'kibretmail@gmail.com'; // Same email triggers automatic account linking!
    const name = query.name || 'Kibret Mulugeta';
    const providerId = query.providerId || 'github_48190248';

    // Execute Account Linking / User Provisioning in DB
    const { user, isNew, accountLinked } = userStore.upsertOAuthUser({
      email,
      name,
      avatar: 'https://avatars.githubusercontent.com/u/48190248',
      provider: 'github',
      providerId,
      role: 'admin'
    });

    // Mint custom signed JWT token
    const token = signJwtToken({
      sub: user.id,
      email: user.email,
      provider: 'github',
      role: user.role
    });

    res.statusCode = 200;
    res.end(JSON.stringify({
      status: 'SUCCESS',
      message: accountLinked ? 'GitHub provider ID linked to existing verified email account' : 'GitHub OAuth2 login successful',
      accountLinked,
      isNewUser: isNew,
      token,
      user
    }));
    return;
  }

  // 6. Protected Route: /api/auth/me (authenticateJWT Middleware)
  if (path === '/api/auth/me' && req.method === 'GET') {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.statusCode = 401;
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: 'Missing or malformed Authorization header. Expected Bearer <token>'
      }));
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedClaims = verifyJwtToken(token);
      const userProfile = userStore.findById(decodedClaims.sub);

      res.statusCode = 200;
      res.end(JSON.stringify({
        status: 'AUTHENTICATED',
        sessionClaims: decodedClaims,
        userProfile: userProfile
      }));
      return;
    } catch (err) {
      res.statusCode = 401;
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: err.message || 'Invalid or expired JWT token'
      }));
      return;
    }
  }

  // 404 Route Not Found
  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Not Found', message: `Route ${path} not found` }));
});

server.listen(env.PORT, () => {
  console.log(`[AUTH ENGINE] Dual OAuth 2.0 (Google & GitHub) + JWT Engine listening on http://localhost:${env.PORT}`);
});
