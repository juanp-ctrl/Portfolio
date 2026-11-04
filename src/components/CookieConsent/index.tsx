'use client'
import { useState, useEffect } from 'react'
import { motion, Variants } from 'motion/react'
import { useTranslations } from '@/context/I18nContext'
import {
  acceptAnalytics,
  getConsentStatus,
  rejectAnalytics,
} from '@/lib/analytics'

export const OPEN_COOKIE_PREFERENCES_EVENT = 'open-cookie-preferences'

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))
}

const cookieConsentVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      type: 'spring',
      ease: [0.45, 0, 0.55, 1],
    },
  },
}

const CookieConsent = () => {
  const t = useTranslations('common')
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const open = () => setVisible(true)
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, open)

    let timer: ReturnType<typeof setTimeout> | undefined
    if (getConsentStatus() === 'pending') {
      // Show the banner after the intro animation
      timer = setTimeout(open, 3200)
    }

    return () => {
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, open)
      clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    acceptAnalytics()
    setVisible(false)
  }

  const handleReject = () => {
    rejectAnalytics()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <motion.div
      role="dialog"
      aria-live="polite"
      aria-label={t('cookies.title')}
      className="fixed inset-x-0 bottom-4 md:bottom-6 mx-auto w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-white-primary/10 bg-black-secondary/95 text-white-primary px-5 py-4 shadow-2xl backdrop-blur z-50"
      initial="hidden"
      animate="visible"
      variants={cookieConsentVariants}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-libre italic text-base text-center md:text-left">
          {t('cookies.message')}{' '}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:opacity-80"
          >
            {t('cookies.learn_more')}
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-yellow-primary text-black-primary rounded hover:opacity-90 font-josefin transition-opacity"
          >
            {t('cookies.accept')}
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-[#3a3a3a] text-white-primary rounded hover:opacity-90 font-josefin transition-opacity"
          >
            {t('cookies.reject')}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default CookieConsent
