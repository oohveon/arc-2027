import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

// 스크롤 진입 시 떠오르는 요소들 (About 섹션, Project 카드)
const REVEAL = [
  '.about-head',
  '.about-exhibition-body',
  '.about-overview-body',
  '.team-ops',
  '.team-group',
  '.project-card',
].join(',')

let lenis: Lenis | null = null

export default function Motion() {
  const { pathname } = useLocation()

  // 부드러운 스크롤 (모션 줄이기 설정이면 끔)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.1 })
    let raf = 0
    const tick = (t: number) => {
      lenis?.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  // 섹션 진입 시 페이드 + 살짝 올라오기
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          ;(e.target as HTMLElement).dataset.in = ''
          io.unobserve(e.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const scan = () => {
      document.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
        if (el.dataset.reveal !== undefined) return
        el.dataset.reveal = ''
        io.observe(el)
      })
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.getElementById('root')!, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [])

  return null
}
