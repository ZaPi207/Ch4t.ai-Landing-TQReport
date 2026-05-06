"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, BarChart2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-10">
      <div className="container relative z-10 mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y, opacity }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium border border-primary/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            📊 Reporte de Prueba Piloto — Marinilla
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-foreground leading-[1.1]">
            Éxito comprobado:
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary pb-2">
              El ecosistema en acción.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-soft-steel mb-8 max-w-2xl mx-auto leading-relaxed">
            Durante 4 días de operación real, validamos que la automatización con Ch4t.ai optimiza significativamente la atención al cliente, el flujo logístico y las ventas en Tierra Querida - Marinilla.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#results"
              className="group px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
            >
              Ver Resultados
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#platform"
              className="px-8 py-4 bg-graphite/5 text-foreground rounded-full font-semibold text-lg hover:bg-graphite/10 transition-all hover:scale-105 active:scale-95 border border-border"
            >
              Cómo Funcionó
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge — 24/7 Attention */}
      <motion.div
        animate={{ y: mousePosition.y * 3, x: mousePosition.x * 3 }}
        transition={{ type: "spring", stiffness: 30 }}
        className="hidden lg:flex absolute top-1/3 left-12 glass-mandarine px-5 py-4 rounded-2xl items-center gap-3"
      >
        <div className="p-2.5 bg-primary/20 rounded-full">
          <MessageCircle className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-foreground">+450 Chats</p>
          <p className="text-xs text-muted-foreground">
            Atendidos automáticamente
          </p>
        </div>
      </motion.div>

      {/* Floating Badge — Upselling */}
      <motion.div
        animate={{ y: mousePosition.y * -2, x: mousePosition.x * -2 }}
        transition={{ type: "spring", stiffness: 40 }}
        className="hidden lg:flex absolute bottom-1/4 right-12 glass px-5 py-4 rounded-2xl items-center gap-3"
      >
        <div className="p-2.5 bg-secondary/15 rounded-full">
          <BarChart2 className="w-5 h-5 text-secondary" />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-foreground">+3,000 Mensajes</p>
          <p className="text-xs text-muted-foreground">Procesados en 4 días</p>
        </div>
      </motion.div>
    </section>
  );
}
