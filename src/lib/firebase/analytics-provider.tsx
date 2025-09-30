"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics, logEvent as firebaseLogEvent } from "firebase/analytics";
import { firebaseConfig } from "./config";

let analytics: Analytics | null = null;
let app: FirebaseApp | null = null;

// Initialize Firebase
function initializeFirebase() {
  if (typeof window === "undefined") return null;

  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  if (!analytics && app) {
    analytics = getAnalytics(app);
  }

  return analytics;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initializedRef = useRef(false);

  // Initialize Firebase on mount
  useEffect(() => {
    if (!initializedRef.current) {
      initializeFirebase();
      initializedRef.current = true;
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!analytics) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Track page view
    firebaseLogEvent(analytics, "page_view", {
      page_path: url,
      page_title: document.title,
    });

    // Track specific page types
    if (pathname === "/") {
      firebaseLogEvent(analytics, "view_homepage");
    } else if (pathname.startsWith("/interior-design-")) {
      const city = pathname.replace("/interior-design-", "");
      firebaseLogEvent(analytics, "view_city_page", { city });
    } else if (pathname === "/portfolio") {
      const city = searchParams?.get("city");
      const category = searchParams?.get("category");
      firebaseLogEvent(analytics, "view_portfolio", { city, category });
    } else if (pathname.startsWith("/portfolio/")) {
      const projectSlug = pathname.replace("/portfolio/", "");
      firebaseLogEvent(analytics, "view_project", { project_slug: projectSlug });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}

// Export analytics instance getter
export function getAnalyticsInstance() {
  if (!analytics) {
    return initializeFirebase();
  }
  return analytics;
}