import { Metadata } from 'next'

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  ogTitle?: string
  ogDescription?: string
  keywords?: string[]
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  keywords,
}: PageMetadataOptions): Metadata {
  const baseUrl = 'https://www.juanpablojimenez.dev'
  const canonicalUrl = `${baseUrl}${path}`
  const ogImageUrl = `${baseUrl}/images/OG_brand.png`

  return {
    title,
    description,
    keywords: keywords || [
      'frontend developer',
      'react developer',
      'nextjs developer',
      'typescript developer',
      'web developer',
      'Juan Pablo Jiménez',
      'portfolio',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url: canonicalUrl,
      siteName: 'Juan Pablo Jiménez Portfolio',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Juan Pablo Jiménez Portfolio - Astronaut floating in space with portfolio text',
          type: 'image/png',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle || title,
      description: ogDescription || description,
      creator: '@JuanPabloJim_',
      images: [ogImageUrl],
    },
  }
}
