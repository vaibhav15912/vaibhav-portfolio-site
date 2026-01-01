"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import Introduction from "@/components/sections/introduction";
import SkillsBox from "@/components/sections/skills-box";
import RecentWork from "@/components/sections/recent-work";
import Clients from "@/components/sections/clients";
import StartupProjects from "@/components/sections/startup-projects";
import Testimonials from "@/components/sections/testimonials";
import CallToAction from "@/components/sections/call-to-action";
import Footer from "@/components/sections/footer";
import ContactForm from "@/components/sections/contact-form";

const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  introduction: Introduction,
  skills: SkillsBox,
  recent_work: RecentWork,
  clients: Clients,
  startup_projects: StartupProjects,
  testimonials: Testimonials,
  cta: CallToAction,
  contact_form: ContactForm,
};

export default function Home() {
  const [sections, setSections] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [sectionsRes, configRes] = await Promise.all([
        supabase.from('home_sections').select('*').eq('is_active', true).order('order', { ascending: true }),
        supabase.from('site_config').select('*').single()
      ]);

      if (sectionsRes.data) setSections(sectionsRes.data);
      if (configRes.data) setConfig(configRes.data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return null;

  return (
    <main className={`min-h-screen ${config?.theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white'}`}>
      <Navbar config={config} />
      
      {sections.map((section) => {
        const Component = SECTION_COMPONENTS[section.section_name];
        if (!Component) return null;
        return <Component key={section.id} content={section.content} />;
      })}

      <Footer 
        config={config} 
        content={sections.find(s => s.section_name === 'footer')?.content} 
      />
    </main>
  );
}
