import { NextRequest, NextResponse } from 'next/server'

interface GitHubIssue {
  id: number
  number: number
  title: string
  html_url: string
  state: string
  pull_request?: {
    url: string
  }
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '5')

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'DarshanKrishna-DK'
    const REPO_NAME = process.env.GITHUB_REPO_NAME || 'KrowdKraft'

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'KrowdKraft-Website'
    }

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`
    }

    // Fetch ALL open issues at once (GitHub returns max 100 per page)
    const allIssuesUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&per_page=100`
    const allIssuesResponse = await fetch(allIssuesUrl, { 
      headers,
      next: { revalidate: 120 }
    })

    if (!allIssuesResponse.ok) {
      throw new Error(`GitHub API error: ${allIssuesResponse.status}`)
    }

    const allIssues: GitHubIssue[] = await allIssuesResponse.json()

    // Filter out pull requests
    const onlyIssues = allIssues.filter(issue => !issue.pull_request)

    // Get total count
    const totalCount = onlyIssues.length

    // Calculate pagination indices
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage

    // Slice the filtered issues for this page
    const paginatedIssues = onlyIssues.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        issues: paginatedIssues,
        totalCount,
        page,
        perPage
      }
    })

  } catch (error: any) {
    console.error('Error fetching GitHub issues:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch GitHub issues'
    }, { status: 500 })
  }
}