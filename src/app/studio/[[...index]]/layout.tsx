import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scialla Studio CMS",
  description: "Content Management System for Scialla Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
