import type { Metadata } from 'next'
import type React from 'react'
import { generatePageMetadata } from '@/lib/metadata'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Course Resources | Fullstack Course | Juan Pablo Jiménez',
    description:
      'Download course materials, PDFs, and resources for the fullstack development course by Juan Pablo Jiménez.',
    path: '/fullstack-course/resources',
    ogTitle: 'Course Resources | Fullstack Course',
    keywords: [
      'course resources',
      'fullstack course',
      'web development materials',
      'PDF downloads',
      'learning resources',
      'Juan Pablo Jiménez',
    ],
  })
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
