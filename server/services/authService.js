import crypto from 'crypto';
import { env } from '../config/env.js';

/**
 * Encodes object or string to base64url format
 */
function base64urlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Signs and issues a custom JWT token (HS256)
 * Payload claims: sub, email, provider, role, iat, exp
 */
export function signJwtToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const expiresInSeconds = 24 * 60 * 60; // 24 Hours

  const fullPayload = {
    sub: payload.sub,
    email: payload.email,
    provider: payload.provider,
    role: payload.role || 'user',
    iat: nowInSeconds,
    exp: nowInSeconds + expiresInSeconds
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac('sha256', env.JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verifies JWT token signature and expiration
 */
export function verifyJwtToken(token) {
  if (!token) throw new Error('JWT token is missing');

  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT token structure');

  const [encodedHeader, encodedPayload, signature] = parts;

  const expectedSignature = crypto
    .createHmac('sha256', env.JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  if (signature !== expectedSignature) {
    throw new Error('Invalid JWT token signature');
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));

  const nowInSeconds = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < nowInSeconds) {
    throw new Error('JWT token has expired');
  }

  return payload;
}

/**
 * Generates Google OAuth 2.0 Redirect Consent URL
 */
export function getGoogleOAuthUrl() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: env.GOOGLE_CALLBACK_URL,
    client_id: env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

/**
 * Generates GitHub OAuth 2.0 Redirect Consent URL
 */
export function getGitHubOAuthUrl() {
  const rootUrl = 'https://github.com/login/oauth/authorize';
  const options = {
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: env.GITHUB_CALLBACK_URL,
    scope: 'user:email'
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}
