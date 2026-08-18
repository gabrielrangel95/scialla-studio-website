import type { SVGProps } from "react";

/**
 * Thin-stroke line icons used by the service landing pages.
 *
 * These are hand-drawn rather than pulled from lucide-react so the whole set
 * shares one stroke weight and optical size — the mockups call for a hairline
 * 1px stroke at 48px, which is lighter than lucide's default look.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------------------------------- Architecture --------------------------------- */

/** Stepped residential massing — ground-up custom homes. */
export function CustomHomesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 40V22l7-5v23" />
      <path d="M15 40V13l9-6v33" />
      <path d="M24 40V20h16v20" />
      <path d="M6 40h36" />
      <path d="M29 26h6M29 32h6" />
    </Icon>
  );
}

/** Window with mullions plus an appended bay — renovations and additions. */
export function RenovationsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="9" y="12" width="22" height="24" />
      <path d="M20 12v24M9 24h22" />
      <path d="M31 18h8v12h-8" />
      <path d="M35 18v12" />
    </Icon>
  );
}

/** Three overlapping circles — architecture and interiors developed together. */
export function IntegratedDesignIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="24" cy="18" r="9" />
      <circle cx="17" cy="30" r="9" />
      <circle cx="31" cy="30" r="9" />
    </Icon>
  );
}

/* -------------------------------- Interior design -------------------------------- */

/** Floor plan with an interior partition — space planning. */
export function SpacePlanningIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="10" y="10" width="28" height="28" />
      <path d="M10 22h12V10" />
      <path d="M22 30h16" />
      <path d="M30 30v8" />
    </Icon>
  );
}

/** Hatched swatch — curated finishes, textures and palettes. */
export function MaterialSelectionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="10" y="10" width="28" height="28" />
      <path d="M14 24l10-10M14 32l18-18M20 34l14-14M28 36l8-8" />
    </Icon>
  );
}

/** Pendant fixture — bespoke millwork and custom detailing. */
export function CustomInteriorsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M24 8v10" />
      <path d="M13 30l11-12 11 12z" />
      <path d="M13 30h22" />
      <path d="M21 34h6" />
    </Icon>
  );
}

/** Armchair — furniture sourcing and styling. */
export function FurnitureStylingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 30V16a3 3 0 013-3h14a3 3 0 013 3v14" />
      <path d="M14 22h-2a3 3 0 00-3 3v5h30v-5a3 3 0 00-3-3h-2" />
      <path d="M9 30v6M39 30v6" />
      <path d="M14 30h20" />
    </Icon>
  );
}

/** Clipboard — coordination from concept through completion. */
export function ProjectManagementIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M17 12h-4v26h22V12h-4" />
      <rect x="19" y="9" width="10" height="6" />
      <path d="M18 23h12M18 29h12" />
    </Icon>
  );
}
