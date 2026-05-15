import type { Metadata } from 'next'
import type React from 'react'
import { generatePageMetadata } from '@/lib/metadata'
import en from '../../../messages/en.json'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: en.seo.contact_title,
    description: en.contact.contact_description,
    path: '/contact',
    ogTitle: en.seo.contact_og_title,
    ogDescription: en.contact.contact_description,
    keywords: en.seo.keywords_contact.split(', '),
  })
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
