"use client"

import React from 'react'

function ArrowIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ScrollToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const liveRef = React.useRef<HTMLDivElement | null>(null)

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // announce after a short delay (approx. scroll duration)
    setTimeout(() => {
      if (liveRef.current) liveRef.current.textContent = 'Scrolled to top'
    }, 600)
  }

  if (!visible) return null

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only" ref={liveRef} />
      <button
        aria-label="Scroll back to top"
        onClick={handleClick}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-neon/90 text-black flex items-center justify-center shadow-md hover:scale-105 transform transition"
        style={{ width: 44, height: 44 }}
      >
        <ArrowIcon className="w-4 h-4" />
      </button>
    </>
  )
}
