import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Serif } from "next/font/google";
import {
  GoogleTagBootstrap,
  GoogleTagScript,
} from "@/components/analytics/google-tag";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Page Not Found | Scialla Studio",
  robots: { index: false, follow: true },
};

/**
 * Fallback for requests that never reach the locale segment — an invalid
 * locale, or a path the i18n middleware does not handle. The root layout is a
 * pass-through with no <html>/<body>, so this page supplies its own, along with
 * the Google tag.
 */
export default function RootNotFound() {
  return (
    <html lang="en">
      <head>
        <GoogleTagBootstrap sendPageView />
      </head>
      <body className={`${notoSerif.variable} antialiased`}>
        <GoogleTagScript />
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Error 404
          </p>
          <h1 className="mt-6 text-4xl font-light text-gray-900 md:text-5xl">
            This page could not be found
          </h1>
          <Link
            href="/"
            className="mt-10 border-b border-gray-900 pb-1 text-lg text-gray-900"
          >
            Back to Scialla Studio
          </Link>
        </main>
      </body>
    </html>
  );
}
