"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { trackButtonClick } from "@/lib/firebase/analytics";
import { VariantProps } from "class-variance-authority";

type ButtonVariants = VariantProps<typeof Button>;

interface AnalyticsButtonProps extends React.ComponentProps<"button">, ButtonVariants {
  buttonName: string;
  buttonLocation: string;
  destination?: string;
  asChild?: boolean;
}

export function AnalyticsButton({
  buttonName,
  buttonLocation,
  destination,
  onClick,
  children,
  ...props
}: AnalyticsButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the click
    trackButtonClick({
      button_name: buttonName,
      button_location: buttonLocation,
      destination,
    });

    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}