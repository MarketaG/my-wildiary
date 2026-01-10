"use client";

import { usePathname } from "next/navigation";

export type PageType =
  | "home"
  | "observations-list"
  | "observation-detail"
  | "observation-edit"
  | "observation-new";

export function useAppRouting() {
  const pathname = usePathname();

  // page type detection
  const getPageType = (): PageType => {
    if (pathname === "/") return "home";
    if (pathname === "/observations") return "observations-list";
    if (pathname === "/observations/new") return "observation-new";
    if (pathname.match(/^\/observations\/[^\/]+\/edit$/))
      return "observation-edit";
    if (pathname.match(/^\/observations\/[^\/]+$/)) return "observation-detail";
    return "home";
  };

  const pageType = getPageType();

  // auxiliary flags
  const showSidebar = pathname.startsWith("/observations");
  const isForm =
    pageType === "observation-new" || pageType === "observation-edit";
  const isDetail = pageType === "observation-detail";
  const isList = pageType === "observations-list";
  const isHome = pageType === "home";

  // sidebar width according to page type
  const getSidebarWidth = (): string => {
    if (isForm) return "w-[800px]";
    if (isDetail) return "w-[800px]";
    if (isList) return "w-[600px]";
    return "w-[400px]";
  };

  // sidebar title according to page type
  const getSidebarTitle = (): string => {
    if (pageType === "observation-new") return "New Observation";
    if (pageType === "observation-edit") return "Edit Observation";
    if (pageType === "observation-detail") return "Observation Detail";
    if (pageType === "observations-list") return "Observations";
    return "";
  };

  return {
    pathname,
    pageType,
    showSidebar,
    isForm,
    isDetail,
    isList,
    isHome,
    getSidebarWidth,
    getSidebarTitle,
  };
}
