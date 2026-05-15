import type { MetadataRoute } from 'next'
import { getPostSlugs } from '@/lib/blog'
import { allStudents } from '@/constants/students'

export const dynamic = 'force-static'

const BASE_URL = 'https://www.juanpablojimenez.dev'

function hreflang(url: string) {
  return {
    languages: {
      en: url,
      es: url,
      'x-default': url,
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts: MetadataRoute.Sitemap = getPostSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: hreflang(`${BASE_URL}/blog/${slug}`),
  }))

  const studentProfiles: MetadataRoute.Sitemap = allStudents.map((s) => ({
    url: `${BASE_URL}/fullstack-course/students/${s.username}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: hreflang(`${BASE_URL}/fullstack-course/students/${s.username}`),
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: hreflang(`${BASE_URL}/`),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: hreflang(`${BASE_URL}/about`),
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: hreflang(`${BASE_URL}/projects`),
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date('2025-11-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: hreflang(`${BASE_URL}/contact`),
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: hreflang(`${BASE_URL}/blog`),
    },
    {
      url: `${BASE_URL}/fullstack-course`,
      lastModified: new Date('2025-11-14'),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: hreflang(`${BASE_URL}/fullstack-course`),
    },
    {
      url: `${BASE_URL}/fullstack-course/resources`,
      lastModified: new Date('2025-11-14'),
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: hreflang(`${BASE_URL}/fullstack-course/resources`),
    },
  ]

  return [...staticRoutes, ...blogPosts, ...studentProfiles]
}
