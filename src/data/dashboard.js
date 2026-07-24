export const initialDashboardData = {
  kpis: {
    totalRequests: 148290,
    avgLatencyMs: 14.8,
    errorRatePercent: 0.04,
    activeJwtSessions: 42,
    throughputRps: 185
  },
  modelTelemetry: {
    modelName: "Neuro-U-Net-v2",
    status: "ONLINE / IDLE_READY",
    diceScore: 0.934,
    iouScore: 0.887,
    inferenceTimeMs: 18.4,
    vramAllocatedGB: 4.2,
    vramTotalGB: 16.0,
    batchSize: 16,
    inputResolution: "256x256x32",
    preprocessingPipeline: {
      skullStripping: "PASS (N4-Otsu)",
      waveletDenoising: "PASS (3D Coiflet)",
      intensityNorm: "PASS (Z-Score)"
    }
  },
  requestVolume: [
    { time: "00:00", requests: 1200, latency: 13.2 },
    { time: "04:00", requests: 850, latency: 12.8 },
    { time: "08:00", requests: 3400, latency: 16.5 },
    { time: "12:00", requests: 6200, latency: 18.1 },
    { time: "16:00", requests: 7800, latency: 15.4 },
    { time: "20:00", requests: 4500, latency: 14.0 },
    { time: "23:59", requests: 2100, latency: 13.5 }
  ],
  securityLogs: [
    {
      id: "SEC-9021",
      timestamp: "2026-07-24T15:38:12Z",
      provider: "Google OAuth2",
      email: "researcher.eval@medvision.org",
      action: "OAUTH2_CALLBACK_EXCHANGE",
      status: "SUCCESS",
      jwtClaims: {
        sub: "usr_g9812a04",
        role: "verified_researcher",
        alg: "HS256",
        exp: "8h"
      }
    },
    {
      id: "SEC-9020",
      timestamp: "2026-07-24T15:34:05Z",
      provider: "GitHub OAuth2",
      email: "dev.partner@github.com",
      action: "JWT_BEARER_VALIDATION",
      status: "SUCCESS",
      jwtClaims: {
        sub: "usr_gh5519x2",
        role: "system_admin",
        alg: "HS256",
        exp: "8h"
      }
    },
    {
      id: "SEC-9019",
      timestamp: "2026-07-24T15:15:40Z",
      provider: "Google OAuth2",
      email: "clinical.lead@hospital.edu",
      action: "OAUTH2_LOGIN_INITIATE",
      status: "SUCCESS",
      jwtClaims: {
        sub: "usr_g44109b",
        role: "verified_researcher",
        alg: "HS256",
        exp: "8h"
      }
    },
    {
      id: "SEC-9018",
      timestamp: "2026-07-24T14:50:11Z",
      provider: "GitHub OAuth2",
      email: "guest.auditor@external.io",
      action: "JWT_TOKEN_REFRESH",
      status: "SUCCESS",
      jwtClaims: {
        sub: "usr_gh8812z",
        role: "guest_viewer",
        alg: "HS256",
        exp: "8h"
      }
    }
  ],
  taskQueue: [
    {
      id: "TASK-8041",
      name: "3D Brain MRI Skull Stripping & N4 Bias Correction",
      type: "Pre-processing",
      status: "Processing",
      progress: 68,
      submittedBy: "kibretmail@gmail.com",
      priority: "HIGH"
    },
    {
      id: "TASK-8040",
      name: "Neuro-U-Net-v2 ATLAS Batch Inference (Slice 120-160)",
      type: "Model Inference",
      status: "Processing",
      progress: 42,
      submittedBy: "researcher.eval@medvision.org",
      priority: "CRITICAL"
    },
    {
      id: "TASK-8039",
      name: "OAuth 2.0 PKCE Authorization Code Exchange",
      type: "Auth Pipeline",
      status: "Completed",
      progress: 100,
      submittedBy: "dev.partner@github.com",
      priority: "MEDIUM"
    },
    {
      id: "TASK-8038",
      name: "License Plate Optical Character Recognition (YOLOv8)",
      type: "CV Pipeline",
      status: "Completed",
      progress: 100,
      submittedBy: "system_cron",
      priority: "LOW"
    },
    {
      id: "TASK-8037",
      name: "Wavelet Denoising Filter Coefficient Re-calculation",
      type: "Pre-processing",
      status: "Pending",
      progress: 0,
      submittedBy: "kibretmail@gmail.com",
      priority: "MEDIUM"
    },
    {
      id: "TASK-8036",
      name: "Intelligent Schedule State Machine Verification",
      type: "System Check",
      status: "Pending",
      progress: 0,
      submittedBy: "system_cron",
      priority: "LOW"
    }
  ]
};
