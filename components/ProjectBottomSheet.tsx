"use client";
import BottomSheet from "./BottomSheet";
import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: ReactNode[];
  links: ProjectLink[];
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ProjectBottomSheet({
  isOpen,
  onClose,
  title,
  description,
  links,
  images,
}: ProjectBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-2xl mx-auto">
          <motion.h2 
            className="text-3xl font-['Zodiak'] text-zinc-900 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0, ease: "easeOut" },
              y: { duration: 0.7, delay: 0, ease: "easeOut" }
            }}
          >
            {title}
          </motion.h2>
          
          {/* 2-column layout: Description + Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
            {/* Left column: Description */}
            <div className="lg:col-span-2">
              {description.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-zinc-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4 last:mb-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.2 + index * 0.15, ease: "easeOut" },
                    y: { duration: 0.7, delay: 0.2 + index * 0.15, ease: "easeOut" }
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            
            {/* Right column: Buttons */}
            <div className="flex flex-col gap-3 lg:items-start">
              {links.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.2 + index * 0.15, ease: "easeOut" },
                    y: { duration: 0.7, delay: 0.2 + index * 0.15, ease: "easeOut" }
                  }}
                  layout={false}
                  className="w-full"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-10 px-4 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center gap-2 bg-white/70 hover:bg-white transition overflow-visible cursor-pointer w-full "
                  >
                    <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-500 ease-out shadow-[0_0_0_0px_rgba(229,231,235,0.5)] group-hover:shadow-[0_0_0_4px_rgba(229,231,235,0.5)]" />
                    <span className="relative z-10 text-zinc-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-6">
                      {link.label}
                    </span>
                    <ExternalLink className="relative z-10 w-4 h-4 text-zinc-700" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-x-3 gap-y-3 sm:gap-x-4 sm:gap-y-4">
            {/* Image 1 - Full width, maintains aspect ratio */}
            <motion.div 
              className="col-span-2 sm:col-span-4 lg:col-span-4 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.35, ease: "easeOut" },
                y: { duration: 0.7, delay: 0.35, ease: "easeOut" }
              }}
            >
              <img 
                src={images[0]?.src || ""} 
                alt={images[0]?.alt || ""} 
                className="w-full h-auto object-contain rounded-2xl shadow-sm"
              />
            </motion.div>
            {/* Image 2 */}
            <motion.div 
              className="col-span-2 sm:col-span-2 lg:col-span-2 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.5, ease: "easeOut" },
                y: { duration: 0.7, delay: 0.5, ease: "easeOut" }
              }}
            >
              <img 
                src={images[1]?.src || ""} 
                alt={images[1]?.alt || ""} 
                className="w-full h-auto object-contain rounded-2xl shadow-sm"
              />
            </motion.div>
            {/* Image 3 */}
            <motion.div 
              className="col-span-2 sm:col-span-2 lg:col-span-2 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.65, ease: "easeOut" },
                y: { duration: 0.7, delay: 0.65, ease: "easeOut" }
              }}
            >
              <img 
                src={images[2]?.src || ""} 
                alt={images[2]?.alt || ""} 
                className="w-full h-auto object-contain rounded-2xl shadow-sm"
              />
            </motion.div>
            {/* Image 4 - Full width, maintains aspect ratio */}
            <motion.div 
              className="col-span-2 sm:col-span-4 lg:col-span-4 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.8, ease: "easeOut" },
                y: { duration: 0.7, delay: 0.8, ease: "easeOut" }
              }}
            >
              <img 
                src={images[3]?.src || ""} 
                alt={images[3]?.alt || ""} 
                className="w-full h-auto object-contain rounded-2xl shadow-sm"
              />
            </motion.div>
          </div>

          {/* Disclaimer text */}
          <motion.p
            className="text-zinc-500 text-xs font-['Plus_Jakarta_Sans'] mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.95, ease: "easeOut" },
              y: { duration: 0.7, delay: 0.95, ease: "easeOut" }
            }}
          >
            The images above are a small sample size for visual reference. Check the production system or Figma for details.
          </motion.p>
        </div>
      </div>
    </BottomSheet>
  );
}

