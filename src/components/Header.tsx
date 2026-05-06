"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="absolute top-0 left-0 right-0 z-50 pt-6 pb-4"
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-chat.svg"
            alt="Ch4t.ai"
            className="h-8 md:h-10 w-auto"
            style={{ filter: "brightness(0)" }}
          />
        </div>

        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          <a
            href="#results"
            className="text-foreground hover:text-primary transition-colors"
          >
            Resultados
          </a>
          <a
            href="#platform"
            className="text-foreground hover:text-primary transition-colors"
          >
            El Ecosistema
          </a>
          <a
            href="#impact"
            className="text-foreground hover:text-primary transition-colors"
          >
            Comparativa
          </a>
          <a
            href="#timeline"
            className="text-foreground hover:text-primary transition-colors"
          >
            Cronología
          </a>
          <a
            href="#results"
            className="px-5 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/25 font-semibold"
          >
            Ver Cifras
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
