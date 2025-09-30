# Translation Implementation Guide - Scialla Studio

## Overview
This document outlines the complete implementation of multi-language support (English, Spanish, Italian) for the Scialla Studio website using **route-based i18n with next-intl**.

**Strategy**: Route-based translations (SEO-optimized)
**Library**: next-intl v4.3.9+
**Languages**: English (en), Spanish (es), Italian (it)
**Default Language**: English

---

## ✅ Phase 1: Foundation (COMPLETED)

### 1.1 Install Dependencies
```bash
npm install next-intl
```

### 1.2 Create Folder Structure
```
src/
├── app/
│   └── [locale]/          # All routes go here
│       ├── layout.tsx
│       ├── page.tsx
│       ├── interior-design-orlando/
│       ├── interior-design-tampa/
│       ├── interior-design-nyc/
│       ├── interior-design-los-angeles/
│       └── portfolio/
├── i18n/
│   ├── request.ts         # i18n config
│   └── routing.ts         # Routing config
├── middleware.ts          # Language detection
messages/
├── en.json               # English translations
├── es.json               # Spanish translations
└── it.json               # Italian translations
```

### 1.3 Configuration Files Created
- ✅ `src/i18n/request.ts` - i18n configuration
- ✅ `src/i18n/routing.ts` - Routing setup
- ✅ `src/middleware.ts` - Language detection middleware
- ✅ `next.config.ts` - Updated with next-intl plugin

### 1.4 Translation Dictionaries Created
- ✅ `messages/en.json` - English
- ✅ `messages/es.json` - Spanish
- ✅ `messages/it.json` - Italian

### 1.5 Core Components Created
- ✅ `src/app/[locale]/layout.tsx` - Multi-language layout
- ✅ `src/app/[locale]/page.tsx` - Homepage
- ✅ `src/components/ui/language-switcher.tsx` - Language selector
- ✅ Updated `src/components/sections/header.tsx` - With translations

---

## 🔄 Phase 2: Component Migration (TODO)

### 2.1 Update Section Components

**Priority: HIGH**

Each section component needs to be updated to use translations:

#### Hero Component (`src/components/sections/hero.tsx`)
```tsx
"use client";
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <button>{t('ctaPrimary')}</button>
      <button>{t('ctaSecondary')}</button>
    </section>
  );
}
```

#### Components to Update:
- [ ] `src/components/sections/hero.tsx`
- [ ] `src/components/sections/services.tsx`
- [ ] `src/components/sections/about.tsx`
- [ ] `src/components/sections/locations.tsx`
- [ ] `src/components/sections/faq.tsx`
- [ ] `src/components/sections/contact.tsx`
- [ ] `src/components/sections/footer.tsx`
- [ ] `src/components/sections/projects.tsx`

#### Update Pattern:
1. Add `"use client"` directive (if not already present)
2. Import: `import { useTranslations } from 'next-intl';`
3. Add hook: `const t = useTranslations('sectionName');`
4. Replace hardcoded strings with `t('key')`
5. Update Link imports: `import { Link } from '@/i18n/routing';`

### 2.2 Update UI Components

#### Components to Update:
- [ ] `src/components/ui/breadcrumbs.tsx`
- [ ] `src/components/ui/button.tsx` (if needed)
- [ ] Any other components with hardcoded text

---

## 🌆 Phase 3: City Pages Migration (TODO)

### 3.1 Move City Pages to [locale] Structure

**Current Structure:**
```
src/app/
├── interior-design-orlando/page.tsx
├── interior-design-tampa/page.tsx
├── interior-design-nyc/page.tsx
└── interior-design-los-angeles/page.tsx
```

**New Structure:**
```
src/app/[locale]/
├── interior-design-orlando/page.tsx
├── interior-design-tampa/page.tsx
├── interior-design-nyc/page.tsx
└── interior-design-los-angeles/page.tsx
```

### 3.2 Update City Page Template

**File**: `src/app/[locale]/interior-design-orlando/page.tsx`

```tsx
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'cityPage' });

  const city = 'Orlando';

  return {
    title: `${t('servicesTitle', { city })} | Scialla Studio`,
    description: t('description', { city }),
    alternates: {
      canonical: locale === 'en'
        ? '/interior-design-orlando'
        : `/${locale}/interior-design-orlando`,
      languages: {
        'en': '/interior-design-orlando',
        'es': '/es/interior-design-orlando',
        'it': '/it/interior-design-orlando',
      },
    },
    openGraph: {
      locale: locale === 'en' ? 'en_US' : locale === 'es' ? 'es_ES' : 'it_IT',
    },
  };
}

export default async function OrlandoPage() {
  // Component implementation with translations
}
```

### 3.3 Add City-Specific Translations

Add to each language file (`messages/en.json`, etc.):

```json
{
  "cities": {
    "orlando": {
      "name": "Orlando",
      "hero": {
        "title": "Premier Architecture & Interior Design in Orlando, Florida",
        "subtitle": "Full-service architecture and interior design studio..."
      },
      "neighborhoods": ["Winter Park", "Lake Nona", "..."],
      "services": [
        "New Home Construction Design Orlando",
        "Architectural Renovations & Additions Orlando",
        "..."
      ],
      "faq": [
        {
          "question": "Do you provide architectural services?",
          "answer": "Yes, we are a full-service studio..."
        }
      ]
    },
    "tampa": { /* ... */ },
    "nyc": { /* ... */ },
    "losAngeles": { /* ... */ }
  }
}
```

### 3.4 City Pages Checklist

For each city page:
- [ ] Move to `[locale]` folder
- [ ] Update metadata generation with translations
- [ ] Add hreflang alternates
- [ ] Update structured data with locale
- [ ] Test all three language versions
- [ ] Verify SEO metadata

**Cities to migrate:**
- [ ] Orlando (`interior-design-orlando`)
- [ ] Tampa (`interior-design-tampa`)
- [ ] NYC (`interior-design-nyc`)
- [ ] Los Angeles (`interior-design-los-angeles`)

---

## 🎨 Phase 4: Portfolio Pages Migration (TODO)

### 4.1 Move Portfolio Structure

**Current:**
```
src/app/portfolio/
├── page.tsx
└── [slug]/page.tsx
```

**New:**
```
src/app/[locale]/portfolio/
├── page.tsx
└── [slug]/page.tsx
```

### 4.2 Update Portfolio List Page

**File**: `src/app/[locale]/portfolio/page.tsx`

```tsx
import { getTranslations } from 'next-intl/server';
import { getAllProjects } from '@/lib/sanity-service';

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'portfolio' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'en' ? '/portfolio' : `/${locale}/portfolio`,
      languages: {
        'en': '/portfolio',
        'es': '/es/portfolio',
        'it': '/it/portfolio',
      },
    },
  };
}

export default async function PortfolioPage({ params: { locale } }: Props) {
  const projects = await getAllProjects(locale);
  // ... rest of component
}
```

### 4.3 Update Individual Project Pages

**File**: `src/app/[locale]/portfolio/[slug]/page.tsx`

- Add locale parameter handling
- Fetch translated content from Sanity
- Update metadata with language alternatives
- Ensure images and structured data are localized

### 4.4 Portfolio Sanity Schema Updates

Update Sanity schemas to support translations:

```typescript
// sanity/schemas/project.ts
export default {
  name: 'project',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'es', type: 'string', title: 'Spanish' },
        { name: 'it', type: 'string', title: 'Italian' },
      ],
    },
    {
      name: 'description',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'es', type: 'text', title: 'Spanish' },
        { name: 'it', type: 'text', title: 'Italian' },
      ],
    },
    // ... other fields
  ],
};
```

### 4.5 Portfolio Checklist

- [ ] Move portfolio pages to `[locale]` structure
- [ ] Update Sanity queries to fetch locale-specific content
- [ ] Add translations to portfolio UI
- [ ] Update project detail pages
- [ ] Test filtering and navigation in all languages
- [ ] Verify portfolio images have localized alt texts

---

## 🔍 Phase 5: SEO Optimization (CRITICAL)

### 5.1 Update Sitemap

**File**: `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sciallastudio.com';

  const routes = [
    '',
    '/interior-design-orlando',
    '/interior-design-tampa',
    '/interior-design-nyc',
    '/interior-design-los-angeles',
    '/portfolio',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each route in each locale
  routes.forEach((route) => {
    locales.forEach((locale) => {
      const url = locale === 'en'
        ? `${baseUrl}${route}`
        : `${baseUrl}/${locale}${route}`;

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}${route}`,
            es: `${baseUrl}/es${route}`,
            it: `${baseUrl}/it${route}`,
          },
        },
      });
    });
  });

  // Add portfolio projects
  const projects = await getAllProjects();
  projects.forEach((project) => {
    locales.forEach((locale) => {
      const url = locale === 'en'
        ? `${baseUrl}/portfolio/${project.slug}`
        : `${baseUrl}/${locale}/portfolio/${project.slug}`;

      sitemap.push({
        url,
        lastModified: project.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/portfolio/${project.slug}`,
            es: `${baseUrl}/es/portfolio/${project.slug}`,
            it: `${baseUrl}/it/portfolio/${project.slug}`,
          },
        },
      });
    });
  });

  return sitemap;
}
```

### 5.2 Verify Hreflang Tags

Ensure every page includes hreflang tags in the metadata:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: '/',
      languages: {
        'en': '/',
        'es': '/es',
        'it': '/it',
        'x-default': '/', // Important for SEO
      },
    },
  };
}
```

### 5.3 Structured Data Localization

Update all structured data (JSON-LD) to include language:

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "inLanguage": [
    { "@type": "Language", "name": "English", "alternateName": "en" },
    { "@type": "Language", "name": "Spanish", "alternateName": "es" },
    { "@type": "Language", "name": "Italian", "alternateName": "it" },
  ],
  // ... rest of schema
};
```

### 5.4 SEO Checklist

- [ ] Update sitemap.ts with all locales
- [ ] Verify hreflang on all pages
- [ ] Test canonical URLs
- [ ] Verify x-default hreflang
- [ ] Update robots.txt (if needed)
- [ ] Test structured data in all languages
- [ ] Submit all locale versions to Google Search Console
- [ ] Verify Open Graph locale tags
- [ ] Test Twitter Card metadata
- [ ] Verify language-specific meta descriptions

---

## 📱 Phase 6: Additional Features (TODO)

### 6.1 Language Detection

Current implementation uses browser language detection via middleware.

**Optional Enhancement**: Add user preference storage

```typescript
// src/lib/language-storage.ts
export function saveLanguagePreference(locale: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-locale', locale);
  }
}

export function getLanguagePreference(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('preferred-locale');
  }
  return null;
}
```

Update language switcher to save preferences.

### 6.2 URL Redirects

Add redirect rules for old URLs (if migrating from existing site):

```typescript
// next.config.ts
module.exports = {
  async redirects() {
    return [
      {
        source: '/orlando',
        destination: '/interior-design-orlando',
        permanent: true,
      },
      // Add more redirects as needed
    ];
  },
};
```

### 6.3 Dynamic Content Translation

For content from Sanity CMS, update queries:

```typescript
// src/lib/sanity-service.ts
export async function getProject(slug: string, locale: string = 'en') {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      "title": title.${locale},
      "description": description.${locale},
      featuredImage,
      // ... other fields
    }`,
    { slug }
  );
}
```

---

## 🧪 Phase 7: Testing & Quality Assurance (TODO)

### 7.1 Functionality Testing

**Test Matrix**: Test each item in all 3 languages (en, es, it)

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Language switcher changes language
- [ ] Language preference persists
- [ ] All links work in each language
- [ ] Forms submit correctly
- [ ] Contact form emails are sent
- [ ] Images load with correct alt text
- [ ] Mobile navigation works
- [ ] City pages load correctly
- [ ] Portfolio pages load correctly
- [ ] Project detail pages load correctly

### 7.2 SEO Testing

Use these tools for each language version:

**Google Search Console**
- [ ] Submit sitemap for en, es, it
- [ ] Verify indexing status
- [ ] Check for crawl errors
- [ ] Review mobile usability

**Lighthouse Testing** (target >90 for all metrics)
- [ ] Test homepage (all locales)
- [ ] Test city pages (all locales)
- [ ] Test portfolio pages (all locales)
- [ ] Performance score >90
- [ ] Accessibility score >90
- [ ] Best Practices >90
- [ ] SEO score >90

**Rich Results Test**
- [ ] Test structured data for each locale
- [ ] Verify LocalBusiness schema
- [ ] Verify FAQ schema
- [ ] Verify breadcrumbs

**Hreflang Testing**
- Use: https://technicalseo.com/tools/hreflang/
- [ ] Verify all hreflang tags
- [ ] Check x-default implementation
- [ ] Verify no conflicts

### 7.3 Content Quality Review

**Spanish Translation Review**
- [ ] Have native Spanish speaker review all content
- [ ] Check for cultural appropriateness
- [ ] Verify terminology accuracy
- [ ] Review city-specific content

**Italian Translation Review**
- [ ] Have native Italian speaker review all content
- [ ] Check for cultural appropriateness
- [ ] Verify terminology accuracy
- [ ] Review city-specific content

### 7.4 Performance Testing

**Core Web Vitals** (test in all locales)
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Time to Interactive (TTI) < 3.8s

**Page Speed Insights**
- Test on 3G connection
- Test on mobile devices
- Test on desktop

### 7.5 Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 7.6 Accessibility Testing

Use WAVE or axe DevTools:
- [ ] Proper heading hierarchy
- [ ] Alt text for all images
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader compatibility

---

## 🚀 Phase 8: Deployment (TODO)

### 8.1 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Lighthouse scores >90
- [ ] Content reviewed by native speakers
- [ ] Staging environment tested
- [ ] Backup current production site
- [ ] Document rollback procedure

### 8.2 Environment Variables

Ensure these are set in production:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
RESEND_API_KEY=your_key
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key
NEXT_PUBLIC_GA_ID=your_ga_id
```

### 8.3 Deployment Steps

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Test production build locally**
   ```bash
   npm start
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

4. **Verify deployment**
   - Test all language versions
   - Check all routes
   - Verify analytics tracking

### 8.4 Post-Deployment

**Immediate Actions:**
- [ ] Submit updated sitemap to Google Search Console (all locales)
- [ ] Test all critical paths in production
- [ ] Monitor error logs
- [ ] Check analytics setup

**Within 24 hours:**
- [ ] Monitor Core Web Vitals
- [ ] Check Google Search Console for errors
- [ ] Review user feedback
- [ ] Monitor traffic patterns

**Within 1 week:**
- [ ] Review search appearance in SERPs
- [ ] Check indexing status for all locales
- [ ] Monitor ranking changes
- [ ] Review bounce rates by language

---

## 📊 Phase 9: Monitoring & Maintenance (ONGOING)

### 9.1 Analytics Setup

**Google Analytics 4**
- Set up language dimension
- Track language switcher usage
- Monitor traffic by locale
- Track conversions by language

**Events to Track:**
```javascript
// Language switch event
gtag('event', 'language_change', {
  'old_language': 'en',
  'new_language': 'es'
});

// Form submissions by language
gtag('event', 'form_submit', {
  'language': locale
});
```

### 9.2 Content Updates

**Workflow for Adding New Content:**

1. Add to English version first
2. Add translation keys to `messages/en.json`
3. Translate to Spanish (`messages/es.json`)
4. Translate to Italian (`messages/it.json`)
5. Test in all languages
6. Deploy

**For Sanity CMS Content:**

1. Add content in Sanity Studio
2. Ensure all language fields are filled
3. Publish in Sanity
4. Revalidate in Next.js (if using ISR)

### 9.3 Regular Maintenance

**Weekly:**
- [ ] Check Google Search Console for errors
- [ ] Review Core Web Vitals
- [ ] Monitor 404 errors

**Monthly:**
- [ ] Review analytics by language
- [ ] Check for broken links
- [ ] Update translation files if needed
- [ ] Review and update content

**Quarterly:**
- [ ] Full SEO audit (all locales)
- [ ] Performance testing
- [ ] Content quality review
- [ ] Competitor analysis

---

## 🎯 Expected Outcomes

### Traffic Expectations

**Spanish Market (es):**
- Target markets: Florida (Miami, Orlando), California (LA), Texas
- Expected traffic: 20-30% of total within 6 months
- Primary services: Residential design, luxury renovations

**Italian Market (it):**
- Target markets: New York, New Jersey, Connecticut
- Expected traffic: 10-15% of total within 6 months
- Primary services: Architecture, high-end residential

### SEO Benefits

1. **Expanded Search Visibility**
   - 3x indexable pages (one per language)
   - Rank for language-specific keywords
   - Appear in local searches in different languages

2. **Improved User Experience**
   - Native language content
   - Better engagement metrics
   - Lower bounce rates

3. **Competitive Advantage**
   - Most competitors don't offer multi-language
   - Better serve diverse market
   - Build trust with international clients

### Performance Targets

- Lighthouse scores remain >90 (all metrics, all languages)
- Page load time < 3s on 3G
- Core Web Vitals in "Good" range
- No impact on existing English performance

---

## 🆘 Troubleshooting

### Common Issues

**Issue**: Middleware not detecting language
**Solution**: Check middleware matcher in `src/middleware.ts`

**Issue**: Translations not loading
**Solution**: Verify JSON syntax in message files, check import paths

**Issue**: Links breaking when switching languages
**Solution**: Use `Link` from `@/i18n/routing`, not `next/link`

**Issue**: Metadata not updating per locale
**Solution**: Ensure `generateMetadata` uses `params.locale`

**Issue**: Hreflang errors in Search Console
**Solution**: Verify alternates in metadata, check sitemap

**Issue**: Performance degradation
**Solution**: Check bundle size, ensure translations aren't duplicated

### Debug Commands

```bash
# Check build output
npm run build

# Test specific locale
curl http://localhost:3000/es

# Check for TypeScript errors
npx tsc --noEmit

# Verify sitemap
curl http://localhost:3000/sitemap.xml
```

---

## 📚 Resources

### Documentation
- [Next.js i18n Routing](https://nextjs.org/docs/app/guides/internationalization)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Google Search Central - Multilingual Sites](https://developers.google.com/search/docs/specialty/international)

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [Hreflang Testing Tool](https://technicalseo.com/tools/hreflang/)

### Translation Services (if needed)
- Professional translation services for accuracy
- Native speaker review for cultural appropriateness

---

## 📝 Notes & Best Practices

### Translation Guidelines

1. **Don't Just Translate - Localize**
   - Adapt content for cultural context
   - Use local terminology
   - Consider regional preferences

2. **Maintain SEO Keywords**
   - Research keywords in target language
   - Don't literal translate keywords
   - Consider search intent differences

3. **Keep Consistent**
   - Use same terminology throughout
   - Maintain brand voice in each language
   - Create style guide for each language

4. **Technical Considerations**
   - Text expansion: Spanish ~30% longer than English
   - Italian ~20% longer than English
   - Test UI with longer text
   - Ensure buttons/menus don't overflow

### SEO Best Practices

1. **Each Language = Unique Content**
   - Don't use machine translation without review
   - Unique meta descriptions per language
   - Language-specific structured data

2. **URL Structure**
   - Keep clean, readable URLs
   - Use language prefix consistently
   - Don't translate URLs (keep English slug)

3. **Hreflang Implementation**
   - Always include x-default
   - Self-referencing hreflang
   - Bidirectional linking

4. **Content Quality**
   - Same quality standards for all languages
   - Don't treat translations as secondary
   - Keep all versions updated

---

## ✅ Final Launch Checklist

Before going live with translations:

### Technical
- [ ] All pages migrated to `[locale]` structure
- [ ] All components using translations
- [ ] Language switcher working on all pages
- [ ] Middleware correctly routing requests
- [ ] Sitemap includes all languages
- [ ] Robots.txt configured correctly

### Content
- [ ] All translations complete
- [ ] Native speaker review done
- [ ] Alt texts translated
- [ ] Meta descriptions translated
- [ ] Structured data localized

### SEO
- [ ] Hreflang tags verified
- [ ] Canonical URLs correct
- [ ] Open Graph tags include locale
- [ ] Sitemap submitted to GSC
- [ ] All locales in Search Console

### Performance
- [ ] Lighthouse >90 all metrics
- [ ] Core Web Vitals good
- [ ] Bundle size acceptable
- [ ] Images optimized

### Testing
- [ ] All critical paths tested
- [ ] Forms work in all languages
- [ ] Mobile tested
- [ ] Cross-browser tested
- [ ] Accessibility verified

### Deployment
- [ ] Staging tested
- [ ] Backup created
- [ ] Rollback plan ready
- [ ] Analytics configured
- [ ] Monitoring setup

---

**Document Version**: 1.0
**Last Updated**: 2025-09-30
**Author**: Claude Code
**Project**: Scialla Studio Multi-Language Implementation
