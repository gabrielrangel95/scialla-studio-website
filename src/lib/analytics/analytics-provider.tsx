"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendEvent, sendPageView } from "./gtag";

/**
 * Reports one GA4 page_view for the initial load and for every client-side
 * route change.
 *
 * This previously waited on the Firebase Analytics SDK and bailed out with
 * `if (!analytics) return`. On a cold visit that SDK needed ~20s to register an
 * installation, so any navigation a visitor made before then was silently
 * dropped — which is why only landing pages showed up in GA4. gtag is defined
 * synchronously in <head>, so there is nothing left to wait for.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    sendPageView(url);

    // Page-type events, kept for the existing GA4 reports and audiences.
    if (pathname === "/") {
      sendEvent("view_homepage");
    } else if (pathname.startsWith("/interior-design-")) {
      sendEvent("view_city_page", {
        city: pathname.replace("/interior-design-", ""),
      });
    } else if (pathname === "/projects") {
      sendEvent("view_portfolio", {
        city: searchParams?.get("city"),
        category: searchParams?.get("category"),
      });
    } else if (pathname.startsWith("/projects/")) {
      sendEvent("view_project", {
        project_slug: pathname.replace("/projects/", ""),
      });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}
