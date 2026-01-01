"use client";

import React from 'react';

/**
 * CallToAction Section
 * Clones the dark-themed "Start a project" CTA box that floats over the transition 
 * from the white section to the purple footer.
 */
const CallToAction = ({ content }: { content?: any }) => {
  const title = content?.title || "Start a project";
  const subtitle = content?.subtitle || "Interested in working together? We should queue up a time to chat. I’ll buy the coffee.";
  const button_text = content?.button_text || "Let's do this";

  return (
    <section className="relative z-10 px-6 sm:px-12 -mb-24 mt-20">
      <div className="container mx-auto max-w-[1200px]">
        <div className="bg-[#141c3a] rounded-xl py-12 px-8 sm:py-16 sm:px-16 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="md:flex-1">
              <h2 className="text-white text-3xl font-extrabold mb-0 leading-tight">
                {title}
              </h2>
            </div>

            <div className="md:flex-[2] max-w-md">
              <p className="text-white text-lg font-normal leading-relaxed opacity-90">
                {subtitle}
              </p>
            </div>

              <div className="md:flex-1 flex justify-center md:justify-end">
                <a 
                  href="#contact" 
                  className="btn-pill inline-flex items-center gap-2 border-2 border-[#5be9b9] text-white hover:bg-[#5be9b9] hover:text-[#141c3a] transition-all duration-300 text-lg px-8 py-3 rounded-full group"
                >
                  <span className="flex items-center gap-2">
                    {button_text === "Let's do this" ? "Start Conversation" : button_text}
                  </span>
                </a>
              </div>
          </div>
        </div>
      </div>


      <style jsx global>{`
        /* Replicating the btn-pill functionality slightly more specifically for the CTA box button */
        .btn-pill {
          font-family: inherit;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .container {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default CallToAction;