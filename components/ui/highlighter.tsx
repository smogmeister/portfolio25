"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import { cn } from "@/lib/utils";

type AnnotationType = 
  | "underline" 
  | "box" 
  | "circle" 
  | "highlight" 
  | "strike-through" 
  | "crossed-off" 
  | "bracket";

interface HighlighterProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  type?: AnnotationType;
  color?: string;
  strokeWidth?: number;
  padding?: number;
  multiline?: boolean;
  animationDuration?: number;
  animationDelay?: number;
  verticalOffset?: number;
}

export function Highlighter({
  as: Component = "span",
  type = "highlight",
  color,
  strokeWidth = 1,
  padding = 4,
  multiline = false,
  animationDuration = 800,
  animationDelay = 0,
  verticalOffset = 0,
  className,
  children,
  ...props
}: HighlighterProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const annotation = annotate(elementRef.current, {
      type,
      color: color || "rgb(250, 204, 21)", // Default yellow highlight
      strokeWidth,
      padding,
      multiline,
      animationDuration,
    });

    const adjustPosition = () => {
      if (verticalOffset !== 0 && elementRef.current) {
        const parent = elementRef.current.parentElement;
        if (parent) {
          // rough-notation creates an SVG that's positioned absolutely
          // Find it by checking all SVGs in the parent
          const svgs = Array.from(parent.querySelectorAll('svg'));
          const annotationSvg = svgs.find(svg => {
            const style = window.getComputedStyle(svg);
            return style.position === 'absolute' && svg.parentElement === parent;
          }) as SVGElement | undefined;
          
          if (annotationSvg) {
            annotationSvg.style.transform = `translateY(${verticalOffset}px)`;
          }
        }
      }
    };

    const timeoutId = setTimeout(() => {
      annotation.show();
      // Adjust position after annotation is shown
      setTimeout(adjustPosition, 100);
    }, animationDelay);

    return () => {
      clearTimeout(timeoutId);
      annotation.remove();
    };
  }, [
    type,
    color,
    strokeWidth,
    padding,
    multiline,
    animationDuration,
    animationDelay,
    verticalOffset,
  ]);

  return (
    <Component 
      ref={elementRef as any} 
      className={cn("", className)} 
      {...props}
    >
      {children}
    </Component>
  );
}
