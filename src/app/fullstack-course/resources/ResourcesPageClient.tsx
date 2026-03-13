'use client'
import { useTranslations } from 'next-intl'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { motion } from 'motion/react'
import FolderUI from '@/components/FolderUI'
import ClassNotes from '@/components/ClassNotes'
import { useTransition } from '@/context/TransitionContext'
import type { ClassNote } from '@/components/ClassNotes/types'

const resources = [
  {
    fileName: '1 Desarrollo Web Fullstack',
    filePath: '/fullstack-course/resources/1. Desarrollo-Web-Fullstack.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf' as const,
  },
  {
    fileName: '2 Git History and Essentials',
    filePath: '/fullstack-course/resources/2. Git_History_Essentials.pdf',
    fileSize: '2.9 MB',
    fileType: 'pdf' as const,
  },
  {
    fileName: '3. Terminal Unix Linux',
    filePath: '/fullstack-course/resources/3. Terminal-Unix-Linux.pdf',
    fileSize: '1.8 MB',
    fileType: 'pdf' as const,
  },
  {
    fileName: '4 Fundamentos de HTML y Entrega',
    filePath:
      '/fullstack-course/resources/Fundamentos-de-HTML-y-Primera-Entrega.pdf',
    fileSize: '0.4 MB',
    fileType: 'pdf' as const,
  },
  {
    fileName: 'Guia TypeScript y Componentes',
    filePath: '/fullstack-course/resources/Guia_Typescript_Componentes.pdf',
    fileSize: '0.4 MB',
    fileType: 'pdf' as const,
  },
]

interface ResourcesPageClientProps {
  notes: ClassNote[]
}

export default function ResourcesPageClient({
  notes,
}: ResourcesPageClientProps) {
  const t = useTranslations('fullstack_course')
  const { startTransition } = useTransition()

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    startTransition('/fullstack-course')
  }

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden bg-white">
        <Header variant="dark" />

        {/* Header Section */}
        <section className="px-6 md:px-20 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/fullstack-course"
              onClick={handleNavigation}
              className="inline-flex items-center gap-2 font-josefin text-base text-black-primary/70 hover:text-yellow-primary transition-colors mb-6"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t('back_to_course')}
            </Link>

            <h1 className="font-libre italic text-4xl md:text-6xl text-black-primary my-4">
              {t('class_notes_title')}
            </h1>
          </motion.div>
        </section>

        {/* Class Notes Section */}
        <section className="px-6 md:px-20 py-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="font-josefin text-base md:text-lg text-black-primary/70 max-w-3xl mb-8">
              {t('class_notes_description')}
            </p>
            <ClassNotes notes={notes} />
          </motion.div>
        </section>

        {/* Resources Grid - Mac Finder Style */}
        <section className="px-6 md:px-20 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-libre italic text-3xl md:text-4xl text-black-primary mb-4">
              {t('resources_title')}
            </h2>
            <p className="font-josefin text-base md:text-lg text-black-primary/70 max-w-3xl">
              {t('resources_description')}
            </p>
            {resources.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-josefin text-lg text-black-primary/60 italic">
                  No resources available yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 mt-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.fileName}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <FolderUI
                      fileName={resource.fileName}
                      filePath={resource.filePath}
                      fileSize={resource.fileSize}
                      fileType={resource.fileType}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}
