import React from 'react';
import Image from 'next/image';
import { ExternalLink, CirclePause, Handshake } from 'lucide-react';

interface StartupProject {
  logo: string;
  description: string;
  link?: string;
  status?: 'active' | 'on-hold' | 'exited' | 'acquired';
  statusLabel?: string;
  type: 'link' | 'tag';
}

const startupProjects: StartupProject[] = [
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/bootstraplogos-9.svg",
    description: "Affordable, human-crafted logos for startups and indie projects.",
    link: "https://bootstraplogos.com",
    statusLabel: "bootstraplogos.com",
    type: 'link'
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/baselair-10.svg",
    description: "Community platform for miniature painters to learn, connect, and showcase work.",
    link: "https://thebaselair.com",
    statusLabel: "thebaselair.com",
    type: 'link'
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/automalog-11.svg",
    description: "AI-driven changelog that turns git commits into release notes, instantly.",
    link: "https://automalog.com",
    statusLabel: "automalog.com",
    type: 'link'
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/shipable-12.svg",
    description: "Short, focused design and growth collabs for startup tech founders.",
    status: 'on-hold',
    statusLabel: "on hold",
    type: 'tag'
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/houston-13.svg",
    description: "Simple feedback and engagement tools that help teams ship winning products.",
    status: 'on-hold',
    statusLabel: "on hold",
    type: 'tag'
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/kybercore-14.svg",
    description: "Next level plug and play chassis systems for custom DIY lightsaber builds.",
    status: 'on-hold',
    statusLabel: "on hold",
    type: 'tag'
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/basin-15.svg",
    description: "A powerful, easy-to-configure form backend for designers and developers.",
    status: 'exited',
    statusLabel: "exited in 2024",
    type: 'tag'
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/dovetail-16.svg",
    description: "A space and member management solution for coworking communities.",
    status: 'acquired',
    statusLabel: "acquired in 2017",
    type: 'tag'
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/userforge-17.svg",
    description: "A collaborative tool for creating simple, effective user personas.",
    status: 'acquired',
    statusLabel: "acquired in 2016",
    type: 'tag'
  }
];

export default function Startups() {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="bg-primary pt-[100px] pb-[160px] text-center px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-white text-[2rem] font-bold mb-6 leading-tight">
            My Startup Projects
          </h2>
          <p className="text-white text-[1.25rem] font-normal leading-relaxed max-w-[800px] mx-auto opacity-100">
            I&apos;m a bit of a digital product junky. Over the years I&apos;ve used hundreds of web and mobile apps in different industries and verticals. Eventually, I decided that it would be a fun challenge to design and build my own.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="relative -mt-[100px] pb-[100px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {startupProjects.map((project, index) => (
              <div 
                key={index}
                className="bg-white rounded-[12px] border border-[#e6ecf8] p-10 flex flex-col items-center text-center shadow-none hover:shadow-lg transition-standard"
              >
                <div className="h-[40px] mb-6 flex items-center justify-center">
                  <Image 
                    src={project.logo} 
                    alt="Logo" 
                    width={180} 
                    height={40} 
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                
                <p className="text-[#141c3a] text-[1.125rem] mb-8 min-h-[54px] leading-relaxed">
                  {project.description}
                </p>

                {project.type === 'link' ? (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary bg-[#f2e6ff] px-4 py-2 rounded-full font-medium text-[16px] hover:bg-primary-dark hover:text-white transition-standard group"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {project.statusLabel}
                  </a>
                ) : (
                  <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-[16px] ${
                    project.status === 'on-hold' 
                      ? 'text-[#f85a40] bg-[#fff0ed]' 
                      : 'text-[#5be9b9] bg-[#eefdf8]'
                  }`}>
                    {project.status === 'on-hold' ? (
                      <CirclePause className="w-4 h-4 mr-2" />
                    ) : (
                      <Handshake className="w-4 h-4 mr-2" />
                    )}
                    {project.statusLabel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}