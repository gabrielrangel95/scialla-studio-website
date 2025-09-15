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
    .enum(["orlando", "tampa", "nyc", "los-angeles"], {
      required_error: "Please select a project location",
    }),
  projectType: z
    .enum([
      "full-home",
      "kitchen",
      "bathroom",
      "living-spaces",
      "commercial",
      "consultation",
    ], {
      required_error: "Please select a project type",
    }),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
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

export const locationLabels: Record<ContactFormData["location"], string> = {
  "orlando": "Orlando",
  "tampa": "Tampa",
  "nyc": "New York City",
  "los-angeles": "Los Angeles",
};