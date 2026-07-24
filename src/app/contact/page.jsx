'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, MapPin, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#090A0F] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-zinc-800 pb-8">
          <Badge variant="cyan">Direct Contact Portal</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h1>
          <p className="text-zinc-300 text-base leading-relaxed">
            Have a research inquiry, medical computer vision opportunity, or full-stack engineering consultation? Reach out directly using the form below or via email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details Card */}
          <div className="space-y-4">
            <Card hover={false} glow className="space-y-6">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider text-cyan-400">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs font-mono text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block uppercase text-[10px]">Email Address</span>
                    <a href={`mailto:${profile.email}`} className="text-white hover:underline font-bold">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block uppercase text-[10px]">Academic Institutions</span>
                    <p className="text-zinc-200">Bahir Dar University (MSc)</p>
                    <p className="text-zinc-400">Debre Berhan University (BSc)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block uppercase text-[10px]">Location</span>
                    <p className="text-zinc-200">{profile.location}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <span className="text-xs font-mono text-zinc-400 block">External Profiles</span>
                <div className="flex gap-2">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-cyan-500/50 transition-colors flex items-center gap-2 text-xs font-mono"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-colors flex items-center gap-2 text-xs font-mono"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card hover={false} className="space-y-6">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Send Direct Message
              </h3>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 space-y-2 font-mono text-sm">
                  <div className="flex items-center gap-2 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Message Dispatched</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Thank you for reaching out. Kibret will review your message and reply via email ({formData.email || profile.email}).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-zinc-300 font-semibold block">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090E] border border-zinc-800 text-zinc-100 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-zinc-300 font-semibold block">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@researchlab.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090E] border border-zinc-800 text-zinc-100 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-semibold block">Subject / Topic</label>
                    <input
                      type="text"
                      required
                      placeholder="Medical Image Segmentation Research Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090E] border border-zinc-800 text-zinc-100 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-semibold block">Message Content</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Details about your proposed project or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090E] border border-zinc-800 text-zinc-100 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" icon={Send} className="w-full">
                    Dispatch Inquiry
                  </Button>
                </form>
              )}
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
