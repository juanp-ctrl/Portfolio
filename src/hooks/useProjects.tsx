import { useTranslations } from '@/context/I18nContext'

interface Friend {
  name: string
  linkedin: string
  role: string
}

export interface Project {
  name: string
  images: string[]
  description: string[]
  impact: string
  techHighlights: string[]
  techStack: string[]
  url: string
  collaborators?: Friend[]
}

const useProjects = () => {
  const t = useTranslations('projects')

  const projects: Project[] = [
    {
      name: t('name_rq'),
      images: [
        '/images/randomq-mockup-iphone5.webp',
        '/images/randomq-mockup-iphone2.webp',
        '/images/randomq-mockup-iphone.webp',
      ],
      description: [
        t('description_rq_1'),
        t('description_rq_2'),
        t('description_rq_3'),
      ],
      impact: t('impact_rq'),
      techHighlights: [
        t('tech_highlight_rq_1'),
        t('tech_highlight_rq_2'),
        t('tech_highlight_rq_3'),
        t('tech_highlight_rq_4'),
      ],
      techStack: [
        'NextJS',
        'TypeScript',
        'Firebase Firestore',
        'Firebase App Hosting',
        'CI/CD via GitHub',
      ],
      url: 'https://random-q.com/',
      collaborators: [
        {
          name: 'Natalia Suárez V.',
          linkedin: 'https://www.linkedin.com/in/nataliasuarezve/',
          role: 'Business, Service and UX Designer',
        },
        {
          name: 'Samir Eduardo Colpas',
          linkedin: 'https://www.linkedin.com/in/samir-colpas/',
          role: 'DevOps Engineer',
        },
      ],
    },
    {
      name: t('name_soon'),
      images: ['/images/trail/IMG_8.webp'],
      description: ['We will explore'],
      impact: t('impact_rq'),
      techHighlights: [t('tech_highlight_rq_1')],
      techStack: ['NextJS', 'TypeScript', '.....?'],
      url: 'https://www.juanpablojimenez.dev/',
    },
  ]

  return projects
}

export default useProjects
