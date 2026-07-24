export const env = {
  // Application Secrets
  JWT_SECRET: process.env.JWT_SECRET || 'KIBRET_PRODUCTION_SECURE_JWT_SECRET_KEY_902148',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  PORT: process.env.PORT || 5000,

  // Google Credentials
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'your_google_client_id',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret',
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',

  // GitHub Credentials
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || 'your_github_client_id',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || 'your_github_client_secret',
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/auth/github/callback'
};
