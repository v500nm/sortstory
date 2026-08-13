"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InitialMountLoaderProps {
  children: React.ReactNode;
  durationMs?: number;
}

export default function InitialMountLoader({
  children,
  durationMs = 2000,
}: InitialMountLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="initial-mount-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] pointer-events-auto"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
