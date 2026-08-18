import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found | Scialla Studio",
  robots: { index: false, follow: true },
};

/**
 * Rendered inside the locale layout, so 404s carry the Google tag and report a
 * page_view like any other page. Without this, mistyped and stale URLs were
 * invisible in GA4.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center md:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Error 404
        </p>
        <h1 className="mt-6 text-4xl font-light text-gray-900 md:text-5xl">
          This page could not be found
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
          The page you are looking for may have been moved or no longer exists.
          Explore our work or get in touch and we will point you in the right
          direction.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="px-8 py-4 text-lg font-medium">
            <Link href="/projects">View our projects</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-medium"
          >
            <Link href="/#contact">Contact us</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
