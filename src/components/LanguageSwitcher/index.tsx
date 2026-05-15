'use client'
import { useI18n } from '@/context/I18nContext'

interface LanguageSwitcherProps {
  currentLocale?: string
  onLanguageChange?: () => void
}

export default function LanguageSwitcher({
  onLanguageChange,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n()

  const changeLanguage = (newLocale: 'en' | 'es') => {
    setLocale(newLocale)
    if (onLanguageChange) {
      onLanguageChange()
    }
  }

  return {
    changeLanguage,
    isPending: false,
    currentLocale: locale,
    availableLocales: ['en', 'es'] as const,
  }
}
