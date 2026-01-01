"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, PauseCircle, Handshake, ExternalLink, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const StartupProjects = ({ content }: { content?: any }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const title = content?.title || "My Startup Projects";
  const description = content?.description || "I’m a bit of a digital product junkie. Over the years I’ve used hundreds of web and mobile apps in different industries and verticals. Eventually, I decided that it would be a fun challenge to design and build my own.";

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', 'startup')
        .order('order_index', { ascending: true });
      
      if (error) console.error(error);
      else setProjects(data || []);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <div className="startup-projects-section">
      <section className="bg-[#7510F7] py-[120px] text-center px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-center">
            <div className="max-w-[720px]">
              <h1 className="text-white text-[32px] md:text-[38px] font-bold mb-6 tracking-tight">
                {title}
              </h1>
              <p className="text-white text-[20px] leading-[1.5] font-normal opacity-90">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[60px] -mt-[100px] mb-20 px-6">
        <div className="max-w-[1248px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={project.id || index} 
                className="bg-white border border-[#E6ECF8] rounded-[12px] p-10 flex flex-col items-center text-center shadow-[0_5px_20px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:scale-[1.01]"
              >
                <div className="h-[48px] flex items-center mb-6">
                  {project.image_url ? (
                    <Image 
                      src={project.image_url} 
                      alt="Startup Logo" 
                      width={180} 
                      height={48} 
                      className="max-h-[48px] w-auto object-contain"
                    />
                  ) : (
                    <div className="text-primary font-bold">{project.title}</div>
                  )}
                </div>
                
                <p className="text-[#141c3a] text-[18px] leading-[1.6] mb-8 min-h-[54px]">
                  {project.description}
                </p>

                {project.status === 'link' ? (
                  <a 
                    href={project.link || '#'} 
                    className="inline-flex items-center text-[#7510F7] bg-[#f5ecff] hover:bg-[#7510F7] hover:text-white px-5 py-2 rounded-full font-medium transition-colors text-[16px]"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {project.tag || project.title}
                  </a>
                ) : project.status === 'on-hold' ? (
                  <span className="inline-flex items-center text-[#f85a40] bg-[#fff0ed] px-5 py-2 rounded-full font-medium text-[16px]">
                    <PauseCircle className="w-4 h-4 mr-2" />
                    {project.tag || 'on hold'}
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[#2ECC71] bg-[#e6ffee] px-5 py-2 rounded-full font-medium text-[16px]">
                    <Handshake className="w-4 h-4 mr-2" />
                    {project.tag || 'exited'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-[120px] text-center px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[#141c3a] text-[32px] font-bold mb-4">
            Interested in collaborating with me?
          </h2>
          <p className="text-[#141c3a] text-[20px] mb-10 opacity-80">
            I’m always open to discussing product design work or partnership opportunities.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center border-2 border-[#7510F7] text-[#7510F7] hover:bg-[#7510F7] hover:text-white px-8 py-3 rounded-full font-medium text-[18px] transition-all"
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            Start a conversation
          </a>
        </div>
      </section>
      
      <div className="border-t border-[#E6ECF8] w-full"></div>
    </div>
  );
};

export default StartupProjects;
