"use client"

import { motion } from "framer-motion"
import { Instagram, Linkedin } from "lucide-react"

// Custom X Logo Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
import { usePathname } from "next/navigation"

const socialLinks = [
  {
    icon: XIcon,
    href: process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/KrowdKraft_",
    label: "X (Twitter)",
    color: "#ffffff"
  },
  {
    icon: Instagram,
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/krowdkraft_/",
    label: "Instagram",
    color: "#E1306C"
  },
  {
    icon: Linkedin,
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/krowdkraft/",
    label: "LinkedIn",
    color: "#0077B5"
  }
]

export default function SocialSidebar() {
  const pathname = usePathname()
  
  // Only show on homepage
  if (pathname !== '/') {
    return null
  }

  return (
    <div className="absolute right-8 top-1/2 transform -translate-y-16 z-30 hidden lg:block">
      <div className="flex flex-col space-y-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon
          
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 1 }}
              whileHover={{ 
                scale: 1.2,
                rotateZ: 5,
                transition: { type: "spring", stiffness: 700, damping: 30, duration: 0.12 }
              }}
              whileTap={{ scale: 0.9 }}
              className="group relative"
            >
              {/* Glow background */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"
                style={{ 
                  background: `radial-gradient(circle, ${social.color}, transparent)`,
                  transform: 'scale(1.5)'
                }}
              />
              
              {/* Icon container */}
              <div className="relative w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                <Icon 
                  className="w-5 h-5 text-white group-hover:text-white transition-colors duration-300"
                  style={{
                    filter: `drop-shadow(0 0 8px ${social.color}40)`
                  }}
                />
              </div>

              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap backdrop-blur-sm border border-white/10">
                  {social.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              </div>
            </motion.a>
          )
        })}
        
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: socialLinks.length * 0.1 + 1.2, duration: 0.5 }}
          className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent mx-auto"
        />
      </div>
    </div>
  )
}
