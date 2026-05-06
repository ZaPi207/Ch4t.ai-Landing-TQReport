"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionSeparator({
  type = "wave",
  color = "fill-background",
}: {
  type?: "wave" | "slant";
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0.5, 1.5]);
  const skewY = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <div
      ref={ref}
      className="relative w-full h-24 md:h-32 -mt-1 z-20 overflow-hidden pointer-events-none"
    >
      {type === "wave" ? (
        <motion.svg
          style={{ scaleY }}
          className={`absolute bottom-0 w-full h-full ${color}`}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path d="M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,202.7C672,181,768,139,864,138.7C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </motion.svg>
      ) : (
        <motion.div
          style={{ skewY }}
          className={`absolute bottom-0 w-full h-[200%] origin-bottom-left ${color.replace(
            "fill-",
            "bg-"
          )}`}
        />
      )}
    </div>
  );
}
