'use client'
import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import styles from './styles.module.css'

interface TocHeading {
  id: string
  text: string
  depth: number
}

interface TableOfContentsProps {
  headings: TocHeading[]
  isDark?: boolean
}

export default function TableOfContents({
  headings,
  isDark,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  // Track active heading via IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0 },
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  const handleLinkClick = useCallback((id: string) => {
    setActiveId(id)
    setDrawerOpen(false)
  }, [])

  if (headings.length === 0) return null

  const tocLinks = (
    <ul className={styles.list}>
      {headings.map(({ id, text, depth }) => (
        <li key={id} className={styles.item} data-depth={depth}>
          <a
            href={`#${id}`}
            className={`${styles.link} ${activeId === id ? styles.linkActive : ''}`}
            onClick={() => handleLinkClick(id)}
          >
            <span className={styles.arrow} aria-hidden="true">
              ▸
            </span>
            {text}
          </a>
        </li>
      ))}
    </ul>
  )

  const mobileUI = mounted
    ? createPortal(
        <>
          {/* ── Mobile FAB ─────────────────────────────────────── */}
          <button
            className={`${styles.fab} ${isDark ? styles.fabDark : ''}`}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open table of contents"
            aria-expanded={drawerOpen}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <line x1="3" y1="18" x2="18" y2="18" />
            </svg>
            Contents
          </button>

          {/* ── Mobile overlay ─────────────────────────────────── */}
          {drawerOpen && (
            <div
              className={styles.overlay}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* ── Mobile drawer ──────────────────────────────────── */}
          <div
            className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''} ${isDark ? styles.drawerDark : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Table of contents"
          >
            <div className={styles.drawerTop}>
              <span className={styles.drawerTitle}>Contents</span>
              <button
                className={`${styles.drawerClose} ${isDark ? styles.drawerCloseDark : ''}`}
                onClick={() => setDrawerOpen(false)}
                aria-label="Close table of contents"
              >
                ×
              </button>
            </div>
            {tocLinks}
          </div>
        </>,
        document.body,
      )
    : null

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────────── */}
      <aside className={`${styles.sidebar} ${isDark ? styles.darkMode : ''}`}>
        <nav aria-label="Table of contents">
          <p className={styles.sidebarLabel}>file tree</p>
          {tocLinks}
        </nav>
      </aside>

      {mobileUI}
    </>
  )
}
