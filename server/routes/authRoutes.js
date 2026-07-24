import { Router } from 'express';
import { getGoogleOAuthUrl, getGitHubOAuthUrl, signJwtToken } from '../services/authService.js';
import { userStore } from '../db/userStore.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = Router();

/**
 * A. Auth Initialization Endpoints
 */
router.get('/google', (req, res) => {
  const googleAuthUrl = getGoogleOAuthUrl();
  res.redirect(googleAuthUrl);
});

router.get('/github', (req, res) => {
  const githubAuthUrl = getGitHubOAuthUrl();
  res.redirect(githubAuthUrl);
});

/**
 * B. Google Auth Callback Endpoint
 */
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  // Simulated provider profile normalization for demonstration & testing
  const simulatedGoogleProfile = {
    email: req.query.email || 'kibretmail@gmail.com',
    name: req.query.name || 'Kibret Mulugeta',
    avatar: 'https://lh3.googleusercontent.com/a/usr_google_1094',
    provider: 'google',
    providerId: req.query.providerId || 'google_1094827103982'
  };

  // Execute Account Linking / User Creation in DB
  const { user, isNew, accountLinked } = userStore.upsertOAuthUser(simulatedGoogleProfile);

  // Mint system JWT token
  const token = signJwtToken({
    sub: user.id,
    email: user.email,
    provider: 'google',
    role: user.role
  });

  return res.json({
    status: 'SUCCESS',
    message: accountLinked ? 'GitHub account linked to existing Google email' : 'Google OAuth2 login successful',
    accountLinked,
    isNewUser: isNew,
    token,
    user
  });
});

/**
 * B. GitHub Auth Callback Endpoint
 */
router.get('/github/callback', async (req, res) => {
  const { code } = req.query;

  // Simulated provider profile normalization matching verified email for account linking test
  const simulatedGitHubProfile = {
    email: req.query.email || 'kibretmail@gmail.com', // Same email triggers automatic account linking!
    name: req.query.name || 'Kibret Mulugeta',
    avatar: 'https://avatars.githubusercontent.com/u/48190248',
    provider: 'github',
    providerId: req.query.providerId || 'github_48190248'
  };

  // Execute Account Linking / User Creation in DB
  const { user, isNew, accountLinked } = userStore.upsertOAuthUser(simulatedGitHubProfile);

  // Mint system JWT token
  const token = signJwtToken({
    sub: user.id,
    email: user.email,
    provider: 'github',
    role: user.role
  });

  return res.json({
    status: 'SUCCESS',
    message: accountLinked ? 'GitHub account automatically linked to existing verified email' : 'GitHub OAuth2 login successful',
    accountLinked,
    isNewUser: isNew,
    token,
    user
  });
});

/**
 * C. Protected Route Verification Endpoint
 */
router.get('/me', authenticateJWT, (req, res) => {
  const user = userStore.findById(req.user.sub);
  return res.json({
    status: 'AUTHENTICATED',
    sessionClaims: req.user,
    userProfile: user
  });
});

export default router;
