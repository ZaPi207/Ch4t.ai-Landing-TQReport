"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppTab from "./WhatsAppTab";
import ComandaTab from "./ComandaTab";
import CashRegisterTab from "./CashRegisterTab";
import DeliveryTab from "./DeliveryTab";
import { MessageCircle, Printer, Wallet, Truck } from "lucide-react";

const tabs = [
  {
    id: 0,
    title: "WhatsApp Bot",
    icon: MessageCircle,
    component: WhatsAppTab,
  },
  { id: 1, title: "Comandas", icon: Printer, component: ComandaTab },
  { id: 2, title: "Cierre de Caja", icon: Wallet, component: CashRegisterTab },
  { id: 3, title: "Delivery", icon: Truck, component: DeliveryTab },
];

export default function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = useCallback((id: number) => {
    setActiveTab(id);
  }, []);

  // Auto rotate tabs every 14 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  const ActiveComponent = tabs[activeTab].component;

  return (
    <section id="platform" className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Descubre el{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Ecosistema en Acción
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desde que el cliente escribe hasta que recibe su hamburguesa. Todo
            automático, todo conectado.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex flex-col md:flex-row justify-center gap-3 mb-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300
                  ${
                    isActive
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-muted-foreground hover:bg-white/30 hover:text-foreground"
                  }
                `}
              >
                <tab.icon
                  className={`w-5 h-5 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                {tab.title}
                {isActive && (
                  <motion.div
                    layoutId="activeShowcaseTab"
                    className="absolute inset-0 border-2 border-primary rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
