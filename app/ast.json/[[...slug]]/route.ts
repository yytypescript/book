import global from "@/.source/source.config.mjs";
import { source } from "@/lib/source";
import { loadDefaultOptions, remarkInclude } from "fumadocs-mdx/config";
import { notFound } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";
import { remark } from "remark";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const { remarkPlugins } = await loadDefaultOptions({
    collections: new Map(),
    global,
  });
  if (!remarkPlugins) {
    notFound();
  }
  const processor = remark().use({ plugins: remarkPlugins });
  const tree = processor.parse(page.data.content);
  return NextResponse.json(tree);
}

export function generateStaticParams() {
  return source.generateParams();
}
