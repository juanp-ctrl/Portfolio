import type { Metadata } from 'next'
import type React from 'react'
import { generatePageMetadata } from '@/lib/metadata'
import en from '../../../messages/en.json'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: en.seo.fullstack_course_title,
    description: en.seo.fullstack_course_description,
    path: '/fullstack-course',
    ogTitle: en.seo.fullstack_course_title,
    keywords: [
      'fullstack course',
      'web development course',
      'git tutorial',
      'github tutorial',
      'open source contribution',
      'learn to code',
      'react course',
      'nextjs course',
      'typescript course',
    ],
  })
}

export default function FullstackCourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
