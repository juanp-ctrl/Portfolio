import Image from 'next/image'
import { useTranslations } from '@/context/I18nContext'

export default function Index() {
  const t = useTranslations('home')

  return (
    <div
      className="p-8 md:p-16 md:px-40 lg:px-48 
      [&_h2]:text-[3.5rem] [&_h2]:italic [&_h2]:font-libre [&_h2]:text-white-secondary [&_h2]:leading-[4.5rem]
      md:[&_h2]:text-[4.5rem]
      [&_p]:text-base [&_p]:font-josefin [&_p]:text-white-secondary
      [&_img]:shadow-[0_0_35px_white]"
    >
      <div className="pb-14 md:pb-6">
        <h2>{t('the')}</h2>
        <h2>{t('universe')}</h2>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src="/images/change.gif"
          alt="Change GIF"
          unoptimized
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-end py-14 md:py-0">
        <h2>{t('is')}</h2>
        <h2>{t('change')}</h2>
        <p>{t('quote')}</p>
      </div>
    </div>
  )
}
