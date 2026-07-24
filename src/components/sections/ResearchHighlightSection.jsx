'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, BookOpen, CheckCircle, ArrowRight, Brain, Zap } from 'lucide-react';
import { UNetVisualizer } from '@/components/visuals/UNetVisualizer';
import { Badge } from '@/components/ui/Badge';
import { researchData } from '@/data/research';

export function ResearchHighlightSection() {
  const { primaryResearch } = researchData;

  return (
    <section className="py-20 bg-[#0B0D14] border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="indigo">Primary AI Research Portal</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {primaryResearch.title}
          </h2>
          <p className="text-sm font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-800/60 inline-block">
            Status: {primaryResearch.status}
          </p>
          <p className="text-base text-zinc-300 leading-relaxed pt-2">
            {primaryResearch.abstract}
          </p>
        </div>

        {/* Key Metrics Benchmarks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {primaryResearch.keyMetrics.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <span className="text-xs text-zinc-400 font-mono block">{m.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-cyan-400">{m.value}</span>
                <span className="text-[10px] font-mono text-zinc-400">vs {m.baseline} base</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visualizer Container */}
        <UNetVisualizer />

        {/* Mathematical Formulation Footer */}
        <div className="mt-8 p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>{primaryResearch.mathFormulation.heading}</span>
            </h4>
            <p className="text-xs font-mono text-zinc-400">
              {primaryResearch.mathFormulation.explanation}
            </p>
          </div>
          <Link
            href="/research"
            className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shrink-0"
          >
            <span>Read Full Paper & Methodology</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
