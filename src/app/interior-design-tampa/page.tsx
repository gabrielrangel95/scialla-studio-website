import { Metadata } from 'next';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { Contact } from '@/components/sections/contact';
import { getCityBySlug, urlForImageWithOptions } from '@/lib/sanity-helpers';

const cityData = {
  name: 'Tampa',
  state: 'Florida',
  hero: {
    title: 'Expert Architecture & Interior Design in Tampa, Florida',
    subtitle: 'Full-service architecture and interior design throughout South Tampa, Westchase, Hyde Park, Channelside, and Harbour Island. From new construction to luxury renovations, blending coastal elegance with Tampa Bay&apos;s modern sophistication.',
    image: '/scialla-studio-interior-designer-tampa-fl.avif',
    alt: 'Architecture and interior design by Scialla Studio in Tampa, Florida'
  },
  neighborhoods: ['South Tampa', 'Westchase', 'Hyde Park', 'Channelside', 'Harbour Island', 'Davis Islands', 'Bayshore', 'Seminole Heights'],
  projects: {
    count: 38,
    featured: ['Hyde Park Luxury Condo', 'South Tampa Waterfront Home', 'Westchase Family Residence']
  },
  testimonials: [
    {
      name: 'Jennifer L.',
      review: 'Our Hyde Park condo renovation exceeded every expectation. Francesco&apos;s European influence brought such sophistication to our space.',
      project: 'Hyde Park Condo Renovation',
      rating: 5
    },
    {
      name: 'David K.',
      review: 'Professional, creative, and detail-oriented. Scialla Studio transformed our South Tampa home into a work of art.',
      project: 'South Tampa Home Design',
      rating: 5
    }
  ],
  services: [
    'New Home Construction Design Tampa',
    'Architectural Renovations & Additions Tampa',
    'Luxury Home Design Tampa',
    'Coastal Interior Design Tampa',
    'Kitchen Remodeling Tampa',
    'Commercial Architecture & Design Tampa'
  ],
  faq: [
    {
      question: 'Do you provide architectural services for new construction in Tampa?',
      answer: 'Yes, we are a full-service architecture and design studio. Francesco Scialla is a licensed architect with over 20 years of experience designing new construction projects from the ground up, including waterfront properties and coastal homes.'
    },
    {
      question: 'What is the cost of architecture and interior design in Tampa?',
      answer: 'Architectural design for new construction typically ranges from 8-15% of construction costs. Interior design services range from $80-250 per square foot for luxury projects. Coastal properties may require specialized design considerations.'
    },
    {
      question: 'Do you specialize in coastal architecture and design in Tampa?',
      answer: 'Absolutely! Our Tampa portfolio includes numerous waterfront properties and new coastal construction. We excel at combining coastal elegance with sophisticated modern architectural and interior design elements.'
    },
    {
      question: 'Can you help with Tampa Bay area condominiums?',
      answer: 'Yes, we have extensive experience with Tampa high-rise condos, especially in Hyde Park, Channelside, and Harbour Island. We provide both architectural consultation and full interior design services.'
    }
  ]
};

export const metadata: Metadata = {
  title: `${cityData.hero.title} | Scialla Studio`,
  description: cityData.hero.subtitle,
  keywords: `architect ${cityData.name}, architecture ${cityData.name}, new construction ${cityData.name}, interior designer ${cityData.name}, luxury interior design ${cityData.name}, ${cityData.name} architect, ${cityData.name} interior designer, ${cityData.neighborhoods.slice(0, 3).join(', ')} architecture, ${cityData.neighborhoods.slice(0, 3).join(', ')} interior design`,
  alternates: {
    canonical: 'https://sciallastudioid.com/interior-design-tampa',
  },
  openGraph: {
    title: `${cityData.hero.title} | Scialla Studio`,
    description: cityData.hero.subtitle,
    url: 'https://sciallastudioid.com/interior-design-tampa',
    siteName: 'Scialla Studio',
    images: [
      {
        url: cityData.hero.image,
        width: 1200,
        height: 630,
        alt: cityData.hero.alt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${cityData.hero.title} | Scialla Studio`,
    description: cityData.hero.subtitle,
    images: [cityData.hero.image],
  },
};

export default async function TampaPage() {
  // Fetch city data from Sanity
  const cityFromSanity = await getCityBySlug('tampa');
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sciallastudioid.com/interior-design-tampa",
    name: "Scialla Studio",
    alternateName: `Scialla Studio - ${cityData.name} Interior Design`,
    description: cityData.hero.subtitle,
    url: "https://sciallastudioid.com/interior-design-tampa",
    telephone: "+1-727-504-4138",
    email: "info@sciallastudioid.com",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: cityData.name,
      addressRegion: "FL",
      addressCountry: "US"
    },
    areaServed: {
      "@type": "City",
      name: cityData.name,
      containedInPlace: {
        "@type": "State",
        name: cityData.state
      }
    },
    serviceType: ["Architecture", "Interior Design", "New Construction", "Architectural Design"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: cityData.testimonials.length.toString(),
      bestRating: "5",
      worstRating: "1"
    },
    review: cityData.testimonials.map(testimonial => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating.toString()
      },
      reviewBody: testimonial.review
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Architecture & Interior Design Services in ${cityData.name}`,
      itemListElement: cityData.services.map(service => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
          description: `Professional ${service.toLowerCase()} services in ${cityData.name}`
        }
      }))
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cityData.faq.map(item => ({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[{ label: 'Architecture & Interior Design Services' }]}
          currentPage={`${cityData.name} Architecture & Design`}
        />
        
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={cityFromSanity?.heroImage ? urlForImageWithOptions(cityFromSanity.heroImage, { width: 1920, quality: 80 }) || cityData.hero.image : cityData.hero.image}
              alt={cityFromSanity?.heroImage?.alt || cityData.hero.alt}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative z-10 text-center px-4 md:px-6 lg:px-12 xl:px-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight tracking-tight">
              {cityData.hero.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed font-light max-w-4xl mx-auto">
              {cityData.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                Get Free Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium bg-transparent">
                View {cityData.name} Portfolio
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 bg-gray-50 px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 text-center">
              Architecture & Interior Design Services in {cityData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {cityData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{service}</h3>
                  <p className="text-gray-600">Professional {service.toLowerCase()} tailored to {cityData.name}&apos;s unique style and architecture.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section className="py-16 md:py-24 bg-white px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
              Serving {cityData.name} & Surrounding Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {cityData.neighborhoods.map((neighborhood, index) => (
                <div key={index} className="flex items-center gap-2 p-4 bg-gray-50 rounded">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">{neighborhood}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              With over {cityData.projects.count} completed projects across the {cityData.name} area, we understand the unique architectural styles and lifestyle preferences of each neighborhood.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-gray-50 px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">
              What Our {cityData.name} Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cityData.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">&ldquo;{testimonial.review}&rdquo;</p>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nationwide Service Section */}
        <section className="py-16 md:py-24 bg-gray-50 px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Serving Clients Nationwide
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8">
              While our Tampa studio specializes in Florida&apos;s coastal elegance,
              Scialla Studio proudly serves clients across the entire United States.
              Through our virtual consultation process and remote design services,
              we bring the same level of expertise and attention to detail to projects
              anywhere in the country.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Virtual Consultations</h3>
                <p className="text-gray-600">
                  Complete design consultations available online for clients nationwide
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Remote Design Services</h3>
                <p className="text-gray-600">
                  Full-service design planning and coordination across all 50 states
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">
              Frequently Asked Questions - {cityData.name} Architecture & Interior Design
            </h2>
            <div className="space-y-8">
              {cityData.faq.map((item, index) => (
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