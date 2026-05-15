'use client'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import { motion, Variants } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '@/context/I18nContext'
import Text from '@/components/Text'

export default function NotFoundClient() {
  const t = useTranslations('404')

  const anim = (variants: Variants) => ({
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
  })

  const errorVariants: Variants = {
    initial: {
      y: 200,
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1.2,
        type: 'spring',
        ease: [0.45, 0, 0.55, 1],
      },
    },
  }

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden min-h-screen bg-black-secondary text-white">
        <Header />
        <motion.div
          className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-black-secondary text-white"
          {...anim(errorVariants)}
        >
          <div className="max-w-2xl mx-auto">
            <Image
              src="/images/free_astronaut.webp"
              alt="Lost astronaut"
              width={300}
              height={300}
              className="mx-auto mb-8 opacity-70"
              priority
            />

            <h1 className="text-6xl md:text-8xl font-libre italic mb-6">404</h1>

            <h2 className="text-2xl md:text-3xl font-libre mb-6">
              {t('404_title')}
            </h2>

            <Text phrase={t('404_description')} customStyle="mb-8 md:text-lg" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="bg-yellow-primary text-black px-6 py-3 rounded-full font-josefin font-semibold hover:bg-yellow-600 transition-colors duration-300"
              >
                {t('404_button_1')}
              </Link>

              <Link
                href="/projects"
                className="border border-white text-white px-6 py-3 rounded-full font-josefin font-semibold hover:bg-white hover:text-black transition-colors duration-300"
              >
                {t('404_button_2')}
              </Link>
            </div>

            <div className="my-12">
              <p className="text-sm opacity-70">
                {t('404_contact_me_text_1')}{' '}
                <a
                  href="mailto:juanpablojimenez.dev@gmail.com"
                  className="text-yellow-primary hover:underline"
                >
                  {t('404_contact_me')}
                </a>{' '}
                {t('404_contact_me_text_2')}
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </PageTransition>
  )
}
