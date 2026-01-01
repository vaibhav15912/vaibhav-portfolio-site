"use client";

import React, { useState } from "react";

const Navbar = ({ config }: { config?: any }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav 
      className="navbar is-transparent py-[19.2px] relative flex bg-white w-full min-h-[126px] items-center" 
      role="navigation" 
      aria-label="main navigation"
    >
      <div className="container mx-auto px-6 max-w-[1344px] flex items-center justify-between w-full">
        {/* Navbar Brand / Logo */}
        <div className="navbar-brand flex items-center shrink-0">
          <a href="/" className="navbar-item px-3 py-2 transition-opacity hover:opacity-80">
            {config?.logo_url ? (
              <img src={config.logo_url} alt={config.site_name || "Logo"} className="h-12 w-auto object-contain" />
            ) : (
              <svg 
                viewBox="0 0 512 512" 
                className="w-[90px] h-auto text-primary fill-current transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: '#7510f7' }}
              >
                <path d="M448 0H64C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h384c0-35.3-28.7-64-64-64H64c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v384c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64z" fillOpacity="0" />
                <path fillRule="evenodd" clipRule="evenodd" d="M128 64h256c35.346 0 64 28.654 64 64v256c0 35.346-28.654 64-64 64H128c-35.346 0-64-28.654-64-64V128c0-35.346 28.654-64 64-64zm80 304V172c0-11.046-8.954-20-20-20s-20 8.954-20 20v196h40zm152 0V172c0-11.046-8.954-20-20-20s-20 8.954-20 20v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60c0-11.046-8.954-20-20-20s-20 8.954-20 20v196h40V284c0-6.627 5.373-12 12-12s12 5.373 12 12v68h40z" />
              </svg>
            )}
            {config?.site_name && !config?.logo_url && (
              <span className="ml-2 font-bold text-xl">{config.site_name}</span>
            )}
          </a>

          {/* Burger Menu for Mobile */}
          <button 
            className={`navbar-burger block lg:hidden relative w-[52px] h-[52px] ml-auto bg-transparent border-0 cursor-pointer ${isActive ? 'is-active' : ''}`}
            aria-label="menu" 
            aria-expanded={isActive}
            onClick={() => setIsActive(!isActive)}
          >
            <span className={`block absolute left-1/2 top-1/2 -mt-[0.5px] -ml-2 w-4 h-[1px] bg-[#141c3a] transition-all ${isActive ? 'rotate-45 mt-0' : '-translate-y-1.5'}`}></span>
            <span className={`block absolute left-1/2 top-1/2 -mt-[0.5px] -ml-2 w-4 h-[1px] bg-[#141c3a] transition-all ${isActive ? 'opacity-0' : ''}`}></span>
            <span className={`block absolute left-1/2 top-1/2 -mt-[0.5px] -ml-2 w-4 h-[1px] bg-[#141c3a] transition-all ${isActive ? '-rotate-45 mt-0' : 'translate-y-1.5'}`}></span>
          </button>
        </div>

        {/* Navbar Menu */}
        <div 
          id="navMenu" 
          className={`navbar-menu lg:flex items-center grow shadow-none ${isActive ? 'block absolute top-full left-0 right-0 bg-white p-6 shadow-lg border-b' : 'hidden md:ml-auto'}`}
        >
          <div className="navbar-end flex flex-col lg:flex-row items-center lg:ml-auto">
            <a 
              href="/mentorship" 
              className="navbar-item text-navy text-[18px] font-normal px-3 py-2 lg:mx-4 transition-colors hover:text-primary"
              style={{ fontFamily: 'europa, sans-serif' }}
            >
              Mentorship
            </a>
              <div className="navbar-item py-4 lg:py-0 lg:ml-2">
                <a 
                  href="#contact" 
                  className="btn-pill btn-outline text-[18px] h-[45px] px-[19.2px] border-[2px] transition-all duration-200"
                  style={{ 
                    fontFamily: 'europa, sans-serif',
                    borderColor: '#7510f7',
                    color: '#7510f7',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Say Hello
                </a>
              </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .navbar-item:focus, .navbar-item:active {
          background-color: transparent !important;
        }
        @media screen and (max-width: 1023px) {
          .navbar-menu.is-active {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;