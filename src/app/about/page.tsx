'use client'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import TrailImages from '@/components/TrailImages'
import Image from 'next/image'
import { MotionConfig, motion, type Variants } from 'motion/react'
import { useLocale, useTranslations } from '@/context/I18nContext'
import {
  CONTACT_EMAIL,
  CV_PATH,
  CWES_CREDLY_URL,
  CWES_POST_SLUG,
  HTB_PROFILE_URL,
  MENTOR_CREDENTIAL_URL,
  cloudSkills,
  courses,
  engineeringSkills,
  experience,
  offensiveTools,
} from '@/constants/about'
import styles from './styles.module.css'

const heroVariants: Variants = {
  initial: { y: 40, opacity: 0 },
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.6 + i * 0.12, duration: 0.8, ease: 'easeOut' },
  }),
}

const reveal = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
} as const

function SectionTitle({
  id,
  title,
  n,
}: {
  id: string
  title: string
  n: string
}) {
  return (
    <h2 id={id} className={styles.sectionTitle}>
      {title} <small>{n}</small>
    </h2>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className={styles.chips}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function About() {
  const t = useTranslations('about')
  const locale = useLocale()
  const postHref =
    locale === 'es' ? `/blog/es/${CWES_POST_SLUG}` : `/blog/${CWES_POST_SLUG}`
  const offensiveSkills = [
    ...t('skills_offensive_concepts').split('|'),
    ...offensiveTools,
  ]

  return (
    <PageTransition>
      <MotionConfig reducedMotion="user">
        <main className="relative w-full overflow-hidden bg-white">
          <Header />

          {/* ── Hero ─────────────────────────────────────── */}
          <header className={styles.hero}>
            <TrailImages className="inset-0 h-full" />
            <div className={`${styles.wrap} ${styles.heroGrid}`}>
              <div>
                <motion.p
                  className={styles.prompt}
                  custom={0}
                  variants={heroVariants}
                  initial="initial"
                  animate="enter"
                >
                  <b>iparzi@medellin</b>:~$ whoami
                  <span className={styles.cursor} aria-hidden="true" />
                </motion.p>
                <motion.h1
                  className={styles.heroTitle}
                  custom={1}
                  variants={heroVariants}
                  initial="initial"
                  animate="enter"
                >
                  Juan Pablo
                  <br />
                  <span>Jiménez</span>
                </motion.h1>
                <motion.p
                  className={styles.role}
                  custom={2}
                  variants={heroVariants}
                  initial="initial"
                  animate="enter"
                >
                  <strong>{t('role')}</strong> {t('tagline')}
                </motion.p>
                <motion.div
                  className={styles.heroCtas}
                  custom={3}
                  variants={heroVariants}
                  initial="initial"
                  animate="enter"
                >
                  <a
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    href={`mailto:${CONTACT_EMAIL}`}
                  >
                    {t('cta_contact')}
                  </a>
                  <a className={styles.btn} href={CV_PATH} download>
                    {t('cta_cv')}
                  </a>
                  <a
                    className={styles.btn}
                    href={HTB_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('cta_htb')}
                  </a>
                </motion.div>
              </div>
              <motion.div
                className={styles.heroPhotoWrap}
                custom={2}
                variants={heroVariants}
                initial="initial"
                animate="enter"
              >
                <Image
                  src="/images/about_profile_juan_pablo_jimenez.webp"
                  alt={t('photo_alt')}
                  width={600}
                  height={600}
                  priority
                  sizes="(max-width: 900px) 240px, 300px"
                  className={styles.heroPhoto}
                />
              </motion.div>
            </div>
          </header>

          <div className={`${styles.wrap} ${styles.content}`}>
            {/* ── Intro ─────────────────────────────────── */}
            <motion.section aria-label={t('intro_aria')} {...reveal}>
              <div className={styles.intro}>
                <p className={styles.lead}>
                  {t('lead_start')} <em>{t('lead_em')}</em>
                  {t('lead_end')}
                </p>
                <div>
                  <p className={styles.prose}>{t('intro_p1')}</p>
                  <p className={styles.prose}>{t('intro_p2')}</p>
                </div>
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <strong>4+</strong>
                  <span>{t('stat_years')}</span>
                </div>
                <div className={styles.stat}>
                  <strong>100/100</strong>
                  <span>{t('stat_cwes')}</span>
                </div>
                <div className={styles.stat}>
                  <strong>4.5</strong>
                  <span>{t('stat_gpa')}</span>
                </div>
              </div>
            </motion.section>

            {/* ── 01 What I do ──────────────────────────── */}
            <motion.section aria-labelledby="what" {...reveal}>
              <SectionTitle id="what" title={t('what_title')} n="01" />
              <div className={styles.twoCol}>
                <article className={styles.card}>
                  <h3>{t('build_title')}</h3>
                  <p>{t('build_text')}</p>
                </article>
                <article className={`${styles.card} ${styles.cardDark}`}>
                  <h3>{t('break_title')}</h3>
                  <p>{t('break_text')}</p>
                </article>
              </div>
            </motion.section>

            {/* ── 02 Certifications ─────────────────────── */}
            <motion.section aria-labelledby="certs" {...reveal}>
              <SectionTitle id="certs" title={t('certs_title')} n="02" />
              <article className={styles.certFeature}>
                <Image
                  src="/images/blog/htb-cwes-certification/cover.webp"
                  alt={t('cwes_alt')}
                  width={1200}
                  height={843}
                  sizes="(max-width: 820px) 100vw, 560px"
                />
                <div>
                  <span className={styles.badge}>{t('cwes_badge')}</span>
                  <h3>{t('cwes_title')}</h3>
                  <p>{t('cwes_text')}</p>
                  <p className={styles.score}>
                    100<small>{t('cwes_points')}</small>
                  </p>
                  <div className={styles.certLinks}>
                    <a
                      href={CWES_CREDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('cwes_verify')}
                    </a>
                    <a href={postHref}>{t('cwes_story')}</a>
                  </div>
                </div>
              </article>
              <div className={styles.certRow}>
                <article className={styles.card}>
                  <span className={styles.badge}>{t('cc_badge')}</span>
                  <h3 className={styles.ccTitle}>{t('cc_title')}</h3>
                  <p>{t('cc_text')}</p>
                </article>
                <article className={styles.card}>
                  <p className={styles.label}>{t('courses_label')}</p>
                  <ul className={styles.courses}>
                    {courses.map((course) => (
                      <li key={course.url}>
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {course.name} <span aria-hidden="true">↗</span>
                        </a>
                        <span className={styles.issuer}>{course.issuer}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </motion.section>

            {/* ── 03 Skills ─────────────────────────────── */}
            <motion.section aria-labelledby="skills" {...reveal}>
              <SectionTitle id="skills" title={t('skills_title')} n="03" />
              <div className={styles.skills}>
                <article
                  className={`${styles.card} ${styles.cardDark} ${styles.wide}`}
                >
                  <p className={styles.label}>{t('skills_offensive')}</p>
                  <Chips items={offensiveSkills} />
                </article>
                <article className={styles.card}>
                  <p className={styles.label}>{t('skills_engineering')}</p>
                  <Chips items={engineeringSkills} />
                </article>
                <article className={styles.card}>
                  <p className={styles.label}>{t('skills_cloud')}</p>
                  <Chips items={cloudSkills} />
                </article>
              </div>
            </motion.section>

            {/* ── 04 Experience ─────────────────────────── */}
            <motion.section aria-labelledby="exp" {...reveal}>
              <SectionTitle id="exp" title={t('experience_title')} n="04" />
              <ol className={styles.timeline}>
                {experience.map(({ id, current }) => (
                  <li key={id} className={current ? styles.now : undefined}>
                    <div className={styles.tlHead}>
                      <h3>
                        {t(`experience.${id}.company`)}{' '}
                        <span>· {t(`experience.${id}.role`)}</span>
                      </h3>
                      <time>{t(`experience.${id}.dates`)}</time>
                    </div>
                    <p>{t(`experience.${id}.text`)}</p>
                  </li>
                ))}
              </ol>
            </motion.section>

            {/* ── 05 Beyond code ────────────────────────── */}
            <motion.section aria-labelledby="beyond" {...reveal}>
              <SectionTitle id="beyond" title={t('beyond_title')} n="05" />
              <div className={styles.twoCol}>
                <a
                  className={`${styles.card} ${styles.cardLink}`}
                  href={MENTOR_CREDENTIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className={styles.label}>{t('mentor_label')}</p>
                  <h3>{t('mentor_title')}</h3>
                  <p>{t('mentor_text')}</p>
                  <span className={styles.cardCta}>{t('mentor_cta')}</span>
                </a>
                <article className={styles.card}>
                  <p className={styles.label}>{t('founder_label')}</p>
                  <h3>{t('founder_title')}</h3>
                  <p>{t('founder_text')}</p>
                </article>
              </div>
            </motion.section>

            {/* ── Motto (35%) + Contact (65%) ───────────── */}
            <motion.div className={styles.closing} {...reveal}>
              <figure className={styles.motto}>
                <blockquote>“{t('motto')}”</blockquote>
              </figure>
              <section className={styles.contact} aria-labelledby="contact">
                <h2 id="contact" className={styles.sectionTitle}>
                  {t('contact_title')}
                </h2>
                <p>{t('contact_text')}</p>
                <div className={styles.contactBtns}>
                  <a
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    href={`mailto:${CONTACT_EMAIL}`}
                  >
                    {t('contact_cta')}
                  </a>
                  <a className={styles.btn} href={CV_PATH} download>
                    {t('cta_cv')}
                  </a>
                </div>
              </section>
            </motion.div>
          </div>
          <Footer />
        </main>
      </MotionConfig>
    </PageTransition>
  )
}
