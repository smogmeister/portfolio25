"use client";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Search, Wrench, GitCompare, ShoppingCart } from "lucide-react";
import BeautifiedFieldSVG from "./BeautifiedFieldSVG";

interface ProjectCardProps {
  title: string;
  description: string;
  outlineColor?: string;
  bgColor?: string;
  textColor?: string;
  textSecondaryColor?: string;
  projectType?: "schaeffler" | "beautified";
  onClick?: () => void;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  outlineColor,
  bgColor,
  textColor,
  textSecondaryColor,
  projectType,
  onClick,
  index = 0,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate random positions for chart SVGs (consistent per card based on index)
  const chartPositions = useMemo(() => {
    const charts = ["/pie.svg", "/area.svg", "/bar.svg", "/combo.svg"];
    const positions = charts.map((chart, i) => {
      // Use index as seed for consistent randomness
      const seed = (index * 4 + i) * 123.456;
      const random1 = Math.sin(seed) * 10000;
      const random2 = Math.sin(seed * 2) * 10000;
      const random3 = Math.sin(seed * 3) * 10000;
      
      // Position charts: area chart to the right, pie chart to the left
      const isAreaChart = chart === "/area.svg";
      const isPieChart = chart === "/pie.svg";
      
      let leftBase, leftRange;
      if (isAreaChart) {
        leftBase = 50; // Start more to the right for area chart
        leftRange = 45; // Range keeping it on the right side
      } else if (isPieChart) {
        leftBase = 0; // Start on the left
        leftRange = 30; // Smaller range, keeping it on the left side
      } else {
        leftBase = 0; // Wider range for others
        leftRange = 95;
      }
      
      // Adjust bottom position - pie chart should be lower
      let finalBottom;
      if (isPieChart) {
        finalBottom = Math.round((180 - 60 + (Math.abs(random1) % 50)) * 100) / 100; // Between 120px and 170px from bottom (lower position)
      } else {
        finalBottom = Math.round((180 - 100 + (Math.abs(random1) % 100)) * 100) / 100; // Between 80px and 180px from bottom (more spread)
      }
      const finalLeftPercent = Math.round((leftBase + (Math.abs(random2) % leftRange)) * 100) / 100;
      
      // Start position - in the SVG field (around 80-120px from bottom)
      const startBottom = Math.round((80 + (Math.abs(random1) % 40)) * 100) / 100; // Between 80px and 120px from bottom
      // Calculate upward movement (negative y = move up)
      const moveUp = Math.round((finalBottom - startBottom) * 100) / 100; // Positive value means moving up
      
      const width = Math.round((50 + (Math.abs(random3) % 25)) * 100) / 100;
      const rotation = Math.round(((Math.abs(random1) % 15) - 7) * 100) / 100;
      
      return {
        src: chart,
        // Final position after animation (scattered around SVG top edge)
        finalBottom: `${finalBottom}px`,
        finalLeft: `${finalLeftPercent}%`,
        // Start position (lower in the SVG field)
        startBottom: `${startBottom}px`, // Lower in the SVG field
        startLeft: '50%', // Center horizontally
        // Movement values
        moveUp: -moveUp, // Negative = move upward
        moveLeft: `calc(${finalLeftPercent}% - 50%)`, // Move horizontally from center
        width: `${width}px`, // Between 50px and 75px
        rotation: `${rotation}deg`, // Between -7deg and 7deg
        delay: i * 0.03,
      };
    });
    return positions;
  }, [index]);

  // Generate random positions for text cards (for Schaeffler)
  const textCardPositions = useMemo(() => {
    const texts = ["Search", "Configure", "Compare", "Buy"];
    const icons = [Search, Wrench, GitCompare, ShoppingCart];
    const positions = texts.map((text, i) => {
      // Use index as seed for consistent randomness
      const seed = (index * 4 + i) * 123.456;
      const random1 = Math.sin(seed) * 10000;
      const random2 = Math.sin(seed * 2) * 10000;
      const random3 = Math.sin(seed * 3) * 10000;
      
      // Distribute cards evenly across the full width of the SVG container
      // Use fixed positions with balanced spacing: 20%, 40%, 60%, 80%
      // These positions ensure cards are well-spaced without being too far apart
      const basePositions = [20, 40, 60, 80]; // Closer distribution across full width
      const finalLeftPercent = basePositions[i]; // Fixed position, no variation
      
      // Final position after animation (scattered vertically)
      // First 2 cards higher, last 2 cards lower
      let finalBottom;
      if (i < 2) {
        // First 2 cards: higher position (135-165px from bottom)
        finalBottom = Math.round((135 + (Math.abs(random1) % 30)) * 100) / 100;
      } else {
        // Last 2 cards: lower position (105-135px from bottom)
        finalBottom = Math.round((105 + (Math.abs(random1) % 30)) * 100) / 100;
      }
      
      // Start position - in the SVG field (around 80-120px from bottom)
      const startBottom = Math.round((80 + (Math.abs(random1) % 40)) * 100) / 100; // Between 80px and 120px from bottom
      // Calculate upward movement (negative y = move up)
      const moveUp = Math.round((finalBottom - startBottom) * 100) / 100; // Positive value means moving up
      
      const rotation = Math.round(((Math.abs(random1) % 10) - 5) * 100) / 100; // Between -5deg and 5deg
      
      const IconComponent = icons[i];
      return {
        text,
        icon: IconComponent,
        // Final position after animation
        finalBottom: `${finalBottom}px`,
        finalLeft: `${finalLeftPercent}%`,
        // Start position (lower in the SVG field)
        startBottom: `${startBottom}px`,
        startLeft: '50%', // Center horizontally
        // Movement values
        moveUp: -moveUp, // Negative = move upward
        // Horizontal movement: from center (50%) to final position
        moveLeft: finalLeftPercent - 50, // Percentage difference
        rotation: `${rotation}deg`,
        delay: i * 0.03,
      };
    });
    return positions;
  }, [index]);

  // Use CSS variables if projectType is provided, otherwise use props
  const finalOutlineColor = projectType 
    ? `var(--project-${projectType}-outline)`
    : outlineColor || "#000000";
  const finalBgColor = projectType
    ? `var(--project-${projectType}-bg)`
    : bgColor || "#ffffff";
  const finalTextColor = projectType
    ? `var(--project-${projectType}-text)`
    : textColor || "text-foreground";
  const finalTextSecondaryColor = projectType
    ? `var(--project-${projectType}-text-secondary)`
    : textSecondaryColor || "text-muted-foreground";

  // Generate mesh gradient background biased toward the bottom of the card.
  // Uses 4 configurable CSS variables per project type.
  const getMeshGradient = () => {
    if (projectType === "schaeffler") {
      // Green mesh gradient for Schaeffler
      return [
        "radial-gradient(circle at 15% 112%, color-mix(in oklch, var(--project-schaeffler-mesh-1) 85%, transparent) 0%, transparent 50%)",
        "radial-gradient(circle at 85% 115%, color-mix(in oklch, var(--project-schaeffler-mesh-2) 90%, transparent) 0%, transparent 50%)",
        "radial-gradient(circle at 50% 106%, color-mix(in oklch, var(--project-schaeffler-mesh-3) 85%, transparent) 0%, transparent 52%)",
        "radial-gradient(circle at 50% 98%, color-mix(in oklch, var(--project-schaeffler-mesh-4) 55%, transparent) 0%, transparent 48%)",
      ].join(", ");
    } else if (projectType === "beautified") {
      // Orange/peach mesh gradient for Beautified
      return [
        "radial-gradient(circle at 20% 112%, color-mix(in oklch, var(--project-beautified-mesh-1) 90%, transparent) 0%, transparent 50%)",
        "radial-gradient(circle at 80% 115%, color-mix(in oklch, var(--project-beautified-mesh-2) 95%, transparent) 0%, transparent 50%)",
        "radial-gradient(circle at 50% 106%, color-mix(in oklch, var(--project-beautified-mesh-3) 90%, transparent) 0%, transparent 52%)",
        "radial-gradient(circle at 50% 98%, color-mix(in oklch, var(--project-beautified-mesh-4) 60%, transparent) 0%, transparent 48%)",
      ].join(", ");
    }
    return null;
  };

  return (
    <motion.div
      className="flex-1 rounded-[32px] border border-border/50 p-[1px]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut"
      }}
    >
      <motion.article 
        className="group w-full h-full p-8 bg-card rounded-[32px] border border-border/50 outline outline-12 outline-offset-[-12px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden relative cursor-pointer min-h-[360px]"
        style={{
          outlineColor: "var(--card-outline)",
          backgroundColor: "var(--card)",
          ...(getMeshGradient()
            ? {
                backgroundImage: getMeshGradient() || undefined,
                backgroundRepeat: "no-repeat",
                // Slightly reduced vertical size so mesh doesn't reach too high
                backgroundSize: "140% 115%",
                backgroundPosition: "center bottom",
              }
            : {}),
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Opacity overlay to reduce mesh gradient intensity */}
      {getMeshGradient() && (
        <div
          className="absolute inset-x-0 bottom-0 h-[70%] rounded-[32px] pointer-events-none"
          style={{
            zIndex: 0,
            backgroundColor: "var(--card)",
            opacity: "var(--mesh-opacity-overlay, 0.15)",
            maskImage: `linear-gradient(to top, black var(--mesh-fade-start, 0%), black var(--mesh-fade-mid, 50%), transparent var(--mesh-fade-end, 85%))`,
            WebkitMaskImage: `linear-gradient(to top, black var(--mesh-fade-start, 0%), black var(--mesh-fade-mid, 50%), transparent var(--mesh-fade-end, 85%))`,
          }}
        />
      )}
      {/* Grain texture overlay for mesh gradient */}
      {getMeshGradient() && (
        <div
          className="absolute inset-0 rounded-[32px] pointer-events-none opacity-50"
          style={{
            zIndex: 1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            mixBlendMode: "overlay",
            maskImage: `linear-gradient(to top, black var(--mesh-fade-start, 0%), black var(--mesh-fade-mid, 50%), transparent var(--mesh-fade-end, 85%))`,
            WebkitMaskImage: `linear-gradient(to top, black var(--mesh-fade-start, 0%), black var(--mesh-fade-mid, 50%), transparent var(--mesh-fade-end, 85%))`,
          }}
        />
      )}
      <div className="self-stretch flex flex-col justify-between items-start gap-6 relative z-10 h-full">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <h2 className="self-stretch text-foreground text-2xl font-['Zodiak'] leading-6">
            {title}
          </h2>
          <p className="self-stretch text-muted-foreground text-base font-normal font-['Plus_Jakarta_Sans'] leading-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-0 md:translate-y-[-4px] md:group-hover:translate-y-0 blur-none md:blur-[2px] md:group-hover:blur-none">
            {description}
          </p>
        </div>
      </div>
      {projectType === "beautified" && (
        <>
          {/* Chart SVGs in random layout */}
          {chartPositions.map((chart, i) => {
            const shouldShow = isMobile || isHovered;
            return (
              <motion.img
                key={chart.src}
                src={chart.src}
                alt={`Chart ${i + 1}`}
                className="absolute pointer-events-none"
                initial={isMobile ? {
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                } : false}
                animate={isMobile ? {
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                } : {
                  opacity: shouldShow ? 1 : 0,
                  scale: shouldShow ? 1 : 0.3,
                  x: shouldShow ? chart.moveLeft : '0%',
                  y: shouldShow ? chart.moveUp : '0px',
                  filter: shouldShow ? 'blur(0px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' : 'blur(8px)',
                }}
                transition={isMobile ? {} : {
                  duration: 0.3,
                  delay: shouldShow ? chart.delay : 0,
                  ease: "easeOut",
                }}
                style={{
                  bottom: isMobile ? chart.finalBottom : chart.startBottom,
                  left: isMobile ? chart.finalLeft : chart.startLeft,
                  width: chart.width,
                  rotate: chart.rotation,
                  zIndex: 25 + i,
                  transformOrigin: 'center center',
                }}
              />
            );
          })}
          {/* Beautified field SVG */}
          <motion.div
            className="absolute bottom-0 left-4 right-4 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: isHovered ? 8 : 0 
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: "easeOut",
              y: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            style={{ 
              height: "180px",
              zIndex: 20,
            }}
            tabIndex={-1}
            onFocus={(e) => e.target.blur()}
          >
            <BeautifiedFieldSVG />
          </motion.div>
        </>
      )}
      {projectType === "schaeffler" && (
        <>
          {/* Text cards container - matches SVG container width */}
          <div className="absolute bottom-0 left-4 right-4 pointer-events-none" style={{ height: "180px", zIndex: 25 }}>
            {textCardPositions.map((card, i) => {
              const shouldShow = isMobile || isHovered;
              const isCardHovered = hoveredCardIndex === i;
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.text}
                  className="absolute px-4 py-2 backdrop-blur-sm rounded-md shadow-sm flex items-center justify-center gap-1.5"
                  onMouseEnter={() => setHoveredCardIndex(i)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  initial={isMobile ? {
                    opacity: 1,
                    scale: 1,
                    x: '-50%',
                    y: '0px',
                    filter: 'blur(0px)',
                    backgroundColor: 'rgba(231, 239, 230, 0.75)',
                  } : {
                    x: '-50%',
                    left: '50%',
                    backgroundColor: 'rgba(231, 239, 230, 0.75)',
                  }}
                  animate={{
                    opacity: shouldShow ? 1 : 0,
                    scale: shouldShow ? 1 : 0.3,
                    // Keep x at -50% to center cards, animate left position
                    x: '-50%',
                    left: isMobile ? card.finalLeft : (shouldShow ? card.finalLeft : '50%'),
                    y: isMobile ? '0px' : (shouldShow ? card.moveUp : '0px'),
                    filter: shouldShow ? 'blur(0px)' : 'blur(8px)',
                    backgroundColor: isCardHovered ? '#E7EFE6' : 'rgba(231, 239, 230, 0.75)',
                  }}
                  transition={{
                    duration: isMobile ? 0 : 0.3,
                    delay: isMobile ? 0 : (shouldShow ? card.delay : 0),
                    ease: "easeOut",
                  }}
                  style={{
                    bottom: isMobile ? card.finalBottom : card.startBottom,
                    rotate: card.rotation,
                    transformOrigin: 'center center',
                    zIndex: isCardHovered ? 30 : 25 + i,
                  }}
                >
                  <IconComponent className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#003513' }} />
                  <span className="text-xs font-medium whitespace-nowrap leading-none" style={{ color: '#003513' }}>
                    {card.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
          {/* 6204 SVG */}
          <motion.div
            className="absolute bottom-0 left-4 right-4 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: isHovered ? 8 : 0 
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: "easeOut",
              y: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            style={{ 
              height: "180px",
              zIndex: 0,
              transform: "translateZ(0)",
            }}
          >
            <img 
              src="/6204.svg" 
              alt="6204" 
              className="w-full h-full object-contain"
              style={{
                position: "relative",
              }}
            />
          </motion.div>
        </>
      )}
    </motion.article>
    </motion.div>
  );
}

