'use client'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import blogIndex from '@/constants/blogIndex'
import styles from './styles.module.css'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function Blog() {
  const t = useTranslations('blog')

  const [featured, ...rest] = blogIndex
  const recentPosts = rest.slice(0, 3)
  const allPosts = rest.slice(3)

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden bg-white">
        <Header />

        {/* ── Hero: latest post ──────────────────────────────────────── */}
        <section className={styles.hero}>
          {/* Path breadcrumb */}
          <div className={styles.heroTopRow}>
            <p className={styles.heroPath}>
              Blog / {featured.category} / Latest
            </p>
          </div>

          {/* Cover image — above title on mobile, right column on desktop */}
          <div className={styles.heroImageWrap}>
            {featured.coverImage ? (
              <Image
                src={featured.coverImage}
                alt={`Cover for ${featured.title}`}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 38vw"
                className={styles.heroImage}
              />
            ) : (
              <div className={styles.heroImagePlaceholder}>
                <svg
                  className={styles.heroImageIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span>Cover image</span>
              </div>
            )}
          </div>

          <h1 className={styles.heroTitle}>{featured.title}</h1>
          <p className={styles.heroExcerpt}>{featured.excerpt}</p>
          <div className={styles.heroMeta}>
            <span>{formatDate(featured.date)}</span>
            <span>
              {featured.readingTime} {t('min_read')}
            </span>
          </div>
          <Link href={`/blog/${featured.slug}`} className={styles.heroReadLink}>
            {t('hero_read')} →
          </Link>
        </section>

        {/* ── Content area ───────────────────────────────────────────── */}
        <div className={styles.contentArea}>
          {/* Recent posts: 3 cards */}
          <section aria-labelledby="recent-posts-heading">
            <div className={styles.sectionHeader}>
              <h2 id="recent-posts-heading" className={styles.sectionTitle}>
                {t('recent_title')}
              </h2>
              <hr className={styles.sectionRule} />
            </div>

            <div className={styles.cardGrid}>
              {recentPosts.map((post, i) => (
                <article
                  key={post.slug}
                  className={`${styles.postCard}${i === 2 ? ` ${styles.postCardTabletHidden}` : ''}`}
                >
                  <p className={styles.cardCategory}>{post.category}</p>
                  <h3>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={styles.cardTitle}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardDate}>
                      {formatDate(post.date)} · {post.readingTime}{' '}
                      {t('min_read')}
                    </span>
                    <ul className={styles.tagList} aria-label="Tags">
                      {post.tags.slice(0, 2).map((tag) => (
                        <li key={tag} className={styles.tag}>
                          #{tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* All posts: strip list */}
          {allPosts.length > 0 && (
            <section aria-labelledby="all-posts-heading">
              <div className={styles.sectionHeader}>
                <h2 id="all-posts-heading" className={styles.sectionTitle}>
                  {t('all_title')}
                </h2>
                <hr className={styles.sectionRule} />
              </div>

              <div className={styles.stripList}>
                {recentPosts[2] && (
                  <article
                    key={`tablet-${recentPosts[2].slug}`}
                    className={`${styles.stripRow} ${styles.stripRowTabletOnly}`}
                  >
                    <div className={styles.stripMeta}>
                      <span className={styles.stripCategoryLabel}>
                        {recentPosts[2].category}
                      </span>
                      <span className={styles.stripDot} aria-hidden="true" />
                      <span>{formatDate(recentPosts[2].date)}</span>
                    </div>
                    <Link
                      href={`/blog/${recentPosts[2].slug}`}
                      className={styles.stripTitle}
                    >
                      {recentPosts[2].title}
                    </Link>
                  </article>
                )}
                {allPosts.map((post) => (
                  <article key={post.slug} className={styles.stripRow}>
                    <div className={styles.stripMeta}>
                      <span className={styles.stripCategoryLabel}>
                        {post.category}
                      </span>
                      <span className={styles.stripDot} aria-hidden="true" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={styles.stripTitle}
                    >
                      {post.title}
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}
