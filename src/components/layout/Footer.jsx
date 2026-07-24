import React from 'react';
import Link from 'next/link';
import { Cpu, Github, Linkedin, Mail, ArrowUpRight, GraduationCap } from 'lucide-react';
import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#07080B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/60">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">{profile.name}</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              {profile.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-cyan-500/50 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-emerald-500/50 transition-colors"
                aria-label="Email Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">Navigation</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="/work" className="hover:text-cyan-400 transition-colors">Portfolio & Work</Link></li>
              <li><Link href="/research" className="hover:text-cyan-400 transition-colors">Medical AI Research</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Telemetry Dashboard</Link></li>
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About & Trajectory</Link></li>
              <li><Link href="/resume" className="hover:text-cyan-400 transition-colors">Interactive Resume</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Portal</Link></li>
            </ul>
          </div>

          {/* Col 3: Academic Credentials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">Academic Background</h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-zinc-200">MSc Computer Engineering</p>
                  <p className="text-zinc-500">Bahir Dar University (AI & Data Eng)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-zinc-200">BSc Electrical & Computer Eng</p>
                  <p className="text-zinc-500">Debre Berhan University</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} Kibret Mulugeta. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>Built with Next.js & Tailwind CSS</span>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1 text-cyan-400 hover:underline">
              <span>{profile.email}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
