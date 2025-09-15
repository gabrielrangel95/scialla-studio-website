"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigation = [
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="px-4 md:px-6 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo_dark.png"
              alt="Scialla Studio - Interior Design"
              width={140}
              height={32}
              className="h-6 md:h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation & CTA - All on the right */}
          <div className="hidden md:flex items-center ml-auto">
            <nav className="flex items-center gap-8 mr-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-900 text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-sm font-medium uppercase tracking-wider"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <div className="flex flex-col space-y-6 mt-8">
                <Link href="/" className="flex-shrink-0">
                  <Image
                    src="/logo_dark.png"
                    alt="Scialla Studio"
                    width={120}
                    height={28}
                    className="h-6 w-auto"
                  />
                </Link>

                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-gray-900 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wider uppercase text-base"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>

                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-black text-white hover:bg-gray-800 w-full py-3 font-medium tracking-wider uppercase"
                >
                  Contact
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
