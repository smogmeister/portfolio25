"use client";
import { useState } from "react";
import IntroCard from "../components/IntroCard";
import ProjectCard from "../components/ProjectCard";
import ContactFooter from "../components/ContactFooter";
import BottomSheet from "../components/BottomSheet";
import ProjectBottomSheet from "../components/ProjectBottomSheet";

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
      <ProjectBottomSheet
        isOpen={openProject === "schaeffler"}
        onClose={() => setOpenProject(null)}
        title="Schaeffler medias"
        description={[
          <>
            medias is the B2B eCom platform of Schaeffler, one of the world's leading automotive and industrial suppliers. As the <span className="underline text-zinc-900">Design Lead</span>, I've been responsible for shaping the user experience and design strategy of this platform.
          </>,
          <>
            The platform serves thousands of B2B customers, providing them with an intuitive way to browse, configure, and order industrial products. My work here involves everything from user research and design strategy to pixel-perfect implementation and design system management.
          </>,
        ]}
        links={[
          { label: "View online", url: "https://medias.schaeffler.com" },
          { label: "View in Figma", url: "https://www.figma.com/design/E9h6FXwgYwqShDPrUyKpsl/Portfolio?node-id=8-7&t=fKPugTQKA8eOOZjf-1" },
        ]}
        images={[
          { src: "/schaeffler-example.png", alt: "schaeffler project 1" },
          { src: "/schaeffler-example-2.png", alt: "schaeffler project 2" },
          { src: "/schaeffler-example-3.png", alt: "schaeffler project 3" },
          { src: "/schaeffler-example-4.png", alt: "schaeffler project 4" },
        ]}
      />

      <ProjectBottomSheet
        isOpen={openProject === "beautified"}
        onClose={() => setOpenProject(null)}
        title="Beautified.app"
        description={[
          <>
            Beautified.app is my side project. Here I experiment with different AI technologies and design approaches. Originally I started this because I wanted a cool tool to visualize some data for my presentations, but it also found a small group of users.
          </>,
          <>
            Never the less, I do not see it as a Startup or SaaS, but more of a fun way to play and experiment with design and AI.
          </>,
        ]}
        links={[
          { label: "View online", url: "https://beautified.app" },
          { label: "View in Figma", url: "https://www.figma.com/design/E9h6FXwgYwqShDPrUyKpsl/Portfolio?node-id=48-12229&t=fKPugTQKA8eOOZjf-1" },
        ]}
        images={[
          { src: "/beautified-example.png", alt: "Beautified.app project 1" },
          { src: "/beautified-example-2.png", alt: "Beautified.app project 2" },
          { src: "/beautified-example-3.png", alt: "Beautified.app project 3" },
          { src: "/beautified-example-4.png", alt: "Beautified.app project 4" },
        ]}
      />
    </main>
  );
}
