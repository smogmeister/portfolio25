"use client";
import { LinkedinIcon, Mail } from "lucide-react";
import { motion } from "framer-motion";
import ContactButton from "./ContactButton";

interface ContactFooterProps {
  index?: number;
}

export default function ContactFooter({ index = 0 }: ContactFooterProps) {
  return (
    <motion.div
      className="self-stretch w-full rounded-[32px] border border-border/50 p-[1px]"
      initial={{
        opacity: 0,
        filter: "blur(10px)",
        y: 10,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.footer 
        className="w-full h-full p-8 bg-card rounded-[32px] border border-border/50 outline outline-12 outline-offset-[-12px] outline-border/50 flex flex-col justify-start items-start gap-2.5"
      >
      <div className="self-stretch flex flex-col justify-center items-center gap-6">
        <div className="inline-flex justify-start items-start gap-4">
          <ContactButton
            href="https://www.linkedin.com/in/jan-brinkmann-13a939181/"
            icon={LinkedinIcon}
            defaultText="LinkedIn"
            hoverText="Let's connect!"
            minWidth="160px"
          />
          <ContactButton
            href="mailto:jbrinkmann31@gmail.com"
            icon={Mail}
            defaultText="Email"
            hoverText="Let's talk!"
            minWidth="140px"
          />
        </div>
      </div>
    </motion.footer>
    </motion.div>
  );
}

