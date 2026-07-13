"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from './LanguageContext';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { language } = useLanguage();

  return (
    <div className="text-brand-text-secondary space-y-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold text-brand-text-primary mb-4 mt-8">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold text-brand-text-primary mb-3 mt-6 border-b border-brand-border pb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold text-brand-text-primary mb-2 mt-4">{children}</h3>,
          p: ({ children }) => <p className="leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 ml-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className="font-bold text-brand-text-primary">{children}</strong>,
          a: ({ children, href }) => <a href={href} className="text-brand-cyan hover:underline">{children}</a>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-purple pl-4 italic bg-brand-bg-card p-4 rounded-r-lg my-4">
              {children}
            </blockquote>
          ),
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';

            // If it's a code block and has a language
            if (!inline && lang) {
              // Only render if the language matches the currently selected language OR if it's not one of our toggleable languages
              const toggleableLanguages = ['python', 'javascript', 'java', 'cpp', 'c'];
              
              if (toggleableLanguages.includes(lang) && lang !== language) {
                return null;
              }

              return (
                <div className="relative group my-6 border border-brand-border rounded-lg bg-[#070707] overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-border/60 text-brand-text-secondary text-[10px] px-3 py-1 rounded-bl-lg font-mono uppercase tracking-wider">
                    {lang}
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm text-brand-text-secondary font-mono">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }

            // Inline code or un-language code
            return (
              <code className={`${className} bg-brand-border/30 border border-brand-border px-1.5 py-0.5 rounded text-brand-cyan text-[13px] font-mono`} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
