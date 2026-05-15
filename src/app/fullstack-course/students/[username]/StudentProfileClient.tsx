'use client'
import { useTranslations } from '@/context/I18nContext'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { useTransition } from '@/context/TransitionContext'
import { findStudentByUsername } from '@/lib/students'

export default function StudentProfileClient({
  username,
}: {
  username: string
}) {
  const t = useTranslations('fullstack_course')
  const { startTransition } = useTransition()

  const student = findStudentByUsername(username)

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    startTransition('/fullstack-course')
  }

  if (!student) {
    return (
      <PageTransition>
        <main className="relative w-full overflow-hidden bg-white">
          <Header variant="dark" />

          <section className="px-6 md:px-20 py-20 md:py-32 min-h-[60vh] flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-libre italic text-4xl md:text-6xl text-black-primary mb-6">
                Student Not Found
              </h1>
              <p className="font-josefin text-lg text-black-primary/70 mb-8">
                The student profile &quot;{username}&quot; doesn&apos;t exist
                yet.
              </p>
              <Link
                href="/fullstack-course"
                onClick={handleNavigation}
                className="inline-block px-6 py-3 bg-yellow-primary text-black-primary font-josefin text-base border-2 border-black-primary hover:bg-black-primary hover:text-yellow-primary transition-all"
              >
                {t('back_to_course')}
              </Link>
            </motion.div>
          </section>

          <Footer />
        </main>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden bg-white">
        <Header />

        {/* Back Button */}
        <section className="px-6 md:px-20 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/fullstack-course"
              onClick={handleNavigation}
              className="inline-flex items-center gap-2 font-josefin text-base text-black-primary/70 hover:text-yellow-primary transition-colors"
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
          </motion.div>
        </section>

        {/* Profile Header */}
        <section className="px-6 md:px-20 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <Image
                src={student.profileImage}
                alt={`Profile picture of ${student.name}`}
                width={300}
                height={300}
                className="rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h1 className="font-libre italic text-4xl md:text-6xl text-black-primary">
                {student.name}
              </h1>

              {username === 'juan-pablo-jimenez' ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-primary border-2 border-black-primary w-fit">
                  <span className="font-josefin text-base md:text-lg font-semibold text-black-primary">
                    {t('professor_section_title')}
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white-secondary border-2 border-black-primary w-fit">
                  <span className="font-josefin text-base md:text-lg font-semibold text-black-primary">
                    Student
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="px-6 md:px-20 py-12 bg-white-secondary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-libre italic text-3xl md:text-4xl text-black-primary mb-6">
              About Me
            </h2>
            <p className="font-josefin text-base md:text-lg text-black-primary/80 max-w-3xl leading-relaxed">
              {student.bio}
            </p>
          </motion.div>
        </section>

        {/* Interests Section */}
        <section className="px-6 md:px-20 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-libre italic text-3xl md:text-4xl text-black-primary mb-8">
              Interests & Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {student.interests.map((interest, index) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-black-primary text-white-primary font-josefin text-sm md:text-base border-2 border-black-primary hover:bg-yellow-primary hover:text-black-primary transition-all cursor-default"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Social Links Section */}
        <section className="px-6 md:px-20 py-16 bg-black-secondary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-libre italic text-3xl md:text-4xl text-yellow-primary mb-8">
              Connect With Me
            </h2>
            <div className="flex flex-wrap gap-4">
              {student.socials.github && (
                <motion.a
                  href={student.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>GitHub</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}
              {student.socials.linkedin && (
                <motion.a
                  href={student.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>LinkedIn</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}
              {student.socials.twitter && (
                <motion.a
                  href={student.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>Twitter/X</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}
              {student.socials.website && (
                <motion.a
                  href={student.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>Website</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}
              {student.socials.instagram && (
                <motion.a
                  href={student.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>Instagram</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}
