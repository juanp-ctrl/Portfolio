'use client'
import { useTranslations } from '@/context/I18nContext'

export interface ProjectCard {
  name: string
  tagline: string
  description: string
  url: string
  image: string
  slug: string
}

const useProjectsIndex = (): ProjectCard[] => {
  const t = useTranslations('projects')

  return [
    {
      name: 'Random-Q',
      tagline: t('card_tagline_random_q'),
      description: t('card_desc_random_q'),
      url: 'https://random-q.com/',
      image: '/images/projects/random-q-cover.webp',
      slug: 'random-q',
    },
    {
      name: 'Turpial',
      tagline: t('card_tagline_turpial'),
      description: t('card_desc_turpial'),
      url: 'https://turpial.co/',
      image: '/images/projects/turpial-cover.webp',
      slug: 'turpial',
    },
    {
      name: 'Chacal Estudio',
      tagline: t('card_tagline_chacal'),
      description: t('card_desc_chacal'),
      url: 'https://chacalestudio.ar/',
      image: '/images/projects/chacal-estudio-cover.webp',
      slug: 'chacal-estudio',
    },
    {
      name: 'Invecar',
      tagline: t('card_tagline_invecar'),
      description: t('card_desc_invecar'),
      url: 'https://invecar.com/',
      image: '/images/projects/invecar-cover.webp',
      slug: 'invecar',
    },
    {
      name: 'Wedding AA',
      tagline: t('card_tagline_wedding_aa'),
      description: t('card_desc_wedding_aa'),
      url: 'https://wedding-aa.pages.dev/',
      image: '/images/projects/wedding-aa-cover.webp',
      slug: 'wedding-aa',
    },
    {
      name: 'Portfolio',
      tagline: t('card_tagline_portfolio'),
      description: t('card_desc_portfolio'),
      url: 'https://juanpablojimenez.dev/',
      image: '/images/projects/portfolio-cover.webp',
      slug: 'portfolio',
    },
  ]
}

export default useProjectsIndex
