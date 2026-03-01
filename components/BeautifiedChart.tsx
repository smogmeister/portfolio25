"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data representing growth metrics
const chartData = [
  { month: "2020", value: 7 },
  { month: "2021", value: 11 },
  { month: "2022", value: 8 },
  { month: "2023", value: 7 },
  { month: "2024", value: 14 },
  { month: "2025", value: 18 },
  { month: "2026", value: 19 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  const value = active && payload && payload.length ? payload[0].value : 0;
  const previousValueRef = useRef<number | null>(null);
  const isFirstRender = useRef(true);

  if (active && payload && payload.length) {
    const shouldAnimate = !isFirstRender.current && previousValueRef.current !== null && previousValueRef.current !== value;
    const previousValue = previousValueRef.current;
    const isIncreasing = previousValue !== null && value > previousValue;
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousValueRef.current = value;
    } else if (previousValueRef.current !== value) {
      previousValueRef.current = value;
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-card border border-border/50 rounded-full px-3 py-2 shadow-lg backdrop-blur-md"
        style={{
          backgroundColor: "color-mix(in oklch, var(--card) 70%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <AnimatedNumber 
          value={value} 
          shouldAnimate={shouldAnimate}
          previousValue={previousValue}
          isIncreasing={isIncreasing}
        />
      </motion.div>
    );
  }
  
  if (!active) {
    isFirstRender.current = true;
    previousValueRef.current = null;
  }
  
  return null;
};

const AnimatedNumber = ({ 
  value, 
  shouldAnimate, 
  previousValue, 
  isIncreasing 
}: { 
  value: number; 
  shouldAnimate: boolean;
  previousValue: number | null;
  isIncreasing: boolean;
}) => {
  const initialValue = shouldAnimate && previousValue !== null ? previousValue : value;
  const motionValue = useMotionValue(initialValue);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 200,
  });
  const [displayValue, setDisplayValue] = useState(initialValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const [textColor, setTextColor] = useState("var(--foreground)");

  useEffect(() => {
    if (shouldAnimate && previousValue !== null) {
      // Start animation from previous value
      setIsAnimating(true);
      setDisplayValue(previousValue);
      const color = isIncreasing ? "#22c55e" : "#ef4444";
      setTextColor(color);
      motionValue.set(previousValue);
      // Then animate to new value
      requestAnimationFrame(() => {
        motionValue.set(value);
      });
    } else {
      // Set immediately without animation on first render
      motionValue.set(value);
      setDisplayValue(value);
      setIsAnimating(false);
      setTextColor("var(--foreground)");
    }
  }, [value, shouldAnimate, motionValue, previousValue, isIncreasing]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest: number) => {
      const rounded = Math.round(latest);
      setDisplayValue(rounded);
      
      if (shouldAnimate && previousValue !== null) {
        // Keep isAnimating true while we're still animating
        const diff = Math.abs(latest - value);
        if (diff < 0.5) {
          // Animation complete - reset after a short delay
          setTimeout(() => {
            setIsAnimating(false);
            setTextColor("var(--foreground)");
          }, 200);
        } else {
          // Still animating - ensure flag is true and set color
          setIsAnimating(true);
          const color = isIncreasing ? "#22c55e" : "#ef4444";
          setTextColor(color);
        }
      }
    });
    return () => unsubscribe();
  }, [springValue, value, shouldAnimate, previousValue, isIncreasing]);

  return (
    <p className="text-base font-medium" style={{ color: textColor }}>
      {displayValue.toLocaleString()}
    </p>
  );
};


export default function BeautifiedChart() {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut",
      }}
      style={{ 
        height: "180px",
        marginLeft: "-1.25rem",
        marginRight: "-1.25rem",
        width: "calc(100% + 2.5rem)",
      }}
      tabIndex={-1}
      onFocus={(e) => e.target.blur()}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .recharts-tooltip-cursor {
          display: none !important;
        }
        .recharts-wrapper:focus,
        .recharts-wrapper:active,
        .recharts-wrapper:focus-visible {
          outline: none !important;
          border: none !important;
        }
        .recharts-area:focus,
        .recharts-area:active {
          outline: none !important;
        }
      `}} />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          style={{
            cursor: "pointer",
          }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--primary)"
                stopOpacity={0.4}
              />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip 
            content={<CustomTooltip />}
            cursor={false}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill="url(#areaGradient)"
            animationDuration={1000}
            animationEasing="ease-out"
            dot={{
              fill: "var(--primary)",
              r: 6,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: "var(--primary)",
              stroke: "var(--card)",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
