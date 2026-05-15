import { useTranslations } from '@/context/I18nContext'
import { socials } from '@/constants/socials'

export default function Index() {
  const t = useTranslations('common')
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="border-t border-black-secondary">
        <p className="font-josefin text-base leading-8 mt-2">{t('socials')}</p>
      </div>
      <div className="flex justify-between">
        {socials.map((data, index) => {
          return (
            <a
              key={index}
              href={data.path}
              target="_blank"
              rel="noreferrer"
              className="no-underline text-black-secondary text-base font-semibold"
            >
              {data.title}
            </a>
          )
        })}
      </div>
    </div>
  )
}
