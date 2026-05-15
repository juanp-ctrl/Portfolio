import { getPostBySlug, getPostSlugs } from '@/lib/blog'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

const BASE_URL = 'https://www.juanpablojimenez.dev'

export async function generateStaticParams() {
  return getPostSlugs('en').map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, 'en')

  if (!post) return { title: 'Post Not Found' }

  const { frontmatter } = post
  const canonicalUrl = `${BASE_URL}/blog/${slug}`
  const ogImage = frontmatter.coverImage
    ? `${BASE_URL}${frontmatter.coverImage}`
    : `${BASE_URL}/images/OG_brand.png`

  return {
    title: `${frontmatter.title} | Juan Pablo Jiménez`,
    description: frontmatter.excerpt,
    keywords: frontmatter.tags,
    alternates: {
      canonical: canonicalUrl,
      languages: { es: `${BASE_URL}/blog/es/${slug}` },
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug, 'en')

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} slug={slug} />
}
