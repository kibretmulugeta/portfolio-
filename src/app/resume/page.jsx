import React from 'react';
import { Download, GraduationCap, Briefcase, Award, CheckCircle2, Mail, ExternalLink, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';
import { skillCategories } from '@/data/skills';

export default function ResumePage() {
  return (
    <div className="pt-28 pb-20 bg-[#090A0F] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-8">
          <div>
            <Badge variant="cyan" className="mb-2">Interactive Resume / CV</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Curriculum Vitae
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Kibret Mulugeta • MSc Computer Engineering (AI & Data Engineering)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button href={`mailto:${profile.email}`} external variant="primary" icon={Mail}>
              Email Contact
            </Button>
          </div>
        </div>

        {/* Executive Summary Card */}
        <Card hover={false} glow className="space-y-4">
          <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider text-cyan-400">
            Executive Summary
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            AI Engineer & Computer Engineer with specialized graduate research in Medical Computer Vision (U-Net Brain MRI segmentation) and production full-stack security architectures (FastAPI, OAuth 2.0, JWT). Proven capability to design hardware-level computer engineering solutions and high-throughput deep learning microservices.
          </p>
        </Card>

        {/* Education Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <span>Academic Qualifications</span>
          </h2>
          <div className="space-y-4 border-l-2 border-zinc-800 pl-6 ml-2">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-[#090A0F]" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-800/60">
                    {edu.status}
                  </span>
                </div>
                <p className="text-sm font-mono text-cyan-400 font-semibold">
                  {edu.institution} — ({edu.specialization})
                </p>
                <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Core Competencies Overview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-indigo-400" />
            <span>Technical Capabilities Summary</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <h4 className="text-sm font-bold text-white font-mono text-cyan-400">{cat.category}</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.skills.map((s) => (
                    <span key={s.name} className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
