import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es', 'it'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The locale prefix controls how locales are rendered in the URL.
  // Set to 'as-needed' so the default locale (en) doesn't have a prefix
  localePrefix: 'as-needed',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
