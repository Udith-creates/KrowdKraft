"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, ExternalLink, Github, Circle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useGitHubIssues } from "@/hooks/use-github-issues"

interface GitHubIssue {
    id: number
    number: number
    title: string
    html_url: string
    state: string
    labels: Array<{
        name: string
        color: string
    }>
    created_at: string
    updated_at: string
    user: {
        login: string
        avatar_url: string
    }
}

function IssueListItem({ issue, index }: { issue: GitHubIssue; index: number }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 24) {
            return `${diffInHours} hours ago`
        } else if (diffInHours < 48) {
            return 'yesterday'
        } else {
            const diffInDays = Math.floor(diffInHours / 24)
            return `${diffInDays} days ago`
        }
    }

    return (
        <motion.a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            className="group flex items-start gap-4 py-4 px-4 border-b border-border/40 hover:bg-secondary/30 transition-colors cursor-pointer"
        >
            {/* Left: Issue Icon & Number */}
            <div className="flex items-center gap-3 min-w-fit">
                <Circle className="h-4 w-4 text-green-500 fill-green-500" />
                <span className="text-muted-foreground font-mono text-sm">#{issue.number}</span>
            </div>

            {/* Center: Title & Labels */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                    <h3 className="font-semibold text-base group-hover:text-neon transition-colors flex-1 min-w-0">
                        {issue.title}
                    </h3>
                </div>

                {/* Labels */}
                {issue.labels.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                        {issue.labels.map(label => (
                            <Badge
                                key={label.name}
                                variant="outline"
                                className="text-xs"
                                style={{
                                    borderColor: `#${label.color}`,
                                    color: `#${label.color}`
                                }}
                            >
                                {label.name}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Metadata */}
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>opened {formatDate(issue.created_at)}</span>
                    <span>by {issue.user.login}</span>
                </div>
            </div>

            {/* Right: Author Avatar & External Link Icon */}
            <div className="flex items-center gap-3 min-w-fit">
                <img
                    src={issue.user.avatar_url}
                    alt={issue.user.login}
                    className="w-6 h-6 rounded-full"
                />
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </motion.a>
    )
}

function LoadingSkeleton() {
    return (
        <div className="border border-border/40 rounded-lg overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-start gap-4 py-4 px-4 border-b border-border/40 animate-pulse">
                    <div className="flex items-center gap-3 min-w-fit">
                        <div className="h-4 w-4 bg-muted rounded-full"></div>
                        <div className="h-4 w-12 bg-muted rounded"></div>
                    </div>
                    <div className="flex-1">
                        <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="w-6 h-6 bg-muted rounded-full"></div>
                </div>
            ))}
        </div>
    )
}

export default function DevHub() {
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 5

    const { data, isLoading, error } = useGitHubIssues(currentPage, perPage)

    const issues = data?.data?.issues || []
    const totalCount = data?.data?.totalCount || 0
    const hasMore = (currentPage * perPage) < totalCount

    return (
        <section className="py-24 bg-secondary/20 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Code className="h-8 w-8 text-neon" />
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            Dev <span className="neon-text">Hub</span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
                        Join our open-source community! Browse active issues and contribute to KrowdKraft.
                    </p>
                </motion.div>

                {/* Stats */}
                {!isLoading && !error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 glass-card px-6 py-3">
                            <Github className="h-5 w-5 text-neon" />
                            <span className="text-muted-foreground">
                                <span className="font-bold text-neon">{totalCount}</span> open issues
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* Loading State */}
                {isLoading && <LoadingSkeleton />}

                {/* Error State */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="glass-card p-8 max-w-md mx-auto">
                            <Code className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Failed to Load Issues</h3>
                            <p className="text-muted-foreground mb-4">
                                We couldn't fetch the latest issues from GitHub. Please try again later.
                            </p>
                            <Button
                                variant="neon"
                                onClick={() => window.location.reload()}
                            >
                                Retry
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Issues List */}
                {!isLoading && !error && issues.length > 0 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border border-border/40 rounded-lg overflow-hidden mb-8 bg-background/50"
                        >
                            {issues.map((issue, index) => (
                                <IssueListItem key={issue.id} issue={issue} index={index} />
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex justify-center gap-4"
                        >
                            {currentPage > 1 && (
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                >
                                    Previous
                                </Button>
                            )}

                            <div className="flex items-center gap-2 glass-card px-4">
                                <span className="text-sm text-muted-foreground">Page</span>
                                <span className="text-neon font-bold">{currentPage}</span>
                            </div>

                            {hasMore && (
                                <Button
                                    variant="neon"
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                >
                                    Next
                                </Button>
                            )}
                        </motion.div>
                    </>
                )}

                {/* Empty State */}
                {!isLoading && !error && issues.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="glass-card p-8 max-w-md mx-auto">
                            <Code className="h-12 w-12 text-neon mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">No Open Issues</h3>
                            <p className="text-muted-foreground">
                                Great news! All issues are resolved. Check back later for new opportunities to contribute.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="glass-card p-6 max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Left: Icon and Text */}
                            <div className="flex items-center gap-4 flex-1">
                                <Github className="h-10 w-10 text-neon flex-shrink-0" />
                                <div className="text-left">
                                    <h3 className="text-xl font-bold mb-1">Ready to Contribute?</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Check out our repository on GitHub to get started. Every contribution helps us build something amazing together.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Button */}
                            <Button
                                variant="neon"
                                size="lg"
                                onClick={() => window.open('https://github.com/DarshanKrishna-DK/KrowdKraft', '_blank')}
                                className="flex-shrink-0"
                            >
                                Visit Repository
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}