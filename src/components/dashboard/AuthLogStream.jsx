'use client';

import React, { useState } from 'react';
import { ShieldCheck, Key, Lock, Terminal, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function AuthLogStream({ logs }) {
  const [selectedLog, setSelectedLog] = useState(logs[0]);

  return (
    <Card hover={false} className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white font-mono">
            OAuth 2.0 Security Logs & JWT Authorization Stream
          </h3>
        </div>
        <Badge variant="emerald">HttpOnly Cookie Enabled</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Stream List */}
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {logs.map((log) => {
            const isSelected = selectedLog.id === log.id;
            const isGoogle = log.provider.includes('Google');
            return (
              <button
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className={`w-full p-3 rounded-lg border text-left font-mono transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-zinc-800 border-cyan-500/60 text-white shadow-md'
                    : 'bg-[#090A0F] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${isGoogle ? 'bg-cyan-400' : 'bg-indigo-400'}`} />
                    <span className="font-bold text-zinc-200">{log.provider}</span>
                    <span className="text-[10px] text-zinc-400">{log.action}</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 truncate max-w-[240px]">{log.email}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-bold block">{log.status}</span>
                  <span className="text-[9px] text-zinc-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected JWT Payload Inspector */}
        <div className="bg-[#08090E] p-4 rounded-xl border border-zinc-800 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-[11px] uppercase font-bold text-cyan-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>JWT Claims Inspector ({selectedLog.id})</span>
            </span>
            <span className="text-[10px] text-zinc-400">Alg: {selectedLog.jwtClaims.alg}</span>
          </div>

          <div className="space-y-1.5 text-zinc-300">
            <div className="flex justify-between">
              <span className="text-zinc-400">Subject Claim (sub):</span>
              <span className="text-cyan-400 font-bold">{selectedLog.jwtClaims.sub}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">User Email:</span>
              <span className="text-zinc-200">{selectedLog.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">System Role:</span>
              <span className="text-indigo-400 font-bold">{selectedLog.jwtClaims.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Token Expiry:</span>
              <span className="text-emerald-400">{selectedLog.jwtClaims.exp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Session Cookie:</span>
              <span className="text-zinc-400">HttpOnly; SameSite=Strict</span>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400 leading-relaxed">
            Claims verified via FastAPI backend security dependency injection. Signature cryptographically signed with HS256 secret key.
          </div>
        </div>

      </div>
    </Card>
  );
}
