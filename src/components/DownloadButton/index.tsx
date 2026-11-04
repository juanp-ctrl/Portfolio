'use client'
import Image from 'next/image'
import { useTranslations, useLocale } from '@/context/I18nContext'
import { track } from '@/lib/analytics'

interface DownloadButtonProps {
  className?: string
}

export default function DownloadButton({
  className = '',
}: DownloadButtonProps) {
  const t = useTranslations('home')
  const locale = useLocale()

  const handleDownloadCV = () => {
    const cvFileName = 'CV Juan Pablo Jiménez Heredia.pdf'

    window.open(`/cv/${encodeURIComponent(cvFileName)}`, '_blank')

    track('cv_downloaded', { cv_locale: locale, source: 'home' })
  }

  return (
    <div
      className={`bg-black-secondary py-3 px-5 rounded-lg w-fit mx-auto mb-28 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
      <p
        onClick={handleDownloadCV}
        className="font-libre text-3xl text-white-primary italic cursor-pointer flex items-center gap-4 transition-opacity duration-300 ease-in-out hover:opacity-80 group"
      >
        {t('download_cv')}
        <Image
          src="/images/FileIcon.svg"
          alt="Download CV Icon"
          width={30}
          height={30}
          className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
        />
      </p>
    </div>
  )
}
