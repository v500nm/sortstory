"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesZPattern from "@/components/landing/FeaturesZPattern";
import AlgorithmsBento from "@/components/landing/AlgorithmsBento";
import TimelineSection from "@/components/landing/TimelineSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import DeepDiveEditorial from "@/components/landing/DeepDiveEditorial";
import InteractiveNavigation from "@/components/landing/InteractiveNavigation";
import PortfolioGrid from "@/components/landing/PortfolioGrid";
import { motion, useScroll, useTransform } from "framer-motion";
import InitialMountLoader from "@/components/loaders/InitialMountLoader";
import MixedLoaders from "@/components/loaders/MixedLoaders";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="min-h-screen w-full font-sans relative flex flex-col overflow-x-hidden text-brand-text-primary selection:bg-brand-purple/30">
      <InitialMountLoader>
        <MixedLoaders />
      </InitialMountLoader>
      
      {/* Unified Hybrid Background Canvas */}
      <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-brand-bg-dark">
         {/* Subtle ambient gradients that slowly move based on scroll */}
         <motion.div 
           style={{ y: backgroundY }}
           className="absolute inset-0 opacity-20 dark:opacity-30 mix-blend-screen"
         >
           <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-brand-cyan/10 blur-[120px] rounded-full" />
           <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[150px] rounded-full" />
           <div className="absolute bottom-[20%] left-[30%] w-[800px] h-[800px] bg-brand-yellow/5 blur-[120px] rounded-full" />
         </motion.div>
         {/* Grid overlay for texture */}
         <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-5 mix-blend-overlay" />
      </div>

      <Header />

      <div className="flex flex-col w-full relative z-10">
        <HeroSection />
        <FeaturesZPattern />
        <AlgorithmsBento />
        <InteractiveNavigation />
        <TimelineSection />
        <ComparisonSection />
        <DeepDiveEditorial />
        <PortfolioGrid />
      </div>

    </main>
  );
}