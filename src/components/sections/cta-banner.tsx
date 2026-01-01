import React from 'react';

const CTABanner = () => {
  return (
    <section className="relative px-6 -mb-[100px] z-10">
      <div className="container mx-auto max-w-[1200px]">
        <div className="bg-[#141c3a] rounded-[12px] px-8 py-12 md:py-16 md:px-16 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">
            <div className="flex-1">
              <h2 className="text-white text-[2rem] font-bold mb-4 tracking-tight leading-tight">
                Start a project
              </h2>
            </div>
            
            <div className="flex-1 max-w-[400px]">
              <p className="text-white text-lg font-normal leading-relaxed opacity-90">
                Interested in working together? We should queue up a time to chat. I’ll buy the coffee.
              </p>
            </div>

            <div className="flex-1 flex justify-center md:justify-end">
              <a
                href="/contact"
                className="group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#5be9b9] text-[#5be9b9] rounded-full text-lg font-medium transition-all duration-300 hover:bg-[#5be9b9] hover:text-[#141c3a]"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 512 512" 
                    fill="currentColor" 
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="M512 240v16c0 13.3-10.7 24-24 24h-16c-13.3 0-24-10.7-24-24V112c0-8.8-7.2-16-16-16h-48v256l106.7 106.7c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L323.3 365.3c-15-15-23.3-35.3-23.3-56.5V112c0-35.3 28.7-64 64-64h48c35.3 0 64 28.7 64 64v128zm-256 0c0-13.3-10.7-24-24-24h-16c-13.3 0-24 10.7-24 24V112c0-8.8-7.2-16-16-16h-48v256l106.7 106.7c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L131.3 365.3c-15-15-23.3-35.3-23.3-56.5V112c0-35.3 28.7-64 64-64h48c35.3 0 64 28.7 64 64v128z" />
                  </svg>
                </div>
                Let's do this
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;