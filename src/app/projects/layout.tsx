import type { Metadata } from 'next'
import type React from 'react'
import { generatePageMetadata } from '@/lib/metadata'
import en from '../../../messages/en.json'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: en.seo.projects_title,
    description: en.seo.projects_description,
    path: '/projects',
    ogTitle: en.seo.projects_og_title,
    ogDescription: en.seo.projects_description,
    keywords: en.seo.keywords_projects.split(', '),
  })
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
