import { Metadata } from 'next';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { Contact } from '@/components/sections/contact';
import { getCityBySlug, urlForImageWithOptions } from '@/lib/sanity-helpers';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cityPages.losAngeles' });

  return {
    title: `${t('hero.title')} | Scialla Studio`,
    description: t('hero.subtitle'),
    alternates: {
      canonical: locale === 'en' ? '/interior-design-los-angeles' : `/${locale}/interior-design-los-angeles`,
      languages: {
        'en': '/interior-design-los-angeles',
        'es': '/es/interior-design-los-angeles',
        'it': '/it/interior-design-los-angeles',
      },
    },
    openGraph: {
      title: `${t('hero.title')} | Scialla Studio`,
      description: t('hero.subtitle'),
      url: locale === 'en' ? 'https://sciallastudioid.com/interior-design-los-angeles' : `https://sciallastudioid.com/${locale}/interior-design-los-angeles`,
      siteName: 'Scialla Studio',
      images: [
        {
          url: '/scialla-studio-interior-designer-orlando-florida.png',
          width: 1200,
          height: 630,
          alt: t('hero.imageAlt'),
        },
      ],
      locale: locale === 'en' ? 'en_US' : locale === 'es' ? 'es_ES' : 'it_IT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('hero.title')} | Scialla Studio`,
      description: t('hero.subtitle'),
      images: ['/scialla-studio-interior-designer-orlando-florida.png'],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cityPages.losAngeles' });
  const tCityPage = await getTranslations({ locale, namespace: 'cityPage' });

  const cityFromSanity = await getCityBySlug('los-angeles');
  const neighborhoods = t.raw('neighborhoods') as string[];
  const services = t.raw('services') as string[];
  const faq = t.raw('faq') as Array<{ question: string; answer: string }>;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sciallastudioid.com/interior-design-los-angeles",
    name: "Scialla Studio",
    alternateName: `Scialla Studio - ${t('name')} Interior Design`,
    description: t('hero.subtitle'),
    url: "https://sciallastudioid.com/interior-design-los-angeles",
    telephone: "+1-727-504-4138",
    email: "info@sciallastudioid.com",
    priceRange: "3552135521",
    address: {
      "@type": "PostalAddress",
      addressLocality: t('name'),
      addressRegion: "FL",
      addressCountry: "US"
    },
    areaServed: {
      "@type": "City",
      name: t('name'),
      containedInPlace: {
        "@type": "State",
        name: t('state')
      }
    },
    serviceType: ["Architecture", "Interior Design", "New Construction", "Architectural Design"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t('servicesTitle'),
      itemListElement: services.map(service => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service
        }
      }))
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <Breadcrumbs
          items={[{ label: tCityPage('breadcrumbServices') }]}
          currentPage={tCityPage('breadcrumbCurrent', { city: t('name') })}
        />

        <section className="relative min-h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={cityFromSanity?.heroImage ? urlForImageWithOptions(cityFromSanity.heroImage, { width: 1920, quality: 80 }) || '/scialla-studio-interior-designer-orlando-florida.png' : '/scialla-studio-interior-designer-orlando-florida.png'}
              alt={cityFromSanity?.heroImage?.alt || t('hero.imageAlt')}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 text-center px-4 md:px-6 lg:px-12 xl:px-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed font-light max-w-4xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                {tCityPage('getConsultation')}
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium bg-transparent">
                {tCityPage('viewPortfolio', { city: t('name') })}
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50 px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 text-center">
              {t('servicesTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
              {tCityPage('neighborhoodsTitle', { city: t('name') })}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {neighborhoods.map((neighborhood, index) => (
                <div key={index} className="flex items-center gap-2 p-4 bg-gray-50 rounded">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50 px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">
              {t('faqTitle')}
            </h2>
            <div className="space-y-8">
              {faq.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
        <Footer />
      </div>
    </>
  );
}
