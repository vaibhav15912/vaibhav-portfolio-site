import React from 'react';
import Image from 'next/image';
import { Twitter, Dribbble, Linkedin, Mail, Instagram, Github } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  twitter: Twitter,
  dribbble: Dribbble,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
  github: Github,
};

const Footer = ({ config, content }: { config?: any; content?: any }) => {
  const bulmaBadgeUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/images/made-with-bulma--white-11.png";
  
  const tagline = content?.tagline || "Living, learning, & leveling up one day at a time.";
  const socialLinks = content?.social_links || [
    { icon: 'twitter', url: 'https://twitter.com' },
    { icon: 'dribbble', url: 'https://dribbble.com' },
    { icon: 'linkedin', url: 'https://linkedin.com' },
    { icon: 'email', url: 'mailto:hello@mattfarley.ca' },
  ];

  return (
    <footer className="bg-[#7510f7] pt-[120px] pb-[80px] text-white text-center">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-10">
          {config?.logo_url ? (
            <img src={config.logo_url} alt={config.site_name || "Logo"} className="h-16 w-auto object-contain brightness-0 invert" />
          ) : (
            <svg 
              width="60" 
              height="48" 
              viewBox="0 0 90 72" 
              fill="none" 
              className="text-white"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M12.9 8.1C12.9 3.6 16.5 0 21 0H69C73.5 0 77.1 3.6 77.1 8.1V18.9C77.1 23.4 73.5 27 69 27H21C16.5 27 12.9 23.4 12.9 18.9V8.1ZM21 9H69V18H21V9ZM0 44.1C0 39.6 3.6 36 8.1 36H81.9C86.4 36 90 39.6 90 44.1V54.9C90 59.4 86.4 63 81.9 63H8.1C3.6 63 0 59.4 0 54.9V44.1ZM8.1 45H81.9V54H8.1V45ZM21.9 68.4C21.4 68.4 21 68.8 21 69.3V71.1C21 71.6 21.4 72 21.9 72H68.1C68.6 72 69 71.6 69 71.1V69.3C69 68.8 68.6 68.4 68.1 68.4H21.9Z" 
                fill="currentColor"
              />
            </svg>
          )}
        </div>

        <h2 className="text-[26px] md:text-[28px] font-normal leading-[1.5] mb-12 opacity-80 max-w-[320px] mx-auto">
          {tagline}
        </h2>

        <div className="flex justify-center gap-4 mb-14">
          {socialLinks.map((link: any, idx: number) => {
            const Icon = ICON_MAP[link.icon.toLowerCase()] || Mail;
            return (
              <a 
                key={idx}
                href={link.url} 
                className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-white hover:text-[#7510f7]"
                aria-label={link.icon}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <p className="text-[18px] opacity-80 mb-6 font-normal">
          Handcrafted by me © {new Date().getFullYear()}
        </p>

        <div className="flex justify-center mt-4">
          <a 
            href="https://bulma.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-100 opacity-90"
          >
            <Image 
              src={bulmaBadgeUrl} 
              alt="Made with Bulma" 
              width={160} 
              height={32} 
              className="h-8 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;