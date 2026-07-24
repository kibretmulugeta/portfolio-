'use client';

import React from 'react';
import { Cpu, Zap, Activity, CheckCircle2, HardDrive, Layers } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function ModelMetrics({ telemetry }) {
  const vramPercent = Math.round((telemetry.vramAllocatedGB / telemetry.vramTotalGB) * 100);

  return (
    <Card hover={false} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span>{telemetry.modelName}</span>
              <Badge variant="emerald">ONLINE</Badge>
            </h3>
            <p className="text-xs text-zinc-400">Brain MRI Stroke Lesion Segmentation Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-800/60">
          <Zap className="w-3.5 h-3.5" />
          <span>Inference: {telemetry.inferenceTimeMs} ms / slice</span>
        </div>
      </div>

      {/* Model Accuracy Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#090A0F] p-3 rounded-lg border border-zinc-800 font-mono">
          <span className="text-[10px] text-zinc-400 uppercase block">Dice Score (DSC)</span>
          <span className="text-xl font-bold text-cyan-400">{telemetry.diceScore}</span>
        </div>
        <div className="bg-[#090A0F] p-3 rounded-lg border border-zinc-800 font-mono">
          <span className="text-[10px] text-zinc-400 uppercase block">IoU Coefficient</span>
          <span className="text-xl font-bold text-indigo-400">{telemetry.iouScore}</span>
        </div>
        <div className="bg-[#090A0F] p-3 rounded-lg border border-zinc-800 font-mono">
          <span className="text-[10px] text-zinc-400 uppercase block">Batch Size</span>
          <span className="text-xl font-bold text-zinc-200">{telemetry.batchSize}</span>
        </div>
        <div className="bg-[#090A0F] p-3 rounded-lg border border-zinc-800 font-mono">
          <span className="text-[10px] text-zinc-400 uppercase block">Input Tensor</span>
          <span className="text-xs font-bold text-zinc-300 mt-1 block">{telemetry.inputResolution}</span>
        </div>
      </div>

      {/* VRAM Allocation Gauge & Pipeline Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* VRAM Bar */}
        <div className="space-y-2 bg-[#090A0F] p-4 rounded-xl border border-zinc-800">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-300 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              <span>VRAM Allocation</span>
            </span>
            <span className="text-indigo-400 font-bold">
              {telemetry.vramAllocatedGB} GB / {telemetry.vramTotalGB} GB ({vramPercent}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${vramPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-zinc-400 pt-1">
            CUDA Tensor Core memory reserved for high-throughput batch inference.
          </p>
        </div>

        {/* Preprocessing Pipeline Checklist */}
        <div className="space-y-2 bg-[#090A0F] p-4 rounded-xl border border-zinc-800">
          <span className="text-xs font-mono text-zinc-300 font-semibold block uppercase">
            Preprocessing Pipeline Health
          </span>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">N4 Bias Correction & Skull Stripping:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {telemetry.preprocessingPipeline.skullStripping}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">3D Coiflet Wavelet Denoising:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {telemetry.preprocessingPipeline.waveletDenoising}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Z-Score Intensity Normalization:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {telemetry.preprocessingPipeline.intensityNorm}
              </span>
            </div>
          </div>
        </div>

      </div>
    </Card>
  );
}
