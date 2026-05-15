'use client'
import type React from 'react'
import Nav from './Nav/Nav'
import styles from './styles.module.css'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from '@/context/I18nContext'
import useMedia from '@/hooks/useMedia'
import { useTransition } from '@/context/TransitionContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { gsap } from 'gsap'

interface HeaderProps {
  variant?: 'light' | 'dark'
}

export default function Header({ variant = 'light' }: HeaderProps) {
  const t = useTranslations('common')
  const locale = useLocale()
  const pathname = usePathname()
  const [isMenuActive, setIsMenuActive] = useState(false)
  const menuButton = useRef(null)
  const { isMobile } = useMedia()
  const { locomotiveScroll } = useTransition()
  const { startTransition } = useTransition()
  const { changeLanguage, isPending } = LanguageSwitcher({
    currentLocale: locale,
  })

  const handleChangingLng = () => {
    const newLanguage = locale === 'en' ? 'es' : 'en'
    changeLanguage(newLanguage)
  }

  useEffect(() => {
    if (isMenuActive) {
      // Stop Locomotive Scroll
      if (locomotiveScroll.current) {
        locomotiveScroll.current.stop()
      }
      document.body.style.overflow = 'hidden'
    } else {
      // Start Locomotive Scroll
      if (locomotiveScroll.current) {
        locomotiveScroll.current.start()
      }
      document.body.style.overflow = 'auto'
    }
  }, [isMenuActive, locomotiveScroll])

  // Setup ScrollTrigger for hamburger button visibility
  useLayoutEffect(() => {
    import('gsap/ScrollTrigger').then((module) => {
      const ScrollTrigger = module.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // Create ScrollTrigger instance
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: () => window.innerHeight - 100,
        onLeave: () => {
          // Show button when scrolling past threshold
          if (!isMenuActive) {
            gsap.to(menuButton.current, {
              scale: 1,
              duration: 0.25,
              ease: 'power1.out',
            })
          }
        },
        onEnterBack: () => {
          // Hide button when scrolling back to top
          if (!isMenuActive) {
            gsap.to(menuButton.current, {
              scale: 0,
              duration: 0.25,
              ease: 'power1.out',
            })
          }
          setIsMenuActive(false)
        },
      })
    })
  }, [isMenuActive])

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname !== '/') {
      startTransition('/')
    }
  }

  const handleMenuClick = () => {
    const newIsActive = !isMenuActive
    gsap.to(menuButton.current, {
      scale: newIsActive ? 1 : 0,
      duration: 0.25,
      delay: 0.5,
      ease: 'power1.out',
    })
    setIsMenuActive(newIsActive)
  }

  const handleBurgerClick = () => {
    const newIsActive = !isMenuActive
    const scrollY = window.scrollY || document.documentElement.scrollTop
    gsap.to(menuButton.current, {
      scale: newIsActive ? 1 : scrollY < window.innerHeight - 100 ? 0 : 1,
      duration: 0.25,
      delay: 0.1,
      ease: 'power1.out',
    })
    setIsMenuActive(newIsActive)
  }

  const handleCloseMenu = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop
    // Hide button if at top, show if scrolled down
    gsap.to(menuButton.current, {
      scale: scrollY < window.innerHeight - 100 ? 0 : 1,
      duration: 0.25,
      ease: 'power1.out',
    })
    setIsMenuActive(false)
  }

  return (
    <div
      className={`flex justify-between items-center px-10 py-6 ${styles.header} ${
        variant === 'dark' ? styles.dark : ''
      }`}
    >
      <Link href="/" onClick={handleLogoClick} className={styles.logo}>
        JP
      </Link>
      <div className="flex gap-8">
        <Popover>
          <PopoverTrigger>
            <div className="flex gap-2">
              {!isMobile && (
                <p className="text-base font-libre italic">{t('lng')}</p>
              )}
              <Image
                src="/images/globe.svg"
                alt="Globe"
                width={10}
                height={10}
                className={`w-[22px] h-[28px] md:h-[22px] ${isMobile ? 'border-b-2 border-white' : 'pt-px'}`}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className={`${
              variant === 'dark' ? 'bg-[#000000aa]' : 'bg-[#ffffff3d]'
            } text-center w-30 p-3 mt-2`}
          >
            <p
              className="text-white font-libre cursor-pointer text-base"
              onClick={handleChangingLng}
            >
              {isPending ? '...' : t('change_lng')}
            </p>
          </PopoverContent>
        </Popover>
        <p
          className="italic text-base border-b-2 border-white_alternative font-libre cursor-pointer"
          onClick={handleMenuClick}
        >
          {t('menu')}
        </p>
      </div>
      <div ref={menuButton} className={styles['header-menu']}>
        <div
          onClick={handleBurgerClick}
          className={`${styles.button} ${isMenuActive ? styles.active : ''}`}
        >
          <div
            className={`${styles.burger} ${
              isMenuActive ? styles.burgerActive : ''
            }`}
          >
            <div></div>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isMenuActive && <Nav closeMenu={handleCloseMenu} />}
      </AnimatePresence>
    </div>
  )
}
