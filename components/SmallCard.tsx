"use client";
import { motion } from "framer-motion";

interface SmallCardProps {
  title?: string;
  description?: string;
  outlineColor?: string;
  bgColor?: string;
  textColor?: string;
  textSecondaryColor?: string;
  index?: number;
  children?: React.ReactNode;
}

export default function SmallCard({
  title,
  description,
  outlineColor = "#343434",
  bgColor = "#272726",
  textColor = "text-zinc-800",
  textSecondaryColor = "text-zinc-500",
  index = 0,
  children,
}: SmallCardProps) {
  return (
    <motion.article 
      className="flex-[0.5] p-8 rounded-[32px] outline outline-8 outline-offset-[-8px] backdrop-blur-[20px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden relative h-full"
      style={{
        outlineColor: outlineColor,
        backgroundColor: bgColor,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut"
      }}
    >
      <div 
        className="absolute inset-0 rounded-[32px] pointer-events-none z-20"
        style={{
          outline: `8px solid ${outlineColor}`,
          outlineOffset: "-8px",
        }}
      />
      <div className="self-stretch flex flex-col justify-start items-start gap-6 relative z-10">
        {children || (
          <>
            {title && (
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <h2 className={`self-stretch ${textColor} text-2xl font-['Zodiak'] leading-6`}>
                  {title}
                </h2>
                {description && (
                  <p className={`self-stretch ${textSecondaryColor} text-base font-normal font-['Plus_Jakarta_Sans'] leading-6`}>
                    {description}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </motion.article>
  );
}
