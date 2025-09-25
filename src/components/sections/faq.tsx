import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What areas do you serve for interior design?",
    answer:
      "We provide luxury interior design services in Orlando, Tampa, New York City, and Los Angeles. Our team works with clients throughout these metropolitan areas including surrounding neighborhoods and suburbs.",
  },
  {
    question: "How much does interior design cost?",
    answer:
      "Our interior design services typically range from $75-400 per square foot depending on the project scope, location, and luxury level. We offer free consultations to provide accurate estimates based on your specific needs and vision.",
  },
  {
    question: "What types of interior design projects do you handle?",
    answer:
      "We specialize in luxury residential design including complete home renovations, kitchen and bathroom remodeling, living spaces, and bedrooms. We also provide commercial interior design for offices, restaurants, and retail spaces.",
  },
  {
    question: "How long does an interior design project take?",
    answer:
      "Project timelines vary based on scope and complexity. A single room design typically takes 4-8 weeks, while full home renovations can take 3-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you offer virtual interior design consultations?",
    answer:
      "Yes, we offer both in-person and virtual consultations for clients across all our service areas. Virtual consultations are perfect for initial planning and can be followed by in-person visits as needed.",
  },
  {
    question:
      "What makes Scialla Studio different from other interior designers?",
    answer:
      "Our founder Francesco brings over 15 years of European design expertise combined with deep understanding of American luxury markets. We focus on creating sophisticated spaces that reflect your personality while maximizing functionality and value.",
  },
];

export function FAQ() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <section
        id="faq"
        className="py-8 md:py-12 lg:py-16 bg-gray-50 px-4 md:px-6 lg:px-12 xl:px-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Get answers to common questions about our interior design services
              across Orlando, Tampa, NYC, and Los Angeles.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white mb-4 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-900 hover:text-gray-700">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
