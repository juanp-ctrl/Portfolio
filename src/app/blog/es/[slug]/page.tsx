import { getPostBySlug, getPostSlugs } from '@/lib/blog'
import { notFound } from 'next/navigation'
import BlogPostClient from '../../[slug]/BlogPostClient'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

const BASE_URL = 'https://www.juanpablojimenez.dev'

export async function generateStaticParams() {
  // Build pages for all translated posts; fall back to EN slugs so the
  // route always has at least one static page (required by output: 'export').
  const esSlugs = getPostSlugs('es')
  const slugs = esSlugs.length > 0 ? esSlugs : getPostSlugs('en')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, 'es')

  if (!post) return { title: 'Post Not Found' }

  const { frontmatter } = post
  const canonicalUrl = `${BASE_URL}/blog/es/${slug}`
  const ogImage = frontmatter.coverImage
    ? `${BASE_URL}${frontmatter.coverImage}`
    : `${BASE_URL}/images/OG_brand.png`

  return {
    title: `${frontmatter.title} | Juan Pablo Jiménez`,
    description: frontmatter.excerpt,
    keywords: frontmatter.tags,
    alternates: {
      canonical: canonicalUrl,
      languages: { en: `${BASE_URL}/blog/${slug}` },
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      url: canonicalUrl,
      siteName: 'Juan Pablo Jiménez Portfolio',
      type: 'article',
      images: [
        { url: ogImage, width: 1200, height: 630, alt: frontmatter.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
      creator: '@JuanPabloJim_',
      images: [ogImage],
    },
  }
}

export default async function BlogPostPageEs({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug, 'es')

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} slug={slug} />
}
