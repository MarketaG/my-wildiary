"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppRouting } from "@/hooks/useAppRouting";
import { useObservations } from "@/contexts/ObservationsContext";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./Logo";

import {
  House,
  ClipboardList,
  Github, // todo
  Plus,
  Search,
  X,
  Loader2,
} from "lucide-react";

export default function TopNav() {
  const router = useRouter();
  const { searchQuery, setSearchQuery, isSearching } = useObservations();
  const [searchOpen, setSearchOpen] = useState(false);

  const { pageType } = useAppRouting();

  // checking the active menu
  const isActive = (type: "home" | "observations-list") => {
    if (type === "home") return pageType === "home";
    if (type === "observations-list")
      return [
        "observations-list",
        "observation-detail",
        "observation-edit",
        "observation-new",
      ].includes(pageType);
    return false;
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (
      value &&
      ![
        "observations-list",
        "observation-detail",
        "observation-edit",
        "observation-new",
      ].includes(pageType)
    ) {
      router.push("/observations");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-foreground shadow-md backdrop-blur-sm">
      <div className="px-8 py-4">
        <div className="relative flex items-center justify-between gap-4">
          {/* logo */}
          <Link href="/">
            <Logo className="h-12 w-auto text-text-primary dark:text-text-inverted" />
          </Link>

          {/* desktop menu */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2 max-w-[40%]">
            <Link
              href="/"
              className={`relative flex items-center px-4 py-1.5 font-medium transition-all duration-200 ease-out ${
                isActive("home")
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
                isActive("observations-list")
                  ? "bg-background text-text-primary rounded-xl shadow-md scale-[1.03]"
                  : "text-text-subtitle hover:text-text-primary"
              }`}
            >
              <ClipboardList className="w-4 h-4 mr-1" />
              Observations
            </Link>
          </div>

          {/* right section */}
          <div className="flex items-center gap-3">
            {/* desktop Search */}
            <div className="hidden md:block">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-background rounded-xl px-3 py-1 shadow-sm">
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
                    <X className="w-4 h-4 text-text-muted hover:text-text-tertiary" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  title="Search"
                  className="cursor-pointer hidden md:inline-flex items-center rounded-md px-2 py-1 text-text-muted hover:bg-accent/10 hover:text-text-tertiary transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-text-muted hover:text-text-tertiary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* divider */}
            <div className="hidden sm:block bg-text-muted h-5 w-px text-text-muted" />

            {/* gitHub */}
            <Link
              href="https://github.com/MarketaG/my-wildiary"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
              className="hidden sm:inline-flex items-center rounded-md px-2 py-1 text-text-muted hover:bg-accent/10 hover:text-text-tertiary transition"
            >
              <Github className="w-5 h-5" />
            </Link>

            {/* theme */}
            <ThemeToggle />

            {/* new */}
            <button
              onClick={() => router.push("/observations/new")}
              className="cursor-pointer flex items-center gap-2 bg-accent hover:bg-accent-hover text-background px-3 sm:px-4 py-2 rounded-xl font-medium transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New observation</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
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

        {/* Mobile Menu */}
        <div className="md:hidden mt-4 flex gap-2">
          <Link
            href="/"
            className={`flex-1 text-center px-4 py-2 font-medium transition-all duration-200 ${
              isActive("home")
                ? "bg-foreground text-background rounded-xl"
                : "text-text-muted hover:text-text-tertiary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/observations"
            className={`flex-1 text-center px-4 py-2 font-medium transition-all duration-200 ${
              isActive("observations-list")
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
