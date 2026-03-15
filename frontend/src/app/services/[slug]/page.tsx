import { notFound } from "next/navigation";
import { servicesData } from "@/data/servicesData";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ServicePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}
