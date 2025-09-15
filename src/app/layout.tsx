import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Award-Winning Interior Designer | Orlando, Tampa, NYC & Los Angeles | Scialla Studio",
  description:
    "Premier interior design studio serving Orlando, Tampa, NYC & Los Angeles. Luxury residential & commercial design with 15+ years European expertise. Free consultation. 200+ projects completed.",
  keywords:
    "interior designer Orlando, interior designer Tampa, interior designer NYC, interior designer Los Angeles, luxury interior design, residential interior design, commercial interior design, European interior design, Francesco Scialla, award winning interior designer",
  authors: [{ name: "Francesco Scialla", url: "https://sciallastudio.com" }],
  creator: "Scialla Studio",
  publisher: "Scialla Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sciallastudio.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Interior Designer Orlando, Tampa, NYC & Los Angeles | Scialla Studio",
    description:
      "Award-winning interior design studio serving Orlando, Tampa, NYC & Los Angeles. Luxury residential & commercial interior design services.",
    url: "https://sciallastudio.com",
    siteName: "Scialla Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scialla Studio - Luxury Interior Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Interior Designer Orlando, Tampa, NYC & Los Angeles | Scialla Studio",
    description:
      "Award-winning interior design studio serving Orlando, Tampa, NYC & Los Angeles. Luxury residential & commercial interior design services.",
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
  verification: {
    // Add actual verification codes from Google Search Console
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sciallastudio.com",
    name: "Scialla Studio",
    alternateName: "Scialla Interior Design Studio",
    description:
      "Award-winning interior design studio serving Orlando, Tampa, NYC & Los Angeles. Luxury residential & commercial interior design services.",
    url: "https://sciallastudio.com",
    telephone: "+1-555-123-4567",
    email: "info@sciallastudio.com",
    image: [
      "https://sciallastudio.com/logo.jpg",
      "https://sciallastudio.com/studio-photo.jpg",
    ],
    logo: "https://sciallastudio.com/logo.jpg",
    founder: {
      "@type": "Person",
      name: "Francesco Scialla",
      jobTitle: "Interior Designer",
      description:
        "Francesco Scialla is an architect originally from Southern Italy with over 15 years of specialized experience in site plan development, schematic design, key business coordination, interior design, and digital modeling focused on residential and commercial architecture projects.",
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
    serviceType: "Interior Design",
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
      name: "Interior Design Services",
      itemListElement: [
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${notoSerif.variable} antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
