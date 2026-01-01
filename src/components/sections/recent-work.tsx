"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Dribbble } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function RecentWork({ content }: { content?: any }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const title = content?.title || "My Recent Work";
  const subtitle = content?.subtitle || "Here are a few past design projects I've worked on. Want to see more?";
  const email_text = content?.email_text || "Email me";
  const email_url = content?.email_url || "mailto:matt@pendeavor.com";
  const dribbble_text = content?.dribbble_text || "See more on Dribbble";
  const dribbble_url = content?.dribbble_url || "https://dribbble.com/mattfarley";

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', 'recent_work')
        .order('order_index', { ascending: true });
      
      if (error) console.error(error);
      else setProjects(data || []);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section className="bg-white py-[120px] px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-[2rem] font-bold text-[#141c3a] mb-4">{title}</h2>
          <p className="text-[1.25rem] font-normal text-[#141c3a] max-w-3xl mx-auto">
            {subtitle}{' '}
            <a 
              href={email_url} 
              className="text-[#7510f7] transition-colors hover:text-[#6e07f3]"
            >
              {email_text}
            </a>.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project, index) => (
            <div 
              key={project.id || index} 
              className="group relative overflow-hidden rounded-xl bg-white aspect-[3/2] cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#141c3a]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8 z-10">
                <h3 className="text-white text-lg lg:text-[1.25rem] font-bold mb-8 leading-snug">
                  {project.title}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-outline border-white text-white hover:bg-white hover:text-[#141c3a] py-3 px-8 text-lg font-medium inline-flex items-center gap-2 group/btn"
                  >
                    <span>Visit Website</span>
                    <ChevronRight size={20} className="transition-transform group-hover/btn:translate-x-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <a
            href={dribbble_url}
            className="btn-pill btn-outline py-4 px-10 text-lg font-medium inline-flex items-center gap-3 transition-all duration-200 border-[#7510f7] text-[#7510f7] hover:bg-[#7510f7] hover:text-white"
          >
            <Dribbble size={24} />
            <span>{dribbble_text}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
