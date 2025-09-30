"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Menu, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export function Header() {
  const t = useTranslations('header');

  useEffect(() => {
    // Handle hash navigation when page loads
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          // Small delay to ensure page has loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    handleHashNavigation();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigation = [
    { name: t('services'), id: "services", href: "#services" },
    { name: t('portfolio'), id: "portfolio", href: "#portfolio" },
    { name: t('about'), id: "about", href: "#about" },
  ];

  const cities = [
    { name: "Orlando", href: "/interior-design-orlando" },
    { name: "Tampa", href: "/interior-design-tampa" },
    { name: "New York", href: "/interior-design-nyc" },
    { name: "Los Angeles", href: "/interior-design-los-angeles" },
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
          <div className="hidden md:flex items-center ml-auto gap-4">
            <nav className="flex items-center gap-8">
              {navigation.map((item) => (
                item.href.startsWith("#") ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-900 text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            <LanguageSwitcher />

            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-sm font-medium uppercase tracking-wider"
            >
              {t('contact')}
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] bg-white p-0 border-l border-gray-100">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <Link href="/" className="flex-shrink-0">
                    <Image
                      src="/logo_dark.png"
                      alt="Scialla Studio"
                      width={140}
                      height={32}
                      className="h-7 w-auto"
                    />
                  </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-8">
                    {/* Main Navigation */}
                    <div className="space-y-6">
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                        Navigation
                      </p>
                      {navigation.map((item) => (
                        <SheetClose key={item.name} asChild>
                          {item.href.startsWith("#") ? (
                            <button
                              onClick={() => scrollToSection(item.id)}
                              className="flex items-center justify-between w-full text-left text-gray-900 hover:text-gray-600 transition-colors duration-200 group"
                            >
                              <span className="text-lg font-light tracking-wide">
                                {item.name}
                              </span>
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              className="flex items-center justify-between w-full text-left text-gray-900 hover:text-gray-600 transition-colors duration-200 group"
                            >
                              <span className="text-lg font-light tracking-wide">
                                {item.name}
                              </span>
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </Link>
                          )}
                        </SheetClose>
                      ))}
                    </div>

                    {/* Cities */}
                    <div className="space-y-6">
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                        Our Locations
                      </p>
                      {cities.map((city) => (
                        <SheetClose key={city.name} asChild>
                          <Link
                            href={city.href}
                            className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                          >
                            <span className="text-base font-light tracking-wide">
                              {city.name}
                            </span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    {/* Language Switcher */}
                    <div className="pt-4">
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-4">
                        Language
                      </p>
                      <LanguageSwitcher />
                    </div>

                    {/* Contact CTA */}
                    <div className="pt-8">
                      <SheetClose asChild>
                        <Button
                          onClick={() => scrollToSection("contact")}
                          className="w-full bg-gray-900 text-white hover:bg-gray-800 py-4 text-sm font-medium uppercase tracking-wider rounded-sm"
                        >
                          {t('getConsultation')}
                        </Button>
                      </SheetClose>
                    </div>
                  </nav>
                </div>

                {/* Footer */}
                <div className="px-6 py-6 border-t border-gray-100 bg-gray-50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href="tel:+17275044138" className="hover:text-gray-900 transition-colors">
                          (727) 504-4138
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:info@sciallastudioid.com" className="hover:text-gray-900 transition-colors">
                          info@sciallastudioid.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Orlando, Tampa, NYC, LA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
