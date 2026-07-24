import React from 'react';
import { Activity, BookOpen, Brain, Zap, CheckCircle2, Layers, Cpu, Database, Award } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { UNetVisualizer } from '@/components/visuals/UNetVisualizer';
import { researchData } from '@/data/research';

export default function ResearchPage() {
  const { primaryResearch, interests, datasets } = researchData;

  return (
    <div className="pt-28 pb-20 bg-[#090A0F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-zinc-800 pb-8">
          <Badge variant="indigo">Medical Vision & Deep Learning Portal</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Neuro-Inspired AI Research Hub
          </h1>
          <p className="text-zinc-300 text-base leading-relaxed">
            Investigating reward-driven neural plasticity mechanisms, U-Net convolutional architectures, and automated 3D Brain MRI ischemic stroke lesion segmentation.
          </p>
        </div>

        {/* Primary Research Paper Spotlight */}
        <div className="space-y-6 bg-[#0D0F17] p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-2xl relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                Featured Primary Research
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {primaryResearch.title}
              </h2>
            </div>
            <div className="bg-cyan-950/60 text-cyan-300 border border-cyan-800/80 px-3.5 py-1.5 rounded-lg font-mono text-xs shrink-0">
              {primaryResearch.status}
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono text-zinc-400">
            <span className="text-zinc-300 font-semibold block">Authors & Affiliations:</span>
            <div className="flex flex-wrap gap-2">
              {primaryResearch.authors.map((a, i) => (
                <span key={i} className="bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 text-zinc-300">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-zinc-400">Abstract</h4>
            <p className="text-sm text-zinc-300 leading-relaxed bg-[#08090E] p-4 rounded-xl border border-zinc-800/80">
              {primaryResearch.abstract}
            </p>
          </div>

          {/* Benchmark Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {primaryResearch.keyMetrics.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono">
                <span className="text-[10px] text-zinc-400 block uppercase">{m.label}</span>
                <span className="text-xl font-bold text-cyan-400">{m.value}</span>
                <span className="text-[9px] text-zinc-500 block">vs {m.baseline} baseline</span>
              </div>
            ))}
          </div>

          {/* Math Formulation */}
          <div className="p-5 rounded-xl bg-[#08090E] border border-zinc-800 font-mono text-xs space-y-2">
            <span className="text-indigo-400 font-bold uppercase flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>{primaryResearch.mathFormulation.heading}</span>
            </span>
            <pre className="text-cyan-300 bg-zinc-900 p-3 rounded border border-zinc-800 overflow-x-auto text-sm">
              {primaryResearch.mathFormulation.formula}
            </pre>
            <p className="text-zinc-400 leading-relaxed text-[11px]">
              {primaryResearch.mathFormulation.explanation}
            </p>
          </div>

          {/* Interactive Visualizer */}
          <div className="pt-4">
            <UNetVisualizer />
          </div>
        </div>

        {/* Research Interests Matrix */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Brain className="w-6 h-6 text-cyan-400" />
            <span>Research Directions & Methodology</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interests.map((interest, idx) => (
              <Card key={idx} hover={false} className="space-y-2">
                <h3 className="text-base font-bold text-white">{interest.topic}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{interest.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Dataset Benchmarks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-400" />
            <span>Medical Datasets & Experimental Benchmarks</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasets.map((d, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 font-mono text-xs">
                <h4 className="text-sm font-bold text-white">{d.name}</h4>
                <p className="text-cyan-400 font-semibold">{d.slices}</p>
                <p className="text-zinc-400 leading-relaxed">{d.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
