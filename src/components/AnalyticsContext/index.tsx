'use client'
import { useEffect } from 'react'
import { useLocale } from '@/context/I18nContext'
import { setSuperProperties } from '@/lib/analytics'

/** Attaches site-wide properties (e.g. locale) to every analytics event. */
export default function AnalyticsContext() {
  const locale = useLocale()

  useEffect(() => {
    setSuperProperties({ locale })
  }, [locale])

  return null
}
