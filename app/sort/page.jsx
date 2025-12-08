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
    <main className="min-h-screen flex bg-gray-50">
      {showIntro && <IntroModal close={() => setShowIntro(false)} />}
      <Sidebar />
      <BarsVisualizer />
    </main>
  );
}
