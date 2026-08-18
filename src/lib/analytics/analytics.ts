"use client";

import { sendEvent } from "./gtag";

// Event parameter types
export interface PageViewParams {
  page_path: string;
  page_title?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ButtonClickParams {
  button_name: string;
  button_location: string;
  destination?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface FormSubmitParams {
  form_name: string;
  form_location: string;
  success: boolean;
  location?: string;
  project_type?: string;
  error_message?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface FilterChangeParams {
  filter_type: string;
  filter_value: string;
  page: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ProjectInteractionParams {
  project_slug: string;
  interaction_type: string;
  location?: string;
  category?: string;
  [key: string]: string | number | boolean | undefined;
}

// Specific tracking functions

/**
 * Track page views with custom parameters
 */
export function trackPageView(params: PageViewParams) {
  sendEvent("page_view", params);
}

/**
 * Track button clicks across the site
 */
export function trackButtonClick(params: ButtonClickParams) {
  sendEvent("button_click", params);
}

/**
 * Track form submissions (success and errors)
 */
export function trackFormSubmit(params: FormSubmitParams) {
  const eventName = params.success ? "form_submit_success" : "form_submit_error";
  sendEvent(eventName, params);

  // Track as lead if form submission was successful
  if (params.success && params.form_name === "contact_form") {
    sendEvent("generate_lead", {
      location: params.location,
      project_type: params.project_type,
    });
  }
}

/**
 * Track filter changes on projects and other pages
 */
export function trackFilterChange(params: FilterChangeParams) {
  sendEvent("filter_change", params);
}

/**
 * Track project card interactions
 */
export function trackProjectInteraction(params: ProjectInteractionParams) {
  sendEvent("project_interaction", params);
}

/**
 * Track section visibility (scroll tracking)
 */
export function trackSectionView(sectionName: string, page: string) {
  sendEvent("section_view", {
    section_name: sectionName,
    page,
  });
}

/**
 * Track CTA clicks specifically
 */
export function trackCTAClick(ctaName: string, ctaLocation: string, destination?: string) {
  sendEvent("cta_click", {
    cta_name: ctaName,
    cta_location: ctaLocation,
    destination,
  });
}

/**
 * Track city page specific interactions
 */
export function trackCityPageInteraction(city: string, interactionType: string, detail?: string) {
  sendEvent("city_page_interaction", {
    city,
    interaction_type: interactionType,
    detail,
  });
}

/**
 * Track portfolio browsing behavior
 */
export function trackPortfolioBrowsing(action: string, additionalParams?: Record<string, string | number | boolean | undefined>) {
  sendEvent("portfolio_browsing", {
    action,
    ...(additionalParams || {}),
  });
}

/**
 * Track navigation clicks
 */
export function trackNavigationClick(linkText: string, destination: string) {
  sendEvent("navigation_click", {
    link_text: linkText,
    destination,
  });
}
