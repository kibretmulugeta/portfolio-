import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { ResearchHighlightSection } from '@/components/sections/ResearchHighlightSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <SelectedWorkSection />
      <ResearchHighlightSection />
      <CapabilitiesSection />

      {/* Call To Action Banner */}
      <section className="py-20 bg-[#07080D] border-t border-zinc-800/80 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interested in Collaboration or Research?
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Whether you need expertise in medical computer vision, deep learning architecture design, or enterprise FastAPI cloud microservices, I am open for technical engagements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button href="/contact" variant="primary" size="lg" icon={ArrowRight}>
              Get In Touch
            </Button>
            <Button href={`mailto:${profile.email}`} external variant="outline" size="lg" icon={Mail}>
              Direct Email ({profile.email})
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
