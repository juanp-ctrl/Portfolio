import type { Metadata } from 'next'
import type React from 'react'
import { generatePageMetadata } from '@/lib/metadata'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Blog | Juan Pablo Jiménez',
    description:
      'Technical articles on web security, software engineering, and modern web development by Juan Pablo Jiménez.',
    path: '/blog',
    ogTitle: 'Blog | Juan Pablo Jiménez',
    keywords: [
      'blog',
      'software engineering',
      'web security',
      'web development',
      'react',
      'next.js',
      'typescript',
      'Juan Pablo Jiménez',
    ],
  })
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
