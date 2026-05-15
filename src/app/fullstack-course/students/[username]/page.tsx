import { allStudents } from '@/constants/students'
import StudentProfileClient from './StudentProfileClient'
import type { Metadata } from 'next'

const BASE_URL = 'https://www.juanpablojimenez.dev'

export function generateStaticParams() {
  return allStudents.map((s) => ({ username: s.username }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>
}): Promise<Metadata> {
  const { username } = await params
  const student = allStudents.find((s) => s.username === username)

  if (!student) return { title: 'Student Not Found' }

  const canonicalUrl = `${BASE_URL}/fullstack-course/students/${username}`

  return {
    title: `${student.name} | Fullstack Course | Juan Pablo Jiménez`,
    description: student.bio,
    keywords: ['fullstack course', 'student profile', ...student.interests],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${student.name} | Fullstack Course`,
      description: student.bio,
      url: canonicalUrl,
      siteName: 'Juan Pablo Jiménez Portfolio',
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: `${student.name} | Fullstack Course`,
      description: student.bio,
      creator: '@JuanPabloJim_',
    },
  }
}

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  return <StudentProfileClient username={username} />
}
