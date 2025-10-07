import React from 'react'

type LogoItem = { node?: React.ReactNode; src?: string; alt?: string; href?: string; login?: string }

export default function LogoLoop({
  logos,
  speed = 120,
  logoHeight = 48,
  gap = 24,
  className = '',
  onItemHover,
  pauseOnHover = false,
  scaleOnHover = false,
}: {
  logos: LogoItem[]
  speed?: number
  logoHeight?: number
  gap?: number
  className?: string
  onItemHover?: (el: HTMLElement | null, login?: string, x?: number, y?: number) => void
  pauseOnHover?: boolean
  scaleOnHover?: boolean
}) {
  const all = [...logos, ...logos]
  const distance = all.length * (logoHeight + gap)
  const duration = Math.max(8, distance / speed)
  const [isHovering, setIsHovering] = React.useState(false)

  return (
    <div
      className={`w-full overflow-hidden relative ${className}`}
      style={{ height: logoHeight }}
      onMouseEnter={() => pauseOnHover && setIsHovering(true)}
      onMouseLeave={() => pauseOnHover && setIsHovering(false)}
    >
      <div
        style={{
          display: 'inline-flex',
          gap,
          alignItems: 'center',
          animation: `logoLoop ${duration}s linear infinite`,
          animationPlayState: isHovering ? 'paused' : 'running',
        }}
      >
        {all.map((l, i) => (
          <div key={i} className="logo-item" style={{ height: logoHeight, display: 'inline-flex', alignItems: 'center' }}>
            {l.href ? (
              <a
                href={l.href}
                aria-label={l.login ? `Open ${l.login} on GitHub` : l.alt || 'Open profile'}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={(e) => onItemHover?.(e.currentTarget as HTMLElement, l.login, e.clientX, e.clientY)}
                onMouseMove={(e) => onItemHover?.(e.currentTarget as HTMLElement, l.login, e.clientX, e.clientY)}
                onMouseLeave={() => onItemHover?.(null, undefined, undefined, undefined)}
                style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}
              >
                {l.node ? (
                  <span style={{ fontSize: logoHeight * 0.6 }}>{l.node}</span>
                ) : (
                  <div className="avatar-wrap" style={{ width: logoHeight, height: logoHeight }}>
                    <img src={l.src} alt={l.alt || 'logo'} className="ck-avatar" style={{ width: '100%', height: '100%' }} />
                  </div>
                )}
              </a>
            ) : (
              l.node ? (
                <span style={{ fontSize: logoHeight * 0.6 }}>{l.node}</span>
                ) : (
                <div className="avatar-wrap" style={{ width: logoHeight, height: logoHeight }}>
                  <img src={l.src} alt={l.alt || 'logo'} className="ck-avatar" style={{ width: '100%', height: '100%' }} />
                </div>
              )
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes logoLoop { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  .avatar-wrap { display: inline-block; border-radius: 9999px; overflow: hidden; }
  .logo-item img, .ck-avatar { object-fit: cover; border-radius: 0; display: block; }
  .ck-avatar { border: 2px solid rgba(255,255,255,0.06); box-shadow: 0 6px 14px rgba(15,23,42,0.18); transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02)); }
  a:focus .ck-avatar, a:focus-visible .ck-avatar { outline: none; box-shadow: 0 10px 30px rgba(0,0,0,0.32), 0 0 0 4px rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.65); }
  ${scaleOnHover ? `.logo-item:hover .ck-avatar, .logo-item:focus-within .ck-avatar { transform: scale(1.12); box-shadow: 0 18px 48px rgba(2,6,23,0.36), 0 0 12px rgba(99,102,241,0.55), 0 0 28px rgba(99,102,241,0.28); }` : ''}
      `}</style>
    </div>
  )
}
