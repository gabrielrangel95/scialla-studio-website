"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { trackFormSubmit } from "@/lib/firebase/analytics";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  locationLabels,
} from "@/lib/validations/contact";


export function Contact() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: undefined,
      projectType: undefined,
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();

      if (result.success) {
        toast.success(t("success"));

        // Track successful form submission
        trackFormSubmit({
          form_name: "contact_form",
          form_location: typeof window !== "undefined" ? window.location.pathname : "unknown",
          success: true,
          location: data.location,
          project_type: data.projectType,
        });

        form.reset();
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
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 md:p-10">
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 !rounded-none !border-solid !border !border-gray-400 !bg-white !shadow-none !outline-none focus:!border-gray-600 focus:!outline-none">
                            <SelectValue placeholder={t("form.locationPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(locationLabels).map(([value, label]) => (
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white hover:bg-gray-800 py-4 px-8 text-sm font-medium uppercase tracking-wider transition-all duration-200"
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