"use client";

import { useEffect, useRef } from "react";
import { trackSectionView } from "@/lib/firebase/analytics";

interface SectionViewTrackerProps {
  sectionName: string;
  page: string;
  children: React.ReactNode;
  threshold?: number;
}

export function SectionViewTracker({
  sectionName,
  page,
  children,
  threshold = 0.5,
}: SectionViewTrackerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedRef.current) {
            trackSectionView(sectionName, page);
            hasTrackedRef.current = true;
          }
        });
      },
      { threshold }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, [sectionName, page, threshold]);

  return <div ref={sectionRef}>{children}</div>;
}