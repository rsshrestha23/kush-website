"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#0f172a", // slate-900
    "#000000", // black
    "#171717", // neutral-900
    "#1e1b4b", // indigo-950
    "#581c87", // purple-950
    "#064e3b", // emerald-950
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
    "linear-gradient(to bottom right, #8b5cf6, #ec4899)", // purple-500 to pink-500
    "linear-gradient(to bottom right, #3b82f6, #06b6d4)", // blue-500 to cyan-500
    "linear-gradient(to bottom right, #14b8a6, #06b6d4)", // teal-500 to cyan-500
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-screen justify-center space-x-10 overflow-y-auto rounded-none p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-32">
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  y: activeCard === index ? 0 : 20,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="text-4xl font-bold text-slate-100 mb-6"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  y: activeCard === index ? 0 : 20,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="text-lg mt-6 max-w-lg text-slate-300 leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-80 w-96 overflow-hidden rounded-xl bg-white lg:block shadow-2xl",
          contentClassName,
        )}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotateY: activeCard * 5,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <motion.div
          key={activeCard}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="h-full w-full"
        >
          {content[activeCard].content ?? null}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
