import { GitHubIssue } from '@/types'
import { useQuery } from '@tanstack/react-query'

interface GitHubIssuesResponse {
  success: boolean
  data: {
    issues: GitHubIssue[]
    totalCount: number
    page: number
    perPage: number
  }
}

export function useGitHubIssues(page: number = 1, perPage: number = 5) {
  return useQuery<GitHubIssuesResponse>({
    queryKey: ['github-issues', page, perPage],
    queryFn: async () => {
      const response = await fetch(`/api/github-issues?page=${page}&per_page=${perPage}`)
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub issues')
      }
      return response.json()
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}