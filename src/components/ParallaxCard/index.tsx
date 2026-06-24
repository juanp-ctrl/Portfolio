'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './styles.module.css'

interface ParallaxCardProps {
  name: string
  tagline: string
  url: string
  image: string
}

export default function ParallaxCard({
  name,
  tagline,
  url,
  image,
}: ParallaxCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [dims, setDims] = useState({ width: 0, height: 0 })
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [canHover, setCanHover] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setDims({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (leaveTimeout.current) clearTimeout(leaveTimeout.current)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!canHover || !wrapRef.current) return
      const rect = wrapRef.current.getBoundingClientRect()
      setMouse({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      })
    },
    [canHover],
  )

  const handleMouseEnter = useCallback(() => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current)
      leaveTimeout.current = null
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    leaveTimeout.current = setTimeout(() => {
      setMouse({ x: 0, y: 0 })
    }, 1000)
  }, [])

  const mousePX = dims.width ? mouse.x / dims.width : 0
  const mousePY = dims.height ? mouse.y / dims.height : 0

  const cardStyle = canHover
    ? { transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)` }
    : undefined

  const bgStyle = canHover
    ? {
        transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
      }
    : undefined

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={url} target="_blank" rel="noreferrer" className="block">
        <div className={styles.card} style={cardStyle}>
          <div className={styles.cardBg} style={bgStyle}>
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoGradient} />
            <div className={styles.cardInfoContent}>
              <h2 className={`${styles.cardTitle} font-libre italic`}>
                {name}
              </h2>
              <p className={`${styles.cardTagline} font-josefin`}>{tagline}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
