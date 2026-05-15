'use client'
import type React from 'react'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useTranslations } from '@/context/I18nContext'
import { useTransition } from '@/context/TransitionContext'
import { gsap } from 'gsap'

interface LinkProps {
  data: {
    title: string
    path: string
    index: number
  }
  isActive: boolean
  setSelectedIndicator: (path: string) => void
  currentPathname: string
  closeMenu: () => void
}

export default function Link({
  data,
  isActive,
  setSelectedIndicator,
  currentPathname,
  closeMenu,
}: LinkProps) {
  const t = useTranslations('common')
  const { startTransition } = useTransition()
  const linkRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  const { title, path, index } = data

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // If we're already on this page, just close the menu
    if (currentPathname === path) {
      closeMenu()
      return
    }

    // Otherwise, navigate to the page (which will also close the menu via the transition)
    startTransition(path)
    closeMenu()
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(linkRef.current, { x: 80 })
      gsap.set(indicatorRef.current, { scale: 0 })

      // Enter animation with stagger delay
      gsap.to(linkRef.current, {
        x: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        delay: 0.05 * index,
      })
    })

    return () => ctx.revert()
  }, [index])

  useEffect(() => {
    // Animate indicator based on isActive state
    gsap.to(indicatorRef.current, {
      scale: isActive ? 1 : 0,
      duration: isActive ? 0.3 : 0.4,
      ease: 'power1.inOut',
    })
  }, [isActive])

  return (
    <div
      ref={linkRef}
      className="relative flex items-center"
      onMouseEnter={() => {
        setSelectedIndicator(path)
      }}
    >
      <a
        href={path}
        onClick={handleClick}
        className="no-underline font-semibold w-full"
      >
        {t(title)}
      </a>
      <div
        ref={indicatorRef}
        className="w-[10px] h-[10px] bg-white rounded-full absolute right-[10px]"
      ></div>
    </div>
  )
}
