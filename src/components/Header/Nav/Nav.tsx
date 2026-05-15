'use client'
import Curve from '../Curve'
import Image from 'next/image'
import Link from '../Link/Link'
import Socials from '../Socials'
import navItems from '@/constants/routes'
import globalSVG from '../../../../public/images/global.svg'
import styles from './styles.module.css'
import { motion, Variants } from 'motion/react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from '@/context/I18nContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const menuSlide: Variants = {
  initial: { x: 'calc(100% + 100px)' },
  enter: { x: '0', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: 'calc(100% + 100px)',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
}

interface NavProps {
  closeMenu: () => void
}

export default function Nav({ closeMenu }: NavProps) {
  const t = useTranslations('common')
  const locale = useLocale()
  const pathname = usePathname()
  const [selectedIndicator, setSelectedIndicator] = useState(pathname)
  const { changeLanguage, isPending } = LanguageSwitcher({
    currentLocale: locale,
  })

  const handleChangingLng = () => {
    const newLanguage = locale === 'en' ? 'es' : 'en'
    changeLanguage(newLanguage)
  }

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div className={styles.navigation}>
          <div className={styles.header}>
            <p>{t('menu')}</p>
          </div>
          <div
            onMouseLeave={() => {
              setSelectedIndicator(pathname)
            }}
            className={styles.nav}
          >
            {navItems.map((data, index) => {
              return (
                <Link
                  key={index}
                  data={{ ...data, index }}
                  isActive={selectedIndicator == data.path}
                  setSelectedIndicator={setSelectedIndicator}
                  currentPathname={pathname}
                  closeMenu={closeMenu}
                ></Link>
              )
            })}
          </div>
        </div>
        <Socials />
        <div
          className={styles['multilanguage-button']}
          onClick={handleChangingLng}
        >
          <Image src={globalSVG} alt="Global icon" width={18} height={18} />
          <p>{isPending ? '...' : t('change_lng')}</p>
        </div>
      </div>
      <Curve />
    </motion.div>
  )
}
