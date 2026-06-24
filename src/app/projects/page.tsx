'use client'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import ParallaxCard from '@/components/ParallaxCard'
import useProjectsIndex from '@/hooks/useProjectsIndex'
import { useTranslations } from '@/context/I18nContext'
import { motion, Variants } from 'motion/react'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.8,
      ease: [0.45, 0, 0.55, 1],
    },
  }),
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.8, ease: [0.45, 0, 0.55, 1] },
  },
}

export default function Projects() {
  const t = useTranslations('projects')
  const projects = useProjectsIndex()

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden bg-white">
        <Header />
        <div className="bg-black-secondary min-h-screen">
          <div className="flex flex-col items-center px-6 pt-32 pb-20 md:px-12 lg:px-20">
            <motion.h1
              className="font-libre italic text-white-primary text-4xl md:text-5xl mb-12 text-center"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {t('projects')}
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 w-full max-w-[1400px]">
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ParallaxCard
                    name={project.name}
                    tagline={project.tagline}
                    url={project.url}
                    image={project.image}
                  />
                  <p className="font-josefin text-white-primary text-lg leading-relaxed mt-3 px-3 opacity-70">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </PageTransition>
  )
}
