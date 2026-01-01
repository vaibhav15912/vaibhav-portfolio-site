"use client";

import React, { useEffect, useState } from 'react';
import { Layers, Terminal, Book } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const iconMap: Record<string, any> = {
  designer: Layers,
  developer: Terminal,
  mentor: Book,
};

const SkillsBox = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) console.error(error);
      else setSkills(data || []);
      setLoading(false);
    }
    fetchSkills();
  }, []);

  if (loading || skills.length === 0) return null;

  return (
    <section className="relative px-6 -mt-24 md:-mt-32 pb-24">
      <div className="max-w-[1200px] mx-auto bg-white rounded-[12px] border border-[#e6ecf8] shadow-[0_5px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className={`grid grid-cols-1 md:grid-cols-${skills.length} divide-y md:divide-y-0 md:divide-x divide-[#e6ecf8]`}>
          
          {skills.map((skill) => {
            const Icon = iconMap[skill.type] || Layers;
            return (
              <div key={skill.id} className="px-8 py-[50px] text-center flex flex-col items-center">
                <div className="w-[64px] h-[64px] mb-8 bg-[#5be9b9] rounded-full flex items-center justify-center relative">
                  <Icon className="text-[#141c3a] w-8 h-8" />
                </div>
                <h1 className="text-[24px] font-[700] mb-4 text-[#141c3a]">{skill.name}</h1>
                <p className="text-[18px] leading-[1.6] font-[400] text-[#141c3a] mb-8 max-w-[280px]">
                  {skill.description}
                </p>
                
                <div className="mt-auto">
                  {skill.sub_heading_1 && (
                    <h2 className="text-[18px] font-[500] text-[#7510f7] mb-2">{skill.sub_heading_1}</h2>
                  )}
                  {skill.sub_items_1 && (
                    <p className="text-[18px] font-[400] text-[#141c3a] mb-8">{skill.sub_items_1}</p>
                  )}
                  
                  {skill.sub_heading_2 && (
                    <h2 className="text-[18px] font-[500] text-[#7510f7] mb-4">{skill.sub_heading_2}</h2>
                  )}
                  <ul className="space-y-2 text-[18px] font-[400] text-[#141c3a]">
                    {Array.isArray(skill.items) && skill.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default SkillsBox;
