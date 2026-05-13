'use client'
import type { JSX } from 'react'
import Image from 'next/image'
import CodeBlock from '../CodeBlock'
import type { BlogBlock } from '@/lib/blog'
import styles from './styles.module.css'

interface BlogContentProps {
  blocks: BlogBlock[]
  postSlug: string
  isDark?: boolean
}

export default function BlogContent({
  blocks,
  postSlug,
  isDark,
}: BlogContentProps) {
  return (
    <div className={`${styles.content} ${isDark ? styles.darkMode : ''}`}>
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.depth ?? 2}` as keyof JSX.IntrinsicElements
            return (
              <Tag
                key={block.id}
                id={block.headingId}
                className={`${styles.heading} ${styles[`h${block.depth ?? 2}`]}`}
                dangerouslySetInnerHTML={{ __html: block.html ?? '' }}
              />
            )
          }

          case 'paragraph':
            return (
              <p
                key={block.id}
                className={styles.paragraph}
                dangerouslySetInnerHTML={{ __html: block.html ?? '' }}
              />
            )

          case 'code':
            return (
              <CodeBlock
                key={block.id}
                code={block.code ?? ''}
                language={block.language ?? 'bash'}
                isDark={isDark}
              />
            )

          case 'blockquote':
            return (
              <blockquote
                key={block.id}
                className={styles.callout}
                dangerouslySetInnerHTML={{ __html: block.html ?? '' }}
              />
            )

          case 'list':
            return (
              <div
                key={block.id}
                className={styles.list}
                dangerouslySetInnerHTML={{ __html: block.html ?? '' }}
              />
            )

          case 'table':
            return (
              <div
                key={block.id}
                className={styles.tableWrapper}
                dangerouslySetInnerHTML={{ __html: block.html ?? '' }}
              />
            )

          case 'divider':
            return <hr key={block.id} className={styles.divider} />

          case 'image':
            return (
              <figure key={block.id} className={styles.figure}>
                <Image
                  src={
                    block.src?.startsWith('/')
                      ? block.src
                      : `/images/blog/${postSlug}/${block.src}`
                  }
                  alt={block.alt ?? ''}
                  width={900}
                  height={500}
                  className={styles.figureImg}
                />
                {block.alt && (
                  <figcaption className={styles.figCaption}>
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
