"use client";

import React from 'react';
import Image from 'next/image';

const HeroSection = ({ content }: { content?: any }) => {
  const title = content?.title || "Designer, Frontend Developer & Mentor";
  const subtitle = content?.subtitle || "I design and code beautifully simple things, and I love what I do.";
    const avatar_url = content?.avatar_url || "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/mf-avatar-1.svg";
    const devices_url = content?.devices_url || "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c89d8fd-52ef-4284-9df1-c7298986b2ae-mattfarley-ca/assets/svgs/hero-devices-2.svg";
    const avatar_width = content?.avatar_width || "240px";
    const devices_width = content?.devices_width || "860px";

    return (
      <section 
        className="hero is-white has-text-centered relative"
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          paddingTop: '32px',
          textAlign: 'center',
          paddingBottom: '0px',
        }}
      >
        <div 
          className="hero-body"
          style={{
            padding: '48px',
            paddingBottom: '0px',
            flex: '1',
          }}
        >
          <div 
            className="container mx-auto"
            style={{
              maxWidth: '1344px',
              position: 'relative',
            }}
          >
            <div className="columns is-centered flex justify-center">
              <div className="column w-full max-w-4xl px-3">
                <h1 
                  className="title is-spaced"
                  style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: '#141c3a',
                    fontFamily: 'europa, sans-serif',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: '1.5rem',
                  }}
                >
                  {title}
                </h1>
                
                <h2 
                  className="subtitle"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: '#141c3a',
                    fontFamily: 'europa, sans-serif',
                    lineHeight: 1.4,
                    marginBottom: '3rem',
                    opacity: 0.9,
                  }}
                >
                  {subtitle}
                </h2>
                
                <div 
                  className="flex justify-center mb-12"
                  style={{
                    marginTop: '2rem',
                  }}
                >
                  <img 
                    className="avatar" 
                    src={avatar_url} 
                    alt="Avatar"
                    style={{
                      width: avatar_width,
                      height: 'auto',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className="hero-foot"
          style={{
            paddingTop: '3rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div 
            className="container mx-auto flex justify-center overflow-hidden"
            style={{
              maxWidth: '1344px',
            }}
          >
            <img 
              className="is-bottom" 
              src={devices_url} 
              alt="Hero Devices illustration"
              style={{
                width: '100%',
                maxWidth: devices_width,
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </div>
        </div>

      <style jsx global>{`
        @media screen and (max-width: 768px) {
          .hero h1.title {
            font-size: 2rem !important;
          }
          .hero h2.subtitle {
            font-size: 1.25rem !important;
          }
          .hero .avatar {
            width: 180px !important;
          }
        }
        @media screen and (max-width: 480px) {
          .hero h1.title {
            font-size: 1.75rem !important;
          }
          .hero .avatar {
            width: 150px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;