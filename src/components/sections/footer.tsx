import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    "Residential Interior Design",
    "Commercial Interior Design", 
    "Kitchen & Bathroom Design",
    "Design Consultation",
    "Space Planning",
    "Furniture & Décor Sourcing"
  ];

  const locations = [
    { name: "Orlando", slug: "orlando" },
    { name: "Tampa", slug: "tampa" },
    { name: "New York City", slug: "nyc" },
    { name: "Los Angeles", slug: "los-angeles" }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61554601536191"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sciallastudio_/"
    },
    {
      name: "Houzz",
      url: "https://www.houzz.com/pro/francescosciallaarchitect/scialla-studio"
    },
    {
      name: "Pinterest",
      url: "https://www.pinterest.com/Sciallastudio_/"
    }
  ];

  return (
    <footer className="bg-black text-gray-300">
      <div className="px-4 md:px-6 lg:px-12 xl:px-16 py-16 md:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <Image
                src="/scialla-studio-full-logo.avif"
                alt="Scialla Studio - Interior Design"
                width={200}
                height={60}
                className="h-12 w-auto mb-6"
                priority
              />
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Creating Spaces, Elevating Lives
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a 
                  href="tel:+17275044138"
                  className="hover:text-white transition-colors duration-200"
                >
                  +1 727 504 4138
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a 
                  href="mailto:info@sciallastudioid.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  info@sciallastudioid.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-6">
              Locations
            </h3>
            <ul className="space-y-3">
              {locations.map((location, index) => (
                <li key={index}>
                  <Link 
                    href={`/interior-design-${location.slug}`}
                    className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-medium text-sm uppercase tracking-wider mb-6">
              Connect
            </h3>
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-white transition-colors duration-200 block"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <div className="text-sm text-gray-400">
              © {currentYear} Scialla Studio. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}