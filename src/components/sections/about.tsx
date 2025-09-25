import Image from "next/image";
import Link from "next/link";
import { ADPROBadge } from "@/components/ui/adpro-badge";

export function About() {
  return (
    <section
      id="about"
      className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50"
    >
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
          Expert Design Team
          <br />
          <span className="block mt-2">With Global Perspective</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* Left: Text Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              Founded by Francesco Scialla and Valentina Pollio, Scialla Studio
              brings together architectural precision and human-centered design
              philosophy. Francesco, an architect from Southern Italy with over
              20 years of international experience, combines with
              Valentina&apos;s unique background in construction engineering and
              spatial dynamics.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              Their collaborative approach recognizes the profound impact of
              surroundings on human wellbeing, creating environments that
              transcend geographical boundaries while fostering deep connections
              with their occupants. Based in four major cities with nationwide
              reach, Scialla Studio serves clients across the United States
              through both on-site and virtual design consultations.
            </p>
          </div>

          {/* Credentials */}
          <div className="py-2">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                PhD in Architecture & Industrial Design (Francesco)
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                Construction Engineering & Spatial Design (Valentina)
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                Published in Multiple Prestigious Journals
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                20+ Years International Experience
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                Founded in Tampa, Serving 4 Major Cities
              </li>
              <li className="flex items-center">
                <span className="text-gray-900 mr-3">✓</span>
                <Link
                  href="https://www.architecturaldigest.com/adpro/directory/profile/scialla-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors duration-200"
                >
                  Featured in Architectural Digest 2025
                </Link>
              </li>
            </ul>

            {/* AD Badge */}
            <div className="mt-6">
              <ADPROBadge size="md" />
            </div>
          </div>
        </div>

        {/* Right: Image Grid */}
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/scialla-studio-about-us.avif"
                  alt="Francesco Scialla - Co-Founder and Lead Architect at Scialla Studio"
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
                  alt="Valentina Pollio - Co-Founder and Creative Director at Scialla Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="text-center">
                <h3 className="text-gray-900">Valentina Pollio</h3>
                <p className="text-sm text-gray-600">Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-4 md:mt-6 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-3xl md:text-4xl font-light text-gray-900 block">
              20+
            </span>
            <p className="text-sm text-gray-600 mt-2">Years Experience</p>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-light text-gray-900 block">
              4
            </span>
            <p className="text-sm text-gray-600 mt-2">Cities Served</p>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-light text-gray-900 block">
              50+
            </span>
            <p className="text-sm text-gray-600 mt-2">Projects Completed</p>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-light text-gray-900 block">
              5
            </span>
            <p className="text-sm text-gray-600 mt-2">Countries Worked</p>
          </div>
        </div>
      </div>
    </section>
  );
}
