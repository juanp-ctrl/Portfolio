'use client'
import { useEffect, useRef } from 'react'

export default function Index() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cursorRef.current) {
      const centerX = window.innerWidth / 2
      cursorRef.current.style.left = `${centerX}px`
      cursorRef.current.style.top = `-100px`
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${event.clientX}px`
        cursorRef.current.style.top = `${event.clientY}px`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed w-[30px] h-[30px] bg-[url('/images/moon.webp')] bg-no-repeat bg-center bg-contain pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[transform,width,height] duration-200 ease-out max-md:hidden"
    />
  )
}
