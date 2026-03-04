'use client'
import { useMemo } from 'react'
import type { ClassNote } from './types'
import styles from './styles.module.css'

interface NotesSidebarProps {
  notes: ClassNote[]
  selectedNoteId: string | null
  onSelectNote: (noteId: string) => void
}

export default function NotesSidebar({
  notes,
  selectedNoteId,
  onSelectNote,
}: NotesSidebarProps) {
  const groupedNotes = useMemo(() => {
    const groups: Record<string, ClassNote[]> = {}
    notes.forEach((note) => {
      if (!groups[note.category]) {
        groups[note.category] = []
      }
      groups[note.category].push(note)
    })
    return groups
  }, [notes])

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>Class Notes</div>
      {Object.entries(groupedNotes).map(([category, categoryNotes]) => (
        <div key={category} className={styles.categoryGroup}>
          <div className={styles.categoryTitle}>{category}</div>
          {categoryNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              className={`${styles.noteItem} ${
                selectedNoteId === note.id ? styles.noteItemActive : ''
              }`}
            >
              {note.title}
            </button>
          ))}
        </div>
      ))}
    </aside>
  )
}
