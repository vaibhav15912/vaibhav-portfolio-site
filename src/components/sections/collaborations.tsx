import React from 'react';
import Image from 'next/image';

const Collaborations = () => {
  const clients = [
    {
      name: 'Briteweb',
      src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/briteweb-3.svg',
      width: 170,
      height: 85,
    },
    {
      name: 'Good Kind',
      src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/goodkind-4.svg',
      width: 170,
      height: 85,
    },
    {
      name: 'Redstamp',
      src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/redstamp-5.svg',
      width: 170,
      height: 85,
    },
    {
      name: 'Domain7',
      src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/domain7-6.svg',
      width: 170,
      height: 85,
    },
    {
      name: 'Designlab',
      src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/images/designlab-7.png',
      width: 170,
      height: 85,
    },
    {
      name: 'Chronicled',
      src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/chronicled-7.svg',
      width: 170,
      height: 85,
    },
    {
      name: 'Bldrs',
      src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/images/bldrs-8.png',
      width: 170,
      height: 85,
    },
    {
      name: 'Serpmetrics',
      src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/serpmetrics-8.svg',
      width: 170,
      height: 85,
    },
  ];

  return (
    <section className="bg-white py-20 md:py-32 border-t border-[#e6ecf8] text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-center mb-16 md:mb-20">
          <div className="w-full md:w-1/2">
            <h1 className="text-[20px] md:text-[32px] font-bold text-[#141c3a] leading-tight font-display mb-0">
              I&apos;m proud to have collaborated with some awesome companies:
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-16 items-center">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="px-4 flex justify-center items-center"
            >
              <div className="relative w-full max-w-[170px] aspect-[2/1] flex justify-center items-center">
                <Image
                  src={client.src}
                  alt={`${client.name} logo`}
                  width={client.width}
                  height={client.height}
                  className="max-h-full w-auto block opacity-100 grayscale transition-all duration-300 hover:grayscale-0"
                  priority={index < 4}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborations;