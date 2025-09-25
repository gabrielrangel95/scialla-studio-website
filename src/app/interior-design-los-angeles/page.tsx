import { Metadata } from 'next';
import Image from 'next/image';
import { Star, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';

const cityData = {
  name: 'Los Angeles',
  state: 'California',
  hero: {
    title: 'Leading Interior Designer in Los Angeles, California',
    subtitle: 'Elevating luxury living across Beverly Hills, Malibu, West Hollywood, Santa Monica, and Manhattan Beach with innovative designs that reflect the California dream lifestyle.',
    image: '/scialla-studio-interior-designer-los-angeles-california.png',
    alt: 'Luxury interior design by Scialla Studio in Los Angeles, California'
  },
  neighborhoods: ['Beverly Hills', 'Malibu', 'West Hollywood', 'Santa Monica', 'Manhattan Beach', 'Brentwood', 'Venice', 'Hollywood Hills'],
  projects: {
    count: 52,
    featured: ['Beverly Hills Modern Estate', 'Malibu Oceanfront Villa', 'West Hollywood Penthouse']
  },
  testimonials: [
    {
      name: 'Emma W.',
      review: 'Francesco created the perfect blend of modern elegance and California casual in our Beverly Hills home. His vision was extraordinary.',
      project: 'Beverly Hills Estate Renovation',
      rating: 5
    },
    {
      name: 'James C.',
      review: 'The team at Scialla Studio transformed our Malibu home into a coastal paradise. Every detail was perfectly executed.',
      project: 'Malibu Coastal Design',
      rating: 5
    }
  ],
  services: [
    'Luxury Home Renovation Los Angeles',
    'Kitchen Design Beverly Hills',
    'Bathroom Remodeling Malibu',
    'Living Room Design West Hollywood',
    'Bedroom Interior Design Santa Monica',
    'Commercial Interior Design Los Angeles'
  ],
  faq: [
    {
      question: 'How much does interior design cost in Los Angeles?',
      answer: 'Interior design costs in Los Angeles typically range from $200-500 per square foot for full-service design, reflecting the premium market and high-end finishes. We provide detailed estimates during our complimentary consultation.'
    },
    {
      question: 'Do you work in Beverly Hills and Malibu?',
      answer: 'Yes, we serve all of Greater Los Angeles including Beverly Hills, Malibu, West Hollywood, Santa Monica, and surrounding luxury communities. We specialize in high-end residential projects throughout LA County.'
    },
    {
      question: 'How long does a Los Angeles interior design project take?',
      answer: 'Timeline varies by project complexity and permitting requirements. A full luxury home renovation typically takes 6-12 months, while single room designs can be completed in 8-16 weeks, accounting for California regulations and sourcing.'
    }
  ]
};

export const metadata: Metadata = {
  title: `${cityData.hero.title} | Scialla Studio`,
  description: cityData.hero.subtitle,
  keywords: `interior designer ${cityData.name}, luxury interior design ${cityData.name}, ${cityData.name} interior designer, ${cityData.neighborhoods.slice(0, 3).join(', ')} interior design`,
  alternates: {
    canonical: 'https://sciallastudioid.com/interior-design-los-angeles',
  },
  openGraph: {
    title: `${cityData.hero.title} | Scialla Studio`,
    description: cityData.hero.subtitle,
    url: 'https://sciallastudioid.com/interior-design-los-angeles',
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

export default function LosAngelesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sciallastudioid.com/interior-design-los-angeles",
    name: "Scialla Studio",
    alternateName: `Scialla Studio - ${cityData.name} Interior Design`,
    description: cityData.hero.subtitle,
    url: "https://sciallastudioid.com/interior-design-los-angeles",
    telephone: "+1-727-504-4138",
    email: "info@sciallastudioid.com",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: cityData.name,
      addressRegion: "CA",
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
    serviceType: "Interior Design",
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
      name: `Interior Design Services in ${cityData.name}`,
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
          items={[{ label: 'Interior Design Services' }]} 
          currentPage={`${cityData.name} Interior Designer`}
        />
        
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={cityData.hero.image}
              alt={cityData.hero.alt}
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
              Interior Design Services in {cityData.name}
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
              While our Los Angeles studio specializes in California&apos;s coastal glamour,
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
              Frequently Asked Questions - {cityData.name} Interior Design
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

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-black text-white px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ready to Transform Your {cityData.name} Home?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Contact us today for a free consultation and see how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <a href="tel:+17275044138" className="text-lg hover:underline">
                  (727) 504-4138
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@sciallastudioid.com" className="text-lg hover:underline">
                  info@sciallastudioid.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}