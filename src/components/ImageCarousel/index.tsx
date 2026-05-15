'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

interface ImageCarouselProps {
  images: string[]
  alt: string
  autoPlayInterval?: number // Tiempo en milisegundos (default: 3000 = 3 segundos)
}

export default function ImageCarousel({
  images,
  alt,
  autoPlayInterval = 3000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Auto-play: avanza automáticamente cada X segundos
  useEffect(() => {
    if (images.length <= 1) return // No hace falta si solo hay una imagen

    const interval = setInterval(() => {
      goToNext()
    }, autoPlayInterval)

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval)
  }, [currentIndex, images.length, autoPlayInterval])

  if (!images || images.length === 0) return null

  return (
    <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            width={300}
            height={300}
            className="rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] w-full h-full object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black-primary/70 hover:bg-black-primary text-white-primary p-2 rounded-full transition-colors z-10"
            aria-label="Previous image"
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
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black-primary/70 hover:bg-black-primary text-white-primary p-2 rounded-full transition-colors z-10"
            aria-label="Next image"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-yellow-primary'
                    : 'bg-white-primary/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
