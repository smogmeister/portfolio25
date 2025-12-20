"use client";
import { useState } from "react";
import IntroCard from "../components/IntroCard";
import ProjectCard from "../components/ProjectCard";
import ContactFooter from "../components/ContactFooter";
import BottomSheet from "../components/BottomSheet";
import { ExternalLink } from "lucide-react";

type ProjectType = "profile" | "schaeffler" | "beautified" | null;

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openProject, setOpenProject] = useState<ProjectType>(null);

  return (
    <main className="min-h-screen w-full bg-[#fcfcf9] flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-[1200px] relative">
        <div className="w-full inline-flex flex-col justify-center items-center gap-4">
          <div className="w-full flex flex-col lg:flex-row justify-start items-stretch gap-4">
            {/* Left: Intro card */}
            <IntroCard onMoreClick={() => setIsSheetOpen(true)} />

            {/* Right: Projects + Contacts */}
            <div className="flex-1 flex flex-col justify-start items-start gap-4 self-stretch">
              {/* Projects row */}
              <div className="self-stretch flex flex-col md:flex-row justify-start items-stretch gap-4 flex-1">
                {/* Schaeffler medias card */}
                <ProjectCard
                  title="Schaeffler medias"
                  description="medias is the B2B eCom platform of Schaeffler."
                  imageSrc="/medias-solo.png"
                  imageAlt="Schaeffler medias"
                  outlineColor="#AEBFB0"
                  bgColor="#5D7F62"
                  textColor="text-zinc-50"
                  textSecondaryColor="text-zinc-200"
                  imagePosition="right-4"
                  onClick={() => setOpenProject("schaeffler")}
                />

                {/* Beautified.app card */}
                <ProjectCard
                  title="Beautified.app"
                  description="Beautified. app can turn data into pretty visuals by chatting with AI."
                  imageSrc="/beautified-solo.png"
                  imageAlt="Beautified.app"
                  outlineColor="#F3D4C9"
                  bgColor="#E8A994"
                  textColor="text-zinc-900"
                  textSecondaryColor="text-zinc-700"
                  imagePosition="right-0"
                  onClick={() => setOpenProject("beautified")}
                />
              </div>

              {/* Contact row */}
              <ContactFooter />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Bottom Sheet */}
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <div className="px-8 pb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-['Zodiak'] text-zinc-900 mb-6">
              Numbers, convenience and design...
            </h2>
            <p className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
              ....that's me in a nutshell. I enjoy making stuff that <span className="underline text-zinc-900"> brings joy into peoples daily lives.</span> (Possibly because my girlfriend always gets really annoyed at bad HMIs, so I'd like to do better.) I have also developed an unhealthy <span className="underline text-zinc-900">obsession with numbers and data</span>, so I guess that's what got me here.
            </p>
            <p className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
              Fun aside, I like what I am doing and I enjoy growing in it. My quality standards are extremely high, and I enjoy to be experimental. At the moment I am the <span className="underline text-zinc-900">Design Lead</span> at Schaeffler medias. While my work mostly revolves around the normal tasks of a product designer, my responsibilities also include overseeing the entire design process from budgets to design strategy to guiding new designers. <span className="underline text-zinc-900">AI</span> has also become a huge part in my daily work and I am excited to see what other limits AI will push.
            </p>
            <p className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed">
              Gaming was and still is a huge part of my life. So a dream of mine would be to <span className="underline text-zinc-900">design the interface for a game.</span> 
            </p>
          </div>
        </div>
      </BottomSheet>

      {/* Project Bottom Sheets */}
      <BottomSheet isOpen={openProject === "schaeffler"} onClose={() => setOpenProject(null)}>
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-['Zodiak'] text-zinc-900 mb-8">
              Schaeffler medias
            </h2>
            
            {/* 2-column layout: Description + Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Left column: Description */}
              <div className="lg:col-span-2">
                <p className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
                  medias is the B2B eCom platform of Schaeffler, one of the world's leading automotive and industrial suppliers. As the <span className="underline text-zinc-900">Design Lead</span>, I've been responsible for shaping the user experience and design strategy of this platform.
                </p>
                <p className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
                  The platform serves thousands of B2B customers, providing them with an intuitive way to browse, configure, and order industrial products. My work here involves everything from user research and design strategy to pixel-perfect implementation and design system management.
                </p>
                <p className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  Working on medias has been an incredible journey in understanding complex B2B workflows and translating them into elegant, user-friendly interfaces.
                </p>
              </div>
              
              {/* Right column: Buttons */}
              <div className="flex flex-col gap-3 lg:items-start">
                <a
                  href="https://medias.schaeffler.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-10 px-4 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center gap-2 bg-white/70 hover:bg-white transition overflow-visible cursor-pointer w-full lg:w-auto"
                >
                  <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-300 ease-out shadow-[0_0_0_0px_rgba(229,231,235,0.5)] group-hover:shadow-[0_0_0_4px_rgba(229,231,235,0.5)]" />
                  <span className="relative z-10 text-zinc-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-6">
                    Website
                  </span>
                  <ExternalLink className="relative z-10 w-4 h-4 text-zinc-700" />
                </a>
                <a
                  href="https://www.figma.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-10 px-4 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center gap-2 bg-white/70 hover:bg-white transition overflow-visible cursor-pointer w-full lg:w-auto"
                >
                  <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-300 ease-out shadow-[0_0_0_0px_rgba(229,231,235,0.5)] group-hover:shadow-[0_0_0_4px_rgba(229,231,235,0.5)]" />
                  <span className="relative z-10 text-zinc-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-6">
                    Figma
                  </span>
                  <ExternalLink className="relative z-10 w-4 h-4 text-zinc-700" />
                </a>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
              {/* Image 1 - Large featured image, spans 2x2 on larger screens */}
              <div className="col-span-2 sm:col-span-2 lg:col-span-2 row-span-2 aspect-square sm:aspect-[2/1] lg:aspect-square">
                <img 
                  src="/medias-solo.png" 
                  alt="Schaeffler medias project 1" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 2 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/medias-solo.png" 
                  alt="Schaeffler medias project 2" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 3 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/medias-solo.png" 
                  alt="Schaeffler medias project 3" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 4 - Wide image spanning 2 columns */}
              <div className="col-span-2 sm:col-span-2 lg:col-span-2 row-span-1 aspect-[2/1]">
                <img 
                  src="/medias-solo.png" 
                  alt="Schaeffler medias project 4" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 5 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/medias-solo.png" 
                  alt="Schaeffler medias project 5" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 6 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/medias-solo.png" 
                  alt="Schaeffler medias project 6" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 7 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/medias-solo.png" 
                  alt="Schaeffler medias project 7" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 8 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/medias-solo.png" 
                  alt="Schaeffler medias project 8" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet isOpen={openProject === "beautified"} onClose={() => setOpenProject(null)}>
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-['Zodiak'] text-zinc-900 mb-8">
              Beautified.app
            </h2>
            
            {/* 2-column layout: Description + Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Left column: Description */}
              <div className="lg:col-span-2">
                <p className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
                  Beautified.app is an innovative platform that transforms data into beautiful visuals through AI-powered conversations. This project represents my passion for <span className="underline text-zinc-900">combining design with AI technology</span> to create intuitive user experiences.
                </p>
                <p className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
                  The challenge was to make complex data visualization accessible to everyone, regardless of their technical background. By leveraging AI, users can simply describe what they want to see, and the platform generates professional, publication-ready visuals.
                </p>
                <p className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  This project showcases how thoughtful design can bridge the gap between powerful technology and everyday usability, making data storytelling more accessible and enjoyable.
                </p>
              </div>
              
              {/* Right column: Buttons */}
              <div className="flex flex-col gap-3 lg:items-start">
                <a
                  href="https://beautified.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-10 px-4 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center gap-2 bg-white/70 hover:bg-white transition overflow-visible cursor-pointer w-full lg:w-auto"
                >
                  <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-300 ease-out shadow-[0_0_0_0px_rgba(229,231,235,0.5)] group-hover:shadow-[0_0_0_4px_rgba(229,231,235,0.5)]" />
                  <span className="relative z-10 text-zinc-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-6">
                    Website
                  </span>
                  <ExternalLink className="relative z-10 w-4 h-4 text-zinc-700" />
                </a>
                <a
                  href="https://www.figma.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-10 px-4 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center gap-2 bg-white/70 hover:bg-white transition overflow-visible cursor-pointer w-full lg:w-auto"
                >
                  <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-300 ease-out shadow-[0_0_0_0px_rgba(229,231,235,0.5)] group-hover:shadow-[0_0_0_4px_rgba(229,231,235,0.5)]" />
                  <span className="relative z-10 text-zinc-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-6">
                    Figma
                  </span>
                  <ExternalLink className="relative z-10 w-4 h-4 text-zinc-700" />
                </a>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
              {/* Image 1 - Large featured image, spans 2x2 on larger screens */}
              <div className="col-span-2 sm:col-span-2 lg:col-span-2 row-span-2 aspect-square sm:aspect-[2/1] lg:aspect-square">
                <img 
                  src="/beautified-solo.png" 
                  alt="Beautified.app project 1" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 2 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/beautified-solo.png" 
                  alt="Beautified.app project 2" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 3 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/beautified-solo.png" 
                  alt="Beautified.app project 3" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 4 - Wide image spanning 2 columns */}
              <div className="col-span-2 sm:col-span-2 lg:col-span-2 row-span-1 aspect-[2/1]">
                <img 
                  src="/beautified-solo.png" 
                  alt="Beautified.app project 4" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 5 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/beautified-solo.png" 
                  alt="Beautified.app project 5" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 6 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/beautified-solo.png" 
                  alt="Beautified.app project 6" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 7 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/beautified-solo.png" 
                  alt="Beautified.app project 7" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Image 8 */}
              <div className="col-span-1 row-span-1 aspect-square">
                <img 
                  src="/beautified-solo.png" 
                  alt="Beautified.app project 8" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </main>
  );
}
