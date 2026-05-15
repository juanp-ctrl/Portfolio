import React from 'react'
import styles from './styles.module.css'
import navItems from '@/constants/routes'
import { useTranslations } from '@/context/I18nContext'
import { socials } from '@/constants/socials'
import { useTransition } from '@/context/TransitionContext'

const Nav = () => {
  const t = useTranslations('common')
  const { startTransition } = useTransition()

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    e.preventDefault()
    startTransition(path)
  }

  // Mobile: Split into 3 and 3
  const mobileFirstColumn = navItems.slice(0, 3)
  const mobileSecondColumn = navItems.slice(3, 6)

  // Desktop: Split into 4 and 2
  const desktopFirstColumn = navItems.slice(0, 4)
  const desktopSecondColumn = navItems.slice(4, 6)

  return (
    <div className={`flex flex-col gap-2 w-full md:w-auto ${styles.nav}`}>
      <p className={styles.hint}>Sitemap</p>

      {/* Mobile layout: 3 and 3 in two columns */}
      <div className="flex flex-row justify-between md:hidden w-full">
        <div className="flex flex-col gap-2">
          {mobileFirstColumn.map((data, index) => (
            <p key={index}>
              <a href={data.path} onClick={(e) => handleClick(e, data.path)}>
                {t(data.title)}
              </a>
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-right">
          {mobileSecondColumn.map((data, index) => (
            <p key={index + 3}>
              <a href={data.path} onClick={(e) => handleClick(e, data.path)}>
                {t(data.title)}
              </a>
            </p>
          ))}
        </div>
      </div>

      {/* Desktop layout: 4 and 2 in two columns */}
      <div className="hidden md:flex md:flex-row md:gap-8">
        <div className="flex flex-col gap-2">
          {desktopFirstColumn.map((data, index) => (
            <p key={index}>
              <a href={data.path} onClick={(e) => handleClick(e, data.path)}>
                {t(data.title)}
              </a>
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {desktopSecondColumn.map((data, index) => (
            <p key={index + 4}>
              <a href={data.path} onClick={(e) => handleClick(e, data.path)}>
                {t(data.title)}
              </a>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

const Social = () => {
  const t = useTranslations('common')
  // Mobile: Split socials into two columns: first 2 and last 2
  const mobileFirstColumn = socials.slice(0, 2)
  const mobileSecondColumn = socials.slice(2, 4)

  return (
    <div className={`flex flex-col gap-1 w-full md:w-auto ${styles.social}`}>
      <p>{t('socials')}</p>

      {/* Mobile layout: 2 and 2 in two columns */}
      <div className="flex flex-row justify-between md:hidden w-full">
        <div className="flex flex-col gap-1">
          {mobileFirstColumn.map((data, index) => {
            return (
              <h4 key={index}>
                <a href={data.path} target="_blank" rel="noreferrer">
                  {data.title}
                </a>
              </h4>
            )
          })}
        </div>
        <div className="flex flex-col gap-1 text-right">
          {mobileSecondColumn.map((data, index) => {
            return (
              <h4 key={index + 2}>
                <a href={data.path} target="_blank" rel="noreferrer">
                  {data.title}
                </a>
              </h4>
            )
          })}
        </div>
      </div>

      {/* Desktop layout: single column */}
      <div className="hidden md:flex md:flex-col md:gap-1">
        {socials.map((data, index) => {
          return (
            <h4 key={index}>
              <a href={data.path} target="_blank" rel="noreferrer">
                {data.title}
              </a>
            </h4>
          )
        })}
      </div>
    </div>
  )
}

const Section1 = () => {
  return (
    <div className="flex flex-col gap-8">
      <svg width="100%" height="1" viewBox="0 0 10000 1" fill="none">
        <path d="M0 0 L10000 0" stroke="black" strokeWidth="50" />
      </svg>
      <div className="flex flex-col md:flex-row shrink-0 md:justify-between gap-8 md:gap-0">
        <Nav />
        <Social />
      </div>
    </div>
  )
}

const Section2 = () => {
  const t = useTranslations('common')
  return (
    <div className="flex justify-between items-end">
      <h2 className="text-black-primary text-4xl font-libre italic">
        Juan Pablo <br /> Jiménez
      </h2>
      <div className="flex flex-col gap-1">
        <p className="text-[0.9rem]">{t('version')}</p>
        <p className="text-black-secondary font-josefin text-2xl">Folio 2026</p>
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <div
      className="relative h-[520px] md:h-[450px]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed bottom-0 h-[520px] md:h-[450px] w-full">
        <div className="py-10 px-8 md:px-20 size-full flex flex-col justify-between">
          <Section1 />
          <Section2 />
        </div>
      </div>
    </div>
  )
}
