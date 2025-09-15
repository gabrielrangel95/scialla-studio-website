"use client";

import Image from "next/image";

interface ServiceCardProps {
  title: string;
  services: string[];
  image: string;
}

export function ServiceCard({ title, services, image }: ServiceCardProps) {
  return (
    <div className="group relative h-[500px] overflow-hidden transition-all duration-300">
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
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-xl font-medium mb-4">
          {title}
        </h3>
        
        {/* Services List */}
        <ul className="space-y-2">
          {services.map((service, index) => (
            <li
              key={index}
              className="text-sm text-white/90 leading-relaxed"
            >
              {service}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}