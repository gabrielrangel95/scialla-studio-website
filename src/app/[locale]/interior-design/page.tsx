import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { LandingHero } from "@/components/sections/service-landing/landing-hero";
import { IntroSplit } from "@/components/sections/service-landing/intro-split";
import { CapabilityGrid } from "@/components/sections/service-landing/capability-grid";
import { ProjectShowcase } from "@/components/sections/service-landing/project-showcase";
import { CityLinks } from "@/components/sections/service-landing/city-links";
import { CtaBand } from "@/components/sections/service-landing/cta-band";
import {
  SpacePlanningIcon,
  MaterialSelectionIcon,
  CustomInteriorsIcon,
  FurnitureStylingIcon,
  ProjectManagementIcon,
} from "@/components/ui/line-icons";
import { sanityService } from "@/lib/sanity-service";

type Props = {
  params: Promise<{ locale: string }>;
};

const BASE_URL = "https://www.sciallastudioid.com";
const PATH = "/interior-design";

const HERO_IMAGE = "/scialla-studio-interior-design.png";
const INTRO_IMAGE = "/scialla-studio-interior-design-consultation.png";

const CAPABILITY_KEYS = [
  "spacePlanning",
  "materialSelection",
  "customInteriors",
  "furnitureStyling",
  "projectManagement",
] as const;

const CAPABILITY_ICONS = {
  spacePlanning: SpacePlanningIcon,
  materialSelection: MaterialSelectionIcon,
  customInteriors: CustomInteriorsIcon,
  furnitureStyling: FurnitureStylingIcon,
  projectManagement: ProjectManagementIcon,
} as const;

const CITIES = [
  { key: "orlando", slug: "orlando" },
  { key: "tampa", slug: "tampa" },
  { key: "nyc", slug: "nyc" },
  { key: "losAngeles", slug: "los-angeles" },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "interiorDesignPage" });

  const title = t("seo.title");
  const description = t("seo.description");

  return {
    title,
    description,
    keywords: [
      "luxury interior design",
      "full-service interior design",
      "residential interior designer",
      "interior design Orlando",
      "interior design Tampa",
      "interior design NYC",
      "interior design Los Angeles",
      "space planning",
      "custom millwork design",
      "furniture sourcing and styling",
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

export default async function InteriorDesignPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "interiorDesignPage" });
  const tLocations = await getTranslations({ locale, namespace: "locations" });

  // Projects flagged `interior-design` or `both` in Sanity.
  const projects = await sanityService.getAllProjects({
    serviceType: "interior-design",
    limit: 4,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}${PATH}`,
    name: "Luxury Interior Design",
    serviceType: "Interior Design",
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
      name: t("capabilities.heading"),
      itemListElement: CAPABILITY_KEYS.map((key) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: t(`capabilities.${key}.title`),
          description: t(`capabilities.${key}.description`),
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
        name: t("seo.title"),
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
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
            ctas={[
              { label: t("hero.ctaPrimary"), href: "/#contact" },
              {
                label: t("hero.ctaSecondary"),
                href: "/projects",
                variant: "outline",
              },
            ]}
          />

          <IntroSplit
            eyebrow={t("intro.eyebrow")}
            heading={t("intro.heading")}
            paragraphs={[t("intro.paragraph1"), t("intro.paragraph2")]}
            cta={{ label: t("intro.cta"), href: "/#about" }}
            image={INTRO_IMAGE}
            imageAlt={t("intro.imageAlt")}
          />

          <CapabilityGrid
            eyebrow={t("capabilities.eyebrow")}
            heading={t("capabilities.heading")}
            items={CAPABILITY_KEYS.map((key) => ({
              icon: CAPABILITY_ICONS[key],
              title: t(`capabilities.${key}.title`),
              description: t(`capabilities.${key}.description`),
            }))}
            dividers
          />

          <ProjectShowcase
            eyebrow={t("projects.eyebrow")}
            heading={t("projects.heading")}
            projects={projects}
            captionPlacement="overlay"
            viewProjectLabel={t("projects.viewProject")}
            cta={{ label: t("projects.cta"), href: "/projects" }}
          />

          <CityLinks
            eyebrow={t("locations.eyebrow")}
            heading={t("locations.heading")}
            description={t("locations.description")}
            cities={CITIES.map((city) => {
              const name = tLocations(`cities.${city.key}.name`);
              return {
                name,
                label: t("locations.linkLabel", { city: name }),
                href: `/interior-design-${city.slug}`,
              };
            })}
          />

          <CtaBand
            title={t("cta.title")}
            description={t("cta.description")}
            cta={{ label: t("cta.button"), href: "/#contact" }}
            layout="split"
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
