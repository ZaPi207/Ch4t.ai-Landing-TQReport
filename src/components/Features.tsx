"use client";

import { motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  TrendingUp,
  Printer,
  Truck,
  CreditCard,
  BarChart3,
  Users,
} from "lucide-react";

const results = [
  {
    icon: Bot,
    title: "Volumen de Atención",
    description:
      "+2.200 chats gestionados sin intervención humana inicial, liberando tiempo valioso para el equipo en local.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Interacción Masiva",
    description:
      "+80.400 mensajes enviados y recibidos fluidamente por nuestro asistente inteligente en solo 4 días.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: TrendingUp,
    title: "Ticket Promedio Alto",
    description:
      "$50.646 pesos de ticket promedio de venta sostenido, gracias a las estrategias de upselling automatizado.",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Conversión Efectiva",
    description:
      "+1.104 pedidos procesados de inicio a fin por el bot y enviados directamente a la operación.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Printer,
    title: "Precisión Total",
    description:
      "100% de las comandas impresas automáticamente en cocina sin errores de transcripción humana.",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    icon: CreditCard,
    title: "Transparencia Financiera",
    description:
      "Cierres de caja automáticos y cuadros de turno con validación visual centralizada de pagos por transferencia.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Truck,
    title: "Eficiencia Logística",
    description:
      "Gestión centralizada de repartidores para optimizar los tiempos de entrega y liquidaciones al instante.",
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
  {
    icon: Users,
    title: "Inteligencia de Clientes",
    description:
      "Base de datos enriquecida y categorizada automáticamente, lista para futuras estrategias de retención.",
    color: "text-purple-600",
    bg: "bg-purple-500/10",
  },
];

export default function Features() {
  return (
    <section id="results" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Impacto medible en solo{" "}
            <span className="text-primary">4 días de operación</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Los números hablan por sí solos. Esto fue lo que logramos durante el
            piloto en Tierra Querida implementando el ecosistema Ch4t.ai.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass bg-white/40 p-7 rounded-3xl relative group overflow-hidden border border-white/50 cursor-default"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div
                className={`w-14 h-14 rounded-2xl ${result.bg} flex items-center justify-center mb-5 relative z-10`}
              >
                <result.icon className={`w-7 h-7 ${result.color}`} />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2 relative z-10">
                {result.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {result.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
