import type { Metadata } from 'next'
import type React from 'react'
import { generatePageMetadata } from '@/lib/metadata'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Juan Pablo Jiménez | Fullstack Course',
    description:
      'Software Engineer and Frontend Developer from Medellín, Colombia. Passionate about teaching web development and open-source contribution.',
    path: '/fullstack-course/students/juan-pablo-jimenez',
    ogTitle: 'Juan Pablo Jiménez | Fullstack Course',
    keywords: [
      'Juan Pablo Jiménez',
      'fullstack course',
      'professor',
      'React',
      'Next.js',
      'TypeScript',
      'web development',
    ],
  })
}

export default function JuanPabloProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
