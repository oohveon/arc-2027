import { useCallback, useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import { EXHIBITION } from '../data/exhibition'
import { BEHIND, type BehindItem } from '../data/projects'

// 카드 좌표와 번호 위치: 계단식 배치 (x·y는 1920 웹 시안, mx·my는 390 모바일 시안 기준)
const POS = [
  { x: 390, y: 379, mx: 247.5, my: 29, label: 'top' },
  { x: 597, y: 638, mx: 159.2, my: 140, label: 'bottom' },
  { x: 804, y: 897, mx: 71, my: 250.5, label: 'bottom' },
  { x: 1011, y: 638, mx: 159.2, my: 361, label: 'top' },
  { x: 1218, y: 897, mx: 71, my: 471.5, label: 'top-end' },
  { x: 1425, y: 1156, mx: 159.2, my: 582, label: 'bottom' },
  { x: 1632, y: 897, mx: 247.5, my: 693, label: 'top-end' },
]

const INSTAGRAM = `https://www.instagram.com/${EXHIBITION.instagram}/`

// 인스타 피드처럼 한 게시물의 이미지를 좌우로 넘겨 본다 (화살표 · 방향키 · 스와이프)
function BehindPost({ item, onClose }: { item: BehindItem; onClose: () => void }) {
  const slides = item.slides?.length ? item.slides : [item.image]
  const trackRef = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)

  const go = useCallback((dir: number) => {
    const el = trackRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth) + dir
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }, [])
  const prev = useCallback(() => go(-1), [go])
  const next = useCallback(() => go(1), [go])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => setSlide(Math.round(el.scrollLeft / el.clientWidth))
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const many = slides.length > 1

  return (
    <Modal title="36.5 Lap" onClose={onClose} onPrev={prev} onNext={next}>
      <div className="behind-modal">
        <button className="behind-arrow" onClick={prev} aria-label="이전 사진" disabled={!many || slide === 0}>
          ‹
        </button>
        <div className="behind-slides" ref={trackRef}>
          {slides.map((src, i) => (
            <img key={src} src={src} alt={`${item.title} ${i + 1}`} />
          ))}
        </div>
        <button
          className="behind-arrow"
          onClick={next}
          aria-label="다음 사진"
          disabled={!many || slide === slides.length - 1}
        >
          ›
        </button>
      </div>
      {many && (
        <ol className="behind-dots" aria-label={`${slides.length}장 중 ${slide + 1}번째`}>
          {slides.map((src, i) => (
            <li key={src} className={i === slide ? 'is-active' : ''} />
          ))}
        </ol>
      )}
      <p className="behind-modal-caption">
        <a href={item.link ?? INSTAGRAM} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      </p>
    </Modal>
  )
}

export default function Behind() {
  const [index, setIndex] = useState<number | null>(null)
  const close = useCallback(() => setIndex(null), [])

  return (
    <Layout className="page-behind">
      <section className="stage behind-stage">
        <h1 className="behind-word w-the">The</h1>
        <p className="behind-word w-history">History</p>
        <p className="behind-word w-archive">Archive</p>

        {BEHIND.map((b, i) => (
          <button
            key={b.no}
            className={`behind-card label-${POS[i].label}`}
            style={{ '--x': POS[i].x, '--y': POS[i].y, '--mx': POS[i].mx, '--my': POS[i].my, '--i': i }}
            onClick={() => setIndex(i)}
            aria-label={`${b.no}. ${b.title}`}
          >
            <img src={b.image} alt="" loading="lazy" />
            <span className="behind-no">{b.no}</span>
          </button>
        ))}
      </section>

      {index !== null && <BehindPost key={index} item={BEHIND[index]} onClose={close} />}
    </Layout>
  )
}
