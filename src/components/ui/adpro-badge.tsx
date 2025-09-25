"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ADPROBadgeProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "light" | "dark" | "white";
  showText?: boolean;
  className?: string;
}

export function ADPROBadge({
  size = "md",
  variant = "default",
  showText = false,
  className
}: ADPROBadgeProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-28 h-28",
    xl: "w-36 h-36"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg"
  };

  return (
    <Link
      href="https://www.architecturaldigest.com/adpro/directory/profile/scialla-studio"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center transition-transform duration-200 hover:scale-105",
        showText ? "flex-col gap-2" : "",
        className
      )}
      aria-label="Featured in Architectural Digest - View our profile"
    >
      <div
        className={cn(
          "relative flex-shrink-0 transition-opacity duration-200 group-hover:opacity-90",
          sizeClasses[size]
        )}
      >
        <Image
          src={variant === "white"
            ? "/scialla-ADPRO_Directory_MemberBadge2025_White.png"
            : "/scialla-studio-ADPRO_Directory_MemberBadge2025_Black.png"
          }
          alt="Architectural Digest Professional Directory Member 2025"
          fill
          className="object-contain"
          sizes={size === "sm" ? "64px" : size === "md" ? "80px" : size === "lg" ? "112px" : "144px"}
        />
      </div>

      {showText && (
        <div className="text-center">
          <p className={cn(
            "font-medium text-gray-900 group-hover:text-gray-700 transition-colors",
            textSizeClasses[size]
          )}>
            Featured in
          </p>
          <p className={cn(
            "font-light text-gray-600 group-hover:text-gray-800 transition-colors",
            textSizeClasses[size]
          )}>
            Architectural Digest
          </p>
        </div>
      )}
    </Link>
  );
}