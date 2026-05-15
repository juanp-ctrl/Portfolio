import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useTranslations } from '@/context/I18nContext'

export default function Index() {
  const t = useTranslations('home')
  const ref = useRef(null)
  const isInView = useInView(ref, {
    amount: 0.1,
    once: true,
    margin: '-50px',
  })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center my-20 [&_p]:font-libre [&_p]:text-[2.25rem] [&_p]:text-black-primary"
    >
      <p>{t('creative')}</p>
      <p>{t('engineer')}</p>
      <svg
        className="mt-4 w-[300px]"
        viewBox="-50 0 300 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M2 7.00395C29.9227 6.67154 57.7403 2.48616 85.7581 2.13811C93.9379 2.0365 102.164 1.51045 110.142 3.50492C114.251 4.53213 113.245 6.88364 110.798 10.175C105.504 17.2946 95.2859 19.5732 86.9609 20.344C71.1719 21.806 54.9715 20.7814 39.1226 20.7814C33.5224 20.7814 27.9891 20.8789 22.4475 21.7655C21.0803 21.9842 20.7088 22.4625 22.4475 23.187C31.6696 27.0295 42.9773 27.4595 52.736 28.2169C64.6486 29.1413 76.6034 29.4334 88.5464 29.5837C91.4876 29.6207 97.6574 28.8991 100.957 29.857C106.129 31.3584 90.64 32.9479 85.4848 34.5042C75.0199 37.6634 64.4202 37.044 53.8295 39.2607C51.1721 39.8169 68.5986 44.5454 70.6686 45.876C72.4767 47.0384 66.528 50.7975 65.748 51.726C63.5311 54.3652 66.8976 55.6372 67.9349 57.1932"
          stroke="var(--black_alternative)"
          strokeWidth="3"
          strokeLinecap="round"
          transform="translate(30,0)"
          style={{
            pathLength: isInView ? 1 : 0,
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{
            duration: 1.5,
            ease: [0.37, 0, 0.63, 1],
            delay: 0.3,
          }}
        />
      </svg>
    </motion.div>
  )
}
