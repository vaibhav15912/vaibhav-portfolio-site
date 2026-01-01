"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function Testimonials({ content }: { content?: any }) {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const title = content?.title || "Testimonials";
  const subtitle = content?.subtitle || "People I've worked with have said some nice things...";

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) console.error(error);
      else setTestimonials(data || []);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="section is-medium is-white has-text-centered border-t border-[#E6ECF8] py-[120px]">
      <div className="container max-w-[1200px] mx-auto px-6">
        <h1 className="title is-size-3-desktop is-size-4-mobile mb-6 font-extrabold text-[#141c3a] text-[2rem]">
          {title}
        </h1>
        <h2 className="subtitle is-size-5-desktop mb-[80px] font-normal text-[#141c3a] text-[1.25rem] opacity-80">
          {subtitle}
        </h2>

        <div className="testimonial-slider relative min-h-[400px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className={`testimonial-slide transition-all duration-500 ease-in-out absolute inset-0 flex flex-col items-center ${
                index === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
              }`}
            >
              <div className="avatar-wrapper mb-8">
                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-transparent">
                  {testimonial.avatar_url ? (
                    <Image
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] bg-gray-100 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
              </div>

              <p className="quote max-w-[800px] text-[1.5rem] leading-[1.5] text-[#141c3a] mb-8 font-normal px-4 italic">
                {testimonial.quote}
              </p>

              <h1 className="title is-size-5 mb-2 font-bold text-[#141c3a] text-[1.5rem]">
                {testimonial.name}
              </h1>
              <h2 className="subtitle is-size-6 font-normal text-[#141c3a] text-[1rem] opacity-80">
                {testimonial.title}
              </h2>
            </div>
          ))}

          <div className="slider-dots flex justify-center gap-4 mt-[450px]">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-[14px] h-[14px] rounded-full transition-colors duration-200 border-[1.5px] ${
                  index === activeIndex 
                    ? 'bg-[#7510F7] border-[#7510F7]' 
                    : 'bg-white border-[#E6ECF8] hover:border-[#7510F7]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
