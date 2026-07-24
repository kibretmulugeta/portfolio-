'use client';

import React from 'react';
import { Activity, Server, Clock, AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function SystemKPIs({ kpis, requestVolume }) {
  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false} className="space-y-2 border-cyan-500/30">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Requests</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-white">
              {kpis.totalRequests.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12.4%
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">FastAPI backend throughput</p>
        </Card>

        <Card hover={false} className="space-y-2 border-indigo-500/30">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Avg API Latency</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-white">
              {kpis.avgLatencyMs} ms
            </span>
            <span className="text-xs font-mono text-emerald-400">Optimal (&lt; 20ms)</span>
          </div>
          <p className="text-[11px] text-zinc-400">Async processing overhead</p>
        </Card>

        <Card hover={false} className="space-y-2 border-emerald-500/30">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Active JWT Sessions</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-white">
              {kpis.activeJwtSessions}
            </span>
            <span className="text-xs font-mono text-cyan-400">HS256 Verified</span>
          </div>
          <p className="text-[11px] text-zinc-400">HttpOnly cookie authenticated</p>
        </Card>

        <Card hover={false} className="space-y-2 border-amber-500/30">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">System Error Rate</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-white">
              {kpis.errorRatePercent}%
            </span>
            <span className="text-xs font-mono text-emerald-400">99.96% Uptime</span>
          </div>
          <p className="text-[11px] text-zinc-400">Zero unhandled exceptions</p>
        </Card>
      </div>

      {/* Visual Volume Bar Chart */}
      <Card hover={false} className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white font-mono">Request Volume & Latency Graph (24h)</h4>
          </div>
          <span className="text-xs font-mono text-zinc-400">Sampling Rate: 4 Hours</span>
        </div>

        <div className="h-40 flex items-end gap-3 pt-4">
          {requestVolume.map((item, idx) => {
            const maxReq = 8000;
            const heightPct = Math.round((item.requests / maxReq) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full relative flex items-end justify-center">
                  <div
                    className="w-full bg-gradient-to-t from-cyan-950 to-cyan-500/80 rounded-t border-t border-cyan-400 transition-all group-hover:bg-cyan-400"
                    style={{ height: `${heightPct}%` }}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 hidden group-hover:flex flex-col items-center bg-zinc-900 text-[10px] font-mono text-zinc-200 px-2 py-1 rounded border border-zinc-700 whitespace-nowrap z-20">
                    <span>{item.requests} reqs</span>
                    <span className="text-cyan-400">{item.latency} ms</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{item.time}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
