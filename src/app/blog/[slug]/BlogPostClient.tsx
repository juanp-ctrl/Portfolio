'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import BlogContent from '@/components/BlogPost/BlogContent'
import TableOfContents from '@/components/BlogPost/TableOfContents'
import { useTranslations } from '@/context/I18nContext'
import type { BlogPostData } from '@/lib/blog'
import styles from './styles.module.css'

interface BlogPostClientProps {
  post: BlogPostData
  slug: string
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostClient({ post, slug }: BlogPostClientProps) {
  const t = useTranslations('blog')
  const { frontmatter, blocks, tocHeadings } = post
  const [isDark, setIsDark] = useState(false)

  const coverExists =
    frontmatter.coverImage && frontmatter.coverImage.length > 0

  return (
    <PageTransition>
      <main className={`${styles.page} ${isDark ? styles.pageDark : ''}`}>
        <Header />

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            {/* Left: text content */}
            <div className={styles.heroText}>
              <Link href="/blog" className={styles.backLink}>
                ← {t('back_to_blog')}
              </Link>
              <p className={styles.heroPath}>
                notes / {frontmatter.category.toLowerCase()} / {slug}
              </p>
              <h1 className={styles.heroTitle}>{frontmatter.title}</h1>
              <p className={styles.heroExcerpt}>{frontmatter.excerpt}</p>

              <div className={styles.heroMeta}>
                <span>{formatDate(frontmatter.date)}</span>
                <span className={styles.metaDot} aria-hidden="true" />
                <span>
                  {frontmatter.readingTime} {t('min_read')}
                </span>
              </div>

              <ul className={styles.tagList} aria-label="Tags">
                {frontmatter.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: cover image */}
            {coverExists && (
              <div className={styles.heroCover}>
                <Image
                  src={frontmatter.coverImage}
                  alt={`${t('cover_alt')} ${frontmatter.title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className={styles.heroCoverImg}
                />
              </div>
            )}
          </div>
        </section>

        {/* ── Theme toggle — floats between hero and body ─── */}
        <div className={styles.themeToggleRow}>
          <button
            className={`${styles.themeToggle} ${isDark ? styles.themeToggleActive : ''}`}
            onClick={() => setIsDark((d) => !d)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
          >
            {isDark ? (
              /* Bulb on — filled yellow */
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9 21h6v-1H9v1zm0 1.5h6v-1H9v1zM12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z" />
              </svg>
            ) : (
              /* Bulb off — outline */
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 21h6M9 22.5h6M15 14.74V17a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.26A7 7 0 1 1 15 14.74z" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Body: article + sidebar ───────────────────────── */}
        <div
          className={`${styles.bodyWrapper} ${isDark ? styles.bodyWrapperDark : ''}`}
        >
          <div className={styles.bodyInner}>
            <article className={styles.article}>
              <BlogContent blocks={blocks} postSlug={slug} isDark={isDark} />
            </article>

            <aside className={styles.tocWrapper}>
              <TableOfContents headings={tocHeadings} isDark={isDark} />
            </aside>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}
