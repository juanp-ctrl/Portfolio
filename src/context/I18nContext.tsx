'use client'
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import en from '../../messages/en.json'
import es from '../../messages/es.json'

type Locale = 'en' | 'es'
type Messages = typeof en

const messages = { en, es } as Record<Locale, Messages>
const LOCALE_EVENT = 'locale-change'

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
})

function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'es'
}

function detectLocale(): Locale {
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

function readLocale(): Locale {
  const stored = localStorage.getItem('lng')
  if (isLocale(stored)) return stored
  return detectLocale()
}

function subscribeLocale(onStoreChange: () => void) {
  window.addEventListener(LOCALE_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(LOCALE_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function getServerLocale(): Locale {
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    readLocale,
    getServerLocale,
  )

  useEffect(() => {
    const clientLocale = readLocale()
    if (locale !== clientLocale) return
    if (!isLocale(localStorage.getItem('lng'))) {
      localStorage.setItem('lng', clientLocale)
    }
    document.documentElement.lang = clientLocale
    document.documentElement.dataset.locale = clientLocale
    document.documentElement.dataset.localeReady = '1'
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem('lng', newLocale)
    document.documentElement.lang = newLocale
    document.documentElement.dataset.locale = newLocale
    window.dispatchEvent(new Event(LOCALE_EVENT))
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
