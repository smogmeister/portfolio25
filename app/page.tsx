 "use client";
import { LinkedinIcon, Mail, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#fcfcf9] flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-[1200px] relative">
        <div className="w-full inline-flex flex-col justify-center items-center gap-4">
          <div className="w-full flex flex-col lg:flex-row justify-start items-stretch gap-4">
            {/* Left: Intro card */}
            <section className="w-full lg:w-96 self-stretch p-8 bg-white rounded-[32px] outline outline-8 outline-offset-[-8px] outline-zinc-100 backdrop-blur-[20px] inline-flex flex-col justify-end items-start gap-4 overflow-hidden">
              <img src="/avatar.png" alt="Jan Brinkmann" className="" />

              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <p className="self-stretch text-zinc-700 text-2xl font-['Zodiak'] leading-6">
                    Hi, I’m <span className="underline">Jan</span>
                  </p>
                  <p className="self-stretch text-zinc-500 text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
                    I am a product designer that spent the last 5 years moving pixels to make people enjoy digital experiences.
                  </p>
                </div>

                <button 
                  onClick={() => setIsSheetOpen(true)}
                  className="group relative h-10 px-4 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center gap-2 bg-white/70 hover:bg-white transition overflow-visible cursor-pointer">
                  <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-300 ease-out shadow-[0_0_0_0px_rgba(229,231,235,0.5)] group-hover:shadow-[0_0_0_4px_rgba(229,231,235,0.5)]" />
                  <span className="relative z-10 text-zinc-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-6">
                    More about me
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 text-zinc-700 transition-transform duration-300 ease-out group-hover:-rotate-45" />
                </button>
              </div>
            </section>

            {/* Right: Projects + Contacts */}
            <div className="flex-1 flex flex-col justify-start items-start gap-4 self-stretch">
              {/* Projects row */}
              <div className="self-stretch flex flex-col md:flex-row justify-start items-stretch gap-4 flex-1">
                {/* Schaeffler medias card */}
                <motion.article 
                  className="flex-1 p-8 rounded-[32px] outline outline-8 outline-offset-[-8px] outline-[#AEBFB0] bg-[#5D7F62] backdrop-blur-[20px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:rounded-[32px] after:outline after:outline-8 after:outline-offset-[-8px] after:outline-[#AEBFB0] after:pointer-events-none after:z-20"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <div className="self-stretch flex flex-col justify-start items-start gap-6 relative z-10">
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                      <h2 className="self-stretch text-zinc-50 text-2xl font-['Zodiak'] leading-6">
                        Schaeffler medias
                      </h2>
                      <p className="self-stretch text-zinc-200 text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
                        medias is the B2B eCom platform of Schaeffler.
                      </p>
                    </div>
                  </div>
                  <motion.img 
                    src="/medias-solo.png" 
                    alt="Schaeffler medias" 
                    className="absolute bottom-10 right-4 scale-125 w-auto object-contain z-0"
                    variants={{
                      rest: { scale: 1.25, y: 0 },
                      hover: { scale: 1.5, y: -20 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.article>

                {/* Beautified.app card */}
                <motion.article 
                  className="flex-1 p-8 rounded-[32px] outline outline-8 outline-offset-[-8px] outline-[#F3D4C9] bg-[#E8A994] backdrop-blur-[20px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:rounded-[32px] after:outline after:outline-8 after:outline-offset-[-8px] after:outline-[#F3D4C9] after:pointer-events-none after:z-20"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <div className="self-stretch flex flex-col justify-start items-start gap-6 relative z-10">
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                      <h2 className="self-stretch text-zinc-900 text-2xl font-['Zodiak'] leading-6">
                        Beautified.app
                      </h2>
                      <p className="self-stretch text-zinc-700 text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
                        Beautified. app can turn data into pretty visuals by chatting with AI.
                      </p>
                    </div>
                  </div>
                  <motion.img 
                    src="/beautified-solo.png" 
                    alt="Beautified.app" 
                    className="absolute bottom-10 right-0 scale-125 w-auto object-contain z-0"
                    variants={{
                      rest: { scale: 1.25, y: 0 },
                      hover: { scale: 1.5, y: -20 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.article>
              </div>

              {/* Contact row */}
              <footer className="self-stretch p-8 bg-zinc-100 rounded-[32px] outline outline-8 outline-offset-[-8px] outline-white backdrop-blur-[20px] flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch flex flex-col justify-center items-center gap-6">
                  <div className="inline-flex justify-start items-start gap-4">
                    <motion.a
                      href="https://www.linkedin.com/in/jan-brinkmann-13a939181/"
                      className="group relative h-10 pr-4 min-w-[160px] rounded-[999px] outline outline-1 outline-[#DBE0DE] flex items-center gap-2 overflow-visible"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                    >
                      {/* animated white background */}
                      <motion.span
                        variants={{
                          rest: { width: "2.5rem" },
                          hover: { width: "100%" },
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute left-0 top-0 h-full rounded-[999px] bg-white"
                      />
                      {/* 3 animated outlines */}
                      <motion.span
                        variants={{
                          rest: { opacity: 0, scale: 1 },
                          hover: { 
                            opacity: 0.75, 
                            scale: 1,
                            transition: { delay: 0.3, duration: 0.2 }
                          },
                        }}
                        className="absolute inset-[-4px] rounded-[999px] outline outline-1 outline-[#DBE0DE] pointer-events-none"
                      />
                      <motion.span
                        variants={{
                          rest: { opacity: 0, scale: 1 },
                          hover: { 
                            opacity: 0.5, 
                            scale: 1,
                            transition: { delay: 0.35, duration: 0.2 }
                          },
                        }}
                        className="absolute inset-[-8px] rounded-[999px] outline outline-1 outline-[#DBE0DE] pointer-events-none"
                      />
                      <motion.span
                        variants={{
                          rest: { opacity: 0, scale: 1 },
                          hover: { 
                            opacity: 0.25, 
                            scale: 1,
                            transition: { delay: 0.4, duration: 0.2 }
                          },
                        }}
                        className="absolute inset-[-12px] rounded-[999px] outline outline-1 outline-[#DBE0DE] pointer-events-none"
                      />
                      <div className="w-full flex items-center relative z-10 gap-2">
                        <span className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                          <LinkedinIcon className="w-4 h-4 text-zinc-600" />
                        </span>
                        <div className="relative flex-1 flex justify-center">
                          <motion.span
                            variants={{
                              rest: { clipPath: "inset(0% 0% 0% 0%)" },
                              hover: { clipPath: "inset(0% 0% 0% 100%)" },
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="text-zinc-700 text-sm font-medium leading-6"
                          >
                            LinkedIn
                          </motion.span>
                          <motion.span
                            variants={{
                              rest: { clipPath: "inset(0% 100% 0% 0%)" },
                              hover: { clipPath: "inset(0% 0% 0% 0%)" },
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm font-medium leading-6"
                          >
                            Let's connect!
                          </motion.span>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="mailto:jbrinkmann31@gmail.com"
                      className="group relative h-10 pr-4 min-w-[140px] rounded-[999px] outline outline-1 outline-[#DBE0DE] flex items-center gap-2 overflow-visible"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                    >
                      <motion.span
                        variants={{
                          rest: { width: "2.5rem" },
                          hover: { width: "100%" },
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute left-0 top-0 h-full rounded-[999px] bg-white"
                      />
                      {/* 3 animated outlines */}
                      <motion.span
                        variants={{
                          rest: { opacity: 0, scale: 1 },
                          hover: { 
                            opacity: 0.75, 
                            scale: 1,
                            transition: { delay: 0.3, duration: 0.2 }
                          },
                        }}
                        className="absolute inset-[-4px] rounded-[999px] outline outline-1 outline-[#DBE0DE] pointer-events-none"
                      />
                      <motion.span
                        variants={{
                          rest: { opacity: 0, scale: 1 },
                          hover: { 
                            opacity: 0.5, 
                            scale: 1,
                            transition: { delay: 0.35, duration: 0.2 }
                          },
                        }}
                        className="absolute inset-[-8px] rounded-[999px] outline outline-1 outline-[#DBE0DE] pointer-events-none"
                      />
                      <motion.span
                        variants={{
                          rest: { opacity: 0, scale: 1 },
                          hover: { 
                            opacity: 0.25, 
                            scale: 1,
                            transition: { delay: 0.4, duration: 0.2 }
                          },
                        }}
                        className="absolute inset-[-12px] rounded-[999px] outline outline-1 outline-[#DBE0DE] pointer-events-none"
                      />
                      <div className="w-full flex items-center relative z-10 gap-2">
                        <span className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-zinc-600" />
                        </span>
                        <div className="relative flex-1 flex justify-center">
                          <motion.span
                            variants={{
                              rest: { clipPath: "inset(0% 0% 0% 0%)" },
                              hover: { clipPath: "inset(0% 0% 0% 100%)" },
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="text-zinc-700 text-sm font-medium leading-6"
                          >
                            Email
                          </motion.span>
                          <motion.span
                            variants={{
                              rest: { clipPath: "inset(0% 100% 0% 0%)" },
                              hover: { clipPath: "inset(0% 0% 0% 0%)" },
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm font-medium leading-6"
                          >
                            Let's talk!
                          </motion.span>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {isSheetOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsSheetOpen(false)}
              className="fixed inset-0 z-40 "
            />
            
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200 
              }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl rounded-t-[32px] h-screen overflow-y-auto"
            >
              {/* Close button */}
              <div className="sticky top-0 z-10 flex justify-center items-center pt-10 pb-8">
                <button
                  onClick={() => setIsSheetOpen(false)}
                  className="group relative h-10 w-10 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-center items-center gap-2 bg-[#EDF0EF] transition overflow-visible cursor-pointer"
                  aria-label="Close"
                >
                  <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-300 ease-out shadow-[0_0_0_0px_rgba(229,231,235,0.5)] group-hover:shadow-[0_0_0_4px_rgba(229,231,235,0.5)]" />
                  <X className="relative z-10 w-4 h-4 text-zinc-600 transition-transform duration-300 ease-out group-hover:rotate-90" />
                </button>
              </div>

              {/* Sheet content */}
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
