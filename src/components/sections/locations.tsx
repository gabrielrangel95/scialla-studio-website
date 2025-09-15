import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function Locations() {
  const locationsData = [
    {
      city: "Orlando",
      slug: "orlando",
      description: "Transforming luxury homes across Winter Park, Lake Nona, Downtown Orlando, Windermere, and Dr. Phillips with sophisticated interior design that captures Central Florida's vibrant energy."
    },
    {
      city: "Tampa", 
      slug: "tampa",
      description: "Creating stunning interiors throughout South Tampa, Westchase, Hyde Park, Channelside, and Harbour Island. Our designs blend coastal elegance with Tampa Bay's modern sophistication."
    },
    {
      city: "New York City",
      slug: "nyc", 
      description: "Delivering exceptional interior design services in Manhattan, Brooklyn, Queens, Upper East Side, and SoHo. Bringing European refinement to NYC's most prestigious neighborhoods."
    },
    {
      city: "Los Angeles",
      slug: "los-angeles",
      description: "Designing luxury residences in Beverly Hills, Santa Monica, West Hollywood, Malibu, and Venice. Infusing Hollywood glamour with California's relaxed coastal aesthetic."
    }
  ];

  return (
    <section 
      id="locations"
      className="py-16 md:py-24 lg:py-32 bg-white"
    >
      <div className="grid lg:grid-cols-2 gap-0 items-start">
        {/* Left Side - Title and Content */}
        <div className="px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-xl space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight tracking-tight mb-8">
                INTERIOR DESIGN SERVICES
                <br />
                <span className="block mt-2">ACROSS FOUR MAJOR CITIES</span>
              </h2>
              
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-lg">
                From Florida's vibrant cities to America's cultural capitals, 
                Scialla Studio delivers award-winning interior design services 
                tailored to each location's unique lifestyle and architectural heritage.
              </p>
            </div>
            
            <div className="pt-4">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200 group"
              >
                VIEW LOCATIONS
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
            
            {/* Image below VIEW LOCATIONS */}
            <div className="pt-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg max-w-md">
                <Image 
                  src="/scialla-studio-interior-designer-los-angeles-ca.jpg"
                  alt="Scialla Studio Interior Design Project in Los Angeles, California"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Locations List */}
        <div className="px-4 md:px-6 lg:pl-0 lg:pr-12 xl:pr-16">
          <div className="space-y-12">
            {locationsData.map((location, index) => (
              <div key={index} className="group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-normal text-gray-900 mb-5 tracking-wide">
                      {location.city.toUpperCase()}
                    </h3>
                    <p className="text-gray-600 leading-relaxed pr-8">
                      {location.description}
                    </p>
                  </div>
                  <Link 
                    href={`/interior-design-${location.slug}`}
                    className="flex-shrink-0 p-2 hover:bg-gray-50 transition-colors duration-200 rounded"
                  >
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors duration-200" />
                  </Link>
                </div>
                {index < locationsData.length - 1 && (
                  <div className="mt-12 border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}