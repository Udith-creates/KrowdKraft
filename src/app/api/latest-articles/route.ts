import { NextResponse } from "next/server";
import Parser from "rss-parser";

export const revalidate = 604800; // 7 days (in seconds)

const parser = new Parser();

export async function GET() {
  try {
    const profile = process.env.MEDIUM_USER_PROFILE
    if (!profile) {
      // No configured Medium profile — return empty list instead of erroring
      return NextResponse.json({ posts: [] })
    }

    const feedUrl = `https://medium.com/feed/@${profile}`

    // Fetch first to handle 404s and network errors gracefully
    const res = await fetch(feedUrl)
    if (res.status === 404) {
      return NextResponse.json({ posts: [] })
    }
    if (!res.ok) {
      console.error('Medium feed fetch failed', res.status)
      return NextResponse.json({ error: 'Failed to fetch Medium feed' }, { status: 502 })
    }

    const text = await res.text()
    const feed = await parser.parseString(text)

    const latestPosts = (feed.items || []).slice(0, 3).map((item) => {
      const content = item.content || item["content:encoded"] || "";
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = imgMatch ? imgMatch[1] : null;

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        thumbnail,
      };
    });

    return NextResponse.json({ posts: latestPosts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch Medium articles" }, { status: 500 });
  }
}
