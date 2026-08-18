"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

interface ServiceCardProps {
  title: string;
  services: string[];
  image: string;
  /** When set the whole card becomes a link to the matching service page. */
  href?: string;
  linkLabel?: string;
}

export function ServiceCard({
  title,
  services,
  image,
  href,
  linkLabel,
}: ServiceCardProps) {
  const content = (
    <>
      {/* Full-bleed Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/30" />

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-medium mb-4">{title}</h3>

        {/* Services List */}
        <ul className="space-y-2">
          {services.map((service, index) => (
            <li key={index} className="text-sm text-white/90 leading-relaxed">
              {service}
            </li>
          ))}
        </ul>

        {href && linkLabel && (
          <span className="inline-flex items-center gap-2 mt-5 text-xs font-medium uppercase tracking-[0.14em] text-white border-b border-white/40 pb-1 transition-colors duration-300 group-hover:border-white">
            {linkLabel}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group relative block h-[500px] overflow-hidden transition-all duration-300"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="group relative h-[500px] overflow-hidden transition-all duration-300">
      {content}
    </div>
  );
}
