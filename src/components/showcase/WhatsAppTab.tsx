"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ChatMessage {
  id: number;
  from: "client" | "bot";
  text: string;
  delay: number;
}

const conversation: ChatMessage[] = [
  { id: 1, from: "client", text: "Hola, quiero una hamburguesa doble 🍔", delay: 0 },
  {
    id: 2,
    from: "bot",
    text: "¡Hola! 🍔 Excelente elección. Nuestra Doble Smash tiene doble carne, queso cheddar fundido y salsa especial. ¿La quieres con ese combo?",
    delay: 1800,
  },
  { id: 3, from: "client", text: "Sí, esa misma!", delay: 3500 },
  {
    id: 4,
    from: "bot",
    text: "¡Perfecto! 🤤 ¿Te gustaría agregar unas papas fritas y una limonada de coco? Es nuestro combo estrella ⭐",
    delay: 5200,
  },
  { id: 5, from: "client", text: "Dale, con papas y limonada", delay: 7000 },
  {
    id: 6,
    from: "bot",
    text: "✅ ¡Pedido confirmado!\n\n🍔 Doble Smash x1\n🍟 Papas Fritas x1\n🥥 Limonada de Coco x1\n\n💰 Total: $32.000\n\nTu pedido ya fue enviado a cocina. Te avisamos cuando esté listo 🔥",
    delay: 8800,
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-soft-grey"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function WhatsAppTab() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const runConversation = () => {
      setVisibleMessages([]);
      setIsTyping(false);

      conversation.forEach((msg, index) => {
        // Show typing indicator before bot messages
        if (msg.from === "bot") {
          const typingTimer = setTimeout(() => {
            if (cancelled) return;
            setIsTyping(true);
          }, msg.delay - 1200);
          timers.push(typingTimer);
        }

        const timer = setTimeout(() => {
          if (cancelled) return;
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, msg.id]);
        }, msg.delay);
        timers.push(timer);

        // Restart after last message
        if (index === conversation.length - 1) {
          const restartTimer = setTimeout(() => {
            if (cancelled) return;
            runConversation();
          }, msg.delay + 5000);
          timers.push(restartTimer);
        }
      });
    };

    runConversation();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-border/30 bg-white/20 backdrop-blur-sm flex items-center justify-center"
      style={{ aspectRatio: "16/9", minHeight: 420 }}
    >
      {/* WhatsApp-like phone mockup */}
      <div className="w-full max-w-sm mx-auto h-full max-h-[480px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-graphite/10">
        {/* WhatsApp header */}
        <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            🤖
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">
              Tierra Querida Bot
            </p>
            <p className="text-white/70 text-xs">en línea</p>
          </div>
          <div className="flex gap-4 text-white/80">
            <div className="w-4 h-4 rounded-full border-2 border-white/50" />
          </div>
        </div>

        {/* Chat body */}
        <div
          className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto"
          style={{
            background: "#ece5dd",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cfc6' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <AnimatePresence>
            {conversation
              .filter((msg) => visibleMessages.includes(msg.id))
              .map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex ${
                    msg.from === "client" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed shadow-sm ${
                      msg.from === "client"
                        ? "bg-[#dcf8c6] text-graphite rounded-tr-none"
                        : "bg-white text-graphite rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[9px] text-soft-grey">
                        {new Date().toLocaleTimeString("es-CO", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {msg.from === "client" && (
                        <Check className="w-3 h-3 text-blue-500" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex justify-start"
              >
                <div className="bg-white px-3 py-1 rounded-xl rounded-tl-none shadow-sm">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-soft-grey">
            Escribe un mensaje...
          </div>
          <div className="w-8 h-8 rounded-full bg-[#075e54] flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
