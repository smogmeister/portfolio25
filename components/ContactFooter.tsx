"use client";
import { LinkedinIcon, Mail } from "lucide-react";
import ContactButton from "./ContactButton";

export default function ContactFooter() {
  return (
    <footer className="self-stretch p-8 bg-zinc-100 rounded-[32px] outline outline-8 outline-offset-[-8px] outline-white backdrop-blur-[20px] flex flex-col justify-start items-start gap-2.5">
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
    </footer>
  );
}

