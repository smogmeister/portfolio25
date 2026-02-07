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

    const timeoutId = setTimeout(() => {
      annotation.show();
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
