import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  location: z
    .string()
    .min(2, "Please enter a location")
    .max(100, "Location must be less than 100 characters"),
  projectType: z
    .enum([
      "full-home",
      "kitchen",
      "bathroom",
      "living-spaces",
      "commercial",
      "consultation",
    ])
    .refine((val) => val !== undefined, {
      message: "Please select a project type",
    }),
  budget: z
    .enum([
      "under-25k",
      "25k-50k",
      "50k-100k",
      "100k-250k",
      "over-250k",
    ])
    .refine((val) => val !== undefined, {
      message: "Please select a budget range",
    }),
  timeline: z
    .enum([
      "within-1-month",
      "1-3-months",
      "3-6-months",
      "6-12-months",
      "12-months-plus",
    ])
    .refine((val) => val !== undefined, {
      message: "Please select a timeline",
    }),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
  // Bot protection fields
  turnstileToken: z.string().optional(),
  submissionTime: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const projectTypeLabels: Record<ContactFormData["projectType"], string> = {
  "full-home": "Full Home Design",
  "kitchen": "Kitchen Renovation",
  "bathroom": "Bathroom Design",
  "living-spaces": "Living Spaces",
  "commercial": "Commercial Space",
  "consultation": "Design Consultation",
};

export const budgetLabels: Record<ContactFormData["budget"], string> = {
  "under-25k": "Under $25,000",
  "25k-50k": "$25,000 - $50,000",
  "50k-100k": "$50,000 - $100,000",
  "100k-250k": "$100,000 - $250,000",
  "over-250k": "Over $250,000",
};

export const timelineLabels: Record<ContactFormData["timeline"], string> = {
  "within-1-month": "Within 1 month",
  "1-3-months": "1-3 months",
  "3-6-months": "3-6 months",
  "6-12-months": "6-12 months",
  "12-months-plus": "12+ months",
};