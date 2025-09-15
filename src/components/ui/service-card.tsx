"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  services: string[];
  image: string;
  href: string;
}

export function ServiceCard({ title, services, image, href }: ServiceCardProps) {
  return (
    <div className="group relative h-[500px] overflow-hidden bg-gray-900 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 transition-all duration-500 group-hover:bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8">
        <div className="space-y-6">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white leading-tight">
            {title}
          </h3>

          {/* Services List */}
          <ul className="space-y-3">
            {services.map((service, index) => (
              <li
                key={index}
                className="flex items-start text-white/90 text-sm leading-relaxed"
              >
                <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/70" />
                <span className="transition-colors duration-300 group-hover:text-white">
                  {service}
                </span>
              </li>
            ))}
          </ul>

          {/* Learn More Link */}
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-white font-medium text-sm transition-all duration-300 hover:gap-4 group/link"
          >
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}