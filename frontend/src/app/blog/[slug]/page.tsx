import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogData";
import { BlogPostView } from "@/components/blog/BlogPostView";

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}
