'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Activity, ShieldCheck, Download, GraduationCap, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { profile } from '@/data/profile';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl space-y-6">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Badge variant="cyan">AI Engineer & Medical CV Researcher</Badge>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-800">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              MSc Computer Engineering (Bahir Dar University)
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
          >
            Architecting <span className="cyan-gradient-text">Neuro-Inspired AI</span> & High-Performance Systems
          </motion.h1>

          {/* Bio Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-300 max-w-3xl leading-relaxed"
          >
            I am <strong className="text-white font-semibold">Kibret Mulugeta</strong>. I bridge theoretical deep learning, medical image segmentation (U-Net & Brain MRI), and secure full-stack cloud microservices.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Button href="/work" variant="primary" size="lg" icon={ArrowRight}>
              Explore Engineering Work
            </Button>
            <Button href="/research" variant="outline" size="lg" icon={Activity}>
              Medical AI Research Portal
            </Button>
            <Button href="/resume" variant="secondary" size="lg" icon={Download}>
              Resume / CV
            </Button>
          </motion.div>

          {/* Key Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-zinc-800/80 mt-12"
          >
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Activity className="w-4 h-4" />
                <span className="text-xl font-bold font-mono">0.934</span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">U-Net Brain MRI Dice Score</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xl font-bold font-mono">OAuth2+JWT</span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">FastAPI Security Engine</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-xl font-bold font-mono">18.4ms</span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">Slice Inference Speed</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xl font-bold font-mono">MSc & BSc</span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">Computer Engineering</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
