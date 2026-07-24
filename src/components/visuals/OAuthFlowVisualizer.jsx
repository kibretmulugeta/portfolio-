'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Key, Lock, UserCheck, ArrowRight, CheckCircle, Database } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const steps = [
  {
    step: 1,
    title: 'Client OAuth Initiation',
    subtitle: 'Google / GitHub Provider',
    icon: Lock,
    payload: `GET /auth/google/login?scope=openid+email+profile&response_type=code
Redirect -> https://accounts.google.com/o/oauth2/v2/auth`,
    explanation: 'User selects identity provider. Client redirects with state nonces and scope parameters to prevent CSRF replay attacks.'
  },
  {
    step: 2,
    title: 'Callback Code Exchange',
    subtitle: 'Backend Authorization Code Exchange',
    icon: Key,
    payload: `POST https://oauth2.googleapis.com/token
grant_type: authorization_code
code: "4/0AeaYSHC..."
client_secret: "****************"`,
    explanation: 'FastAPI backend interceptor exchanges authorization code for provider access tokens and parses verified identity claims.'
  },
  {
    step: 3,
    title: 'Account Resolution',
    subtitle: 'Database Profile Provisioning',
    icon: Database,
    payload: `{
  "sub": "google_1094827103982",
  "email": "kibretmail@gmail.com",
  "name": "Kibret Mulugeta",
  "verified_email": true
}`,
    explanation: 'Backend resolves user account in database (MongoDB / SQL). Automatically provisions new system profiles with default tenant roles.'
  },
  {
    step: 4,
    title: 'Custom Signed JWT Minting',
    subtitle: 'HS256 Token Mints with Claims',
    icon: ShieldCheck,
    payload: `Header: { "alg": "HS256", "typ": "JWT" }
Payload: {
  "sub": "usr_kibret990",
  "email": "kibretmail@gmail.com",
  "role": "ai_researcher",
  "exp": 1784849200
}`,
    explanation: 'FastAPI auth engine signs custom JWT token using secret key, binding authenticated system claims and 8-hour expiration limits.'
  },
  {
    step: 5,
    title: 'Secure Session Delivery',
    subtitle: 'HttpOnly Cookie / Bearer Header',
    icon: UserCheck,
    payload: `Set-Cookie: access_token=eyJhbGciOiJIUzI1NiI...; 
Path=/; Secure; HttpOnly; SameSite=Strict`,
    explanation: 'Token transmitted via HttpOnly, SameSite=Strict cookies (or Authorization: Bearer headers) protecting against script injection.'
  }
];

export function OAuthFlowVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full bg-[#0D0F17] rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-2xl relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <Badge variant="indigo" className="mb-2">Module A Architecture</Badge>
          <h3 className="text-xl font-bold text-white tracking-tight">
            OAuth 2.0 Authorization Code Flow + Signed JWT Pipeline
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400">Step {activeStep + 1} of {steps.length}</span>
        </div>
      </div>

      {/* Step Selector Horizontal Bar */}
      <div className="grid grid-cols-5 gap-2 my-8">
        {steps.map((s, idx) => {
          const isActive = activeStep === idx;
          const Icon = s.icon;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-950/80 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-white'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-zinc-400'}`} />
                <span className="text-[10px] font-mono font-bold">{s.step}</span>
              </div>
              <span className="text-xs font-semibold block truncate">{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Payload & Logic Viewer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 rounded-xl bg-zinc-900/80 border border-zinc-800"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-mono font-bold flex items-center justify-center">
                {steps[activeStep].step}
              </span>
              <h4 className="text-base font-bold text-white">{steps[activeStep].title}</h4>
            </div>
            <p className="text-xs font-mono text-indigo-400">{steps[activeStep].subtitle}</p>
            <p className="text-sm text-zinc-300 leading-relaxed pt-1">
              {steps[activeStep].explanation}
            </p>

            <div className="flex items-center gap-3 pt-4">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 disabled:opacity-30 cursor-pointer"
              >
                Previous Step
              </button>
              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white disabled:opacity-30 flex items-center gap-1 cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-[#08090E] rounded-lg p-4 border border-zinc-800 font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-zinc-400">
              <span className="text-[10px] uppercase font-bold text-cyan-400">Payload / Request Trace</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> VERIFIED PROTOCOL
              </span>
            </div>
            <pre className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {steps[activeStep].payload}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
