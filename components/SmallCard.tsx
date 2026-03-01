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
  outlineColor,
  bgColor,
  textColor,
  textSecondaryColor,
  index = 0,
  children,
}: SmallCardProps) {
  // Use theme-aware colors if not provided
  const finalOutlineColor = outlineColor || "var(--border)";
  const finalBgColor = bgColor || "var(--card)";
  const finalTextColor = textColor || "text-foreground";
  const finalTextSecondaryColor = textSecondaryColor || "text-muted-foreground";
  
  // Check if using default theme colors (footer style)
  const isFooterStyle = !outlineColor && !bgColor;
  
  return (
    <motion.div
      className={isFooterStyle ? "flex-[0.5] rounded-[32px] border border-border/50 p-[1px]" : "flex-[0.5] rounded-[32px] border p-[1px]"}
      style={!isFooterStyle ? {
        borderColor: finalOutlineColor,
      } : undefined}
      initial={isFooterStyle ? {
        opacity: 0,
        filter: "blur(10px)",
        y: 10,
      } : {
        opacity: 0,
        y: 20,
      }}
      animate={isFooterStyle ? {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      } : {
        opacity: 1,
        y: 0,
      }}
      transition={isFooterStyle ? {
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      } : {
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut"
      }}
    >
      <motion.article 
        className={isFooterStyle 
          ? "w-full h-full p-8 bg-card rounded-[32px] border border-border/50 outline outline-12 outline-offset-[-12px] outline-white inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden relative h-full"
          : "w-full h-full p-8 rounded-[32px] border outline outline-12 outline-offset-[-12px] backdrop-blur-[20px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden relative h-full"
        }
        style={!isFooterStyle ? {
          outlineColor: finalOutlineColor,
          backgroundColor: finalBgColor,
          borderColor: finalOutlineColor,
        } : undefined}
      >
      {!isFooterStyle && (
        <div 
          className="absolute inset-0 rounded-[32px] pointer-events-none z-20"
          style={{
            outline: `12px solid ${finalOutlineColor}`,
            outlineOffset: "-12px",
          }}
        />
      )}
      <div className="self-stretch flex flex-col justify-start items-start gap-6 relative z-10">
        {children || (
          <>
            {title && (
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <h2 className={`self-stretch ${finalTextColor} text-2xl font-['Zodiak'] leading-6`}>
                  {title}
                </h2>
                {description && (
                  <p className={`self-stretch ${finalTextSecondaryColor} text-base font-normal font-['Plus_Jakarta_Sans'] leading-6`}>
                    {description}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </motion.article>
    </motion.div>
  );
}
