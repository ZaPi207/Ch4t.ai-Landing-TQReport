"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, ChefHat, Bike, PartyPopper, MessageCircle } from "lucide-react";

const steps = [
  { id: 0, icon: ClipboardList, label: "Pedido Recibido", emoji: "📝", color: "text-primary", bg: "bg-primary" },
  { id: 1, icon: ChefHat, label: "En Preparación", emoji: "👨‍🍳", color: "text-amber-500", bg: "bg-amber-500" },
  { id: 2, icon: Bike, label: "En Camino", emoji: "🛵", color: "text-secondary", bg: "bg-secondary" },
  { id: 3, icon: PartyPopper, label: "Entregado", emoji: "✅", color: "text-emerald-500", bg: "bg-emerald-500" },
];

export default function DeliveryTab() {
  const [activeStep, setActiveStep] = useState(-1);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const runCycle = async () => {
      setActiveStep(-1);
      setShowNotification(false);
      await new Promise(r => setTimeout(r, 600));

      for (let i = 0; i <= 3; i++) {
        if (cancelled) return;
        setActiveStep(i);

        if (i === 2) {
          await new Promise(r => setTimeout(r, 500));
          if (cancelled) return;
          setShowNotification(true);
          await new Promise(r => setTimeout(r, 2500));
          if (cancelled) return;
          setShowNotification(false);
        } else {
          await new Promise(r => setTimeout(r, 2000));
        }
      }

      await new Promise(r => setTimeout(r, 3000));
      if (cancelled) return;
      runCycle();
    };

    runCycle();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border/30 bg-graphite/5 backdrop-blur-sm flex items-center justify-center p-8"
      style={{ aspectRatio: "16/9", minHeight: 420 }}>

      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-lg font-bold text-foreground">Seguimiento de Pedido #1042</h3>
          <p className="text-xs text-muted-foreground">Cliente: María G. · Domicilio</p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {steps.map((step, i) => {
            const isActive = activeStep >= step.id;
            const isCurrent = activeStep === step.id;

            return (
              <div key={step.id} className="flex items-start gap-4 relative">
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="absolute left-5 top-10 w-0.5 h-12"
                    initial={{ backgroundColor: "rgba(149,149,149,0.2)" }}
                    animate={{
                      backgroundColor: isActive ? "var(--primary)" : "rgba(149,149,149,0.2)",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Circle */}
                <motion.div
                  animate={{
                    scale: isCurrent ? [1, 1.2, 1] : 1,
                    backgroundColor: isActive ? "var(--primary)" : "rgba(149,149,149,0.2)",
                  }}
                  transition={{
                    scale: { duration: 0.8, repeat: isCurrent ? Infinity : 0 },
                    backgroundColor: { duration: 0.3 },
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10"
                >
                  <span className={`text-lg ${isActive ? "" : "grayscale opacity-40"}`}>
                    {step.emoji}
                  </span>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    x: isActive ? 0 : -10,
                  }}
                  transition={{ duration: 0.4 }}
                  className="pb-8"
                >
                  <p className={`font-semibold text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isActive && isCurrent ? "Ahora mismo..." : isActive ? "Completado" : "Pendiente"}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WhatsApp notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 80, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute right-6 top-1/3 glass-mandarine px-4 py-3 rounded-2xl z-20 max-w-xs shadow-xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">WhatsApp</p>
                <p className="text-[11px] text-soft-steel mt-0.5">
                  ¡Tu pedido va en camino! 🛵 Tu domiciliario Juan llegará en aprox. 15 min.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration for delivered */}
      <AnimatePresence>
        {activeStep === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2 text-sm z-30"
          >
            <PartyPopper className="w-5 h-5" />
            ¡Pedido Entregado con Éxito!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
