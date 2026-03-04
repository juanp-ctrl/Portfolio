import { getAllNotes } from '@/lib/notes'
import ResourcesPageClient from './ResourcesPageClient'

export default async function ResourcesPage() {
  const notes = await getAllNotes()

  return <ResourcesPageClient notes={notes} />
}
