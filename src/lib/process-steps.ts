/**
 * The studio's design process, shared by the homepage, /process and the
 * service landing pages so every page shows the same steps in the same order.
 * Copy lives in `messages/*.json` under `processSteps.<key>`.
 */
export const PROCESS_STEPS = [
  { key: "discovery", image: "/scialla-studio-interior-design-consultation.png" },
  { key: "concept", image: "/scialla-studio-interior-design.png" },
  { key: "designDevelopment", image: "/scialla-studio-commercial-interior-design.jpg" },
  { key: "documentation", image: "/scialla-studio-architectural-services.png" },
  { key: "construction", image: "/scialla-studio-interior-design-los-angeles.png" },
] as const;

export type TProcessStepKey = (typeof PROCESS_STEPS)[number]["key"];

export function processStepNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
