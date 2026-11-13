/**
 * The studio's design process, shared by the homepage, /process and the
 * service landing pages so every page shows the same steps in the same order.
 * Copy lives in `messages/*.json` under `processSteps.<key>`.
 */
export const PROCESS_STEPS = [
  { key: "discovery", image: "/scialla-studio-process-discovery.jpg" },
  { key: "concept", image: "/scialla-studio-process-concept.jpg" },
  { key: "designDevelopment", image: "/scialla-studio-process-design-development.jpg" },
  { key: "documentation", image: "/scialla-studio-process-documentation.jpg" },
  { key: "construction", image: "/scialla-studio-process-construction.jpg" },
] as const;

export type TProcessStepKey = (typeof PROCESS_STEPS)[number]["key"];

export function processStepNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
