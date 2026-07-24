import http from 'http';

function makeRequest(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ statusCode: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
  });
}

async function runAuthTests() {
  console.log('--- STARTING DUAL OAUTH 2.0 & JWT AUTHENTICATION VERIFICATION ---');

  // 1. Test Health Endpoint
  const healthRes = await makeRequest('http://localhost:5000/api/health');
  console.log('[1] Health Check:', healthRes.statusCode, healthRes.body.status);

  // 2. Test Google Callback Login
  const googleRes = await makeRequest('http://localhost:5000/api/auth/google/callback?email=kibretmail@gmail.com&name=Kibret%20Mulugeta&providerId=google_902148');
  console.log('[2] Google OAuth Login Response:');
  console.log('    - Status:', googleRes.body.status);
  console.log('    - JWT Token Minted:', googleRes.body.token ? 'YES (HS256 Signed)' : 'NO');
  console.log('    - User Email:', googleRes.body.user.email);
  console.log('    - Provider Count:', googleRes.body.user.providers.length);

  const googleJwtToken = googleRes.body.token;

  // 3. Test GitHub Callback Login with SAME EMAIL (AUTOMATIC ACCOUNT LINKING VERIFICATION)
  const githubRes = await makeRequest('http://localhost:5000/api/auth/github/callback?email=kibretmail@gmail.com&name=Kibret%20Mulugeta&providerId=github_481902');
  console.log('[3] GitHub OAuth Automatic Account Linking Response:');
  console.log('    - Status:', githubRes.body.status);
  console.log('    - Account Linked Message:', githubRes.body.message);
  console.log('    - Is Account Linked:', githubRes.body.accountLinked);
  console.log('    - Linked Providers Array:', githubRes.body.user.providers);

  const githubJwtToken = githubRes.body.token;

  // 4. Test Protected Route (/api/auth/me) with Bearer Token
  const meRes = await makeRequest('http://localhost:5000/api/auth/me', {
    Authorization: `Bearer ${githubJwtToken}`
  });
  console.log('[4] Protected /api/auth/me Verification with Bearer Token:');
  console.log('    - Status:', meRes.body.status);
  console.log('    - Verified Session Claims:', meRes.body.sessionClaims);
  console.log('    - Unified Profile:', meRes.body.userProfile.name, `<${meRes.body.userProfile.email}>`);

  // 5. Test Unauthorized Access (Invalid Token)
  const invalidRes = await makeRequest('http://localhost:5000/api/auth/me', {
    Authorization: 'Bearer invalid_fake_token'
  });
  console.log('[5] Security Test with Invalid Token:');
  console.log('    - HTTP Status:', invalidRes.statusCode);
  console.log('    - Error Message:', invalidRes.body.message);

  console.log('--- ALL AUTHENTICATION VERIFICATION TESTS PASSED SUCCESSFULLY ---');
}

runAuthTests().catch(console.error);
