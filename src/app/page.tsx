"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PlatformShowcase from "@/components/showcase/PlatformShowcase";
import ValueTable from "@/components/ValueTable";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import SectionSeparator from "@/components/SectionSeparator";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <DynamicBackground />

      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative z-10">
          <Header />
          <Hero />
          <SectionSeparator type="wave" color="fill-primary/5" />
          <Features />
          <SectionSeparator type="slant" color="fill-background" />
          <PlatformShowcase />
          <SectionSeparator type="wave" color="fill-secondary/5" />
          <ValueTable />
          <SectionSeparator type="slant" color="fill-background" />
          <Timeline />
          <Footer />
        </div>
      )}
    </main>
  );
}
