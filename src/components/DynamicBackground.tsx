"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function DynamicBackground() {
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-200, 400]);

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-background opacity-30" />

      {/* Orb 1 — Mandarine Burst (primary) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px]"
        style={{
          background: "rgba(255, 140, 46, 0.15)",
          y: y1,
          rotate: rotate1,
        }}
      />

      {/* Orb 2 — Indigo Flux (secondary) */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -150, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[100px]"
        style={{
          background: "rgba(104, 110, 251, 0.12)",
          y: y2,
          rotate: rotate2,
        }}
      />

      {/* Orb 3 — Soft Vanilla glow */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[150px]"
        style={{
          background: "rgba(255, 241, 205, 0.3)",
          y: y3,
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(35,31,32,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
