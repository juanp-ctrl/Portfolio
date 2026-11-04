import type { Metadata } from 'next'
import type React from 'react'
import { generatePageMetadata } from '@/lib/metadata'
import en from '../../../messages/en.json'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: en.seo.privacy_title,
    description: en.seo.privacy_description,
    path: '/privacy',
  })
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
