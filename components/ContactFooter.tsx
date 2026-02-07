"use client";
import { LinkedinIcon, Mail } from "lucide-react";
import { motion } from "framer-motion";
import ContactButton from "./ContactButton";

interface ContactFooterProps {
  index?: number;
}

export default function ContactFooter({ index = 0 }: ContactFooterProps) {
  return (
    <motion.footer 
      className="self-stretch w-full p-8 bg-zinc-100 rounded-[32px] outline outline-8 outline-offset-[-8px] outline-white backdrop-blur-[20px] flex flex-col justify-start items-start gap-2.5"
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
  );
}

