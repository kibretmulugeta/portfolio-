'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, Activity, Eye, Cpu, Terminal, HardDrive, Zap, Server, ShieldCheck, Globe, Layout, Workflow, Code, Code2, FileCode, GitBranch, Database } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { skillCategories } from '@/data/skills';

const iconMap = {
  Brain, Layers, Activity, Eye, Cpu, Terminal, HardDrive, Zap, Server, ShieldCheck, Globe, Layout, Workflow, Code, Code2, FileCode, GitBranch, Database
};

export function CapabilitiesSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-20 bg-[#090A0F] border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <Badge variant="cyan">Technical Capabilities Matrix</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering & AI Competencies
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Ranging from low-level computer architecture and embedded C/C++ systems to state-of-the-art deep learning architectures and secure FastAPI backend development.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-800 pb-4">
          {skillCategories.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeCategory === idx
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories[activeCategory].skills.map((skill, idx) => {
            const IconComponent = iconMap[skill.icon] || Code;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80 flex items-center justify-between hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                    <span className="text-[11px] font-mono text-zinc-400">Proficiency Level</span>
                  </div>
                </div>

                <div className="w-32 space-y-1 text-right">
                  <span className="text-xs font-mono font-bold text-cyan-400">{skill.level}%</span>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
