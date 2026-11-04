import posthog from 'posthog-js'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export type ConsentStatus = 'granted' | 'denied' | 'pending'

export type AnalyticsEvent =
  'cv_downloaded' | 'cta_clicked' | 'contact_clicked' | 'language_changed'

let initialized = false

// Site-wide properties attached to every event via before_send, so they are
// present on the first pageview and in both cookieless and consented modes.
const superProperties: Record<string, string | number | boolean> = {}

/** Remove leftovers from the previous Google Analytics setup. */
function cleanupLegacyAnalytics() {
  localStorage.removeItem('cookie-consent')

  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`]
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
      })
    })
}

export function initAnalytics() {
  if (initialized || typeof window === 'undefined' || !POSTHOG_KEY) return
  initialized = true

  cleanupLegacyAnalytics()

  // Same detection as I18nContext; it may not have run yet on a first visit.
  superProperties.locale =
    localStorage.getItem('lng') ||
    (navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en')

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    ui_host: 'https://us.posthog.com',
    defaults: '2026-08-30',
    // Visitors who haven't chosen yet, or who decline, are counted anonymously
    // via a server-side hash (nothing stored on the device). Accepting
    // switches to cookie-based tracking with a person profile.
    cookieless_mode: 'on_reject',
    opt_out_capturing_by_default: true,
    // Every visitor who accepts gets an (anonymous) person profile.
    person_profiles: 'always',
    disable_session_recording: true,
    disable_surveys: true,
    enable_heatmaps: false,
    // Feature flags aren't used; avoids a /flags request before consent.
    advanced_disable_flags: true,
    before_send: (event) => {
      if (event) Object.assign(event.properties, superProperties)
      return event
    },
  })
}

export function getConsentStatus(): ConsentStatus {
  if (!initialized) return 'pending'
  return posthog.get_explicit_consent_status()
}

export function acceptAnalytics() {
  if (!initialized) return
  posthog.opt_in_capturing()
}

export function rejectAnalytics() {
  if (!initialized) return
  posthog.opt_out_capturing()
}

export function track(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>,
) {
  if (!initialized) return
  posthog.capture(event, properties)
}

export function setSuperProperties(
  properties: Record<string, string | number | boolean>,
) {
  Object.assign(superProperties, properties)
}
