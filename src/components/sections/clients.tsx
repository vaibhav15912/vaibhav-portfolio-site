import React from 'react';
import Image from 'next/image';

const Clients = ({ content }: { content?: any }) => {
  const title = content?.title || "I’m proud to have collaborated with some awesome companies:";
  const logos = content?.logos || [
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/briteweb-3.svg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/goodkind-4.svg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/redstamp-5.svg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/domain7-6.svg",
  ];

  return (
    <section className="py-[120px] bg-white border-t border-[#e6ecf8] text-center">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="flex justify-center mb-16">
          <div className="w-full md:w-1/2">
            <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-[#141c3a] leading-tight mb-4">
              {title}
            </h1>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-center justify-items-center">
            {logos.map((logo: string, index: number) => (
              <div 
                key={index} 
                className="w-full h-[60px] relative flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
              >
                <div className="relative w-full h-[48px]">
                  <Image
                    src={logo}
                    alt={`Client logo ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
