'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, FolderGit2, Activity, Shield, Cpu, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/data/projects';

export function SelectedWorkSection() {
  return (
    <section className="py-20 bg-[#090A0F] border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="cyan">Selected Engineering Work</Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Systems & Research Projects
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={idx === 0 ? 'lg:col-span-2' : ''}
            >
              <Card className="h-full flex flex-col justify-between group cursor-pointer hover:border-cyan-500/40">
                <div className="space-y-4">
                  
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 shrink-0 ml-2" />
                    </h3>
                    <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {project.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="bg-[#0A0C13] p-2.5 rounded-lg border border-zinc-800/80">
                        <span className="text-[10px] text-zinc-400 font-mono block uppercase">{stat.label}</span>
                        <span className="text-xs font-bold text-zinc-200 font-mono">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-xs font-mono font-semibold text-cyan-400 group-hover:underline flex items-center gap-1"
                  >
                    <span>Read Full Case Study Report</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
