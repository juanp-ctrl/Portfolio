'use client'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import { openCookiePreferences } from '@/components/CookieConsent'
import { useLocale } from '@/context/I18nContext'
import { privacyContent, PRIVACY_LAST_UPDATED } from '@/constants/privacy'

export default function Privacy() {
  const locale = useLocale()
  const c = privacyContent[locale]
  const lastUpdated = new Date(PRIVACY_LAST_UPDATED).toLocaleDateString(
    locale,
    { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
  )

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden bg-white">
        <Header />
        <section className="bg-black-secondary text-white-primary px-6 md:px-8 pt-36 pb-16 rounded-b-[2.5rem]">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-libre italic mb-4">
              {c.title}
            </h1>
            <p className="font-josefin text-sm text-white-primary/60">
              {c.lastUpdated}: {lastUpdated}
            </p>
          </div>
        </section>
        <article className="min-h-screen px-6 md:px-8 pt-16 pb-24 text-black-primary">
          <div className="max-w-3xl mx-auto">
            <p className="font-josefin text-lg leading-relaxed mb-12">
              {c.intro}
            </p>

            {c.sections.map((section) => (
              <section key={section.title} className="mb-10">
                <h2 className="text-2xl font-libre italic mb-3">
                  {section.title}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p
                    key={p}
                    className="font-josefin text-lg leading-relaxed mb-3"
                  >
                    {p}
                  </p>
                ))}
                {section.items && (
                  <ul className="list-disc pl-6 space-y-2 font-josefin text-lg leading-relaxed">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="mb-10">
              <h2 className="text-2xl font-libre italic mb-4">
                {c.storageTitle}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-josefin text-base border-collapse">
                  <thead>
                    <tr className="border-b border-black-primary">
                      {c.storageHeaders.map((h) => (
                        <th key={h} className="py-2 pr-4 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.storage.map((row) => (
                      <tr
                        key={row.name}
                        className="border-b border-black-primary/20 align-top"
                      >
                        <td className="py-3 pr-4 font-mono text-sm break-all">
                          {row.name}
                        </td>
                        <td className="py-3 pr-4">{row.type}</td>
                        <td className="py-3 pr-4">{row.purpose}</td>
                        <td className="py-3 pr-4 whitespace-nowrap">
                          {row.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-black-secondary text-white-primary rounded-lg p-8">
              <h2 className="text-2xl font-libre italic mb-3">
                {c.manageTitle}
              </h2>
              <p className="font-josefin text-lg mb-6">{c.manageText}</p>
              <button
                onClick={openCookiePreferences}
                className="px-6 py-2 bg-yellow-primary text-black-primary rounded hover:opacity-90 font-josefin transition-opacity"
              >
                {c.manageButton}
              </button>
            </section>
          </div>
        </article>
        <Footer />
      </main>
    </PageTransition>
  )
}
