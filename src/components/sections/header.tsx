"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { trackPhoneClick, trackEmailClick } from "@/lib/google-ads/gtag-events";

export function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if we're on the homepage (root or just locale, e.g., '/' or '/en')
  const isHomePage = pathname === '/' || /^\/[a-z]{2}(-[A-Z]{2})?$/.test(pathname);

  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: t('portfolio'), id: "projects", href: "#projects" },
    { name: t('about'), id: "about", href: "#about" },
    { name: t('process'), id: "process", href: "/process" },
  ];

  const cities = [
    { name: "Orlando", href: "/interior-design-orlando" },
    { name: "Tampa", href: "/interior-design-tampa" },
    { name: "New York", href: "/interior-design-nyc" },
    { name: "Los Angeles", href: "/interior-design-los-angeles" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-200"
      }`}
    >
      <div className="px-4 md:px-6 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo_dark.png"
              alt="Scialla Studio - Interior Design"
              width={140}
              height={32}
              className={`h-6 md:h-8 w-auto transition-all duration-500 ${
                isTransparent ? "brightness-0 invert" : ""
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation & CTA - All on the right */}
          <div className="hidden md:flex items-center ml-auto gap-4">
            <nav className="flex items-center gap-8">
              {navigation.map((item) => {
                const navClass = isTransparent
                  ? "text-white text-sm font-medium uppercase tracking-wider hover:text-white/70 transition-colors duration-200"
                  : "text-gray-900 text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors duration-200";
                return item.href.startsWith("#") ? (
                  isHomePage ? (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className={navClass}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      href={`/${item.href}`}
                      className={navClass}
                    >
                      {item.name}
                    </Link>
                  )
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={navClass}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {isHomePage ? (
              <Button
                onClick={() => scrollToSection("contact")}
                className={`px-8 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-500 ${
                  isTransparent
                    ? "border border-white text-white bg-transparent hover:bg-white/10"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {t('contact')}
              </Button>
            ) : (
              <Button
                asChild
                className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-sm font-medium uppercase tracking-wider"
              >
                <Link href="/#contact">{t('contact')}</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-sm transition-colors duration-500 ${
                  isTransparent ? "text-white hover:bg-white/10" : "hover:bg-gray-100"
                }`}
              >
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
                            isHomePage ? (
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
                                href={`/${item.href}`}
                                className="flex items-center justify-between w-full text-left text-gray-900 hover:text-gray-600 transition-colors duration-200 group"
                              >
                                <span className="text-lg font-light tracking-wide">
                                  {item.name}
                                </span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </Link>
                            )
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

                    {/* Contact CTA */}
                    <div className="pt-8">
                      <SheetClose asChild>
                        {isHomePage ? (
                          <Button
                            onClick={() => scrollToSection("contact")}
                            className="w-full bg-black text-white hover:bg-gray-800 py-4 text-sm font-medium uppercase tracking-wider rounded-sm"
                          >
                            {t('getConsultation')}
                          </Button>
                        ) : (
                          <Button
                            asChild
                            className="w-full bg-black text-white hover:bg-gray-800 py-4 text-sm font-medium uppercase tracking-wider rounded-sm"
                          >
                            <Link href="/#contact">{t('getConsultation')}</Link>
                          </Button>
                        )}
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
                        <a
                          href="tel:+17275044138"
                          className="hover:text-gray-900 transition-colors"
                          onClick={() => trackPhoneClick("mobile_menu")}
                        >
                          (727) 504-4138
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a
                          href="mailto:info@sciallastudioid.com"
                          className="hover:text-gray-900 transition-colors"
                          onClick={() => trackEmailClick("mobile_menu")}
                        >
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
