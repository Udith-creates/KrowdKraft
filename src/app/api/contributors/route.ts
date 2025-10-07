import { NextResponse } from 'next/server'

const CACHE_TTL = 1000 * 60 * 30 // 30 minutes
let cache: { ts: number; data: any } | null = null

export async function GET() {
  try {
    if (cache && Date.now() - cache.ts < CACHE_TTL) return NextResponse.json(cache.data)

    const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' }
    if (process.env.GITHUB_TOKEN) headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`

    const res = await fetch('https://api.github.com/repos/DarshanKrishna-DK/KrowdKraft/contributors?per_page=100', { headers })
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch contributors' }, { status: 502 })

    const json = await res.json()
    const mapped = (json || []).map((c: any) => ({ login: c.login, avatar_url: c.avatar_url, html_url: c.html_url }))
    cache = { ts: Date.now(), data: mapped }
    return NextResponse.json(mapped)
  } catch (err) {
    return NextResponse.json({ error: 'Server error fetching contributors' }, { status: 500 })
  }
}
