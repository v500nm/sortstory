"use client";

import { useEffect } from "react";

export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Prevent Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Prevent Keyboard Shortcuts for DevTools and Copying
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      
      // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Windows/Linux)
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
        e.preventDefault();
      }
      
      // Prevent Cmd+Option+I, Cmd+Option+J, Cmd+Option+C (Mac)
      if (e.metaKey && e.altKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
        e.preventDefault();
      }
      
      // Prevent Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }
      
      // Prevent Ctrl+C / Cmd+C (Copy)
      if ((e.ctrlKey || e.metaKey) && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
      }
    };

    // 3. Prevent Copy Events
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // 4. Prevent Dragging
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return <>{children}</>;
}
