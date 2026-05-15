'use client'
import Image from 'next/image'
import { motion, Variants } from 'motion/react'
import { useEffect, useState } from 'react'
import Welcome from '@/components/Welcome'
import PageTransition from '@/components/PageTransition'
import Text from '@/components/Text'
import Header from '@/components/Header/Header'
import dynamic from 'next/dynamic'
import { useTranslations } from '@/context/I18nContext'

// Dynamic imports for heavy components
const BalloonsButton = dynamic(() => import('@/components/BalloonsButton'), {
  loading: () => <div className="h-32" />,
})
const Currently = dynamic(() => import('@/components/Currently'), {
  loading: () => <div className="h-24" />,
})
const Drawing = dynamic(() => import('@/components/Drawing'), {
  loading: () => <div className="h-16" />,
})
const Conceptual = dynamic(() => import('@/components/Conceptual'), {
  loading: () => <div className="h-48" />,
})
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-32" />,
})
const DownloadButton = dynamic(() => import('@/components/DownloadButton'), {
  loading: () => <div className="h-16" />,
})

export default function Home() {
  const t = useTranslations('home')
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('pageLoaded')
  })

  useEffect(() => {
    if (!sessionStorage.getItem('pageLoaded')) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('pageLoaded', 'true')
      }, 3200)
      return () => clearTimeout(timer)
    }
  }, [])

  const anim = (variants: Variants) => ({
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
  })

  const lettersVariants: Variants = {
    initial: { pathLength: 0, opacity: 0 },
    enter: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 3, ease: [0.32, 0, 0.67, 0] },
    },
    exit: {
      opacity: 1,
    },
  }

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden bg-white">
        {isLoading && (
          <>
            {/* Mask Effect :) */}
            <motion.div className="flex justify-center items-center w-screen h-screen">
              <svg
                className="size-32"
                viewBox="0 0 200 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(30, 0)">
                  {/* Letter J */}
                  <motion.path
                    d="M40 20 L40 60 C40 70 35 75 25 75 L20 75"
                    stroke="var(--black_alternative)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    {...anim(lettersVariants)}
                  />

                  {/* Letter P */}
                  <motion.path
                    d="M80 20 L80 75 M80 20 L100 20 C110 20 120 25 120 35 C120 45 110 50 100 50 L80 50"
                    stroke="var(--black_alternative)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    {...anim(lettersVariants)}
                  />

                  {/* Horizontal line */}
                  <motion.path
                    d="M20 100 L100 100"
                    stroke="var(--black_alternative)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    {...anim(lettersVariants)}
                  />
                </g>
              </svg>
            </motion.div>
          </>
        )}

        {!isLoading && (
          <>
            <Header />
            <Welcome />
            <div className="-mt-16">
              <Text phrase={t('first_section_text_1')} />
            </div>
            <Drawing />
            <Image
              src="/images/juan_pablo_jimenez.webp"
              alt="Image of Juan Pablo Jiménez"
              priority
              width={450}
              height={788}
              className="mx-auto my-16 shadow-[0_5px_10px_black] w-[300px] md:w-[400px]"
            />
            <Text
              phrase={t('first_section_text_2')}
              customStyle="mb-24 mt-24"
            />
            <DownloadButton />
            <div className="bg-black-secondary">
              <Currently />
              <Text
                customStyle="text-white mt-32 mb-10"
                phrase={t('second_section_text_1')}
              />
              <Text
                customStyle="text-white"
                phrase={t('second_section_text_2')}
              />
              <Text
                customStyle="text-white mt-10 font-bold md:text-[2.1rem]"
                phrase={t('second_section_text_3')}
              />
              <BalloonsButton />
              <Conceptual />
            </div>
            <Footer />
          </>
        )}
      </main>
    </PageTransition>
  )
}
