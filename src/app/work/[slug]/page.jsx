import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Code2, Cpu, ShieldCheck, Activity, Terminal, FileCode } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { UNetVisualizer } from '@/components/visuals/UNetVisualizer';
import { OAuthFlowVisualizer } from '@/components/visuals/OAuthFlowVisualizer';
import { projects } from '@/data/projects';

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isOAuthProject = slug === 'fullstack-workflow-management-oauth2-jwt';
  const isNeuroProject = slug === 'neuro-inspired-medical-segmentation';

  return (
    <div className="pt-28 pb-20 bg-[#090A0F] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Directory</span>
        </Link>

        {/* Case Study Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="cyan">{project.category}</Badge>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
              Status: {project.status}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed">
            {project.overview}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {project.stats.map((st, i) => (
              <div key={i} className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono">
                <span className="text-[10px] text-zinc-400 block uppercase">{st.label}</span>
                <span className="text-base font-bold text-cyan-400">{st.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized Visualizer Embeds */}
        {isNeuroProject && (
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase font-bold text-cyan-400">
              Interactive Neural Pipeline Visualizer
            </h3>
            <UNetVisualizer />
          </div>
        )}

        {isOAuthProject && (
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase font-bold text-indigo-400">
              Module A: Interactive OAuth 2.0 + Signed JWT Sequence Diagram
            </h3>
            <OAuthFlowVisualizer />
          </div>
        )}

        {/* Problem Statement */}
        <div className="space-y-3 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Problem Statement & Technical Context</span>
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.problemStatement}
          </p>
        </div>

        {/* Architecture Specs */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-tight">
            System Architecture & Engineering Design
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(project.architectureDetails).map(([key, val]) => (
              <div key={key} className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-xs font-mono font-semibold uppercase text-cyan-400 block">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Innovations */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Key Technical Innovations
          </h3>
          <div className="space-y-2">
            {project.keyInnovations.map((inn, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{inn}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippets */}
        {project.codeSnippets && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Core Source Code Data</span>
            </h3>
            {project.codeSnippets.map((snippet, idx) => (
              <div key={idx} className="rounded-xl bg-[#08090E] border border-zinc-800 overflow-hidden font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                  <span className="flex items-center gap-2 text-cyan-400 font-bold">
                    <FileCode className="w-4 h-4" />
                    <span>{snippet.filename}</span>
                  </span>
                  <span className="uppercase text-[10px] text-zinc-400">{snippet.language}</span>
                </div>
                <pre className="p-4 text-zinc-200 overflow-x-auto leading-relaxed">
                  {snippet.code}
                </pre>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
