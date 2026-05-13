"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const milestones = [
  {
    date: "27-28 Abril",
    title: "La Nueva Interfaz",
    description: "Despliegue del diseño réplica de WhatsApp a 3 columnas y panel interactivo de pedidos.",
    emoji: "🎨",
  },
  {
    date: "29-30 Abril",
    title: "Disponibilidad y Turnos",
    description: "Gestión de disponibilidad de productos en tiempo real y módulo de liquidación de domiciliarios.",
    emoji: "⚙️",
  },
  {
    date: "1-2 Mayo",
    title: "Asignación y Pausas",
    description: "Asignación ágil de domiciliarios (QuickCourier) y control avanzado de pausas del bot.",
    emoji: "⚡",
  },
  {
    date: "3-4 Mayo",
    title: "Inteligencia Artificial",
    description: "Unificación de agentes de IA para extracción de pedidos y sistema de resiliencia ante caídas.",
    emoji: "🧠",
  },
  {
    date: "5-6 Mayo",
    title: "Automatización Total",
    description: "Estimación automática de domicilios e impresión directa de comandas a cocina sin intervención manual.",
    emoji: "🚀",
  },
  {
    date: "7-11 Mayo",
    title: "Expansión Medellín",
    description: "Llevamos la solución a Medellín y continuamos evolucionando el ecosistema en tiempo real.",
    emoji: "🏙️",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            <span className="text-primary">15 días</span> de evolución
          </h2>
          <p className="text-lg text-muted-foreground">
            Desarrollamos e iteramos el ecosistema en tiempo real durante la prueba piloto en Tierra Querida, adaptándonos a la operación viva.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Central line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />

          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start mb-12 ${isLeft
                  ? "md:flex-row flex-row"
                  : "md:flex-row-reverse flex-row"
                  }`}
              >
                {/* Content Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                    }`}
                >
                  <div className="glass bg-white/40 p-5 rounded-2xl border border-white/50 hover:scale-[1.02] transition-transform">
                    <span className="text-2xl mb-2 block">{milestone.emoji}</span>
                    <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                      {milestone.date}
                    </p>
                    <h4 className="text-base font-bold text-foreground mb-1">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <motion.div
                  whileInView={{ scale: [0.5, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background z-10 shadow-lg shadow-primary/30"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Commitment section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-red-50 border border-red-100">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-600">
              Nuestro Compromiso
            </span>
          </div>
          <p className="text-soft-steel leading-relaxed">
            No somos una empresa de software rígida. Somos un grupo de personas
            apasionadas por nuestro producto y, sobre todo,{" "}
            <strong className="text-foreground">
              enamoradas del éxito de Tierra Querida
            </strong>
            . Escuchamos, entendemos y desarrollamos a la velocidad del rayo.
          </p>
          <p className="text-foreground font-bold mt-4 text-lg">
            El futuro de Tierra Querida es digital, y estamos orgullosos de
            construirlo con ustedes. 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
