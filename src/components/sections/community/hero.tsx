"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, PlusCircle, Instagram, Linkedin, Github, GitPullRequest, AlertCircle, Star } from "lucide-react"
import { useState, useEffect } from "react"

interface GitHubStats {
  openIssues: number
  mergedPRs: number
  contributors: number
  stars: number
  forks: number
  lastUpdated: string
}

// Custom X Logo Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

// Static Particle Component (reused from main hero)
function StaticParticle({ 
  index, 
  size, 
  color, 
  opacity 
}: { 
  index: number
  size: string
  color: string
  opacity: string
}) {
  const position = useState({
    x: Math.random() * 100,
    y: Math.random() * 100
  })[0]

  return (
    <div
      className={`absolute ${size} ${color} rounded-full ${opacity}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`,
        boxShadow: '0 0 4px rgba(168, 85, 247, 0.5)'
      }}
    />
  )
}

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

export default function CommunityHero() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGitHubStats = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/github-stats')
      const data = await response.json()
      
      if (data.success) {
        setGithubStats(data.data)
        console.log('GitHub stats updated:', data.cached ? 'from cache' : 'fresh data')
      } else {
        setError('Failed to fetch GitHub stats')
        // Set fallback stats
        setGithubStats({
          openIssues: 0,
          mergedPRs: 0,
          contributors: 0,
          stars: 0,
          forks: 0,
          lastUpdated: new Date().toISOString()
        })
      }
    } catch (err) {
      console.error('Error fetching GitHub stats:', err)
      setError('Failed to fetch GitHub stats')
      // Set fallback stats
      setGithubStats({
        openIssues: 0,
        mergedPRs: 0,
        contributors: 0,
        stars: 0,
        forks: 0,
        lastUpdated: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGitHubStats()
  }, [])

  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900 pt-20 section">
      {/* Enhanced Particle Background (reused from main hero) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main particles */}
        {Array.from({ length: 180 }, (_, i) => (
          <StaticParticle
            key={i}
            index={i}
            size="w-1 h-1"
            color="bg-white"
            opacity="opacity-30"
          />
        ))}
        {/* Small particles */}
        {Array.from({ length: 80 }, (_, i) => (
          <StaticParticle
            key={`small-${i}`}
            index={i}
            size="w-0.5 h-0.5"
            color="bg-purple-400"
            opacity="opacity-20"
          />
        ))}
        {/* Large accent particles */}
        {Array.from({ length: 40 }, (_, i) => (
          <StaticParticle
            key={`large-${i}`}
            index={i}
            size="w-2 h-2"
            color="bg-neon"
            opacity="opacity-10"
          />
        ))}
        {/* Extra small twinkling particles */}
        {Array.from({ length: 120 }, (_, i) => (
          <StaticParticle
            key={`tiny-${i}`}
            index={i}
            size="w-px h-px"
            color="bg-white"
            opacity="opacity-40"
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >

          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 mt-16 text-balance"
            style={{ 
              background: "linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
            }}
          >
            Welcome to KrowdKraft{" "}
            <span className="neon-text">Community</span>
          </motion.h1>

                     {/* Tagline */}
           <motion.p 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance"
           >
             A vibrant space where creativity meets innovation. 
           </motion.p>

           {/* CTA Buttons */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
           >
             <motion.div
               whileHover={{ 
                 scale: 1.05,
                 rotateX: 3,
                 rotateY: 3,
                 z: 10
               }}
               whileTap={{ scale: 0.95 }}
               transition={{ type: "spring", stiffness: 700, damping: 30, duration: 0.14 }}
               style={{ transformStyle: "preserve-3d" }}
             >
               <Button 
                 onClick={() => document.querySelector('#event-proposal')?.scrollIntoView({ behavior: 'smooth' })}
                 variant="neon" 
                 size="lg" 
                 className="group transform-gpu"
               >
                 <PlusCircle className="mr-2 h-4 w-4 pointer-events-none" />
                 Submit Event Proposal
               </Button>
             </motion.div>

             <motion.div
               whileHover={{ 
                 scale: 1.05,
                 rotateX: 3,
                 rotateY: 3,
                 z: 10
               }}
               whileTap={{ scale: 0.95 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
               style={{ transformStyle: "preserve-3d" }}
             >
               <Button 
                 asChild
                 variant="outline" 
                 size="lg" 
                 className="group transform-gpu border-neon/30 hover:bg-neon/10"
               >
                 <a href="/join-community">
                   <Users className="mr-2 h-4 w-4 pointer-events-none" />
                   Join Our Community
                 </a>
               </Button>
             </motion.div>
           </motion.div>

          {/* Community Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10 mb-8 max-w-4xl mx-auto"
          >
            {[
              { 
                number: "900+", 
                label: "Members", 
                icon: Users,
                color: "text-blue-400"
              },
              { 
                number: "6", 
                label: "Events", 
                icon: PlusCircle,
                color: "text-purple-400"
              }
            ].map((stat, index) => {
              return (
                <motion.div 
                  key={stat.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-xl md:text-2xl font-bold neon-text">{stat.number}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Explanation Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center text-muted-foreground mb-8 max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto text-sm md:text-base whitespace-normal lg:whitespace-nowrap px-4"
          >
            Our open-source journey is powered by community collaboration and continuous development
          </motion.p>

          {/* GitHub Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10 mb-20 max-w-4xl mx-auto"
          >
            {githubStats ? (
              [
                { 
                  number: githubStats.stars.toString(), 
                  label: "Stars", 
                  icon: Star,
                  color: "text-yellow-400"
                },
                { 
                  number: githubStats.forks.toString(), 
                  label: "Forks", 
                  icon: Github,
                  color: "text-gray-400"
                },
                { 
                  number: githubStats.contributors.toString(), 
                  label: "Contributors", 
                  icon: Users,
                  color: "text-blue-400"
                },
                { 
                  number: githubStats.openIssues.toString(), 
                  label: "Open Issues", 
                  icon: AlertCircle,
                  color: "text-orange-400"
                },
                { 
                  number: githubStats.mergedPRs.toString(), 
                  label: "Merged PRs", 
                  icon: GitPullRequest,
                  color: "text-green-400"
                }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div 
                    key={stat.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Icon className={`w-4 h-4 mr-2 ${stat.color} group-hover:scale-110 transition-transform duration-200`} />
                      <div className="text-xl md:text-2xl font-bold neon-text">{stat.number}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                )
              })
            ) : isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }, (_, index) => (
                <motion.div 
                  key={`loading-${index}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-6 bg-gray-600 rounded animate-pulse mb-2"></div>
                  <div className="w-8 h-3 bg-gray-600 rounded animate-pulse"></div>
                </motion.div>
              ))
            ) : (
              // Fallback stats
              [
                { number: "0", label: "Stars", icon: Star },
                { number: "0", label: "Forks", icon: Github },
                { number: "0", label: "Contributors", icon: Users },
                { number: "0", label: "Open Issues", icon: AlertCircle },
                { number: "0", label: "Merged PRs", icon: GitPullRequest }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div 
                    key={stat.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 mr-2 text-gray-400" />
                      <div className="text-xl md:text-2xl font-bold neon-text">{stat.number}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                )
              })
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Social Media Icons */}
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
                  transition: { type: "spring", stiffness: 300, damping: 30 }
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
    </section>
  )
}
