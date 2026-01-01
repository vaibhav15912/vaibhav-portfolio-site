import React from 'react';

const Introduction = ({ content }: { content?: any }) => {
  const title = content?.title || "Hi, I’m Matt. Nice to meet you.";
  const description = content?.description || "Since beginning my journey as a freelance designer 12 years ago, I've done remote work for agencies, consulted for startups, and collaborated with talented people to create digital products for both business and consumer use. I'm quietly confident, naturally curious, and perpetually working on improving my chops.";

  return (
    <section 
      className="bg-[#7510f7] text-white text-center py-[120px] px-6"
      style={{
        paddingTop: '120px',
        paddingBottom: '160px',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-center">
          <div className="w-full lg:w-3/5 md:w-4/5">
            <h1 
              className="font-extrabold text-[#ffffff] mb-6"
              style={{
                fontSize: '2rem',
                lineHeight: '1.125',
                letterSpacing: '-0.02em',
                fontFamily: '"europa", sans-serif'
              }}
            >
              {title}
            </h1>

            <h2 
              className="font-normal opacity-100"
              style={{
                fontSize: '1.25rem',
                lineHeight: '1.6',
                fontFamily: '"europa", sans-serif',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              {description}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;