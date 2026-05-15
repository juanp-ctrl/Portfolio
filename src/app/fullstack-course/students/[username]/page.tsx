import { allStudents } from '@/constants/students'
import StudentProfileClient from './StudentProfileClient'

export function generateStaticParams() {
  return allStudents.map((s) => ({ username: s.username }))
}

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  return <StudentProfileClient username={username} />
}
