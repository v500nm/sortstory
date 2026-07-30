"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PlanType = "none" | "student" | "learning" | "visualization" | "hybrid" | "institute";
export type SiteMode = "gated" | "free_all" | "free_students";

export interface CustomPlan {
  id: string;
  name: string;
  price: string;
  badge?: string;
  description: string;
  features: string[];
}

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  planType: PlanType;
  siteMode: SiteMode;
  customPlans: CustomPlan[];
  login: (code: string) => boolean;
  logout: () => void;
  setSiteMode: (mode: SiteMode) => void;
  addCustomPlan: (plan: CustomPlan) => void;
  deleteCustomPlan: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_PLANS: CustomPlan[] = [
  {
    id: "student",
    name: "Student Pass",
    price: "FREE (6 Months)",
    badge: "6 MONTHS FREE",
    description: "Full access pass for verified college students & freshers. Strictly 1 redemption per student.",
    features: [
      "Full 6-Month Unlimited Access",
      "1 Single Connection / Device",
      "All 16+ Sorting Visualizers",
      "Complete DSA Learning Curriculum",
      "Single-Use Verification Code"
    ],
  },
  {
    id: "learning",
    name: "Learning Only",
    price: "₹299 / 6 Months",
    description: "Access to the comprehensive DSA learning curriculum, code examples & interview theory.",
    features: [
      "Full Learning Curriculum",
      "1 Single Connection / Device",
      "Multi-language Code Examples",
      "Step-by-step Interview Problems"
    ],
  },
  {
    id: "visualization",
    name: "Visualization Only",
    price: "₹299 / 6 Months",
    description: "Full access to interactive visualizers, step controls, and race comparison modes.",
    features: [
      "16+ Sorting Visualizations",
      "1 Single Connection / Device",
      "Dijkstra vs A* Pathfinding Race",
      "BST, Graphs & Linked Lists"
    ],
  },
  {
    id: "hybrid",
    name: "Hybrid Pass",
    price: "₹499 / 6 Months",
    badge: "BEST VALUE",
    description: "Complete un-gated access to both learning curriculum and all interactive visualizers.",
    features: [
      "All Learning & Visualizer Modules",
      "1 Single Connection / Device",
      "6 Months Full Access",
      "Priority Support & Updates"
    ],
  },
  {
    id: "institute",
    name: "Institution Plan",
    price: "Flexible per Connection",
    badge: "MULTI-SEAT",
    description: "Custom bulk seats for engineering colleges, computer labs, and bootcamp batches.",
    features: [
      "Pay per Connection / Seat",
      "Flexible Monthly / Annual Billing",
      "Departmental Dashboard",
      "Custom Curriculum Integration"
    ],
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [planType, setPlanType] = useState<PlanType>("none");
  const [siteMode, setSiteModeState] = useState<SiteMode>("free_all");
  const [customPlans, setCustomPlans] = useState<CustomPlan[]>(DEFAULT_PLANS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load stored access code
    const storedCode = localStorage.getItem("sortstory_access_code");
    if (storedCode) {
      validateCode(storedCode);
    }
    // Load stored site mode
    const storedMode = localStorage.getItem("sortstory_site_mode") as SiteMode;
    if (storedMode) {
      setSiteModeState(storedMode);
    }
    // Load custom plans if configured
    const storedPlans = localStorage.getItem("sortstory_custom_plans");
    if (storedPlans) {
      try {
        setCustomPlans(JSON.parse(storedPlans));
      } catch (e) {
        setCustomPlans(DEFAULT_PLANS);
      }
    }
  }, []);

  const validateCode = (code: string) => {
    const mockCodes: Record<string, { plan: PlanType; admin: boolean }> = {
      "STUDENT2026": { plan: "student", admin: false },
      "LEARN_PRO": { plan: "learning", admin: false },
      "VIS_PRO": { plan: "visualization", admin: false },
      "HYBRID_MAX": { plan: "hybrid", admin: false },
      "INSTITUTE_ADMIN": { plan: "institute", admin: true },
      "ADMIN": { plan: "hybrid", admin: true },
      "ADMIN2026": { plan: "hybrid", admin: true },
    };

    const cleanCode = code.trim().toUpperCase();
    if (mockCodes[cleanCode]) {
      setIsLoggedIn(true);
      setPlanType(mockCodes[cleanCode].plan);
      setIsAdmin(mockCodes[cleanCode].admin);
      return true;
    }
    return false;
  };

  const login = (code: string) => {
    const success = validateCode(code);
    if (success) {
      localStorage.setItem("sortstory_access_code", code.trim().toUpperCase());
    }
    return success;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setPlanType("none");
    localStorage.removeItem("sortstory_access_code");
  };

  const setSiteMode = (mode: SiteMode) => {
    setSiteModeState(mode);
    localStorage.setItem("sortstory_site_mode", mode);
  };

  const addCustomPlan = (plan: CustomPlan) => {
    const updated = [...customPlans, plan];
    setCustomPlans(updated);
    localStorage.setItem("sortstory_custom_plans", JSON.stringify(updated));
  };

  const deleteCustomPlan = (id: string) => {
    const updated = customPlans.filter(p => p.id !== id);
    setCustomPlans(updated);
    localStorage.setItem("sortstory_custom_plans", JSON.stringify(updated));
  };

  if (!isMounted) {
    return (
      <AuthContext.Provider value={{ 
        isLoggedIn: false, 
        isAdmin: false, 
        planType: "none", 
        siteMode: "free_all",
        customPlans: DEFAULT_PLANS,
        login: () => false, 
        logout: () => {},
        setSiteMode: () => {},
        addCustomPlan: () => {},
        deleteCustomPlan: () => {},
      }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      isAdmin, 
      planType, 
      siteMode,
      customPlans,
      login, 
      logout,
      setSiteMode,
      addCustomPlan,
      deleteCustomPlan,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
