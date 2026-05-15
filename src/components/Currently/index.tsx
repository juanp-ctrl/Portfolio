import { motion, useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { useTranslations } from '@/context/I18nContext'

export default function Index() {
  const t = useTranslations('home')
  const ref = useRef(null)
  const [displayText, setDisplayText] = useState('')
  const isInView = useInView(ref, { once: true })
  const currentlyAt = 'Gorilla Logic'

  useEffect(() => {
    if (isInView) {
      setDisplayText('G')
      const textArray = currentlyAt.split('')
      let i = 0

      const interval = setInterval(() => {
        i++
        if (i < textArray.length) {
          setDisplayText((prev) => prev + textArray[i])
        } else {
          clearInterval(interval)
        }
      }, 300)

      return () => {
        clearInterval(interval)
      }
    }
  }, [isInView, currentlyAt])

  return (
    <div className="flex flex-col items-center justify-center my-20">
      <h2 className="text-white-secondary font-libre text-4xl italic mt-14">
        {t('currently')}
      </h2>
      <div className="flex gap-2 mt-4">
        <p className="font-libre text-yellow-primary text-4xl">{t('at')}</p>
        <div
          ref={ref}
          className="flex items-center justify-center bg-white-primary rounded-md px-[10px] pt-[5px] cursor-pointer"
          onClick={() => window.open('https://gorillalogic.com/', '_blank')}
        >
          <span className="text-black-secondary text-4xl font-josefin font-bold">
            {displayText}
          </span>
          <motion.span
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-[5px] mb-1 text-black-secondary text-4xl font-josefin font-bold"
          >
            |
          </motion.span>
        </div>
      </div>
    </div>
  )
}
