"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Lamp() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-center space-y-4 md:space-y-6"
      >
        <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 py-2 md:py-4 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-transparent">
          Kush Tech Nepal
        </h1>
        <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl mx-auto px-4 md:px-0">
          Empowering businesses with cutting-edge technology solutions. 
          From web development to mobile apps, we bring your digital vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mt-6 md:mt-8">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 md:py-4 bg-[#004D2C] hover:bg-[#006D3F] text-white font-semibold rounded-lg transition-colors duration-200 w-full sm:w-auto text-center"
          >
            Get Started
          </motion.a>
          <motion.a
            href="/services"
            whileHover={{ scale: 1.05, backgroundColor: '#E6F4EE' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 md:py-4 border border-[#004D2C] text-[#004D2C] bg-white hover:bg-[#E6F4EE] font-semibold rounded-lg transition-colors duration-200 w-full sm:w-auto text-center"
          >
            Learn More
          </motion.a>
        </div>
        <div className="flex justify-center items-center space-x-4 sm:space-x-8 mt-8 md:mt-12 text-slate-400">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold" style={{ color: '#004D2C' }}>50+</div>
            <div className="text-xs sm:text-sm">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold" style={{ color: '#004D2C' }}>30+</div>
            <div className="text-xs sm:text-sm">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold" style={{ color: '#004D2C' }}>5+</div>
            <div className="text-xs sm:text-sm">Years Experience</div>
          </div>
        </div>
      </motion.div>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[100dvh] md:min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0 py-8 md:py-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-[#004D2C] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[#006D3F] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[#004D2C] opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[#006D3F] blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-[#006D3F] "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>

      <div className="relative z-50 flex -translate-y-60 md:-translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
