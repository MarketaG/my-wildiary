"use client";

import { useState } from "react";

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out"
      style={{
        transform: isExpanded
          ? "translateY(0)"
          : "translateY(calc(100% - 8px))",
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="bg-accent/30 text-text-subtitle py-3 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <span className="inline-flex flex-wrap items-center justify-center gap-1">
            © {new Date().getFullYear()} – Designed and developed by
            <a
              href="https://marketagracova.com/cs"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-medium text-text-primary hover:text-accent transition-colors"
            >
              Markéta Grácová
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
