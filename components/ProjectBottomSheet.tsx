"use client";
import BottomSheet from "./BottomSheet";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectLink {
  label: string;
  url: string;
}

interface GalleryImage {
  src: string;
  alt: string;
}

interface Gallery {
  headline: string;
  subheader: string;
  images: GalleryImage[];
}

interface ProjectBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: ReactNode[];
  links: ProjectLink[];
  images?: {
    src: string;
    alt: string;
  }[];
  galleries?: Gallery[];
}

// Custom cursor SVG data URIs
const createArrowCursor = (direction: 'left' | 'right'): string => {
  // Get computed color values from the document
  const getComputedColor = (varName: string): string => {
    if (typeof window === 'undefined') return '#000000'; // Fallback for SSR
    
    // Create a temporary element to get the computed color value
    const tempEl = document.createElement('div');
    tempEl.style.color = `var(${varName})`;
    tempEl.style.position = 'absolute';
    tempEl.style.visibility = 'hidden';
    document.body.appendChild(tempEl);
    
    const computed = getComputedStyle(tempEl);
    const color = computed.color;
    
    document.body.removeChild(tempEl);
    
    return color || '#000000';
  };
  
  // Using design system colors:
  // Background: white (#ffffff)
  // Border: border color from CSS variable (computed as RGB)
  // Icon: foreground color from CSS variable (computed as RGB)
  const bgColor = '#ffffff'; // White background
  const borderColor = getComputedColor('--border') || '#e5e5e5';
  const arrowColor = getComputedColor('--foreground') || '#252525';
  
  // Arrow paths: left arrow (←) and right arrow (→) with proper arrowheads
  const arrowPath = direction === 'left'
    ? `M 15 12 L 9 12 M 11 9 L 9 12 L 11 15` // Left arrow: horizontal line + arrowhead pointing left
    : `M 9 12 L 15 12 M 13 9 L 15 12 L 13 15`; // Right arrow: horizontal line + arrowhead pointing right
  
  const svg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="shape-rendering: crispEdges;">
         <circle cx="12" cy="12" r="11" fill="${bgColor}" stroke="${borderColor}" stroke-width="1" vector-effect="non-scaling-stroke"/>
         <path d="${arrowPath}" stroke="${arrowColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
       </svg>`;
  
  // Hotspot at center of the circular container
  const hotspotX = 12;
  const hotspotY = 12;
  
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}') ${hotspotX} ${hotspotY}, auto`;
};

// Gallery Component
function ImageGallery({ 
  gallery, 
  index 
}: { 
  gallery: Gallery; 
  index: number;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cursorSide, setCursorSide] = useState<'left' | 'right' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.images.length) % gallery.images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleFirstImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (containerHeight === null && gallery.images.length > 1 && currentImageIndex === 0) {
      const img = e.currentTarget;
      // Set height based on natural image dimensions and container width
      const container = imageContainerRef.current;
      if (container && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const containerWidth = container.offsetWidth;
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const calculatedHeight = containerWidth * aspectRatio;
        setContainerHeight(calculatedHeight);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gallery.images.length <= 1) {
      setCursorSide(null);
      return;
    }
    
    const container = imageContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const containerWidth = rect.width;
    const halfWidth = containerWidth / 2;

    // Detect movement
    const distance = Math.sqrt(
      Math.pow(mouseX - lastPositionRef.current.x, 2) + 
      Math.pow(mouseY - lastPositionRef.current.y, 2)
    );
    
    if (distance > 1) {
      setIsMoving(true);
      
      // Clear existing timeout
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      
      // Set moving to false after movement stops
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    }
    
    // Update mouse position relative to container
    setMousePosition({ x: mouseX, y: mouseY });
    lastPositionRef.current = { x: mouseX, y: mouseY };

    const newSide = mouseX < halfWidth ? 'left' : 'right';
    if (newSide !== cursorSide) {
      setCursorSide(newSide);
    }
  };

  const handleMouseLeave = () => {
    setCursorSide(null);
    setIsMoving(false);
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gallery.images.length <= 1) return;
    
    const container = imageContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const containerWidth = rect.width;
    const halfWidth = containerWidth / 2;

    if (clickX < halfWidth) {
      prevImage();
    } else {
      nextImage();
    }
  };

  return (
    <motion.div
      className="mb-24 last:mb-0"
      initial={{ opacity: 0, filter: "blur(10px)", y: 2 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ 
        opacity: { duration: 0.9, delay: 0.25 + index * 0.15, ease: [0.4, 0, 0.2, 1] },
        filter: { duration: 0.9, delay: 0.25 + index * 0.15, ease: [0.4, 0, 0.2, 1] },
        y: { duration: 0.7, delay: 0.25 + index * 0.15, ease: [0.4, 0, 0.2, 1] }
      }}
    >
      {/* Headline and Subheader */}
      <div className="mb-6">
        <h3 className="text-xl font-['Zodiak'] text-foreground mb-1">
          {gallery.headline}
        </h3>
        <p className="text-muted-foreground font-['Plus_Jakarta_Sans'] text-sm">
          {gallery.subheader}
        </p>
      </div>

      {/* Gallery Container */}
      <div className="relative">
        {/* Image Container */}
        <div 
          ref={imageContainerRef}
          onClick={handleImageClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative w-full overflow-hidden rounded-2xl ${
            gallery.images.length === 1 ? 'shadow-lg' : ''
          }`}
          style={{
            cursor: gallery.images.length > 1 ? 'none' : 'default',
            minHeight: containerHeight ? `${containerHeight}px` : undefined,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={gallery.images[currentImageIndex]?.src || ""}
              alt={gallery.images[currentImageIndex]?.alt || ""}
              className="w-full h-auto object-contain pointer-events-none"
              onLoad={currentImageIndex === 0 && containerHeight === null ? handleFirstImageLoad : undefined}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </AnimatePresence>
          
          {/* Animated Arrow Cursor */}
          {gallery.images.length > 1 && cursorSide && (
            <motion.div
              className="absolute pointer-events-none z-50"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                style={{ 
                  border: '1px solid',
                  borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)',
                  boxShadow: '0 0 12px color-mix(in oklch, var(--primary) 50%, transparent)',
                  filter: isMoving ? 'blur(0.5px)' : 'blur(0px)',
                }}
                animate={{ 
                  rotate: cursorSide === 'left' ? 180 : 0,
                  scale: isMoving ? 1.4 : 1,
                }}
                transition={{ 
                  rotate: { duration: 0.3, ease: "easeInOut" },
                  filter: { duration: 0.15, ease: "easeOut" },
                  scale: { duration: 0.2, ease: "easeOut" }
                }}
              >
                <ArrowRight className="w-3 h-3 text-foreground" />
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Pagination Dots */}
        {gallery.images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {gallery.images.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => goToImage(dotIndex)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  dotIndex === currentImageIndex
                    ? "bg-muted-foreground w-6"
                    : "bg-muted-foreground/20 hover:bg-muted-foreground/40"
                }`}
                aria-label={`Go to image ${dotIndex + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectBottomSheet({
  isOpen,
  onClose,
  title,
  description,
  links,
  images,
  galleries,
}: ProjectBottomSheetProps) {
  // Create galleries from images if not provided
  const displayGalleries: Gallery[] = galleries || (images || []).map((img, index) => ({
    headline: `Gallery ${index + 1}`,
    subheader: `Project showcase ${index + 1}`,
    images: [
      // Repeat the same image 3 times for now
      { src: img.src, alt: `${img.alt} - Image 1` },
      { src: img.src, alt: `${img.alt} - Image 2` },
      { src: img.src, alt: `${img.alt} - Image 3` },
    ],
  }));

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-2xl mx-auto">
          <motion.h2 
            key="title"
            className="text-3xl font-['Zodiak'] text-foreground mb-8"
            initial={{ opacity: 0, filter: "blur(10px)", y: 2 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ 
              opacity: { duration: 0.9, delay: 0, ease: [0.4, 0, 0.2, 1] },
              filter: { duration: 0.9, delay: 0, ease: [0.4, 0, 0.2, 1] },
              y: { duration: 0.7, delay: 0, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            {title}
          </motion.h2>
          
          {/* 2-column layout: Description + Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            {/* Left column: Description */}
            <div className="lg:col-span-2">
              {description.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-muted-foreground font-['Plus_Jakarta_Sans'] leading-relaxed mb-4 last:mb-0"
                  initial={{ opacity: 0, filter: "blur(10px)", y: 2 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ 
                    opacity: { duration: 0.9, delay: 0.1 + index * 0.08, ease: [0.4, 0, 0.2, 1] },
                    filter: { duration: 0.9, delay: 0.1 + index * 0.08, ease: [0.4, 0, 0.2, 1] },
                    y: { duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.4, 0, 0.2, 1] }
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
                  initial={{ opacity: 0, filter: "blur(10px)", y: 2 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ 
                    opacity: { duration: 0.9, delay: 0.1 + index * 0.08, ease: [0.4, 0, 0.2, 1] },
                    filter: { duration: 0.9, delay: 0.1 + index * 0.08, ease: [0.4, 0, 0.2, 1] },
                    y: { duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.4, 0, 0.2, 1] }
                  }}
                  layout={false}
                  className="w-full"
                >
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-10 px-4 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-border inline-flex justify-center items-center gap-2 bg-card/70 hover:bg-card transition-colors overflow-visible cursor-pointer w-full "
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-500 ease-out shadow-[0_0_0_0px_color-mix(in_oklch,var(--border)_50%,transparent)] group-hover:shadow-[0_0_0_4px_color-mix(in_oklch,var(--border)_50%,transparent)]" />
                    <span className="relative z-10 text-accent-foreground text-sm font-medium font-['Plus_Jakarta_Sans'] leading-6">
                      {link.label}
                    </span>
                    <ExternalLink className="relative z-10 w-4 h-4 text-accent-foreground" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Galleries - Vertical Layout */}
          <div className="space-y-0">
            {displayGalleries.map((gallery, index) => (
              <ImageGallery key={index} gallery={gallery} index={index} />
            ))}
          </div>

          {/* Disclaimer text */}
          <motion.p
            className="text-muted-foreground text-xs font-['Plus_Jakarta_Sans'] mt-6 text-center"
            initial={{ opacity: 0, filter: "blur(10px)", y: 2 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ 
              opacity: { duration: 0.9, delay: 0.65, ease: [0.4, 0, 0.2, 1] },
              filter: { duration: 0.9, delay: 0.65, ease: [0.4, 0, 0.2, 1] },
              y: { duration: 0.7, delay: 0.65, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            The images above are a small sample size for visual reference. Check the production system or Figma for details.
          </motion.p>
        </div>
      </div>
    </BottomSheet>
  );
}

