import { notFound } from "next/navigation";
import { getAllDocs, getDocBySlug, getOrderedDocs } from "@/lib/docs";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { MarkdownContent } from "@/components/markdown-content";
import { Breadcrumb } from "@/components/breadcrumb";
import { ReadingProgress } from "@/components/reading-progress";

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${doc.title} | Linux CLI Handbook`,
    description: doc.description || `Learn about ${doc.title}`,
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const allDocs = getOrderedDocs();

  return (
    <>
      <ReadingProgress />
      <Header />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="container max-w-7xl py-8 px-4 md:px-8">
            <Breadcrumb slug={doc.slug} />
            <h1 className="text-4xl font-bold mb-6">{doc.title}</h1>
            <MarkdownContent
              content={doc.content}
              title={doc.title}
              slug={doc.slug}
              allDocs={allDocs}
            />
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}
