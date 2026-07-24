import React from 'react';
import { User, GraduationCap, Cpu, Layers, Activity, ShieldCheck, Download, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-[#090A0F] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <Badge variant="cyan">Academic & Professional Background</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Kibret Mulugeta
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl">
            {profile.tagline}
          </p>
        </div>

        {/* Bio Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 text-zinc-300 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-white font-mono uppercase tracking-wider text-cyan-400">
              Engineering Narrative
            </h2>
            {profile.bio.map((paragraph, idx) => (
              <p key={idx} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quick Info Sidebar Card */}
          <div className="space-y-4">
            <Card hover={false} className="space-y-4">
              <h3 className="text-sm font-mono uppercase font-bold text-white border-b border-zinc-800 pb-2">
                Quick Facts
              </h3>
              <div className="space-y-3 text-xs font-mono text-zinc-300">
                <div>
                  <span className="text-zinc-400 block uppercase text-[10px]">Location</span>
                  <span className="font-bold text-white">{profile.location}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block uppercase text-[10px]">Contact</span>
                  <a href={`mailto:${profile.email}`} className="text-cyan-400 hover:underline font-bold">
                    {profile.email}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-400 block uppercase text-[10px]">Availability</span>
                  <span className="text-emerald-400">{profile.availability}</span>
                </div>
              </div>
              <div className="pt-2">
                <Button href="/contact" variant="primary" size="sm" className="w-full">
                  Contact Me
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Education Credentials Spotlight */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <span>Academic Qualifications</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={idx === 0 ? 'cyan' : 'indigo'}>{edu.degree}</Badge>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{edu.status}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                <p className="text-xs font-mono text-cyan-400 font-semibold">{edu.specialization}</p>
                <ul className="space-y-1.5 pt-2 text-xs text-zinc-300 list-disc list-inside">
                  {edu.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Career Trajectory Roadmap */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-indigo-400" />
            <span>Engineering Trajectory</span>
          </h2>
          <div className="space-y-4">
            {profile.trajectory.map((t, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center gap-4">
                <span className="px-3 py-1 rounded bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono text-xs font-bold shrink-0">
                  {t.year}
                </span>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">{t.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
