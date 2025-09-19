import Image from 'next/image'
import Link from 'next/link'

export function About() {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
            Expert Design Team
            <br />
            <span className="block mt-2">With Global Perspective</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                Led by Francesco Scialla, an architect from Southern Italy with over 
                10 years of international experience, Scialla Studio brings a unique 
                blend of European sophistication and American innovation to every project.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                Our team combines architectural expertise from Naples, global design 
                perspectives from projects across the United States, Europe, and Asia, 
                and a deep understanding of how spaces impact human wellbeing.
              </p>
            </div>
            
            {/* Credentials */}
            <div className="py-2">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-gray-900 mr-3">✓</span>
                  PhD in Architecture & Industrial Design
                </li>
                <li className="flex items-center">
                  <span className="text-gray-900 mr-3">✓</span>
                  Published in Multiple Prestigious Journals
                </li>
                <li className="flex items-center">
                  <span className="text-gray-900 mr-3">✓</span>
                  10+ Years International Experience
                </li>
                <li className="flex items-center">
                  <span className="text-gray-900 mr-3">✓</span>
                  Founded in Tampa, Serving 4 Major Cities
                </li>
              </ul>
            </div>
            
            {/* CTA */}
            <div className="flex justify-start pt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
          
          {/* Right: Image Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image 
                  src="/scialla-studio-about-us.avif"
                  alt="Francesco Scialla - Founder and Lead Architect at Scialla Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="text-center">
                <h3 className="text-gray-900">Francesco Scialla</h3>
                <p className="text-sm text-gray-600">Architect & Founder</p>
              </div>
            </div>
            
            <div className="space-y-6 mt-8">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image 
                  src="/scialla-studio-interior-designer-tampa-fl.avif"
                  alt="Valentina Scialla - Creative Director at Scialla Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="text-center">
                <h3 className="text-gray-900">Valentina Scialla</h3>
                <p className="text-sm text-gray-600">Creative Director</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Bar */}
        <div className="mt-16 md:mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-3xl md:text-4xl font-light text-gray-900 block">10+</span>
              <p className="text-sm text-gray-600 mt-2">Years Experience</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-light text-gray-900 block">4</span>
              <p className="text-sm text-gray-600 mt-2">Cities Served</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-light text-gray-900 block">200+</span>
              <p className="text-sm text-gray-600 mt-2">Projects Completed</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-light text-gray-900 block">5</span>
              <p className="text-sm text-gray-600 mt-2">Countries Worked</p>
            </div>
          </div>
        </div>
    </section>
  )
}