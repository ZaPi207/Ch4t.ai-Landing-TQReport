"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const rows = [
  {
    before: "Pedidos perdidos por demora en WhatsApp",
    solution: "Atención instantánea 24/7",
    impact: "+Ventas",
    positive: true,
  },
  {
    before: "Ticket promedio bajo / Se olvida ofrecer extras",
    solution: "Sugerencia automática de adiciones y bebidas",
    impact: "+Ticket Promedio",
    positive: true,
  },
  {
    before: "Errores en comandas escritas a mano",
    solution: "Impresión automática en cocina",
    impact: "-Costos por errores",
    positive: true,
  },
  {
    before: "Empleados saturados solo respondiendo chats",
    solution: "El bot atiende y el humano solo confirma",
    impact: "Optimización del Talento",
    positive: true,
  },
  {
    before: "Caos en el cierre de caja y liquidaciones",
    solution: "Registro automático y reportes de reparto",
    impact: "Transparencia Total",
    positive: true,
  },
  {
    before: "Domicilios mal coordinados",
    solution: "Gestión centralizada de repartidores",
    impact: "Mejor Experiencia",
    positive: true,
  },
];

export default function ValueTable() {
  return (
    <section id="impact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            El Antes y el Después{" "}
            <span className="text-primary">de la prueba</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Validamos que cada reto operativo tiene una solución automática medible y efectiva.
          </p>
        </motion.div>

        {/* Table */}
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Header */}
          <div className="hidden md:grid grid-cols-3 gap-4 px-6 py-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Reto Anterior
            </span>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Solución Ch4t.ai
            </span>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Impacto
            </span>
          </div>

          {/* Rows */}
          {rows.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="glass bg-white/40 rounded-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center border border-white/50 cursor-default group"
            >
              {/* Before */}
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-soft-steel line-through decoration-red-300/50">
                  {row.before}
                </p>
              </div>

              {/* Arrow (hidden on mobile) */}
              <div className="hidden md:flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm text-foreground font-medium">
                  {row.solution}
                </p>
              </div>

              {/* Mobile: Solution */}
              <div className="flex md:hidden items-start gap-3">
                <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground font-medium">
                  {row.solution}
                </p>
              </div>

              {/* Impact */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">
                    {row.impact}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-12 text-center"
        >
          <div className="glass-mandarine rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-2">
              💎 El Gran Cambio: De &ldquo;Chatear&rdquo; a
              &ldquo;Gestionar&rdquo;
            </h3>
            <p className="text-soft-steel text-sm max-w-2xl mx-auto leading-relaxed">
              Antes, la persona encargada del chat estaba atada al teléfono.{" "}
              <strong>
                Hoy, esa misma persona solo supervisa y confirma lo que el bot
                ya preparó.
              </strong>{" "}
              Liberando tiempo para apoyar en cocina, atender clientes
              presenciales y asegurar la calidad de cada hamburguesa.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
