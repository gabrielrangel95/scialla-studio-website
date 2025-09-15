"use client";

import Link from "next/link";

interface LocationCardProps {
  city: string;
  slug: string;
  title: string;
  description: string;
  projectCount: string;
  areas: string[];
}

export function LocationCard({ 
  city, 
  slug, 
  title, 
  description, 
  projectCount, 
  areas 
}: LocationCardProps) {
  return (
    <div className="group relative bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      {/* Card Content */}
      <div className="p-6 h-full flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {description}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Serving {areas.join(", ")}...
          </p>
        </div>
        
        {/* Project Count Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
            {projectCount}
          </span>
        </div>
        
        {/* Link */}
        <div className="mt-auto">
          <Link 
            href={`/interior-design-${slug}`}
            className="inline-flex items-center text-black font-medium text-sm hover:text-gray-700 transition-colors group-hover:translate-x-1 transform duration-200"
          >
            Explore {city} Portfolio
            <svg 
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}