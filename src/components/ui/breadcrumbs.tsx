import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

export function Breadcrumbs({ items, currentPage }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];
  
  // Generate breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://sciallastudioid.com${item.href}` : undefined
    })).concat([{
      "@type": "ListItem",
      "position": allItems.length + 1,
      "name": currentPage,
      "item": undefined
    }])
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      
      <nav aria-label="Breadcrumb" className="py-4 px-4 md:px-6 lg:px-12 xl:px-16">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
              {index === 0 ? (
                <Link 
                  href={item.href!} 
                  className="flex items-center hover:text-gray-900 transition-colors"
                >
                  <Home className="w-4 h-4 mr-1" />
                  {item.label}
                </Link>
              ) : item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900">{item.label}</span>
              )}
            </li>
          ))}
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">{currentPage}</span>
          </li>
        </ol>
      </nav>
    </>
  );
}