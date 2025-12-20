"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
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
      
      return () => {
        // Restore scroll when component unmounts or closes
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
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
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-3xl rounded-t-[32px] h-screen overflow-y-auto"
          >
            {/* Close button */}
            
            <div className="sticky top-0 z-40 flex justify-center items-center pt-6 sm:pt-10 pb-6 sm:pb-8">
              <button
                onClick={onClose}
                className="group relative h-10 w-10 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-center items-center gap-2 bg-[#EDF0EF] transition overflow-visible cursor-pointer"
                aria-label="Close"
              >
                <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-500 ease-out shadow-[0_0_0_0px_rgba(229,231,235,0.5)] group-hover:shadow-[0_0_0_4px_rgba(229,231,235,0.5)]" />
                <X className="relative z-10 w-4 h-4 text-zinc-600 transition-transform duration-500 ease-out group-hover:rotate-90" />
              </button>
            </div>

            {/* Sheet content */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

