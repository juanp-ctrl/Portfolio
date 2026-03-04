'use client'
import type { ClassNote } from './types'
import CodeBlock from './CodeBlock'
import styles from './styles.module.css'

interface NotesContentProps {
  note: ClassNote | null
}

export default function NotesContent({ note }: NotesContentProps) {
  if (!note) {
    return (
      <div className={styles.content}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <p className={styles.emptyText}>
            Select a note from the sidebar to view its content
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.content}>
      <div className={styles.breadcrumb}>
        Class Notes
        <span className={styles.breadcrumbSeparator}>/</span>
        {note.category}
      </div>
      <h2 className={styles.noteTitle}>{note.title}</h2>
      <div className={styles.noteBlocks}>
        {note.blocks.map((block) => {
          if (block.type === 'text') {
            return (
              <p
                key={block.id}
                className={styles.textBlock}
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            )
          }
          if (block.type === 'code' && block.language) {
            return (
              <CodeBlock
                key={block.id}
                code={block.content}
                language={block.language}
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
