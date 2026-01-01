import React from 'react';
import { Layers, Terminal, BookOpen } from 'lucide-react';

const SkillsCard = () => {
  return (
    <section className="relative -mt-24 md:-mt-32 px-4 pb-20 md:pb-32 bg-white">
      <div className="max-w-[1200px] mx-auto bg-white rounded-[12px] border border-[#e6ecf8] shadow-[0_5px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          
          {/* Designer Column */}
          <div className="flex flex-col items-center text-center p-12 md:p-16 border-b md:border-b-0 md:border-r border-[#e6ecf8]">
            <div className="w-16 h-16 mb-8 rounded-full bg-[#5be9b9] flex items-center justify-center">
              <Layers className="text-[#141c3a] w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-[#141c3a] text-2xl font-bold mb-6 font-display">Designer</h2>
            <p className="text-[#141c3a] text-lg leading-relaxed mb-10 max-w-[280px]">
              I value simple content structure, clean design patterns, and thoughtful interactions.
            </p>
            <div className="mb-10">
              <h3 className="text-[#7510f7] text-lg font-normal mb-2 font-display">Things I enjoy designing:</h3>
              <p className="text-[#141c3a] text-lg">UX, UI, Web, Apps, Logos</p>
            </div>
            <div>
              <h3 className="text-[#7510f7] text-lg font-normal mb-6 font-display">Design Tools:</h3>
              <ul className="text-[#141c3a] text-lg space-y-3">
                <li>Affinity Designer</li>
                <li>Figma</li>
                <li>Pen & Paper</li>
                <li>Sketch</li>
              </ul>
            </div>
          </div>

          {/* Frontend Developer Column */}
          <div className="flex flex-col items-center text-center p-12 md:p-16 border-b md:border-b-0 md:border-r border-[#e6ecf8]">
            <div className="w-16 h-16 mb-8 rounded-full bg-[#5be9b9] flex items-center justify-center">
              <Terminal className="text-[#141c3a] w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-[#141c3a] text-2xl font-bold mb-6 font-display">Frontend Developer</h2>
            <p className="text-[#141c3a] text-lg leading-relaxed mb-10 max-w-[280px]">
              I like to code things from scratch, and enjoy bringing ideas to life in the browser.
            </p>
            <div className="mb-10">
              <h3 className="text-[#7510f7] text-lg font-normal mb-2 font-display">Languages I speak:</h3>
              <p className="text-[#141c3a] text-lg">HTML, Pug, Slim, CSS, Sass, Git</p>
            </div>
            <div>
              <h3 className="text-[#7510f7] text-lg font-normal mb-6 font-display">Dev Tools:</h3>
              <ul className="text-[#141c3a] text-lg space-y-3">
                <li>Astro JS</li>
                <li>Bitbucket</li>
                <li>Bootstrap</li>
                <li>Bulma</li>
                <li>Codekit</li>
                <li>Github</li>
                <li>Netlify</li>
                <li>Tailwind CSS</li>
                <li>VS Code</li>
              </ul>
            </div>
          </div>

          {/* Mentor Column */}
          <div className="flex flex-col items-center text-center p-12 md:p-16">
            <div className="w-16 h-16 mb-8 rounded-full bg-[#5be9b9] flex items-center justify-center">
              <BookOpen className="text-[#141c3a] w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-[#141c3a] text-2xl font-bold mb-6 font-display">Mentor</h2>
            <p className="text-[#141c3a] text-lg leading-relaxed mb-10 max-w-[280px]">
              I genuinely care about people, and enjoy helping them work on their craft.
            </p>
            <div className="mb-10">
              <h3 className="text-[#7510f7] text-lg font-normal mb-2 font-display">Experiences I draw from:</h3>
              <p className="text-[#141c3a] text-lg">UX/UI, Product design, Freelancing</p>
            </div>
            <div>
              <h3 className="text-[#7510f7] text-lg font-normal mb-6 font-display">Mentor Stats:</h3>
              <ul className="text-[#141c3a] text-lg space-y-3">
                <li>9+ years experience</li>
                <li>30+ short courses</li>
                <li>65+ bootcamps</li>
                <li>250+ students</li>
                <li>2,500+ mentor sessions</li>
                <li>60+ group critiques</li>
                <li>18,000+ bits of feedback</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SkillsCard;