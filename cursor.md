# Scialla Studio - Project Context & Rules

## Project Overview

Interior design portfolio website with strong SEO focus for Scialla Studio, targeting 4 cities: Orlando, Tampa, NYC, Los Angeles. Migrating from Wix to Next.js while preserving aesthetic.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS, Shadcn
- **CMS:** Sanity.io
- **Database:** PostgreSQL (Prisma ORM) if needed
- **Hosting:** Vercel
- **Images:** Cloudinary for optimization
- **Language:** TypeScript (strict mode)

## Project Structure

```
/app
  /(marketing)
    /page.tsx                           # Homepage
    /interior-design-[city]/page.tsx    # Dynamic city pages (orlando, tampa, nyc, los-angeles)
    /portfolio/
      /page.tsx                         # All projects
      /[slug]/page.tsx                  # Individual project
    /services/
      /kitchen-design/page.tsx
      /bathroom-design/page.tsx
      /commercial-design/page.tsx
    /about/page.tsx
    /contact/page.tsx
  /api/
    /contact/route.ts                   # Contact form
    /revalidate/route.ts                # Sanity webhook
/components/
  /ui/                                  # Reusable UI components
  /sections/                            # Page sections
  /seo/                                 # SEO components
/lib/
  /sanity/                              # Sanity client & queries
  /utils/                               # Helper functions
/public/
  /fonts/
  /images/
```

## Coding Standards

### Components

- Use functional components with TypeScript
- Implement proper loading and error states
- Keep components under 200 lines
- Extract reusable logic into custom hooks

### Naming Conventions

```tsx
// Components: PascalCase
export function ProjectCard() {}

// Files: kebab-case
project - card.tsx;

// Types/Interfaces: PascalCase with prefix
interface IProject {}
type TLocation = "orlando" | "tampa" | "nyc" | "los-angeles";

// Constants: UPPER_SNAKE_CASE
const MAX_PROJECTS_PER_PAGE = 12;
```

### Performance Requirements

- Lighthouse scores: >90 for all metrics
- Images: Use next/image with blur placeholders
- Implement lazy loading for below-fold content
- Static generation for all marketing pages
- ISR for portfolio pages (revalidate: 3600)

## SEO Critical Requirements

### Meta Tags Pattern

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Interior Designer ${city} | Scialla Studio`,
    description: `Award-winning interior design services in ${city}. Modern homes, luxury kitchens, commercial spaces. Free consultation.`,
    openGraph: {
      images: ["/path-to-city-specific-image.jpg"],
    },
    alternates: {
      canonical: `https://sciallastudioid.com/interior-design-${params.city}`,
    },
  };
}
```

### Structured Data

Always include LocalBusiness schema on city pages:

```json
{
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  "name": "Scialla Studio",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Orlando",
    "addressRegion": "FL"
  }
}
```

### URL Structure

- City pages: `/interior-design-orlando` (NOT `/orlando`)
- Portfolio: `/portfolio/modern-orlando-kitchen-renovation`
- Services: `/services/kitchen-design-orlando`

## Design System

### Colors

```css
/* Maintain existing Scialla brand colors */
--primary: /* Get from current site */
--secondary: /* Get from current site */
--accent: /* Get from current site */
```

### Typography

- Headings: Serif or elegant sans-serif
- Body: Clean, readable sans-serif
- Maintain sophisticated, minimal aesthetic

### Spacing

- Use Tailwind's default spacing scale
- Consistent padding: px-4 md:px-8 lg:px-16
- Section spacing: py-16 md:py-24

## Content Management (Sanity)

### Schemas Required

```typescript
// project.ts
{
  title: string
  slug: string
  location: reference to city
  category: string[]
  featuredImage: image
  gallery: image[]
  description: blockContent
  completionDate: date
  seo: object
}

// city.ts
{
  name: string
  slug: string
  heroImage: image
  description: text
  testimonials: array
}
```

## Critical Features

### Must Have (Phase 1-3)

- [x] Mobile-responsive design
- [x] Contact form with email integration
- [x] Google Business Profile integration
- [x] XML sitemap generation
- [x] Image optimization with alt texts
- [ ] 4 city-specific landing pages
- [ ] Portfolio with filtering
- [ ] Before/after image slider
- [ ] Loading animations

### Future Phases

- [ ] Blog/News section
- [ ] Client portal
- [ ] Appointment booking
- [ ] E-commerce for design consultations
- [ ] Multi-language support

## API Routes Pattern

```typescript
// Always validate input
// Always return proper status codes
// Include error handling

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate with zod
    const validated = contactSchema.parse(body);
    // Process
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

## Testing Checklist

- [ ] All forms submit correctly
- [ ] Images load with proper optimization
- [ ] SEO meta tags present on all pages
- [ ] Mobile navigation works
- [ ] Contact form sends emails
- [ ] Google Maps integration works
- [ ] Page speed <3s on 3G
- [ ] No console errors
- [ ] Accessibility: WCAG 2.1 AA

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
RESEND_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
NEXT_PUBLIC_GA_ID=
```

## Common Gotchas

1. Don't use localStorage/sessionStorage - not supported in all environments
2. Always use Next.js Image component for optimization
3. City slugs must be: orlando, tampa, nyc, los-angeles (lowercase)
4. Never import large libraries client-side
5. Use dynamic imports for heavy components
6. Test on actual mobile devices, not just responsive view

## Git Commit Convention

```
feat: Add city landing pages
fix: Correct mobile navigation issue
style: Update portfolio grid spacing
perf: Optimize image loading
seo: Add structured data to services
docs: Update README
```

## Questions to Ask Before Changes

1. Will this impact SEO?
2. Does this maintain the current aesthetic?
3. Is this mobile-optimized?
4. Will this affect page load speed?
5. Is this accessible?

## Client Preferences

- Clean, minimal design
- Sophisticated color palette
- Focus on portfolio imagery
- Professional but approachable tone
- Fast, smooth interactions

## Deadline: October 8, 2025

Phase 1 Due: September 24
Phase 2 Due: October 1
Launch: October 8
