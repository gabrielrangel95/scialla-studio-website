import { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Link } from "@/i18n/routing";

interface ProcessPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProcessPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "processPage" });

  const baseUrl = "https://sciallastudioid.com";
  const path = "/process";

  return {
    title: t("seo.title"),
    description: t("seo.description"),
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title: t("seo.title"),
      description: t("seo.description"),
      url: `${baseUrl}${path}`,
      type: "website",
    },
  };
}

const steps = [
  {
    key: "discovery" as const,
    number: "01",
    image: "/scialla-studio-interior-design-consultation.png",
  },
  {
    key: "design" as const,
    number: "02",
    image: "/scialla-studio-interior-design.png",
  },
  {
    key: "execution" as const,
    number: "03",
    image: "/scialla-studio-architectural-services.png",
  },
  {
    key: "reveal" as const,
    number: "04",
    image: "/scialla-studio-commercial-interior-design.jpg",
  },
];

const services = [
  "residential" as const,
  "architectural" as const,
  "commercial" as const,
  "consultation" as const,
];

export default async function ProcessPage({ params }: ProcessPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "processPage" });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sciallastudioid.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("hero.title"),
        item: `https://sciallastudioid.com${locale === "en" ? "" : `/${locale}`}/process`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Text */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-wider mb-8">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/scialla-studio-about-us.avif"
                alt={t("hero.imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* Quick Nav */}
        <section className="px-4 md:px-6 lg:px-12 xl:px-16 pb-16">
          <div className="max-w-3xl mx-auto">
            {steps.map((step) => (
              <a
                key={step.key}
                href={`#step-${step.key}`}
                className="flex items-center justify-between py-4 border-b border-gray-200 text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
              >
                <span className="text-base font-light tracking-wide">
                  {t(`quickNav.${step.key}`)}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            ))}
          </div>
        </section>

        {/* Process Steps - Zigzag */}
        {steps.map((step, index) => {
          const reversed = index % 2 !== 0;

          return (
            <section
              key={step.key}
              id={`step-${step.key}`}
              className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 xl:px-16 scroll-mt-20"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Image */}
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden ${reversed ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={step.image}
                    alt={t(`steps.${step.key}.imageAlt`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Text */}
                <div
                  className={`flex flex-col justify-center ${reversed ? "lg:order-1" : ""}`}
                >
                  <span className="text-8xl font-light text-gray-200 leading-none mb-4">
                    {step.number}
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-wider mb-6">
                    {t(`steps.${step.key}.title`)}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                    {t(`steps.${step.key}.description`)}
                  </p>
                </div>
              </div>
            </section>
          );
        })}

        {/* Services Grid */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-light uppercase tracking-wider mb-4">
                {t("services.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("services.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {services.map((service) => (
                <div key={service} className="border-t border-gray-300 pt-6">
                  <h3 className="text-xl font-light uppercase tracking-wider mb-3">
                    {t(`services.${service}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`services.${service}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 px-4 md:px-6 lg:px-12 xl:px-16 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white uppercase tracking-wider mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              {t("cta.description")}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border border-white text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              {t("cta.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
