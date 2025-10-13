import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Square,
  Star,
  ArrowLeft,
  ArrowRight,
  Video,
} from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ui/image-gallery";
import {
  sanityService,
  extractPortableTextContent,
} from "@/lib/sanity-service";
import { urlForImage, resolveOpenGraphImage } from "@/lib/sanity-image";
import { getVideoUrl, getVideoThumbnail } from "@/lib/sanity-video";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

async function getProjectData(slug: string) {
  const project = await sanityService.getProject(slug);

  if (!project) {
    return null;
  }

  const relatedProjects = await sanityService.getRelatedProjects(project, 3);

  return {
    project,
    relatedProjects,
  };
}

export async function generateStaticParams() {
  const slugs = await sanityService.getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getProjectData(resolvedParams.slug);

  if (!data?.project) {
    return {
      title: "Project Not Found | Scialla Studio",
      description: "The requested project could not be found.",
    };
  }

  const { project } = data;
  const cityName = project.location.name;
  const categoryNames = project.category
    .map((cat) =>
      cat.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    )
    .join(", ");

  // Use custom SEO fields if available, otherwise generate
  const title =
    project.seo?.title ||
    `${project.title} | Interior Design ${cityName} | Scialla Studio`;

  const description =
    project.seo?.description ||
    `${project.title} - Professional interior design project in ${cityName}. ${categoryNames} by Scialla Studio. View our portfolio of luxury interior design.`;

  const keywords = [
    `${project.title.toLowerCase()}`,
    `interior design ${cityName.toLowerCase()}`,
    ...project.category.map((cat) => cat.replace("-", " ")),
    "luxury interior design",
    "modern home design",
    "Scialla Studio",
    ...(project.seo?.keywords || []),
  ].join(", ");

  const ogImage = resolveOpenGraphImage(
    project.seo?.ogImage || project.featuredImage,
    1200,
    630
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://sciallastudioid.com/portfolio/${project.slug.current}`,
    },
    openGraph: {
      title,
      description,
      url: `https://sciallastudioid.com/portfolio/${project.slug.current}`,
      siteName: "Scialla Studio",
      images: ogImage ? [ogImage] : [],
      locale: "en_US",
      type: "article",
      publishedTime: project._createdAt,
      modifiedTime: project.completionDate || project._createdAt,
      authors: ["Scialla Studio"],
      tags: project.category,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage.url] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const data = await getProjectData(resolvedParams.slug);

  if (!data?.project) {
    notFound();
  }

  const { project, relatedProjects } = data;
  const cityName = project.location.name;
  const fullLocation = project.sublocation
    ? `${cityName}, ${project.sublocation}`
    : cityName;
  const categoryNames = project.category.map((cat) =>
    cat.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://sciallastudioid.com/portfolio/${project.slug.current}`,
    name: project.title,
    description:
      extractPortableTextContent(project.description) ||
      `Interior design project in ${cityName}`,
    image: project.featuredImage
      ? urlForImage(project.featuredImage)?.url()
      : null,
    creator: {
      "@type": "Organization",
      name: "Scialla Studio",
      url: "https://sciallastudioid.com",
      logo: "https://sciallastudioid.com/scialla-studio-logo.png",
    },
    locationCreated: {
      "@type": "Place",
      name: cityName,
      address: {
        "@type": "PostalAddress",
        addressLocality: cityName,
      },
    },
    dateCreated: project._createdAt,
    datePublished: project._createdAt,
    genre: categoryNames.join(", "),
    keywords: project.category.join(", "),
    publisher: {
      "@type": "Organization",
      name: "Scialla Studio",
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sciallastudioid.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: "https://sciallastudioid.com/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://sciallastudioid.com/portfolio/${project.slug.current}`,
      },
    ],
  };

  // Format completion date
  const completionDate = project.completionDate
    ? new Date(project.completionDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <div className="min-h-screen bg-white text-gray-900">
        <Header />

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: "Portfolio", href: "/portfolio" }]}
          currentPage={project.title}
        />

        {/* Back to Portfolio */}
        <div className="px-4 md:px-6 lg:px-12 xl:px-16 py-4 pt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-end">
          {project.featuredImage && (
            <>
              <Image
                src={
                  urlForImage(project.featuredImage)
                    ?.width(1600)
                    .height(900)
                    .url() || ""
                }
                alt={project.featuredImage.alt || project.title}
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </>
          )}

          <div className="relative z-10 px-4 md:px-6 lg:px-12 xl:px-16 py-12 w-full">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6 leading-tight tracking-tight">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-white/90 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{fullLocation}</span>
                </div>
                {completionDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{completionDate}</span>
                  </div>
                )}
                {project.category.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.category.slice(0, 3).map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                      >
                        {cat
                          .replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {project.description && (
                <div className="prose prose-lg max-w-none mb-12">
                  <PortableText value={project.description} />
                </div>
              )}

              {/* Promo Video */}
              {project.promoVideo && getVideoUrl(project.promoVideo) && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Video className="w-6 h-6 text-gray-900" />
                    <h2 className="text-2xl md:text-3xl font-light text-gray-900">
                      Project Video
                    </h2>
                  </div>
                  <div className="relative w-full overflow-hidden rounded-lg bg-gray-100">
                    <video
                      controls
                      className="w-full h-auto max-h-[500px] md:max-h-[600px] lg:max-h-[700px] object-contain"
                      poster={
                        getVideoThumbnail(project.promoVideo) || undefined
                      }
                      preload="metadata"
                    >
                      <source
                        src={getVideoUrl(project.promoVideo) || ""}
                        type={project.promoVideo.asset?.mimeType || "video/mp4"}
                      />
                      Your browser does not support the video tag.
                    </video>
                    {project.promoVideo.caption && (
                      <p className="mt-3 text-sm text-gray-600 italic text-center">
                        {project.promoVideo.caption}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-8">
                    Project Gallery
                  </h2>
                  <ImageGallery
                    images={project.gallery}
                    projectTitle={project.title}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{fullLocation}</p>
                    </div>
                  </div>

                  {completionDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="font-medium">{completionDate}</p>
                      </div>
                    </div>
                  )}

                  {project.projectDetails?.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">
                          {project.projectDetails.duration}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.projectDetails?.squareFootage && (
                    <div className="flex items-center gap-3">
                      <Square className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Square Footage</p>
                        <p className="font-medium">
                          {project.projectDetails.squareFootage.toLocaleString()}{" "}
                          sq ft
                        </p>
                      </div>
                    </div>
                  )}

                  {project.projectDetails?.budget && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Budget Range</p>
                        <p className="font-medium">
                          {project.projectDetails.budget
                            .replace("-", " - ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Testimonial */}
              {project.client?.testimonial && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Client Review
                  </h3>

                  {project.client.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: project.client.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        )
                      )}
                    </div>
                  )}

                  <blockquote className="text-gray-700 mb-4 italic">
                    &ldquo;{project.client.testimonial}&rdquo;
                  </blockquote>

                  {project.client.name && (
                    <p className="text-sm text-gray-500">
                      - {project.client.name}
                    </p>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="bg-gray-900 text-white p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Start Your Project</h3>
                <p className="text-gray-300 mb-6 text-sm">
                  Ready to transform your space? Contact us for a free
                  consultation.
                </p>
                <Button
                  asChild
                  className="w-full bg-white text-gray-900 hover:bg-gray-100"
                >
                  <Link href="/contact">Get Free Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 xl:px-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                  Related Projects
                </h2>
                <p className="text-gray-600">
                  Explore more of our work in {cityName} and similar projects
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {relatedProjects.map((relatedProject) => (
                  <ProjectCard
                    key={relatedProject._id}
                    title={relatedProject.title}
                    slug={relatedProject.slug.current}
                    location={relatedProject.location.name}
                    locationSlug={relatedProject.location.slug.current}
                    category={relatedProject.category}
                    featuredImage={relatedProject.featuredImage}
                    completionDate={relatedProject.completionDate}
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
                >
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
