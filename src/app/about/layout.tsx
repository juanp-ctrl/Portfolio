import type { Metadata } from 'next'
import type React from 'react'
import { generatePageMetadata } from '@/lib/metadata'
import en from '../../../messages/en.json'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: en.seo.about_title,
    description: en.about.about_description,
    path: '/about',
    ogTitle: en.seo.about_og_title,
    ogDescription: en.about.about_description,
    keywords: en.seo.keywords_about.split(', '),
  })
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
