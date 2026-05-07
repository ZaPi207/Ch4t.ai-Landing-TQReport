"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  DollarSign,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";

function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "$",
  active,
}: {
  target: number;
  duration?: number;
  prefix?: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) { setCount(0); return; }
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return <span className="tabular-nums">{prefix}{count.toLocaleString("es-CO")}</span>;
}

function MiniBarChart({ active }: { active: boolean }) {
  const bars = [35, 55, 40, 70, 85, 60, 90, 75, 50, 65, 80, 45];
  return (
    <div className="flex items-end gap-1 h-20">
      {bars.map((h, i) => (
        <motion.div key={i} initial={{ height: 0 }}
          animate={{ height: active ? `${h}%` : 0 }}
          transition={{ delay: active ? i * 0.08 : 0, duration: 0.5, ease: "easeOut" }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-primary to-primary/40" />
      ))}
    </div>
  );
}

export default function CashRegisterTab() {
  const [step, setStep] = useState(0);

  const runCycle = useCallback(async () => {
    setStep(0);
    await new Promise(r => setTimeout(r, 600));
    setStep(1);
    await new Promise(r => setTimeout(r, 2500));
    setStep(2);
    await new Promise(r => setTimeout(r, 3000));
    setStep(3);
    await new Promise(r => setTimeout(r, 3500));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) { await runCycle(); }
    };
    loop();
    return () => { cancelled = true; };
  }, [runCycle]);

  const statCards = [
    { icon: DollarSign, label: "Ventas Totales", target: 55912800, prefix: "$", color: "primary", delay: 0 },
    { icon: TrendingUp, label: "Pedidos Procesados", target: 1104, prefix: "+", color: "secondary", delay: 0.1 },
    { icon: TrendingUp, label: "Ticket Promedio", target: 50646, prefix: "$", color: "emerald-600", delay: 0.2 },
    { icon: TrendingUp, label: "Mensajes", target: 80400, prefix: "+", color: "blue-600", delay: 0.3 },
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border/30 bg-graphite/5 backdrop-blur-sm flex items-center justify-center p-6" style={{ aspectRatio: "16/9", minHeight: 420 }}>
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground">Reporte Global — Piloto 10 Días</h3>
            <p className="text-xs text-muted-foreground">27 de Abril - 6 de Mayo, 2026 · Tierra Querida</p>
          </div>
          <AnimatePresence>
            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" /> Caja Cuadrada
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
              transition={{ duration: 0.5, delay: s.delay }}
              className="glass bg-white/40 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 bg-${s.color}/10 rounded-lg`}>
                  <s.icon className={`w-4 h-4 text-${s.color}`} />
                </div>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground">
                <AnimatedCounter target={s.target} prefix={s.prefix} active={step >= 1} />
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass bg-white/40 p-4 rounded-2xl">
            <p className="text-xs text-muted-foreground mb-3">Ventas por Hora</p>
            <MiniBarChart active={step >= 1} />
            <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
              <span>12pm</span><span>3pm</span><span>6pm</span><span>9pm</span>
            </div>
          </motion.div>

          <AnimatePresence>
            {step >= 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }} className="glass bg-white/40 p-4 rounded-2xl">
                <p className="text-xs text-muted-foreground mb-3">Desglose de Pagos</p>
                <div className="space-y-3">
                  {[
                    { icon: Banknote, label: "Efectivo", amount: "$740.000", color: "text-emerald-600", d: 0.1 },
                    { icon: CreditCard, label: "Transferencia", amount: "$830.000", color: "text-secondary", d: 0.3 },
                    { icon: Smartphone, label: "Nequi", amount: "$280.000", color: "text-purple-500", d: 0.5 },
                  ].map((p, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: p.d }} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p.icon className={`w-4 h-4 ${p.color}`} />
                        <span className="text-sm text-foreground">{p.label}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{p.amount}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
