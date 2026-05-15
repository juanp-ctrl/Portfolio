import type { Metadata } from 'next'
import NotFoundClient from '@/components/NotFoundClient'
import en from '../../messages/en.json'

export function generateMetadata(): Metadata {
  return {
    title: en['404'].seo_title,
    description: en['404'].seo_description,
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: en['404'].seo_title,
      description: en['404'].seo_description,
      url: 'https://www.juanpablojimenez.dev/404',
    },
    twitter: {
      title: en['404'].seo_title,
      description: en['404'].seo_description,
    },
  }
}

export default function NotFound() {
  return <NotFoundClient />
}
