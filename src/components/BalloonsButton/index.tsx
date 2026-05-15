import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useTranslations } from '@/context/I18nContext'
import { useTransition } from '@/context/TransitionContext'

export default function Index() {
  const t = useTranslations('common')
  const { startTransition } = useTransition()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false }) // once: true hace que la animación ocurra solo una vez

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-20 pr-16 pb-44">
        <div className="relative w-[200px] h-[200px]">
          <Image
            src="/images/balloon1.svg"
            alt="yellow balloon"
            width={150}
            height={150}
            className="size-[150px] absolute z-10 top-0 left-0"
          />
          <Image
            src="/images/balloon2.svg"
            alt="black balloon"
            width={150}
            height={150}
            className="size-[150px] absolute z-20 top-5 left-14"
          />
          <Image
            src="/images/balloon3.svg"
            alt="white balloon"
            width={150}
            height={150}
            className="size-[150px] absolute z-30 top-10 left-[112px]"
          />
        </div>

        <div className="flex absolute">
          <svg
            width="43"
            height="253"
            viewBox="0 0 43 293"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute z-[9] -left-20"
          >
            <motion.path
              d="M41.1718 2.02759C31.441 2.02759 19.8899 11.351 13.5037 18.4468C6.42406 26.3131 2.59963 39.6112 2.25474 49.9578C1.8049 63.4531 4.62321 72.6295 9.10191 85.0321C17.42 108.067 32.9643 126.947 39.2155 151.058C43.7121 168.402 39.0286 189.805 31.8094 205.556C27.2375 215.531 21.623 222.783 26.3596 233.714C30.4999 243.268 37.3989 252.087 37.3989 262.639C37.3989 269.24 35.8923 275.497 33.3465 281.225C31.7957 284.714 27.7367 288.97 32.3683 291.286"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                pathLength: isInView ? 1 : 0,
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{
                duration: 1,
                ease: [0.37, 0, 0.63, 1],
                delay: 0,
              }}
            />
          </svg>

          <svg
            width="55"
            height="263"
            viewBox="0 0 55 263"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute z-[19] -top-14 -left-8"
          >
            <motion.path
              d="M18.22 1.95337C7.9318 2.52493 4.38668 15.1691 2.49941 23.4731C-1.15047 39.5325 15.915 61.6082 27.7222 71.0539C41.5136 82.0871 48.5203 102.985 50.6392 120.172C52.2192 132.987 41.0414 144.406 34.2899 154.128C30.0973 160.166 29.7079 168.949 34.2899 174.949C37.4802 179.127 43.0218 181.91 45.8183 186.338C52.474 196.876 53.434 211.2 53.434 223.229C53.434 230.81 49.8391 238.002 49.6611 245.657C49.5426 250.75 50.6008 256.633 48.4034 261.028"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                pathLength: isInView ? 1 : 0,
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{
                duration: 1.1,
                ease: [0.37, 0, 0.63, 1],
                delay: 0.1,
              }}
            />
          </svg>
          <svg
            width="56"
            height="237"
            viewBox="0 0 56 237"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute z-[29] -top-8 left-20"
          >
            <motion.path
              d="M16.6656 2.10645C20.34 5.04601 26.0512 4.94955 29.9407 7.90558C39.2539 14.9836 45.7922 24.3406 50.622 34.8052C58.1929 51.2089 52.1563 64.6614 38.0455 75.7485C32.2552 80.298 28.0314 88.2117 26.0979 95.1721C21.1931 112.829 30.1109 123.63 35.5302 139.888C38.7159 149.445 39.8015 160.211 32.1765 167.836C25.7617 174.251 16.0482 177.619 9.18959 183.906C5.15056 187.608 3.48323 198.301 2.55202 203.329C1.61227 208.404 1.57385 213.187 1.57385 218.351C1.57385 223.824 1.57385 229.298 1.57385 234.771"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                pathLength: isInView ? 1 : 0,
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{
                duration: 1.2,
                ease: [0.37, 0, 0.63, 1],
                delay: 0.2,
              }}
            />
          </svg>
        </div>
        <div ref={ref} className="relative">
          <div className="bg-white-secondary py-2 px-6 rounded-lg relative z-40 top-32 left-5 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
            <p
              onClick={() => {
                startTransition('/about')
              }}
              className="font-libre text-4xl underline text-black-primary italic cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-50"
            >
              {t('about')}
            </p>
          </div>
        </div>
      </div>
      <div ref={ref} className="text-black-secondary">
        -
      </div>
    </>
  )
}
