"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Printer } from "lucide-react";

interface TicketLine {
  type: "header" | "separator" | "item" | "total" | "footer" | "blank";
  content: string;
  bold?: boolean;
  align?: "center" | "left" | "right";
}

const ticketData: TicketLine[] = [
  { type: "header", content: "═══════════════════════", align: "center" },
  { type: "header", content: "🍔 TIERRA QUERIDA", align: "center", bold: true },
  { type: "header", content: "Marinilla, Antioquia", align: "center" },
  { type: "header", content: "═══════════════════════", align: "center" },
  { type: "blank", content: "" },
  { type: "item", content: "Pedido #1042", bold: true, align: "left" },
  { type: "item", content: "WhatsApp: +57 312 ***", align: "left" },
  { type: "item", content: "Tipo: Domicilio 🛵", align: "left" },
  { type: "blank", content: "" },
  { type: "separator", content: "───────────────────────", align: "center" },
  { type: "item", content: "1x Hamburguesa Doble         $24.900", align: "left" },
  { type: "item", content: "   + Tocineta        $3.000", align: "left" },
  { type: "item", content: "1x Papas Queso         $5.900", align: "left" },
  { type: "item", content: "1x Coca-Cola 400ml       $4.900", align: "left" },
  { type: "separator", content: "───────────────────────", align: "center" },
  { type: "blank", content: "" },
  { type: "total", content: "SUBTOTAL:              $38.700", align: "left", bold: true },
  { type: "total", content: "DOMICILIO:              $6.000", align: "left" },
  { type: "separator", content: "═══════════════════════", align: "center" },
  { type: "total", content: "TOTAL:                 $44.700", align: "left", bold: true },
  { type: "separator", content: "═══════════════════════", align: "center" },
  { type: "blank", content: "" },
  { type: "footer", content: "Pago: Transferencia ✅", align: "center" },
  { type: "footer", content: "¡Gracias por tu compra!", align: "center" },
  { type: "footer", content: "Pedido generado por Ch4t.ai", align: "center" },
];

export default function ComandaTab() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showSentBadge, setShowSentBadge] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const lines = useMemo(() => ticketData, []);

  useEffect(() => {
    let cancelled = false;

    const runCycle = async () => {
      setVisibleLines(0);
      setShowSentBadge(false);
      setIsPrinting(false);

      // Wait before starting
      await new Promise((r) => setTimeout(r, 800));
      if (cancelled) return;

      setIsPrinting(true);

      // Print lines one by one
      for (let i = 1; i <= lines.length; i++) {
        if (cancelled) return;
        setVisibleLines(i);
        await new Promise((r) => setTimeout(r, 120));
      }

      // Show sent badge
      await new Promise((r) => setTimeout(r, 800));
      if (cancelled) return;
      setIsPrinting(false);
      setShowSentBadge(true);

      // Wait then restart
      await new Promise((r) => setTimeout(r, 3000));
      if (cancelled) return;
      runCycle();
    };

    runCycle();
    return () => {
      cancelled = true;
    };
  }, [lines]);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-border/30 bg-graphite/5 backdrop-blur-sm flex items-center justify-center"
      style={{ aspectRatio: "16/9", minHeight: 420 }}
    >
      {/* Background pattern — like a dashboard behind */}
      <div className="absolute inset-0 opacity-5 pointer-events-none p-6 flex flex-col gap-3">
        <div className="h-8 w-48 bg-foreground/30 rounded-md" />
        <div className="h-4 w-32 bg-foreground/20 rounded-md" />
        <div className="flex-1 bg-foreground/10 rounded-lg" />
      </div>

      {/* Printer icon pulsing */}
      <AnimatePresence>
        {isPrinting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-6 right-6 z-20"
          >
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold border border-primary/20">
              <Printer className="w-4 h-4 animate-pulse" />
              Imprimiendo...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thermal ticket */}
      <div className="relative w-full max-w-xs mx-auto">
        <div
          className="bg-white rounded-t-lg shadow-2xl overflow-hidden border border-gray-200"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
          }}
        >
          {/* Receipt content */}
          <div className="px-4 py-4 flex flex-col">
            {lines.slice(0, visibleLines).map((line, i) => {
              if (line.type === "blank") {
                return <div key={i} className="h-2" />;
              }

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.08 }}
                  className={`text-[11px] leading-5 text-graphite ${line.bold ? "font-bold" : ""
                    } ${line.align === "center"
                      ? "text-center"
                      : line.align === "right"
                        ? "text-right"
                        : "text-left"
                    } ${line.type === "total" ? "text-primary" : ""}`}
                >
                  {line.content}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Saw-tooth paper edge */}
        {visibleLines > 0 && (
          <div className="w-full overflow-hidden">
            <svg
              viewBox="0 0 320 12"
              className="w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 L10,12 L20,0 L30,12 L40,0 L50,12 L60,0 L70,12 L80,0 L90,12 L100,0 L110,12 L120,0 L130,12 L140,0 L150,12 L160,0 L170,12 L180,0 L190,12 L200,0 L210,12 L220,0 L230,12 L240,0 L250,12 L260,0 L270,12 L280,0 L290,12 L300,0 L310,12 L320,0"
                fill="white"
                stroke="none"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Sent to kitchen badge */}
      <AnimatePresence>
        {showSentBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute bottom-8 z-40 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-3 text-sm"
          >
            <CheckCircle2 className="w-5 h-5" />
            ¡Comanda enviada a Cocina!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
