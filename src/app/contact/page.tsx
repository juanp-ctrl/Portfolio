'use client'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Text from '@/components/Text'
import Footer from '@/components/Footer'
import { motion, Variants } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from '@/context/I18nContext'

export default function Contact() {
  const t = useTranslations('contact')
  const anim = (variants: Variants) => ({
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
  })

  const contactVariants: Variants = {
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

  const socials = [
    {
      title: 'Email',
      value: 'juanpablojimenez.dev@gmail.com',
      href: 'mailto:juanpablojimenez.dev@gmail.com',
      description: t('lets_discuss_your_next_project'),
    },
    {
      title: 'LinkedIn',
      value: '/in/juan-pablo-jimenez-h/',
      href: 'https://www.linkedin.com/in/juan-pablo-jimenez-h/',
      description: t('professional_network'),
    },
    {
      title: 'GitHub',
      value: '@juanp-ctrl',
      href: 'https://github.com/juanp-ctrl',
      description: t('check_out_my_code'),
    },
    {
      title: 'Twitter',
      value: '@JuanPabloJim_',
      href: 'https://x.com/JuanPabloJim_',
      description: t('behind_the_scenes'),
    },
  ]

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden bg-white">
        <Header />
        <motion.div
          className="min-h-screen py-20 px-4 bg-black-secondary text-white"
          {...anim(contactVariants)}
        >
          <div className="max-w-4xl mx-auto mt-14">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-libre italic mb-6">
                {t('lets_connect')}
              </h1>
              <Text
                phrase={t('ready_to_bring_your_ideas_to_life')}
                customStyle="text-lg mb-8"
              />
              <Image
                src="/images/spaceship.webp"
                alt="Spaceship ready to connect"
                width={200}
                height={200}
                className="mx-auto opacity-80"
                priority
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {socials.map((social, index) => (
                <motion.a
                  key={social.title}
                  href={social.href}
                  target={social.title === 'Email' ? '_self' : '_blank'}
                  rel={social.title === 'Email' ? '' : 'noopener noreferrer'}
                  className="bg-black-secondary p-6 rounded-lg border border-gray-700 hover:border-yellow-primary transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                >
                  <h3 className="text-xl font-josefin font-semibold text-yellow-primary mb-2">
                    {social.title}
                  </h3>
                  <p className="text-white text-lg mb-2 font-mono">
                    {social.value}
                  </p>
                  <p className="text-gray-400 text-sm">{social.description}</p>
                </motion.a>
              ))}
            </div>

            <div className="bg-black-secondary p-8 rounded-lg text-center">
              <h2 className="text-2xl font-libre italic mb-4 text-white">
                {t('based_in_medellin_colombia')}
              </h2>
              <p className="text-gray-300 mb-6">
                {t('available_for_remote_work_worldwide')}
              </p>
              <div className="flex justify-center">
                <a
                  href="mailto:juanpablojimenez.dev@gmail.com"
                  className="bg-yellow-primary text-black px-8 py-3 rounded-full font-josefin font-semibold hover:bg-yellow-600 transition-colors duration-300"
                >
                  {t('start_a_conversation')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        <Footer />
      </main>
    </PageTransition>
  )
}
