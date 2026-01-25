"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
    <main className="min-h-screen w-full bg-[#fcfcf9] flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans'] relative">
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat bg-fixed"
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `radial-gradient(ellipse at center, transparent 10%, #fcfcf9 100%)`
        }}
      />
      <div className="w-full max-w-[1200px] relative z-10">
        <div className="w-full inline-flex flex-col justify-center items-center gap-4">
          <div className="w-full flex flex-col lg:flex-row justify-start items-stretch gap-4">
            {/* Left: Intro card */}
            <IntroCard onMoreClick={() => setIsSheetOpen(true)} index={0} />

            {/* Right: Projects + Contacts */}
            <div className="flex-1 flex flex-col justify-start items-start gap-4 self-stretch">
              {/* Projects row */}
              <div className="self-stretch flex flex-col md:flex-row justify-start items-stretch gap-4 flex-1">
                {/* Schaeffler medias card */}
                <ProjectCard
                  title="Schaeffler medias"
                  description="medias is the B2B eCom platform of Schaeffler that houses highly technical products."
                  imageSrc="/medias-solo.png"
                  imageAlt="Schaeffler medias"
                  outlineColor="#AEBFB0"
                  bgColor="#5D7F62"
                  textColor="text-white"
                  textSecondaryColor="text-zinc-100"
                  imagePosition="right-4"
                  onClick={() => setOpenProject("schaeffler")}
                  index={1}
                />

                {/* Beautified.app card */}
                <ProjectCard
                  title="Beautified.app"
                  description="Beautified.app can turn data into pretty visuals by chatting with AI."
                  imageSrc="/beautified-solo.png"
                  imageAlt="Beautified.app"
                  outlineColor="#F3D4C9"
                  bgColor="#E8A994"
                  textColor="text-zinc-800"
                  textSecondaryColor="text-zinc-700"
                  imagePosition="right-0"
                  onClick={() => setOpenProject("beautified")}
                  index={2}
                />
              </div>

              {/* Contact row */}
              <ContactFooter index={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Bottom Sheet */}
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <div className="px-8 pb-8">
          <div className="max-w-2xl mx-auto">
            <motion.h2 
              className="text-3xl font-['Zodiak'] text-zinc-800 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0, ease: "easeOut" },
                y: { duration: 0.7, delay: 0, ease: "easeOut" }
              }}
            >
              Numbers, convenience and design...
            </motion.h2>
            <motion.p 
              className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.2, ease: "easeOut" },
                y: { duration: 0.7, delay: 0.2, ease: "easeOut" }
              }}
            >
              ....that's me in a nutshell. I enjoy making stuff that <span className="underline text-zinc-900"> brings joy into peoples daily lives.</span> (Possibly because my girlfriend always gets really annoyed at bad HMIs, so I'd like to do better.) I have also developed an unhealthy <span className="underline text-zinc-900">obsession with numbers and data</span>, so I guess that's what got me here.
            </motion.p>
            <motion.p 
              className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.35, ease: "easeOut" },
                y: { duration: 0.7, delay: 0.35, ease: "easeOut" }
              }}
            >
              Fun aside, curiosity and hunger to do cool stuff is what gets me motivated in the morning. For me, quality is in simplicity. Thats why I focus on making delightful software, where decisions are backed by data in combination with components that feel premium. At the moment I am the <span className="underline text-zinc-900">Design Lead</span> at Schaeffler medias. While I do spent most of my time designing, my responsibilities also include overseeing the entire design lifecycle from budgets and design strategy to shipping final designs and guiding new designers. <span className="underline text-zinc-900">AI</span> has also become a huge part in my daily work and I am excited to see what other limits AI will push.
            </motion.p>
            <motion.p 
              className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.5, ease: "easeOut" },
                y: { duration: 0.7, delay: 0.5, ease: "easeOut" }
              }}
            >
              Gaming was and still is a huge part of my life. So a dream of mine would be to <span className="underline text-zinc-900">design the interface for a game.</span> 
            </motion.p>
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
            medias is the B2B eCom platform of Schaeffler, one of the world's leading automotive and industrial suppliers, that serves thousands of B2B customers daily. As the <span className="underline text-zinc-900">Design Lead</span>, I own the end-to-end design process and design strategy of this platform.
          </>,
          <>
            Since I took over that role in 2023, I have established a new design language, introduced a scalable design system, and added countless usability and conversion improvements, based on data. I am also responsible for making design/budget decisions to align design with business goals.
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
            Never the less, I do not see it as a Startup or SaaS, but more of a fun way to play and experiment with design and AI. I use Tailwind and Shadcn and made it completly with help of AI.
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

      {/* Imprint link */}
      <a 
        href="https://beautified.app/imprint"
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500 hover:text-zinc-700 hover:underline transition-colors z-20"
      >
        Imprint
      </a>
    </main>
  );
}
