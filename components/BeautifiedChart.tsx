"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
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
  const value = active && payload && payload.length ? payload[0].value : null;

  // Remember the previously shown value so the number can animate from it.
  // Updating state during render is React's pattern for deriving from previous props.
  const [tracked, setTracked] = useState<{ current: number | null; previous: number | null }>({
    current: null,
    previous: null,
  });
  if (value !== tracked.current) {
    setTracked({ current: value, previous: tracked.current });
  }

  if (value === null) return null;

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
      {/* Remount per value so each change starts a fresh spring from the previous value */}
      <AnimatedNumber key={value} value={value} from={tracked.previous} />
    </motion.div>
  );
};

const AnimatedNumber = ({ value, from }: { value: number; from: number | null }) => {
  const shouldAnimate = from !== null && from !== value;
  const start = shouldAnimate ? from : value;
  const motionValue = useMotionValue(start);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 200,
  });
  const [displayValue, setDisplayValue] = useState(start);
  const [isAnimating, setIsAnimating] = useState(shouldAnimate);

  useEffect(() => {
    if (!shouldAnimate) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unsubscribe = springValue.on("change", (latest: number) => {
      setDisplayValue(Math.round(latest));
      // Animation complete - reset color after a short delay
      if (Math.abs(latest - value) < 0.5 && timer === undefined) {
        timer = setTimeout(() => setIsAnimating(false), 200);
      }
    });
    motionValue.set(value);
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [shouldAnimate, motionValue, springValue, value]);

  const textColor = isAnimating
    ? value > start
      ? "#22c55e"
      : "#ef4444"
    : "var(--foreground)";

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
