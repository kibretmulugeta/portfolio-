'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FolderGit2, ArrowUpRight, Filter, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/data/projects';

export default function WorkDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'AI & Medical Vision Research', 'Medical Computer Vision', 'Systems & Security Engineering', 'Productivity & Systems', 'Computer Vision & Edge Systems'];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 bg-[#090A0F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="cyan">Engineering Directory</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Portfolio & Systems Work
          </h1>
          <p className="text-zinc-300 text-base leading-relaxed">
            A comprehensive catalog of 5 key engineering initiatives spanning medical computer vision, novel neural plasticity optimization, and enterprise full-stack OAuth 2.0 / JWT security platforms.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-zinc-800 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`}>
              <Card className="h-full flex flex-col justify-between group cursor-pointer hover:border-cyan-500/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {project.stats.slice(0, 2).map((st, i) => (
                      <div key={i} className="bg-[#0A0C13] p-2 rounded border border-zinc-800 font-mono">
                        <span className="text-[9px] text-zinc-400 block uppercase">{st.label}</span>
                        <span className="text-xs font-bold text-zinc-200">{st.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {project.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 font-semibold">
                  <span>View Case Study Report</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
