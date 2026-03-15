"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import IntroCard from "../components/IntroCard";
import ProjectCard from "../components/ProjectCard";
import ContactFooter from "../components/ContactFooter";
import BottomSheet from "../components/BottomSheet";
import ProjectBottomSheet from "../components/ProjectBottomSheet";
import { Highlighter } from "../components/ui/highlighter";

type ProjectType = "profile" | "schaeffler" | "beautified" | null;

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openProject, setOpenProject] = useState<ProjectType>(null);

  return (
    <main className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans'] relative">
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat bg-fixed"
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        
      />
      <div className="w-full max-w-[1200px] relative z-10">
        <div className="w-full inline-flex flex-col justify-center items-center gap-4">
          <div className="w-full flex flex-col lg:flex-row justify-start items-stretch gap-4">
            {/* Left: Intro card */}
            <IntroCard onMoreClick={() => setIsSheetOpen(true)} index={0} />

            {/* Right: Projects + Contacts */}
            <div className="flex-1 flex flex-col justify-start items-stretch gap-4 self-stretch">
              {/* Projects row */}
              <section className="self-stretch flex flex-col md:flex-row justify-start items-stretch gap-4 flex-1" aria-label="Featured projects">
                {/* Schaeffler medias card */}
                <ProjectCard
                  title="Schaeffler medias"
                  description="Owning the design of the entire Schaeffler B2B eCom platform."
                  projectType="schaeffler"
                  onClick={() => setOpenProject("schaeffler")}
                  index={1}
                />

                {/* Beautified.app card */}
                <ProjectCard
                  title="Beautified.app"
                  description="I created Beautified.app to visualize data and experiment with AI."
                  projectType="beautified"
                  onClick={() => setOpenProject("beautified")}
                  index={2}
                />
              </section>

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
              className="text-3xl font-['Zodiak'] text-foreground mb-6"
              initial={{ opacity: 0, filter: "blur(10px)", y: 2 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ 
                opacity: { duration: 0.9, delay: 0, ease: [0.4, 0, 0.2, 1] },
                filter: { duration: 0.9, delay: 0, ease: [0.4, 0, 0.2, 1] },
                y: { duration: 0.7, delay: 0, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              Numbers, convenience and design...
            </motion.h2>
            <motion.p 
              className="text-muted-foreground font-['Plus_Jakarta_Sans'] leading-relaxed mb-4"
              initial={{ opacity: 0, filter: "blur(10px)", y: 2 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ 
                opacity: { duration: 0.9, delay: 0.1, ease: [0.4, 0, 0.2, 1] },
                filter: { duration: 0.9, delay: 0.1, ease: [0.4, 0, 0.2, 1] },
                y: { duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              ....that's me in a nutshell. I enjoy making stuff that <Highlighter type="underline" animationDelay={1500} padding={1} color="var(--primary)" animationDuration={400} className="text-muted-foreground"> brings joy into peoples daily lives.</Highlighter> (Possibly because my girlfriend always gets really annoyed at bad HMIs, so I'd like to do better.) I have also developed an unhealthy <Highlighter type="underline" animationDelay={2000} padding={1} color="var(--primary)" animationDuration={400} className="text-muted-foreground">obsession with numbers and data</Highlighter>, so I guess that's what got me here.
            </motion.p>
            <motion.p 
              className="text-muted-foreground font-['Plus_Jakarta_Sans'] leading-relaxed mb-4"
              initial={{ opacity: 0, filter: "blur(10px)", y: 2 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ 
                opacity: { duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] },
                filter: { duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] },
                y: { duration: 0.9, delay: 0.4, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              Fun aside, curiosity and hunger to do cool stuff is what gets me motivated in the morning. For me, quality is in simplicity. Thats why I focus on making delightful software, where decisions are backed by data in combination with components that feel premium. At the moment I am the <Highlighter type="underline" animationDelay={2500} padding={1} color="var(--primary)" animationDuration={400} className="text-muted-foreground">Design Lead</Highlighter> at Schaeffler medias. While I do spent most of my time designing, my responsibilities also include overseeing the entire design lifecycle from budgets and design strategy to shipping final designs and guiding new designers. <Highlighter type="underline" animationDelay={3000} padding={1} color="var(--primary)" animationDuration={400} className="text-muted-foreground">AI</Highlighter> has also become a huge part in my daily work and I am excited to see what other limits AI will push.
            </motion.p>
            <motion.p 
              className="text-muted-foreground font-['Plus_Jakarta_Sans'] leading-relaxed"
              initial={{ opacity: 0, filter: "blur(10px)", y: 2 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ 
                opacity: { duration: 1.2, delay: 0.6, ease: [0.4, 0, 0.2, 1] },
                filter: { duration: 1.2, delay: 0.6, ease: [0.4, 0, 0.2, 1] },
                y: { duration: 0.9, delay: 0.6, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              Gaming was and still is a huge part of my life. So a dream of mine would be to <Highlighter type="underline" animationDelay={3500} padding={1} color="var(--primary)" animationDuration={400} className="text-muted-foreground" multiline={true}>design the interface for a game</Highlighter>.
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
            medias is the B2B eCom platform of Schaeffler, one of the world's leading automotive and industrial suppliers, that serves thousands of B2B customers daily. As the <span className="underline text-accent-foreground">Design Lead</span>, I own the end-to-end design process and design strategy of this platform.
          </>,
          <>
            Since I took over that role in 2023, I have established a new design language, introduced a scalable design system, and added usability and conversion improvements, based on data. I am also responsible for making design/budget decisions to align design with business goals. I also started introdcuing AI tools into the design process to close the gap between design and development.
          </>,
        ]}
        links={[
          { label: "View online", url: "https://medias.schaeffler.com" },
          { label: "View in Figma", url: "https://www.figma.com/design/E9h6FXwgYwqShDPrUyKpsl/Portfolio?node-id=8-7&t=fKPugTQKA8eOOZjf-1" },
        ]}
        galleries={[
          {
            headline: "Search results",
            subheader: "Finding products is the main feature of the platform. Almost every element is A/B tested and personalised for screesizes, user roles and use cases.",
            images: [
              { src: "https://storage.googleapis.com/storage_images_public/srp-main.png", alt: "Search result page overview" },
              { src: "https://storage.googleapis.com/storage_images_public/srp-details-1.png", alt: "Search result page details 1" },
              { src: "https://storage.googleapis.com/storage_images_public/srp-details-2.png", alt: "Search result page details 2" },
              { src: "https://storage.googleapis.com/storage_images_public/srp-details-4.png", alt: "Search result page details 3" },
            ],
          },
          {
            headline: "Product details",
            subheader: "Data-driven and A/B tested monster pages that are personalised for user roles, product families and intent.",
            images: [
              { src: "https://storage.googleapis.com/storage_images_public/schaeffler-example-4.png", alt: "Product detail page example" },
            ],
          },
          {
            headline: "Product configurations ",
            subheader: "Configuring highly technical products went from hours to literally seconds.",
            images: [
              { src: "https://storage.googleapis.com/storage_images_public/schaeffler-example-2.png", alt: "Product configurator 1" },
              { src: "https://storage.googleapis.com/storage_images_public/schaeffler-example-3.png", alt: "Product configurator 2" },
            ],
          },
          {
            headline: "Mass orders",
            subheader: "Order hundreds of products at once with a single click.",
            images: [
              { src: "https://storage.googleapis.com/storage_images_public/bulk_entry_1.jpg", alt: "Bulk entry page example" },
              { src: "https://storage.googleapis.com/storage_images_public/bulk_entry_2.jpg", alt: "Bulk entry page example 2" },
            ],
          },
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
          { src: "https://storage.googleapis.com/storage_images_public/beautified-example.png", alt: "Beautified.app project 1" },
          { src: "https://storage.googleapis.com/storage_images_public/beautified-example-2.png", alt: "Beautified.app project 2" },
          { src: "https://storage.googleapis.com/storage_images_public/beautified-example-3.png", alt: "Beautified.app project 3" },
          { src: "https://storage.googleapis.com/storage_images_public/beautified-example-4.png", alt: "Beautified.app project 4" },
        ]}
        galleries={[
          {
            headline: "Main editor with AI chat",
            subheader: "Main functionality of the app. Users can chat with AI to create charts.",
            images: [
              { src: "https://storage.googleapis.com/storage_images_public/beautified-example.png", alt: "Dashboard view 1" },
            ],
          },
          {
            headline: "Main editor with styles",
            subheader: "Allow users to manually adjust styles of their charts.",
            images: [
              { src: "https://storage.googleapis.com/storage_images_public/beautified-example-2.png", alt: "Chart creation view 1" },
            ],
          },
          {
            headline: "Dynamic pricing",
            subheader: "One time purchases to fill up on AI credits. Each chat is one credit.",
            images: [
              { src: "https://storage.googleapis.com/storage_images_public/beautified-example-3.png", alt: "AI features view 1" },
            ],
          },
          {
            headline: "Homepage for signed-in users",
            subheader: "Signed-in users can manage their recent projects from the homepage.",
            images: [
              { src: "https://storage.googleapis.com/storage_images_public/beautified-example-4.png", alt: "Project management view 1" },
            ],
          },
        ]}
      />

      {/* Imprint link */}
      <a 
        href="https://beautified.app/imprint"
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors z-20"
      >
        Imprint
      </a>
    </main>
  );
}
