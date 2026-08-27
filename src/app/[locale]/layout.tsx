import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Serif } from "next/font/google";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { AnalyticsProvider } from "@/lib/analytics/analytics-provider";
import { LeadSubmissionProvider } from "@/lib/analytics/lead-submission";
import {
  GoogleTagBootstrap,
  GoogleTagScript,
} from "@/components/analytics/google-tag";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.sciallastudioid.com";
  const title =
    "Premier Architecture & Interior Design Studio | Orlando, Tampa, NYC & LA | Scialla Studio";

  const description =
    "Full-service architecture and interior design studio serving clients nationwide. New construction, architectural renovations, luxury residential & commercial design. Studios in Orlando, Tampa, NYC & Los Angeles. Licensed architect with 20+ years expertise.";

  return {
    title,
    description,
    keywords:
      "architect Orlando, architect Tampa, architect NYC, architect Los Angeles, interior designer Orlando, interior designer Tampa, interior designer NYC, interior designer Los Angeles, new construction design, architectural design, architectural renovations, nationwide interior design, luxury interior design, residential interior design, commercial interior design, Francesco Scialla architect, licensed architect, award winning architect, virtual architecture consultations",
    authors: [{ name: "Francesco Scialla", url: baseUrl }],
    creator: "Scialla Studio",
    publisher: "Scialla Studio",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: "Scialla Studio",
      locale: 'en_US',
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Scialla Studio - Architecture & Interior Design",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image.jpg"],
      creator: "@sciallastudio",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.sciallastudioid.com",
    name: "Scialla Studio",
    alternateName: "Scialla Architecture & Interior Design Studio",
    description:
      "Full-service architecture and interior design studio serving Orlando, Tampa, NYC & Los Angeles. New construction, architectural renovations, luxury residential & commercial design services.",
    url: "https://www.sciallastudioid.com",
    telephone: "+1-727-504-4138",
    email: "info@sciallastudioid.com",
    image: [
      "https://www.sciallastudioid.com/logo.jpg",
      "https://www.sciallastudioid.com/studio-photo.jpg",
    ],
    logo: "https://www.sciallastudioid.com/logo.jpg",
    founder: {
      "@type": "Person",
      name: "Francesco Scialla",
      jobTitle: "Architect & Interior Designer",
      description:
        "Francesco Scialla is a licensed architect originally from Southern Italy with over 20 years of specialized experience in architectural design, new construction, site plan development, schematic design, interior design, and digital modeling focused on residential and commercial architecture projects.",
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "123 Design District",
        addressLocality: "Orlando",
        addressRegion: "FL",
        postalCode: "32801",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "456 Hyde Park Ave",
        addressLocality: "Tampa",
        addressRegion: "FL",
        postalCode: "33606",
        addressCountry: "US",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Orlando",
        containedInPlace: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Tampa",
        containedInPlace: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "New York City",
        containedInPlace: {
          "@type": "State",
          name: "New York",
        },
      },
      {
        "@type": "City",
        name: "Los Angeles",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
    ],
    inLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    serviceType: ["Architecture", "Interior Design", "New Construction", "Architectural Design"],
    priceRange: "$$$$",
    paymentAccepted: ["Cash", "Credit Card", "Check"],
    currenciesAccepted: "USD",
    openingHours: "Mo-Fr 09:00-18:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah M.",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody:
          "Transformed our Tampa home beautifully with incredible attention to detail.",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architecture & Interior Design Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Architectural Design Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "New Home Construction Design",
                description: "Complete architectural design for new construction projects",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Architectural Renovations & Additions",
                description: "Professional architectural design for renovations and additions",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Site Planning & Development",
                description: "Comprehensive site planning and development services",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Residential Interior Design",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Complete Home Renovation",
                description: "Full-service home renovation and interior design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Kitchen Design & Remodeling",
                description: "Custom kitchen design and remodeling services",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Commercial Interior Design",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Office Space Planning",
                description: "Professional office space planning and design",
              },
            },
          ],
        },
      ],
    },
    sameAs: [
      "https://www.facebook.com/sciallastudio",
      "https://www.instagram.com/sciallastudio",
      "https://www.linkedin.com/company/sciallastudio",
      "https://www.pinterest.com/sciallastudio",
    ],
  };

  return (
    <html lang={locale}>
      <head>
        {/* Google tag (gtag.js) for GA4 and Google Ads Conversion Tracking */}
        <GoogleTagBootstrap />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${notoSerif.variable} antialiased`} suppressHydrationWarning>
        <GoogleTagScript />
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <AnalyticsProvider>
              <LeadSubmissionProvider>
                <ScrollToTop />
                {children}
                <Toaster position="top-right" richColors />
              </LeadSubmissionProvider>
            </AnalyticsProvider>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
