import { ThankYou } from "@/components/sections/thank-you";
import { setRequestLocale } from "next-intl/server";

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ThankYou />;
}
