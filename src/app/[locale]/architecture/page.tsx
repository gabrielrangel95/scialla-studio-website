import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { LandingHero } from "@/components/sections/service-landing/landing-hero";
import { IntroSplit } from "@/components/sections/service-landing/intro-split";
import { ProjectShowcase } from "@/components/sections/service-landing/project-showcase";
import { CapabilityGrid } from "@/components/sections/service-landing/capability-grid";
import { ProcessStrip } from "@/components/sections/service-landing/process-strip";
import { CtaBand } from "@/components/sections/service-landing/cta-band";
import {
  CustomHomesIcon,
  RenovationsIcon,
  IntegratedDesignIcon,
} from "@/components/ui/line-icons";
import { sanityService } from "@/lib/sanity-service";

type Props = {
  params: Promise<{ locale: string }>;
};

const BASE_URL = "https://www.sciallastudioid.com";
const PATH = "/architecture";

const HERO_IMAGE = "/scialla-studio-architectural-services.png";
const INTRO_IMAGE = "/scialla-studio-interior-design.png";

const SERVICE_KEYS = ["customHomes", "renovations", "integrated"] as const;
const SERVICE_ICONS = {
  customHomes: CustomHomesIcon,
  renovations: RenovationsIcon,
  integrated: IntegratedDesignIcon,
} as const;

const PROCESS_KEYS = [
  "discovery",
  "concept",
  "development",
  "documentation",
  "construction",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "architecturePage" });

  const title = t("seo.title");
  const description = t("seo.description");

  return {
    title,
    description,
    keywords: [
      "custom residential architecture",
      "residential architect Tampa",
      "residential architect Orlando",
      "custom home architect Florida",
      "home renovation architect",
      "architectural additions",
      "new construction architect",
      "licensed architect Florida",
      "architecture and interior design firm",
      "Francesco Scialla architect",
    ].join(", "),
    alternates: {
      canonical: `${BASE_URL}${PATH}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${PATH}`,
      siteName: "Scialla Studio",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: HERO_IMAGE,
          width: 1200,
          height: 630,
          alt: t("hero.imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [HERO_IMAGE],
    },
  };
}

export default async function ArchitecturePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "architecturePage" });

  // Projects flagged `architecture` or `both` in Sanity.
  const showcaseProjects = await sanityService.getAllProjects({
    serviceType: "architecture",
    limit: 3,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}${PATH}`,
    name: "Custom Residential Architecture",
    serviceType: "Residential Architecture",
    description: t("seo.description"),
    url: `${BASE_URL}${PATH}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": BASE_URL,
      name: "Scialla Studio",
      telephone: "+1-727-504-4138",
      email: "info@sciallastudioid.com",
    },
    areaServed: ["Orlando", "Tampa", "New York City", "Los Angeles"].map(
      (name) => ({ "@type": "City", name })
    ),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t("services.title"),
      itemListElement: SERVICE_KEYS.map((key) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: t(`services.${key}.title`),
          description: t(`services.${key}.description`),
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: t("hero.title"),
        item: `${BASE_URL}${PATH}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white text-gray-900">
        <Header />

        <main>
          <LandingHero
            image={HERO_IMAGE}
            imageAlt={t("hero.imageAlt")}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
            ctas={[{ label: t("hero.cta"), href: "/#contact" }]}
            uppercaseTitle
            objectPosition="center 38%"
          />

          <IntroSplit
            eyebrow={t("intro.eyebrow")}
            paragraphs={[t("intro.paragraph1"), t("intro.paragraph2")]}
            cta={{ label: t("intro.cta"), href: "/process" }}
            image={INTRO_IMAGE}
            imageAlt={t("intro.imageAlt")}
          />

          <ProjectShowcase
            heading={t("projects.title")}
            projects={showcaseProjects}
            captionPlacement="below"
            viewProjectLabel={t("projects.viewProject")}
            headingStyle="eyebrow"
          />

          <CapabilityGrid
            heading={t("services.title")}
            items={SERVICE_KEYS.map((key) => ({
              icon: SERVICE_ICONS[key],
              title: t(`services.${key}.title`),
              description: t(`services.${key}.description`),
            }))}
            headingStyle="eyebrow"
          />

          <ProcessStrip
            heading={t("process.title")}
            steps={PROCESS_KEYS.map((key, index) => ({
              number: String(index + 1).padStart(2, "0"),
              title: t(`process.steps.${key}.title`),
              description: t(`process.steps.${key}.description`),
            }))}
            cta={{ label: t("process.cta"), href: "/process" }}
          />

          <CtaBand
            title={t("cta.title")}
            description={t("cta.description")}
            cta={{ label: t("cta.button"), href: "/#contact" }}
            backgroundImage={HERO_IMAGE}
            backgroundAlt={t("cta.imageAlt")}
            objectPosition="center 30%"
            layout="stacked"
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
