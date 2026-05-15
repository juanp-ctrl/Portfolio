'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'
import en from '../../messages/en.json'
import es from '../../messages/es.json'

type Locale = 'en' | 'es'
type Messages = typeof en

const messages = { en, es } as Record<Locale, Messages>

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
})

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem('lng') as Locale | null
  if (stored === 'en' || stored === 'es') return stored
  const detected: Locale = navigator.language.toLowerCase().startsWith('es')
    ? 'es'
    : 'en'
  localStorage.setItem('lng', detected)
  return detected
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem('lng', newLocale)
    setLocaleState(newLocale)
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

export function useLocale(): Locale {
  return useContext(I18nContext).locale
}

export function useTranslations(namespace: keyof Messages) {
  const { locale } = useContext(I18nContext)

  return function t(
    key: string,
    vars?: Record<string, string | number>,
  ): string {
    const ns = messages[locale][namespace] as Record<string, unknown>
    const value = key.split('.').reduce((obj: unknown, k) => {
      if (obj !== null && typeof obj === 'object')
        return (obj as Record<string, unknown>)[k]
      return undefined
    }, ns) as string | undefined

    const result = value ?? key
    if (!vars) return result
    return result.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
  }
}
