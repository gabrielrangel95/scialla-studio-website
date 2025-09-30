# Firebase Analytics Implementation Guide

## Overview

Firebase Analytics has been successfully integrated into the Scialla Studio website to track user interactions, page views, and conversion events across all pages.

## Implementation Summary

### 1. Core Setup

#### Environment Variables (.env.local)
All Firebase configuration has been moved to environment variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

#### Firebase Configuration (`src/lib/firebase/config.ts`)
Centralized Firebase configuration using environment variables.

#### Analytics Provider (`src/lib/firebase/analytics-provider.tsx`)
- Client-side only component that initializes Firebase
- Automatically tracks page views on route changes
- Tracks specific page types (homepage, city pages, portfolio, projects)
- Wraps the entire application in root layout

### 2. Analytics Utilities (`src/lib/firebase/analytics.ts`)

Comprehensive tracking functions:

- **trackPageView()** - Custom page view tracking with parameters
- **trackButtonClick()** - Track button clicks across the site
- **trackFormSubmit()** - Track form submissions (success/error)
- **trackFilterChange()** - Track filter changes on portfolio
- **trackProjectInteraction()** - Track project card interactions
- **trackSectionView()** - Track section visibility (scroll tracking)
- **trackCTAClick()** - Track CTA-specific clicks
- **trackCityPageInteraction()** - Track city page specific interactions
- **trackPortfolioBrowsing()** - Track portfolio browsing behavior
- **trackNavigationClick()** - Track navigation menu clicks

### 3. Events Being Tracked

#### Automatic Events
- **page_view** - Every page navigation with path and title
- **view_homepage** - Homepage visits
- **view_city_page** - City page visits (with city parameter)
- **view_portfolio** - Portfolio page visits (with city/category filters)
- **view_project** - Individual project detail views

#### Form Events
- **form_submit_success** - Successful contact form submissions
- **form_submit_error** - Failed contact form submissions
- **generate_lead** - Lead generation event (successful contact form)

Parameters tracked:
- form_name
- form_location (page path)
- location (city selected)
- project_type
- error_message (for errors)

#### Button/CTA Events
- **button_click** - Generic button clicks
- **cta_click** - Call-to-action button clicks

Parameters tracked:
- button_name
- button_location
- destination

#### Portfolio Events
- **project_interaction** - Project card clicks
- **filter_change** - City or category filter changes
- **portfolio_browsing** - Portfolio browsing actions

Parameters tracked:
- project_slug
- interaction_type
- location
- category
- filter_type
- filter_value

#### Section Events
- **section_view** - Section visibility tracking

Parameters tracked:
- section_name
- page

#### City Page Events
- **city_page_interaction** - City-specific interactions

Parameters tracked:
- city
- interaction_type
- detail

### 4. Components Created

#### `AnalyticsButton` (`src/components/ui/analytics-button.tsx`)
Wrapper around Button component that automatically tracks clicks.

#### `CityPageButtons` (`src/components/city-page-buttons.tsx`)
Pre-configured buttons for city pages with analytics tracking.

#### `SectionViewTracker` (`src/components/section-view-tracker.tsx`)
Wrapper component that tracks when sections become visible using Intersection Observer.

#### `ProjectCard` (Updated)
Now tracks clicks automatically when users click on project cards.

#### `Contact` (Updated)
Tracks form submissions (success and errors) with location and project type parameters.

### 5. Usage Examples

#### Tracking a Button Click
```tsx
import { AnalyticsButton } from "@/components/ui/analytics-button";

<AnalyticsButton
  buttonName="view_portfolio"
  buttonLocation="homepage_hero"
  destination="/portfolio"
>
  View Portfolio
</AnalyticsButton>
```

#### Tracking Section Views
```tsx
import { SectionViewTracker } from "@/components/section-view-tracker";

<SectionViewTracker sectionName="services" page="homepage">
  <section>
    {/* Your section content */}
  </section>
</SectionViewTracker>
```

#### Manual Event Tracking
```tsx
import { trackButtonClick } from "@/lib/firebase/analytics";

const handleClick = () => {
  trackButtonClick({
    button_name: "custom_button",
    button_location: "some_page",
    destination: "/destination",
  });
};
```

## Key Events to Monitor in Firebase

### Lead Generation
- **generate_lead** - Primary conversion event
  - Filter by location to see which cities generate most leads
  - Filter by project_type to understand service demand

### User Engagement
- **view_city_page** - City page performance
- **view_portfolio** - Portfolio engagement
- **project_interaction** - Project interest
- **section_view** - Content engagement

### Form Performance
- **form_submit_success** vs **form_submit_error** - Form conversion rate
- Track error messages to identify issues

### Navigation Patterns
- **page_view** events with page_path parameter
- **filter_change** - User search behavior
- **button_click** - CTA effectiveness

## Accessing Analytics Data

1. **Firebase Console**: https://console.firebase.google.com/
2. Navigate to your project: "scialla-studio"
3. Go to Analytics > Events to see real-time event data
4. Go to Analytics > Dashboard for overview metrics

### Custom Reports Suggestions

1. **Lead Quality by City**
   - Event: generate_lead
   - Parameter: location
   - Metric: Count

2. **Portfolio Browsing Funnel**
   - Events: view_portfolio → project_interaction → view_project
   - Track drop-off rates

3. **City Page Performance**
   - Event: view_city_page
   - Parameter: city
   - Compare engagement metrics

4. **CTA Effectiveness**
   - Event: button_click
   - Parameter: button_name
   - Group by button_location

## Testing

To test the analytics implementation:

1. Start the development server: `npm run dev`
2. Open browser DevTools Console
3. Navigate through the site
4. Check Firebase DebugView (enable with `?gtm_debug=true` in URL)
5. Events should appear in Firebase Console within 24 hours

## Notes

- All analytics code is client-side only (`"use client"` directive)
- Events are tracked only when analytics is successfully initialized
- Failed event tracking is logged to console but doesn't break functionality
- Page views are tracked automatically on every route change
- Section views are tracked once per section per page load

## Future Enhancements

Consider adding:
- Scroll depth tracking
- Time on page tracking
- Click heatmaps
- Form field interaction tracking
- Image gallery interaction tracking
- Video play tracking (if added)
- Download tracking (for PDFs, etc.)
- Outbound link tracking