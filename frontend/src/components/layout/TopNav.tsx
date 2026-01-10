"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useObservations } from "@/contexts/ObservationsContext";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

import {
  House,
  ClipboardList,
  Github,
  Plus,
  Search,
  X,
  Loader2,
} from "lucide-react";

/**
 * NAVIGATION
 * Main entry point for navigation-related components and logic.
 */
export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, isSearching } = useObservations();
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value && !pathname.startsWith("/observations")) {
      router.push("/observations");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-foreground shadow-md backdrop-blur-sm">
      <div className="px-8 py-4">
        <div className="relative flex items-center justify-between gap-4">
          {/* Left */}
          <Link href="/">
            <Image
              src="/nav_logo.svg"
              alt="navigation logo"
              width={144}
              height={48}
              fetchPriority="high"
            />
          </Link>

          {/* Center */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2 max-w-[40%]">
            <Link
              href="/"
              className={`relative flex items-center px-4 py-1.5 font-medium transition-all duration-200 ease-out ${
                isActive("/")
                  ? "bg-background text-text-primary rounded-xl shadow-md scale-[1.03]"
                  : "text-text-subtitle hover:text-text-primary"
              }`}
            >
              <House className="w-4 h-4 mr-1" />
              Home
            </Link>
            <Link
              href="/observations"
              className={`relative flex items-center px-4 py-1.5 font-medium transition-all duration-200 ease-out ${
                isActive("/observations") ||
                pathname.startsWith("/observations")
                  ? "bg-background text-text-primary rounded-xl shadow-md scale-[1.03]"
                  : "text-text-subtitle hover:text-text-primary"
              }`}
            >
              <ClipboardList className="w-4 h-4 mr-1" />
              Observations
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* --Search */}
            <div className="hidden md:block">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-background rounded-xl px-3 py-1 shadow-sm">
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 text-text-muted" />
                  ) : (
                    <Search className="w-4 h-4 text-text-muted" />
                  )}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-48 bg-transparent border-none outline-none text-sm"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2 cursor-pointer"
                  >
                    <X className="w-4 h-4 text-text-muted hover:text-text-tertiarys" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="cursor-pointer p-2 text-text-muted hover:text-text-tertiary transition-colors"
                  title="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* --Search - Mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-text-muted hover:text-text-tertiary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* --Divider */}
            <div className="hidden sm:block bg-text-muted h-5 w-px text-text-muted " />

            {/* --GitHub */}
            <Link
              href="https://github.com/MarketaG/my-wildiary"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block p-2 text-text-muted hover:text-text-tertiary transition-colors"
              title="View on GitHub"
            >
              <Github className="w-5 h-5 text-text-muted hover:text-text-tertiary transition-colors" />
            </Link>

            {/* --Theme */}
            <ThemeToggle />

            {/* Add */}
            <button
              onClick={() => router.push("/observations/new")}
              className="cursor-pointer flex items-center gap-2 bg-accent hover:bg-accent-hover text-background px-3 sm:px-4 py-2 rounded-xl font-medium transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New observation</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        {searchOpen && (
          <div className="md:hidden mt-4 flex items-center gap-2 text-text-muted hover:text-text-tertiary rounded-xl px-3 py-2 shadow-sm">
            {isSearching ? (
              <Loader2 className="w-4 h-4 text-text-muted animate-spin" />
            ) : (
              <Search className="w-4 h-4 text-text-muted" />
            )}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
              autoFocus
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="text-text-muted hover:text-text-tertiary"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex gap-2">
          <Link
            href="/"
            className={`flex-1 text-center px-4 py-2 font-medium transition-all duration-200 ${
              isActive("/")
                ? "bg-foreground text-background rounded-xl"
                : "text-text-muted hover:text-text-tertiary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/observations"
            className={`flex-1 text-center px-4 py-2 font-medium transition-all duration-200 ${
              pathname.startsWith("/observations")
                ? "bg-foreground text-background rounded-xl"
                : "text-text-muted hover:text-text-tertiary"
            }`}
          >
            Observations
          </Link>
        </div>
      </div>
    </nav>
  );
}
