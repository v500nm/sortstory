"use client";

import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <div className={`mb-6 md:mb-8 animate-in ${className}`}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-brand-text-primary mb-1.5 sm:mb-2 uppercase">
        {title}
      </h1>
      {description && (
        <p className="text-xs sm:text-sm text-brand-text-secondary max-w-3xl leading-relaxed font-medium">
          {description}
        </p>
      )}
    </div>
  );
}
