"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackFormSubmit } from "@/lib/analytics/analytics";
import { trackFormSubmitSuccess } from "@/lib/google-ads/gtag-events";
import { useLeadSubmission } from "@/lib/analytics/lead-submission";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Clock, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  ContactFormData,
  contactFormSchema,
  projectTypeLabels,
  budgetLabels,
  timelineLabels,
} from "@/lib/validations/contact";


export function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const router = useRouter();
  const { setSubmission } = useLeadSubmission();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const pageLoadTime = useRef<number>(0);

  // Track page load time for bot detection
  useEffect(() => {
    pageLoadTime.current = Date.now();
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      projectType: undefined,
      budget: undefined,
      timeline: undefined,
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);

    // Validate Turnstile token before submission
    if (!turnstileToken) {
      toast.error("Please complete the security verification.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          turnstileToken,
          submissionTime: pageLoadTime.current,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();

      if (result.success) {
        toast.success(t("success"));

        // One id per successful submission, so Google Ads can discard a repeat
        // send of the same conversion instead of counting it twice.
        const transactionId = crypto.randomUUID();

        // Track successful form submission
        trackFormSubmit({
          form_name: "contact_form",
          form_location: typeof window !== "undefined" ? window.location.pathname : "unknown",
          success: true,
          location: data.location,
          project_type: data.projectType,
          budget: data.budget,
          timeline: data.timeline,
        });

        // Track Google Ads conversion. The identifiers are for enhanced
        // conversions — gtag hashes them in the browser before they are sent.
        trackFormSubmitSuccess({
          location: data.location,
          projectType: data.projectType,
          transactionId,
          userData: {
            name: data.name,
            email: data.email,
            phone: data.phone,
          },
        });

        setSubmission({
          name: data.name,
          location: data.location,
          projectType: data.projectType,
          budget: data.budget,
          timeline: data.timeline,
          message: data.message,
        });

        form.reset();
        setTurnstileToken(null); // Reset turnstile token

        // No query string: the details ride along in context so no personal
        // data ends up in the URL, and therefore in GA4's page_location.
        router.push(`/${locale}/thank-you`);
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(t("error"));
      console.error("Contact form error:", error);

      // Track form submission error
      trackFormSubmit({
        form_name: "contact_form",
        form_location: typeof window !== "undefined" ? window.location.pathname : "unknown",
        success: false,
        error_message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="lead-capture bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            {t("subtitle")}
          </p>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>{t("trust.confidential")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{t("trust.response")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{t("trust.noObligation")}</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 md:p-10 shadow-sm border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Two Column Layout for Desktop */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.name")} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.namePlaceholder")}
                          {...field}
                          className="w-full px-4 py-3 !rounded-none !border-solid !border !border-gray-400 !bg-white !shadow-none !outline-none focus:!border-gray-600 focus:!outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.phone")} *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder={t("form.phonePlaceholder")}
                          {...field}
                          className="w-full px-4 py-3 !rounded-none !border-solid !border !border-gray-400 !bg-white !shadow-none !outline-none focus:!border-gray-600 focus:!outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email - Full Width */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.email")} *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("form.emailPlaceholder")}
                        {...field}
                        className="w-full px-4 py-3 !rounded-none !border-solid !border !border-gray-400 !bg-white !shadow-none !outline-none focus:!border-gray-600 focus:!outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.location")} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.locationPlaceholder")}
                          {...field}
                          className="w-full px-4 py-3 !rounded-none !border-solid !border !border-gray-400 !bg-white !shadow-none !outline-none focus:!border-gray-600 focus:!outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.projectType")} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 !rounded-none !border-solid !border !border-gray-400 !bg-white !shadow-none !outline-none focus:!border-gray-600 focus:!outline-none">
                            <SelectValue placeholder={t("form.projectTypePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(projectTypeLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Budget and Timeline - Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.budget")} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 !rounded-none !border-solid !border !border-gray-400 !bg-white !shadow-none !outline-none focus:!border-gray-600 focus:!outline-none">
                            <SelectValue placeholder={t("form.budgetPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(budgetLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.timeline")} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 !rounded-none !border-solid !border !border-gray-400 !bg-white !shadow-none !outline-none focus:!border-gray-600 focus:!outline-none">
                            <SelectValue placeholder={t("form.timelinePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(timelineLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Optional Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("form.message")}
                      <span className="text-gray-500 font-normal ml-2">{t("form.messageOptional")}</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder={t("form.messagePlaceholder")}
                        {...field}
                        className="w-full px-4 py-3 !rounded-none !border-solid !border !border-gray-400 !bg-white !shadow-none !outline-none focus:!border-gray-600 focus:!outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Privacy Notice */}
              <div className="text-sm text-gray-600 flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 12a1 1 0 112 0v1a1 1 0 11-2 0v-1zm1-8a1 1 0 00-1 1v4a1 1 0 102 0V5a1 1 0 00-1-1z" />
                </svg>
                {t("form.privacyNotice")}
              </div>

              {/* Cloudflare Turnstile - Bot Protection */}
              <div className="flex justify-center">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => {
                    setTurnstileToken(null);
                    toast.error("Security verification failed. Please refresh the page.");
                  }}
                  onExpire={() => setTurnstileToken(null)}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !turnstileToken}
                className="w-full bg-black text-white hover:bg-gray-800 py-4 px-8 text-sm font-medium uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </Button>
            </form>
          </Form>
        </div>

      </div>
    </section>
  );
}