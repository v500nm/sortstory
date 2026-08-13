"use client";

import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Horizontal scroll container with hidden scrollbars for mobile */}
      <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-1 scrollbar-none text-xs font-mono">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.active;

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="text-brand-border-light shrink-0 select-none">/</span>
              )}

              {isLast || !item.href ? (
                <span
                  className={`shrink-0 flex items-center gap-1 ${
                    isLast
                      ? "text-brand-purple font-bold"
                      : "text-brand-text-secondary"
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span className="truncate max-w-[150px] sm:max-w-none">
                    {item.label}
                  </span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="shrink-0 flex items-center gap-1 text-brand-text-secondary hover:text-brand-cyan transition-colors"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span className="truncate max-w-[130px] sm:max-w-none">
                    {item.label}
                  </span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
