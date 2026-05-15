import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'

interface ImageItem {
  id: number
  x: number
  y: number
  src: string
}

const imagesLength = 18

function Index() {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 })
  const [lastAddedCoordinates, setLastAddedCoordinates] = useState({
    x: 0,
    y: 0,
  }) // Last position where an image was added
  const [images, setImages] = useState<ImageItem[]>([])
  const [imageCounter, setImageCounter] = useState<number>(0)
  const imagePool = useMemo(
    () =>
      Array.from(
        { length: imagesLength },
        (_, i) => `/images/trail/IMG_${i + 1}.webp`,
      ),
    [],
  )

  // Handle mouse movement
  const handleMouseMovement = (event: React.MouseEvent<HTMLDivElement>) => {
    setMouseCoordinates({ x: event.clientX, y: event.clientY })
  }

  // Add a new image if the displacement is greater than 100 pixels
  const addNewItem = useCallback(() => {
    const distance = Math.sqrt(
      Math.pow(mouseCoordinates.x - lastAddedCoordinates.x, 2) +
        Math.pow(mouseCoordinates.y - lastAddedCoordinates.y, 2),
    )

    if (distance > 100) {
      const imgIndex = imageCounter
      const newImage: ImageItem = {
        id: Date.now(), // Unique identifier
        x: mouseCoordinates.x - 75,
        y: mouseCoordinates.y - 100,
        src: imagePool[imgIndex],
      }

      // Add the new image to the state
      setImages((prevImages) => [...prevImages, newImage])

      // Update the last coordinates where an image was added
      setLastAddedCoordinates({ x: mouseCoordinates.x, y: mouseCoordinates.y })

      // Update image counter for next image
      const aleatory = Math.floor(Math.random() * 2)
      if (imageCounter < imagesLength - 1) {
        if (aleatory === 0) {
          setImageCounter((prevNumber) => prevNumber + 1)
        } else {
          setImageCounter((prevNumber) =>
            prevNumber < imagesLength - 2 ? prevNumber + 2 : 0,
          )
        }
      } else {
        setImageCounter(0)
      }
    }
  }, [mouseCoordinates, lastAddedCoordinates, imageCounter, imagePool])

  useEffect(() => {
    let timeoutId = null
    if (images.length < 2) {
      timeoutId = setTimeout(() => {
        setImages((prevImages) => prevImages.slice(1)) // Remove the oldest image
      }, 500)
    } else if (images.length < 7) {
      timeoutId = setTimeout(() => {
        setImages((prevImages) => prevImages.slice(1))
      }, 200)
    } else {
      timeoutId = setTimeout(() => {
        setImages((prevImages) => prevImages.slice(1))
      }, 20)
    }

    return () => clearTimeout(timeoutId) // Clear the timeout on unmount
  }, [images.length])

  // Effect to add a new image when the mouse moves
  useEffect(() => {
    if (mouseCoordinates.x && mouseCoordinates.y) {
      // Use setTimeout to make state update asynchronous and avoid lint error
      const timeoutId = setTimeout(() => {
        addNewItem()
      }, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [mouseCoordinates.x, mouseCoordinates.y, addNewItem])

  return (
    <div
      className="absolute w-full h-[calc(95vh-100px)] overflow-hidden z-[2]"
      onMouseMove={handleMouseMovement}
    >
      <AnimatePresence>
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="absolute w-[150px] h-[200px] overflow-hidden pointer-events-none"
            initial={{ opacity: 0, scale: 0 }} // Starts invisible and contracted
            animate={{ opacity: 1, scale: 1 }} // Appears expanding from the center
            exit={{ opacity: 0, y: 10 }} // Fade out downward
            transition={{
              duration: 0.5, // Animation duration
              ease: 'easeOut', // Easing for a smooth effect
            }}
            style={{ left: `${image.x}px`, top: `${image.y}px` }}
          >
            <Image
              src={image.src}
              alt="Trail effect"
              width={150}
              height={200}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default memo(Index)
