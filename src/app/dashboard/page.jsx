'use client';

import React from 'react';
import { Activity, ShieldCheck, Cpu, Workflow, RefreshCw, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { SystemKPIs } from '@/components/dashboard/SystemKPIs';
import { ModelMetrics } from '@/components/dashboard/ModelMetrics';
import { AuthLogStream } from '@/components/dashboard/AuthLogStream';
import { TaskQueueTable } from '@/components/dashboard/TaskQueueTable';
import { initialDashboardData } from '@/data/dashboard';

export default function DashboardPage() {
  const { kpis, modelTelemetry, requestVolume, securityLogs, taskQueue } = initialDashboardData;

  return (
    <div className="pt-28 pb-20 bg-[#090A0F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="cyan">Real-Time Telemetry & Systems Engine</Badge>
              <span className="text-xs font-mono text-zinc-400">Node: us-east-fastapi-cluster</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Analytics & Model Dashboard
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Live monitoring of API throughput, Neuro-U-Net-v2 inference telemetry, OAuth2 JWT claims, and asynchronous task queues.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>SYSTEM ALL SYSTEMS NORMAL</span>
            </div>
          </div>
        </div>

        {/* Panel 1: API Infrastructure KPI Cards & Graph */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Panel 1: API Infrastructure & Request Volume</span>
          </h2>
          <SystemKPIs kpis={kpis} requestVolume={requestVolume} />
        </section>

        {/* Panel 2: AI/ML Model Telemetry Panel */}
        <section className="space-y-3 pt-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>Panel 2: Neuro-U-Net-v2 Model Telemetry & Pipeline Health</span>
          </h2>
          <ModelMetrics telemetry={modelTelemetry} />
        </section>

        {/* Panel 3: Security Log Panel */}
        <section className="space-y-3 pt-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Panel 3: OAuth 2.0 Security Stream & JWT Claims Inspector</span>
          </h2>
          <AuthLogStream logs={securityLogs} />
        </section>

        {/* Panel 4: Task Queue Panel */}
        <section className="space-y-3 pt-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
            <Workflow className="w-4 h-4 text-amber-400" />
            <span>Panel 4: Asynchronous Task Execution Queue</span>
          </h2>
          <TaskQueueTable tasks={taskQueue} />
        </section>

      </div>
    </div>
  );
}
