'use client'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Text from '@/components/Text'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import useProjects, { Project } from '@/hooks/useProjects'
import { useEffect, useState } from 'react'
import React from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import useMedia from '@/hooks/useMedia'
import { motion, Variants } from 'motion/react'
import { useTranslations } from '@/context/I18nContext'

export default function Projects() {
  const { isMobile } = useMedia()
  const t = useTranslations('projects')
  const projects: Project[] = useProjects()
  const [api, setApi] = useState<CarouselApi>()
  const [projectIndex, setProjectIndex] = useState<number>(0)

  const anim = (variants: Variants) => ({
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
  })

  const upperVariants: Variants = {
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

  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden bg-white">
        <Header />
        <div className="bg-black-secondary size-full">
          <div className="flex flex-col justify-center items-center pt-32">
            <motion.div
              className="flex flex-col justify-center items-center"
              {...anim(upperVariants)}
            >
              <h1 className="text-white mb-2 md:text-[4rem] text-5xl">
                {projects[projectIndex].name}
              </h1>
              <a
                href={projects[projectIndex].url}
                target="_blank"
                rel="noreferrer"
                className="font-josefin text-white text-lg border-b-2 mb-12"
              >
                {projects[projectIndex].url}
              </a>
            </motion.div>
            <motion.div
              className="p-0 w-3/4 max-w-[950px] h-[60vh] mb-8 max-md:h-[55vh] max-md:mb-20 max-md:[&_img]:[object-position:32%]"
              {...anim(upperVariants)}
            >
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{ align: 'start', loop: true }}
              >
                <CarouselContent>
                  {projects[projectIndex].images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1 relative">
                        <Card>
                          <CardContent className="p-0 h-[60vh]">
                            <a
                              className="text-4xl font-semibold"
                              href={projects[projectIndex].url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Image
                                src={image}
                                priority
                                alt="Profile picture"
                                fill
                                className="object-cover rounded-xl"
                              />
                            </a>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row justify-start flex-wrap w-3/4 max-w-[950px] mb-16 text-white"
              {...anim(upperVariants)}
            >
              <h3 className="font-libre italic text-2xl mr-4">
                {t('techStack')}
              </h3>
              <div className="flex flex-wrap mt-2 w-[110%]">
                {projects[projectIndex].techStack.map((tool, index) => (
                  <React.Fragment key={index}>
                    <p className="text-white font-josefin text-[1.2rem] pt-[4px]">
                      {tool}
                    </p>
                    {index !== projects[projectIndex].techStack.length - 1 && (
                      <p className="text-white pt-[2px] px-2">|</p>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
            {projects[projectIndex].description.map((desc, index) => (
              <React.Fragment key={index}>
                {index === 0 && (
                  <div className="w-full md:pl-48 -mb-4 pl-8">
                    <h1 className="text-white">{t('overview')}</h1>
                  </div>
                )}
                {index === 2 && (
                  <div className="w-full md:pl-48 -mb-4 pl-8 md:mt-16 mt-20">
                    <h1 className="text-white">{t('purpose')}</h1>
                  </div>
                )}
                <Text
                  customStyle="text-white mt-10 md:text-[1.4rem]"
                  phrase={desc}
                />
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row justify-around gap-4 w-full md:px-48 py-14 px-8">
            {projects[projectIndex].images.map(
              (img, index) =>
                index > 0 && (
                  <Image
                    key={index}
                    src={img}
                    width={3500}
                    height={2200}
                    alt="Random-q demo image"
                    className="w-full md:w-1/2 rounded-xl"
                  />
                ),
            )}
          </div>
          {projects[projectIndex].collaborators && (
            <div className="flex flex-col md:flex-row md:pl-48 pl-8 pb-16">
              <h3 className="font-libre italic text-white text-2xl mr-8">
                {t('developedWith')}
              </h3>
              {projects[projectIndex].collaborators.map((friend, index) => (
                <React.Fragment key={index}>
                  <div className="mt-4 md:mt-0">
                    <a
                      href={friend.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="font-josefin text-white text-xl border-b-2"
                    >
                      {friend.name}
                    </a>
                    <p className="text-white text-lg">{friend.role}</p>
                  </div>
                  {!isMobile && <p className="text-white px-8">|</p>}
                </React.Fragment>
              ))}
            </div>
          )}
          <div className="pb-8">
            <div
              className="border border-white-primary rounded-[25px] cursor-pointer m-8 bg-transparent transition-colors duration-[800ms] hover:bg-yellow-primary group"
              onClick={() => {
                setProjectIndex((currIndex) =>
                  currIndex + 1 === projects.length ? 0 : currIndex + 1,
                )
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <p className="font-josefin font-light text-white-primary text-2xl leading-8 p-3 text-center group-hover:text-black-primary group-hover:font-extrabold">
                {projectIndex + 1 === projects.length
                  ? t('previous_project')
                  : t('next_project')}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </PageTransition>
  )
}
