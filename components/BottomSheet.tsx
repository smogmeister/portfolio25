"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      // Apply styles to lock scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      
      // Delay content animation until sheet opening animation completes
      setIsContentVisible(false);
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 200); // Start content animation earlier while drawer is still sliding up
      
      return () => {
        clearTimeout(timer);
        setIsContentVisible(false);
        // Restore scroll when component unmounts or closes
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    } else {
      setIsContentVisible(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ 
              opacity: 0,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0,
              filter: "blur(10px)"
            }}
            transition={{ 
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: `color-mix(in oklch, var(--background) calc(var(--bottomsheet-backdrop-opacity) * 100%), transparent)`,
            }}
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ 
              y: "100%",
              opacity: 0,
              filter: "blur(10px)"
            }}
            animate={{ 
              y: 0,
              opacity: 1,
              filter: "blur(0px)"
            }}
            exit={{ 
              y: "100%",
              opacity: 0,
              filter: "blur(10px)"
            }}
            transition={{
              type: "tween",
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-3xl rounded-t-[32px] overflow-y-auto"
            style={{
              height: '100dvh',
              maxHeight: '100dvh',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              backgroundColor: `color-mix(in oklch, var(--background) calc(var(--bottomsheet-sheet-opacity) * 100%), transparent)`,
            }}
          >
            {/* Close button header */}
            <div 
              className="sticky top-0 z-50 flex justify-center items-center pb-12 pt-12"
              style={{
                paddingTop: 'max(env(safe-area-inset-top, 0px) + 2.5rem, 2.5rem)',
              }}
            >
              {/* Gradient blur overlay for header */}
              <div 
                className="absolute inset-0 -top-2 -bottom-2 backdrop-blur-lg pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, transparent 0%, var(--background) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                }}
              />
              
              <motion.button
                onClick={onClose}
                className="group relative h-10 w-10 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-border inline-flex justify-center items-center bg-card/70 hover:bg-card transition-colors overflow-visible cursor-pointer z-10 pointer-events-auto"
                aria-label="Close"
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-500 ease-out shadow-[0_0_0_0px_color-mix(in_oklch,var(--border)_50%,transparent)] group-hover:shadow-[0_0_0_4px_color-mix(in_oklch,var(--border)_50%,transparent)]" />
                <X className="relative z-10 w-4 h-4 text-accent-foreground transition-transform duration-500 ease-out group-hover:rotate-90" />
              </motion.button>
            </div>
            
            {/* Sheet content */}
            <div 
              className="relative z-10"
              style={{
                paddingBottom: 'max(env(safe-area-inset-bottom, 0px) + 1rem, 1rem)',
              }}
            >
              {isContentVisible && (
                <div>
                  {children}
                </div>
              )}
            </div>
            
            {/* Bottom fade and blur overlay */}
            <div 
              className="sticky bottom-0 left-0 right-0 z-40 h-20 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

