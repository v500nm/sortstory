"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Analytics } from "@/lib/analytics";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [accessCode, setAccessCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network request delay
    setTimeout(() => {
      const success = login(accessCode);
      if (success) {
        Analytics.trackLoginAttempt(true, accessCode.trim().toUpperCase());
        onClose();
      } else {
        Analytics.trackLoginAttempt(false);
        setError("Invalid access code or email. Please try again or request access via Plans.");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-brand-bg-card border border-brand-border rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-text-secondary hover:text-brand-text-primary w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
            >
              ✕
            </button>
            
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-black font-serif text-brand-text-primary mb-2">
                Access SortStory
              </h2>
              <p className="text-brand-text-secondary text-xs font-mono">
                Enter your email and access code to unlock modules. Try code <span className="text-brand-purple font-bold">STUDENT2026</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-brand-text-secondary">Email Address</label>
                <input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-lg px-4 py-2 text-sm text-brand-text-primary focus:border-brand-purple outline-none transition-colors" 
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-brand-text-secondary">Access Code</label>
                <input 
                  required 
                  type="text" 
                  value={accessCode} 
                  onChange={(e) => setAccessCode(e.target.value)} 
                  className="w-full bg-brand-bg-dark border border-brand-border rounded-lg px-4 py-2 text-sm text-brand-text-primary focus:border-brand-purple outline-none transition-colors font-mono uppercase" 
                  placeholder="e.g. STUDENT2026"
                />
              </div>

              {error && (
                <div className="text-[10px] text-brand-rose bg-brand-rose/10 border border-brand-rose/20 p-2 rounded text-center">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 mt-2 bg-brand-cyan hover:bg-brand-cyan/80 text-black font-bold font-mono tracking-widest uppercase rounded-lg transition-colors text-xs disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Unlock Modules"}
              </button>
            </form>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
