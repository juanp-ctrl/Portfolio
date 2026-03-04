'use client'
import { useState, useMemo } from 'react'
import type { ClassNote } from './types'
import NotesSidebar from './NotesSidebar'
import NotesContent from './NotesContent'
import styles from './styles.module.css'

interface ClassNotesProps {
  notes: ClassNote[]
}

export default function ClassNotes({ notes }: ClassNotesProps) {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
    notes.length > 0 ? notes[0].id : null,
  )

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) || null,
    [notes, selectedNoteId],
  )

  return (
    <div className={styles.container}>
      <NotesSidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
      />
      <NotesContent note={selectedNote} />
    </div>
  )
}

export type { ClassNote, NoteBlock, CodeLanguage } from './types'
