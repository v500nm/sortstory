"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import BarsVisualizer from "../../components/BarsVisualizer";
import IntroModal from "../../components/IntroModal";

export default function Sort() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("sortviz_intro");
    if (!shown) setShowIntro(true);
  }, []);

  return (
    <main className="min-h-screen w-full flex bg-[#0d1117] text-gray-200 relative overflow-hidden">
      {/* star subtle cosmic bg */}
      <div className="absolute inset-0 opacity-30 bg-[url('/stars.png')] bg-cover bg-center pointer-events-none"></div>

      {showIntro && <IntroModal close={() => setShowIntro(false)} />}
      <Sidebar />
      <BarsVisualizer />
    </main>
  );
}
