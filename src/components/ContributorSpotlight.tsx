"use client"

import React, { useEffect, useState } from 'react'
import LogoLoop from './LogoLoop'
import { createPortal } from 'react-dom'

type Contributor = { login: string; avatar_url: string; html_url: string }

function PortalTooltip({ target, x, y, children }: { target: HTMLElement | null; x?: number; y?: number; children: React.ReactNode }) {
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    const d = document.createElement('div')
    d.style.position = 'fixed'
    d.style.pointerEvents = 'none'
    d.style.zIndex = '9999'
    document.body.appendChild(d)
    setEl(d)
    return () => d.remove()
  }, [])

  if (!el || !target) return null
  const rect = target.getBoundingClientRect()

  // Position tooltip centered directly above the avatar/profile
  const left = rect.left + rect.width / 2
  const top = rect.top - 8

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    left: Math.max(8, left) + 'px',
    top: Math.max(8, top) + 'px',
    transform: 'translate(-50%, -110%)',
    pointerEvents: 'none',
    transition: 'transform 90ms ease, left 90ms ease, top 90ms ease'
  }

  const pillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '6px 10px',
    borderRadius: 9999,
    background: 'rgba(6,8,15,0.85)',
    color: 'white',
    fontWeight: 800,
    fontSize: 13,
    letterSpacing: '0.2px',
  boxShadow: '0 10px 36px rgba(2,6,23,0.7), 0 0 22px rgba(204,102,255,0.28), 0 0 44px rgba(204,102,255,0.18)',
    transformOrigin: 'center bottom',
    transform: 'translateY(6px) scale(0.96)',
    animation: 'tooltipPop 160ms ease forwards'
  }

  const neonTextStyle: React.CSSProperties = {
    color: '#CC66FF',
    textShadow: '0 8px 30px rgba(204,102,255,0.85), 0 0 18px rgba(204,102,255,0.45)',
    display: 'inline-block',
    padding: '0 4px'
  }

  return createPortal(
    <div style={containerStyle}>
      <div style={pillStyle} aria-hidden>
        <span style={neonTextStyle}>{children}</span>
      </div>
    </div>,
    el,
  )
}

// small pop animation keyframes (added as global style to the portal container)
const styleEl = typeof document !== 'undefined' ? document.getElementById('ck-tooltip-styles') : null
if (typeof document !== 'undefined' && !styleEl) {
  const s = document.createElement('style')
  s.id = 'ck-tooltip-styles'
  s.innerHTML = `
    @keyframes tooltipPop { 0% { transform: translateY(6px) scale(0.96); opacity: 0 } 60% { transform: translateY(-2px) scale(1.03); opacity: 1 } 100% { transform: translateY(0) scale(1); opacity: 1 } }
  `
  document.head.appendChild(s)
}

export default function ContributorSpotlight({ maxHeight = 72 }: { maxHeight?: number }) {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [hoverTarget, setHoverTarget] = useState<HTMLElement | null>(null)
  const [hoverLogin, setHoverLogin] = useState<string | undefined>(undefined)
  const [cursorX, setCursorX] = useState<number | undefined>(undefined)
  const [cursorY, setCursorY] = useState<number | undefined>(undefined)

  useEffect(() => {
    let mounted = true
    fetch('/api/contributors')
      .then((r) => r.json())
      .then((data) => { if (mounted && Array.isArray(data)) setContributors(data) })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  if (!contributors.length) return null

  const logos = contributors.map(c => ({ src: c.avatar_url, alt: c.login, href: c.html_url, login: c.login }))

  return (
    <div className="w-full mx-auto overflow-hidden relative" style={{ height: maxHeight }}>
      <LogoLoop
        logos={logos as any}
        speed={80} /* slower */
        logoHeight={maxHeight}
        gap={20}
        onItemHover={(el, login, x, y) => { setHoverTarget(el); setHoverLogin(login); setCursorX(x); setCursorY(y) }}
        pauseOnHover={true}
        scaleOnHover={true}
      />

      <PortalTooltip target={hoverTarget} x={cursorX} y={cursorY}>{hoverLogin || ''}</PortalTooltip>
    </div>
  )
}
