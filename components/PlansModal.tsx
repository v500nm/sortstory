"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Analytics } from "@/lib/analytics";

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlansModal({ isOpen, onClose }: PlansModalProps) {
  const { customPlans } = useAuth();
  const [activePlan, setActivePlan] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    className: "",
    rollNumber: "",
    purpose: "",
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `Student 6-Month Free Pass Request: ${formData.name} (${formData.college})`;
    const body = `Full Name: ${formData.name}\nEmail: ${formData.email}\nCollege/University: ${formData.college}\nClass/Year: ${formData.className}\nRoll/ID No: ${formData.rollNumber}\nPurpose: ${formData.purpose}\nNote: Check for duplicate email/roll number before granting single-connection code.`;
    
    Analytics.trackStudentApplicationSubmitted({
      college: formData.college,
      className: formData.className,
      purpose: formData.purpose,
    });

    window.open(`mailto:admin@sortstory.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    
    setSubmitted(true);
  };

  const renderStudentForm = () => {
    if (submitted) {
      return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
          <div className="w-16 h-16 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center text-3xl mb-4">
            ✓
          </div>
          <h3 className="text-2xl font-serif font-bold text-brand-text-primary">Application Submitted!</h3>
          <p className="text-brand-text-secondary max-w-md mx-auto text-xs font-mono leading-relaxed">
            Our team will verify your student credentials to ensure single-use eligibility. Upon approval, your <strong>6-Month Single-Connection Code</strong> will be sent to your email.
          </p>
          <button 
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-brand-bg-card border border-brand-border text-brand-text-primary hover:text-brand-cyan transition-colors rounded-lg font-mono text-xs font-bold uppercase tracking-widest"
          >
            Close Window
          </button>
        </div>
      );
    }

    return (
      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 max-w-xl mx-auto"
        onSubmit={handleStudentSubmit}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold font-serif text-brand-text-primary">Claim 6-Month Free Student Pass</h3>
            <p className="text-[11px] font-mono text-brand-purple">Note: Strictly 1 single-connection pass per verified student email / college ID.</p>
          </div>
          <button 
            type="button" 
            onClick={() => setActivePlan(null)}
            className="text-xs font-mono text-brand-text-secondary hover:text-brand-purple"
          >
            ← Back to Plans
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-brand-text-secondary">Full Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-brand-bg-dark border border-brand-border rounded-lg px-4 py-2 text-sm text-brand-text-primary focus:border-brand-purple outline-none transition-colors" placeholder="Adnan Mangaonkar" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono text-brand-text-secondary">Email Address *</label>
            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-brand-bg-dark border border-brand-border rounded-lg px-4 py-2 text-sm text-brand-text-primary focus:border-brand-purple outline-none transition-colors" placeholder="student@college.edu.in" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono text-brand-text-secondary">College / Institution Name *</label>
            <input required type="text" name="college" value={formData.college} onChange={handleInputChange} className="w-full bg-brand-bg-dark border border-brand-border rounded-lg px-4 py-2 text-sm text-brand-text-primary focus:border-brand-purple outline-none transition-colors" placeholder="e.g. VJTI, Mumbai" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono text-brand-text-secondary">Class / Year / Branch *</label>
            <input required type="text" name="className" value={formData.className} onChange={handleInputChange} className="w-full bg-brand-bg-dark border border-brand-border rounded-lg px-4 py-2 text-sm text-brand-text-primary focus:border-brand-purple outline-none transition-colors" placeholder="e.g. 3rd Year B.Tech CSE" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-brand-text-secondary">College Roll No. / Student ID *</label>
          <input required type="text" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} className="w-full bg-brand-bg-dark border border-brand-border rounded-lg px-4 py-2 text-sm text-brand-text-primary focus:border-brand-purple outline-none transition-colors font-mono" placeholder="Prevents duplicate registrations" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-brand-text-secondary">Primary Learning Goal</label>
          <textarea required name="purpose" value={formData.purpose} onChange={handleInputChange} rows={2} className="w-full bg-brand-bg-dark border border-brand-border rounded-lg px-4 py-2 text-sm text-brand-text-primary focus:border-brand-purple outline-none transition-colors resize-none" placeholder="e.g. Campus placement preparation, semester exams..." />
        </div>

        <button type="submit" className="w-full py-3 mt-4 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold font-mono tracking-widest uppercase rounded-lg transition-colors text-xs">
          Request 6-Month Access Pass
        </button>
      </motion.form>
    );
  };

  const renderPlans = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {customPlans.map((plan) => (
        <div key={plan.id} className={`bg-brand-bg-dark border rounded-2xl p-6 flex flex-col transition-all relative overflow-hidden group ${plan.id === 'hybrid' ? 'border-brand-purple shadow-[0_0_25px_rgba(168,85,247,0.15)]' : 'border-brand-border hover:border-brand-purple/40'}`}>
          {plan.badge && (
            <div className={`absolute top-0 right-0 text-[10px] font-bold px-3 py-1 rounded-bl-lg font-mono ${plan.id === 'student' ? 'bg-brand-green/20 text-brand-green' : 'bg-brand-purple text-white'}`}>
              {plan.badge}
            </div>
          )}
          
          <h3 className="text-xl font-bold font-serif text-brand-text-primary">{plan.name}</h3>
          <div className="text-2xl font-bold text-brand-cyan mt-2 mb-1">{plan.price}</div>
          <p className="text-xs text-brand-text-secondary min-h-[40px] mb-4 font-mono">{plan.description}</p>
          
          <ul className="space-y-2 mb-6 flex-grow">
            {plan.features.map(feat => (
              <li key={feat} className="text-xs font-mono text-brand-text-secondary flex items-center gap-2">
                <span className="text-brand-purple">✓</span> {feat}
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => {
              Analytics.trackPlanView(plan.id, plan.name, plan.price);
              if (plan.id === "student") {
                setActivePlan("student");
              } else {
                window.open(`mailto:sales@sortstory.com?subject=Inquiry for ${plan.name} (${plan.price})`, '_blank');
              }
            }}
            className={`w-full py-2.5 rounded-lg text-xs font-bold font-mono uppercase tracking-widest transition-colors ${
              plan.id === "student" 
                ? "bg-brand-purple text-white hover:bg-brand-purple/80" 
                : plan.id === "hybrid"
                ? "bg-brand-cyan text-black hover:bg-brand-cyan/80"
                : "bg-brand-bg-medium border border-brand-border text-brand-text-primary hover:bg-white/5"
            }`}
          >
            {plan.id === "student" ? "Apply for Free Pass" : "Get Access"}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-6xl bg-brand-surface-2 border border-brand-border-light rounded-3xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar z-10"
          >
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-green rounded-t-3xl" />

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-text-secondary hover:text-brand-text-primary w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
            
            <div className="mb-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-black font-serif text-brand-text-primary mb-2">
                Access Plans & Subscriptions
              </h2>
              <p className="text-brand-text-secondary text-xs font-mono max-w-2xl mx-auto">
                SortStory modules are gated to ensure high-performance infrastructure. Standard plans feature <strong>1 connection per code</strong>. Verified students get a <strong>6-Month Free Pass</strong>.
              </p>
            </div>

            {activePlan === "student" ? renderStudentForm() : renderPlans()}
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
